import { Search, Wrench, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery & Process Mapping',
    description:
      'We start with a deep-dive into your current operations. We identify the processes consuming the most time and cost, map the data flows between your systems, and pinpoint the highest-impact AI integration opportunities.',
    highlights: ['Process audit', 'System inventory', 'ROI opportunity ranking'],
  },
  {
    step: '02',
    icon: Wrench,
    title: 'Design, Build & Test',
    description:
      'We architect and build custom AI pipelines, agents, and automations tailored to your exact stack and requirements. Every component is tested against your real data and business logic before it touches production.',
    highlights: ['Custom agent development', 'Pipeline architecture', 'Real-data validation'],
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Deploy, Monitor & Iterate',
    description:
      'We integrate directly into your live environment with zero disruption. Post-deployment, we monitor performance, measure cost savings, and continuously refine the system as your needs evolve.',
    highlights: ['Zero-downtime deployment', 'Performance dashboards', 'Ongoing optimization'],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Our Process</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            From Discovery to Deployed in Weeks, Not Months
          </h2>
          <p className="max-w-[700px] text-foreground/70 md:text-xl/relaxed">
            A lean, transparent process designed to get AI working inside your business as fast as possible — with measurable results at every stage.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-1/2 -translate-x-1/2 w-[66%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center lg:items-start lg:text-left group">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-200">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-2 -right-3 text-xs font-bold text-primary/60 bg-background border border-border rounded-full w-7 h-7 flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">{step.description}</p>

                <ul className="flex flex-col gap-1.5">
                  {step.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
