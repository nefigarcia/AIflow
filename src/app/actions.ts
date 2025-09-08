'use server';

import { agentBuilderTool, type AgentBuilderInput, type AgentBuilderOutput } from '@/ai/flows/agent-builder-tool';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

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

const OAuth2 = google.auth.OAuth2;

async function createTransporter() {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token.');
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      type: 'OAuth2',
      user: process.env.OAUTH_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken as string,
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
