'use server';

import { agentBuilderTool, type AgentBuilderInput, type AgentBuilderOutput } from '@/ai/flows/agent-builder-tool';
import nodemailer from 'nodemailer';

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
  params.append('scope', 'https://outlook.office.com/.default');
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

async function createTransporter() {
  const accessToken = await getAzureAdToken();

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      type: 'OAuth2',
      user: process.env.OAUTH_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  return transporter;
}

export async function sendContactEmailAction(
  input: SendContactEmailInput
): Promise<{ success: true } | { success: false; error: string }> {
  const { name, email, message } = input;

  try {
    const transporter = await createTransporter();

    // Email to business owner
    await transporter.sendMail({
      from: `"${name}" <${process.env.OAUTH_USER}>`,
      to: process.env.MY_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      replyTo: email,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"AgentFlow" <${process.env.OAUTH_USER}>`,
      to: email,
      subject: 'We have received your message!',
      text: `Hi ${name},\n\nThanks for reaching out! An agent will be responding soon with all the specifications you requested.\n\nBest,\nThe AgentFlow Team`,
      html: `<p>Hi ${name},</p><p>Thanks for reaching out! An agent will be responding soon with all the specifications you requested.</p><p>Best,<br>The AgentFlow Team</p>`,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while sending the message. Please check your OAuth credentials and try again later.',
    };
  }
}
