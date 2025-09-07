'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, BrainCircuit, Bot, Loader2, ServerCrash, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { buildAgentAction } from '@/app/actions';
import type { AgentBuilderOutput } from '@/ai/flows/agent-builder-tool';

const formSchema = z.object({
  agentRequirements: z.string().min(20, {
    message: 'Please provide more details. Requirements must be at least 20 characters.',
  }),
  agentName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AgentBuilder() {
  const [result, setResult] = useState<AgentBuilderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentRequirements: '',
      agentName: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const response = await buildAgentAction(values);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: response.error,
      });
    }

    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return (
    <section id="agent-builder" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">AI-Powered Tool</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Describe Your Perfect AI Agent
            </h2>
            <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed">
              Not sure what's possible? Use our GenAI tool to turn your business needs into a concrete agent concept. Just describe the process you want to automate, and let our AI do the rest.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Agent Builder</CardTitle>
                <CardDescription>Fill out the form to generate an agent concept.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="agentRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., An agent that reads incoming customer support emails, categorizes them based on sentiment and topic, and drafts a response."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., SupportBot 3000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Building...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Build My Agent
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <BrainCircuit className="h-16 w-16 text-primary animate-pulse" />
                <p className="text-lg font-medium">Our AI is thinking...</p>
                <p className="text-muted-foreground">Generating your agent concept. This may take a moment.</p>
              </div>
            )}
            {error && !isLoading && (
              <Card className="w-full bg-destructive/10 border-destructive/50 text-center">
                <CardHeader>
                  <div className="mx-auto bg-destructive/20 rounded-full p-3 w-fit">
                    <ServerCrash className="h-10 w-10 text-destructive" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                  <CardDescription className="text-destructive/80 mt-2">{error}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" onClick={() => form.handleSubmit(onSubmit)()} className="w-full">
                    Try Again
                  </Button>
                </CardFooter>
              </Card>
            )}
            {result && !isLoading && (
              <Card className="w-full animate-in fade-in-50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-primary" />
                        <CardTitle className="text-2xl">{result.agentName}</CardTitle>
                      </div>
                      <CardDescription>Your generated agent concept.</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Agent Description</h3>
                    <p className="text-sm text-foreground/80">{result.agentDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Implementation Options</h3>
                    <p className="text-sm text-foreground/80 whitespace-pre-line">{result.implementationOptions}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <a href="#contact">Discuss Implementation</a>
                  </Button>
                </CardFooter>
              </Card>
            )}
            {!isLoading && !result && !error && (
                <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border-2 border-dashed rounded-lg">
                    <Wand2 className="h-16 w-16 text-muted-foreground/50" />
                    <p className="text-lg font-medium text-muted-foreground">Your agent concept will appear here</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
