import { Button } from '@/components/ui/button';
import AiDiagram from './AiDiagram';
import { ArrowRight, TrendingDown, Zap, Shield } from 'lucide-react';

const stats = [
  { icon: TrendingDown, value: '40%', label: 'Avg. cost reduction' },
  { icon: Zap, value: '2 wks', label: 'Avg. time to deploy' },
  { icon: Shield, value: '100%', label: 'Custom-built for your stack' },
];

export default function Hero() {
  return (
    <section className="w-full py-20 md:py-24 lg:py-32 xl:py-40 bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
              AI Process Integration Specialists
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline leading-[1.1]">
              Embed AI Into Your Business — Reduce Costs, Scale Operations
            </h1>
            <p className="max-w-[600px] text-foreground/70 md:text-xl leading-relaxed">
              We design and deploy AI systems directly into your existing workflows. No rip-and-replace, no bloat — just custom pipelines, agents, and automations that integrate with your current tools and deliver measurable ROI from day one.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
                <a href="#contact">
                  Book a Discovery Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <AiDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
