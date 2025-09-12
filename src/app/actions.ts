'use server';

import { agentBuilderTool, type AgentBuilderInput, type AgentBuilderOutput } from '@/ai/flows/agent-builder-tool';

export async function buildAgentAction(
  input: AgentBuilderInput
): Promise<{ success: true; data: AgentBuilderOutput } | { success: false; error: string }> {
  try {
    const result = await agentBuilderTool(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in buildAgentAction:', error);
    // The provided AI flow might have issues. We return a user-friendly message.
    return {
      success: false,
      error: 'An unexpected error occurred while building the agent. The AI model may be temporarily unavailable. Please try again later.',
    };
  }
}

interface SendContactEmailInput {
  name: string;
  email: string;
  message: string;
}

async function getAzureAdToken() {
  const tenantId = process.env.OAUTH_TENANT_ID;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

  if (!tenantId || !clientId || !clientSecret || !refreshToken) {
    throw new Error('Azure AD OAuth credentials are not fully configured in environment variables.');
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('scope', 'https://graph.microsoft.com/.default');
  params.append('refresh_token', refreshToken);
  params.append('grant_type', 'refresh_token');
  params.append('client_secret', clientSecret);

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Failed to get Azure AD token:', data);
    throw new Error(`Failed to create access token: ${data.error_description || 'Unknown error'}`);
  }

  return data.access_token;
}

async function sendMailViaGraph(
  accessToken: string,
  subject: string,
  bodyText: string,
  toEmail: string,
  replyToEmail?: string
) {
  const message = {
    message: {
      subject,
      body: {
        contentType: 'Text',
        content: bodyText,
      },
      toRecipients: [
        {
          emailAddress: {
            address: toEmail,
          },
        },
      ],
      ...(replyToEmail && {
        replyTo: [
          {
            emailAddress: {
              address: replyToEmail,
            },
          },
        ],
      }),
    },
    saveToSentItems: true,
  };


   const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const text = await response.text(); // safer than response.json()
    let errorMessage: string;

    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error?.message || 'Unknown error';
      console.error('Graph API sendMail failed:', errorData);
    } catch {
      errorMessage = text || 'Unknown error (no body)';
      console.error('Graph API sendMail failed with non-JSON body:', text);
    }

    throw new Error(`Failed to send email via Graph: ${errorMessage}`);
  }
}

export async function sendContactEmailAction(
  input: SendContactEmailInput
): Promise<{ success: true } | { success: false; error: string }> {
  const { name, email, message } = input;

  try {
     const accessToken = await getAzureAdToken();

    // Email to business owner
    const subjectToBusiness = `New Contact Form Submission from ${name}`;
    await sendMailViaGraph(accessToken, subjectToBusiness, message, process.env.MY_EMAIL!, email);

    // Confirmation email to user
    const subjectToUser = 'We have received your message!';
    const bodyToUser = `Hi ${name},\n\nThanks for reaching out! An agent will be responding soon with all the specifications you requested.\n\nBest,\nThe AgentFlow Team`;
    await sendMailViaGraph(accessToken, subjectToUser, bodyToUser, email);

    return { success: true };
  } catch (error) {
    console.error('Error sending email via Microsoft Graph:', error);
    return {
      success: false,
      error: 'An error occurred while sending the email. Please try again later or check your credentials.',
    };
  }
  
}
