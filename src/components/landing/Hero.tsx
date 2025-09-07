import { Button } from '@/components/ui/button';
import AiDiagram from './AiDiagram';

export default function Hero() {
  return (
    <section className="w-full py-20 md:py-24 lg:py-32 xl:py-40 bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Custom AI Agents for Your Business
            </h1>
            <p className="max-w-[600px] text-foreground/80 md:text-xl">
              Build & Implement AI solutions without the corporate bloat. We deliver fast, affordable, and powerful agentic AI to streamline your processes and unlock new growth.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#agent-builder">Build Your Agent</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#solutions">Learn More</a>
              </Button>
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
