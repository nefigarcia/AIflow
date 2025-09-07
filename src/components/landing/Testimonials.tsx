import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "Working with AgentFlow was a game-changer. We automated our entire lead qualification process in under two weeks. The agility and expertise are unmatched by any large firm we've worked with.",
    name: 'Jane Doe',
    title: 'CEO, Innovate Inc.',
    image: 'https://picsum.photos/100/100',
    aiHint: 'person portrait',
  },
  {
    quote: "The bureaucracy at big AI companies was killing our momentum. AgentFlow delivered a powerful data analysis agent that provides daily insights, all with zero administrative hassle. It just works.",
    name: 'John Smith',
    title: 'Marketing Director, Growth Co.',
    image: 'https://picsum.photos/101/101',
    aiHint: 'person portrait',
  },
  {
    quote: "I was skeptical about how much a solo engineer could do, but the results speak for themselves. Our operational costs are down 30% thanks to a custom agent that manages our inventory. Highly recommended.",
    name: 'Emily White',
    title: 'Founder, Retail Startup',
    image: 'https://picsum.photos/102/102',
    aiHint: 'person portrait',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Trusted by Innovators
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our clients have to say about their experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 pt-12 sm:max-w-4xl sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <blockquote className="text-lg font-semibold leading-snug">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.aiHint} width={100} height={100} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
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
