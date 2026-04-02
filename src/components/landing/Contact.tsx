'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Clock, MessageSquare, Shield } from 'lucide-react';
import { sendContactEmailAction } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().min(1, { message: 'Company name is required.' }),
  industry: z.string().min(1, { message: 'Please select your industry.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const industries = [
  'Finance & Accounting',
  'Healthcare & Clinics',
  'E-commerce & Retail',
  'Operations & Logistics',
  'Marketing & Sales',
  'Legal & Compliance',
  'Manufacturing',
  'Real Estate',
  'Education',
  'Other',
];

const trustItems = [
  { icon: Clock, text: 'Response within 24 hours' },
  { icon: MessageSquare, text: 'No-pressure discovery call' },
  { icon: Shield, text: 'NDA available on request' },
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      industry: '',
      message: '',
    },
  });

  async function onSubmit(values: FormValues) {
    const response = await sendContactEmailAction({
      name: values.name,
      email: values.email,
      message: `Company: ${values.company}\nIndustry: ${values.industry}\n\n${values.message}`,
    });

    if (response.success) {
      toast({
        title: 'Message received!',
        description: "We'll review your process and get back to you within 24 hours.",
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: response.error,
      });
    }
  }

  return (
    <section id="contact" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 max-w-5xl mx-auto">
          {/* Left side - copy */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium w-fit">Get in Touch</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Let's Map Your AI Integration Opportunity
            </h2>
            <p className="text-foreground/70 md:text-lg leading-relaxed">
              Tell us about your business and the processes slowing you down. We'll assess the AI integration opportunities in your workflow and walk you through what's possible — no commitment required.
            </p>
            <div className="space-y-4 pt-2">
              {trustItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-foreground/70">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - form */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Book a Discovery Call</CardTitle>
              <CardDescription>Fill out the form and we'll reach out to schedule a call.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe Your Process or Challenge</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., We manually process 500 invoices per month across 3 systems and it takes our team 3 days to complete. We'd like to automate this..."
                            rows={4}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full group" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
