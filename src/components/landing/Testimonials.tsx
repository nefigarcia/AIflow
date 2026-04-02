import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "We were spending 60 hours a month manually reconciling invoices across three systems. AIflow built a pipeline that automated the entire process in two weeks. We reallocated that time to actual financial analysis — the ROI was immediate.",
    name: 'Sarah M.',
    title: 'CFO, Mid-Size Distribution Company',
    initials: 'SM',
    metric: '60 hrs/mo saved',
  },
  {
    quote: "Our sales team was drowning in lead data with no way to prioritize. AIflow built a qualification agent that scores and routes leads in real time based on our CRM data. Our conversion rate went up 28% in the first quarter.",
    name: 'Daniel R.',
    title: 'VP of Sales, B2B SaaS Company',
    initials: 'DR',
    metric: '+28% conversion rate',
  },
  {
    quote: "What impressed me most was how they integrated into our existing tools without disrupting anything. They built an AI that monitors our supply chain data and flags issues before they become problems. Operations feels completely different now.",
    name: 'Patricia L.',
    title: 'Head of Operations, E-commerce Retailer',
    initials: 'PL',
    metric: '35% fewer escalations',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-14">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Client Results</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Real Impact. Measurable Results.
          </h2>
          <p className="max-w-[700px] text-foreground/70 md:text-xl/relaxed">
            We measure success by what changes in your operations — time saved, costs reduced, and processes that run themselves.
          </p>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-6 pt-4 sm:max-w-4xl sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <Quote className="h-6 w-6 text-primary/40" />
                  <blockquote className="text-sm leading-relaxed text-foreground/80">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {testimonial.metric}
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs bg-muted font-semibold">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
