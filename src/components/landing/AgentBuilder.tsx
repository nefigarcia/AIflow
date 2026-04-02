'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, BrainCircuit, Bot, Loader2, ServerCrash, Copy, ArrowRight } from 'lucide-react';

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
    message: 'Please provide more detail — at least 20 characters.',
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
        title: 'Something went wrong.',
        description: response.error,
      });
    }

    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <section id="agent-builder" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Free AI Tool</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Discover Your AI Opportunity
            </h2>
            <p className="max-w-[600px] text-foreground/70 md:text-lg/relaxed">
              Describe a process in your business that feels slow, repetitive, or expensive. Our AI will analyze it and generate a concrete automation concept — what it would do, how it would work, and what it would replace.
            </p>
            <Card className="border-border/60">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Process Analyzer</CardTitle>
                <CardDescription>Describe your process and get an AI integration blueprint in seconds.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="agentRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe the Process</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Our team manually reviews 200+ incoming supplier invoices per week, cross-checks them against purchase orders in our ERP, and routes them for approval. It takes 3 people 2 days to clear the queue."
                              rows={5}
                              className="resize-none"
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
                          <FormLabel>Name Your Agent <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Invoice Reconciler, Lead Qualifier, Report Generator" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full group">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing your process...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate AI Blueprint
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              <div className="flex flex-col items-center justify-center space-y-4 text-center p-10">
                <BrainCircuit className="h-16 w-16 text-primary animate-pulse" />
                <p className="text-lg font-semibold">Analyzing your process...</p>
                <p className="text-muted-foreground text-sm max-w-xs">We're mapping your workflow to identify the optimal AI integration strategy.</p>
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
                  <CardTitle className="text-destructive">Analysis Failed</CardTitle>
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
              <Card className="w-full animate-in fade-in-50 border-primary/30 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{result.agentName}</CardTitle>
                        <CardDescription className="text-xs">AI Integration Blueprint</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">What It Does</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">{result.agentDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Implementation Options</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{result.implementationOptions}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button asChild className="w-full group">
                    <a href="#contact">
                      Discuss This with Our Team
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Free consultation — no commitment required</p>
                </CardFooter>
              </Card>
            )}
            {!isLoading && !result && !error && (
              <div className="flex flex-col items-center justify-center space-y-4 text-center p-10 border-2 border-dashed border-border/60 rounded-xl w-full">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Sparkles className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground/80">Your AI blueprint will appear here</p>
                  <p className="text-sm text-muted-foreground max-w-xs">Describe any process on the left and we'll generate a tailored AI integration concept.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
