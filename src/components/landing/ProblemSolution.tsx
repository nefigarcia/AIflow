import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Workflow, Lightbulb, Zap, LineChart, Cpu } from 'lucide-react';

const solutions = [
  {
    icon: Workflow,
    title: 'Agentic Workflow Automation',
    description: 'Design and deploy autonomous agents that handle complex, multi-step tasks, from data entry to customer interaction, freeing up your team for strategic work.',
  },
  {
    icon: Cpu,
    title: 'Intelligent Data Processing',
    description: 'Implement AI agents that can read, understand, and process vast amounts of unstructured data, turning documents, emails, and reports into actionable insights.',
  },
  {
    icon: LineChart,
    title: 'AI-Powered Analytics',
    description: 'Go beyond dashboards. Get AI agents that proactively monitor your data, identify trends, and deliver predictive insights to drive better business decisions.',
  },
  {
    icon: Zap,
    title: 'Seamless System Integration',
    description: 'Our agents act as the glue between your existing software (CRMs, ERPs, APIs), creating a unified, intelligent ecosystem without costly overhauls.',
  },
  {
    icon: Bot,
    title: 'Custom AI Tooling',
    description: 'Need a specific AI tool for your unique challenge? We build bespoke AI solutions tailored precisely to your operational needs and business goals.',
  },
  {
    icon: Lightbulb,
    title: 'Strategic AI Consultation',
    description: 'Not sure where to start? We help you identify the highest-impact opportunities for AI integration within your business processes, ensuring a tangible ROI.',
  },
];

export default function ProblemSolution() {
  return (
    <section id="solutions" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Solutions</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              From Tedious to Automated
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We tackle your biggest operational headaches by building smart AI agents that work for you 24/7.
              Here's how we can transform your business.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
          {solutions.map((solution) => (
            <Card key={solution.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="grid gap-4">
                <solution.icon className="h-8 w-8 text-primary" />
                <div className="grid gap-1">
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>
                    {solution.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
