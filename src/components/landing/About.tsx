import { CheckCircle2 } from 'lucide-react';

const differentiators = [
  'Direct access to the engineer building your system — no account managers or middlemen',
  'Deep integration expertise: we work with your existing stack, not around it',
  'Transparent delivery: you own the code, the pipelines, and the IP',
  'Speed-first approach: production-ready systems in weeks, not quarters',
  'Ongoing partnership: we monitor, optimize, and evolve your AI as your business grows',
];

export default function About() {
  return (
    <section id="about" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Visual side */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-border/60 overflow-hidden flex items-center justify-center">
              {/* Abstract grid pattern */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }}
              />
              {/* Center content */}
              <div className="relative z-10 flex flex-col items-center gap-4 text-center p-8">
                <div className="text-7xl font-black text-primary/20 select-none">AI</div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">Built Different</div>
                  <div className="text-muted-foreground text-sm max-w-xs">
                    Agile by design. Integrated by default. Measured by results.
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 w-full">
                  {[
                    { value: '3+', label: 'Years AI Eng.' },
                    { value: '20+', label: 'Processes Built' },
                    { value: '100%', label: 'Client Retained' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-0.5 rounded-lg bg-background/60 p-3">
                      <span className="text-xl font-bold text-primary">{stat.value}</span>
                      <span className="text-xs text-muted-foreground leading-tight text-center">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium w-fit">Why AIflow</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Specialized Expertise. Zero Overhead.
            </h2>
            <p className="text-foreground/70 md:text-lg leading-relaxed">
              AIflow is a specialized AI engineering practice focused exclusively on one thing: integrating artificial intelligence into your existing business processes. No generic toolkits. No off-the-shelf templates. Every system we build is custom-engineered for your specific workflows, data, and goals.
            </p>
            <p className="text-foreground/70 md:text-lg leading-relaxed">
              Unlike large consulting firms where your project gets handed off to junior engineers, we provide senior-level AI expertise from discovery through deployment — with the agility of a specialist shop and the accountability of a direct partnership.
            </p>
            <ul className="space-y-3 pt-2">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
