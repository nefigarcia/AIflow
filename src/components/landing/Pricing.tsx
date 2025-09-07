import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter Agent',
    price: 'Fixed Project',
    description: 'Perfect for automating a single, well-defined task or workflow.',
    features: [
      '1 Core AI Agent',
      'Basic Process Integration',
      'Standard Tools & APIs',
      'One-time Setup & Delivery',
    ],
    cta: 'Get a Quote',
    isPopular: false,
  },
  {
    name: 'Growth Agent',
    price: 'Monthly Retainer',
    description: 'For businesses looking to automate complex processes and scale AI capabilities.',
    features: [
      'Multiple Interacting Agents',
      'Advanced Workflow Design',
      'Custom Tool Development',
      'Ongoing Optimization & Support',
      'Priority Access',
    ],
    cta: 'Get Started',
    isPopular: true,
  },
  {
    name: 'Enterprise System',
    price: 'Custom',
    description: 'A complete, bespoke agentic system for full business transformation.',
    features: [
      'Full Agentic AI System',
      'Deep ERP/CRM Integration',
      'Dedicated Engineer',
      'Performance SLAs',
      'Strategic AI Roadmap',
    ],
    cta: 'Contact Us',
    isPopular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              No hidden fees, no enterprise sales teams. Just straightforward pricing that lets you focus on growth.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-md items-start gap-8 pt-12 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${tier.isPopular ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}
            >
              {tier.isPopular && (
                <div className="bg-accent text-accent-foreground text-sm font-semibold py-1 px-4 rounded-t-lg text-center">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="flex items-baseline pt-4">
                  <span className="text-4xl font-bold tracking-tighter">{tier.price}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className={`w-full ${tier.isPopular ? '' : 'bg-primary/80 hover:bg-primary'}`} variant={tier.isPopular ? 'default' : 'secondary'}>
                  <a href="#contact">{tier.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
