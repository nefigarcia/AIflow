import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Workflow, LineChart, Zap, Cpu, GitMerge } from 'lucide-react';

const solutions = [
  {
    icon: Workflow,
    title: 'Intelligent Process Automation',
    description: 'Replace manual, repetitive workflows with autonomous AI agents that handle multi-step tasks end-to-end — from data entry and approvals to customer interactions — freeing your team for high-value work.',
  },
  {
    icon: Cpu,
    title: 'Unstructured Data Processing',
    description: 'Turn documents, emails, PDFs, and reports into structured, actionable data. Our AI pipelines extract, classify, and route information automatically so nothing falls through the cracks.',
  },
  {
    icon: LineChart,
    title: 'Predictive AI Analytics',
    description: 'Go beyond static dashboards. We build AI systems that proactively monitor your operations, surface anomalies, forecast trends, and deliver actionable intelligence directly to your team.',
  },
  {
    icon: Zap,
    title: 'System & API Integration',
    description: 'Our AI layer connects your existing CRMs, ERPs, databases, and third-party APIs into a unified intelligent ecosystem — no costly overhauls, just seamless interoperability.',
  },
  {
    icon: Bot,
    title: 'Custom AI Agents & Tooling',
    description: 'Every business has unique challenges. We engineer bespoke AI agents and tools tailored precisely to your operational requirements — built on your data, integrated into your stack.',
  },
  {
    icon: GitMerge,
    title: 'AI Pipeline Architecture',
    description: 'We design end-to-end AI pipelines that move data from ingestion through transformation to output — scalable, observable, and maintainable systems built for production from day one.',
  },
];

export default function ProblemSolution() {
  return (
    <section id="solutions" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">What We Build</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              AI That Works Inside Your Existing Processes
            </h2>
            <p className="max-w-[800px] text-foreground/70 md:text-xl/relaxed">
              We don't ask you to change how you work. We integrate AI directly into your current systems and workflows, eliminating inefficiencies and reducing operational costs without disruption.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 md:gap-10 lg:max-w-none lg:grid-cols-3 pt-12">
          {solutions.map((solution) => (
            <Card key={solution.title} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-border/60">
              <CardHeader className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <solution.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="grid gap-1.5">
                  <CardTitle className="text-lg">{solution.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
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
