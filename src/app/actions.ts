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

export async function sendContactEmailAction(
  input: SendContactEmailInput
): Promise<{ success: true } | { success: false; error: string }> {
  const { name, email, message } = input;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Email to business owner
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.MY_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      replyTo: email,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"AgentFlow" <${process.env.SMTP_USER}>`,
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
      error: 'An unexpected error occurred while sending the message. Please try again later.',
    };
  }
}
