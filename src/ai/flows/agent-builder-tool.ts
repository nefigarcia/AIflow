'use server';

/**
 * @fileOverview An AI agent builder tool.
 *
 * - agentBuilderTool - A function that defines the agent requirements, returns a description of a possible agent that meets these requirements and provides implementation options.
 * - AgentBuilderInput - The input type for the agentBuilderTool function.
 * - AgentBuilderOutput - The return type for the agentBuilderTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgentBuilderInputSchema = z.object({
  agentRequirements: z
    .string()
    .describe('The requirements for the AI agent.'),
  agentName: z.string().optional().describe('The name of the AI agent.'),
});
export type AgentBuilderInput = z.infer<typeof AgentBuilderInputSchema>;

const AgentBuilderOutputSchema = z.object({
  agentName: z.string().describe('The name of the AI agent.'),
  agentDescription: z
    .string()
    .describe('The description of the AI agent.'),
  implementationOptions: z
    .string()
    .describe('The implementation options for the AI agent.'),
});
export type AgentBuilderOutput = z.infer<typeof AgentBuilderOutputSchema>;

export async function agentBuilderTool(input: AgentBuilderInput): Promise<AgentBuilderOutput> {
  return agentBuilderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'agentBuilderPrompt',
  input: {schema: AgentBuilderInputSchema},
  output: {schema: AgentBuilderOutputSchema},
  prompt: `You are an AI agent builder tool that helps users define the requirements for a new AI agent.

You will use the provided agent requirements to generate a description of a possible agent that meets these requirements, including implementation options.

If the user did not provide an agent name, create one.

Agent Requirements: {{{agentRequirements}}}
Agent Name: {{{agentName}}}

Agent Description:
Implementation Options:`, //Fixed: Added missing curly brace.
});

const agentBuilderFlow = ai.defineFlow(
  {
    name: 'agentBuilderFlow',
    inputSchema: AgentBuilderInputSchema,
    outputSchema: AgentBuilderOutputSchema,
  },
  async input => {
    const agentName = input.agentName ?? 'Agent-' + Math.floor(Math.random() * 1000);
    const {
      output,
    } = await prompt({...input, agentName}); //Fixed: Added agentName to the prompt input.
    return output!;
  }
);
