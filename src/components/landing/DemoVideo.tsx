export default function DemoVideo() {
  return (
    <section className="w-full py-16 md:py-20 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">See It In Action</div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">
              Watch How We Integrate AI Into Your Workflow
            </h2>
            <p className="max-w-[600px] text-foreground/70 md:text-lg">
              A quick walkthrough of how AIflow maps, builds, and deploys AI systems directly inside your existing processes.
            </p>
          </div>

          {/* Video frame */}
          <div className="w-full max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-black/10 bg-black">
              {/* Faux browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border/40">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="flex-1 mx-4 h-6 rounded-md bg-background/60 text-xs text-muted-foreground flex items-center justify-center tracking-wide">
                  aiflow.demo
                </span>
              </div>
              <video
                src="/videos/aiflowloom.mp4"
                controls
                preload="metadata"
                className="w-full aspect-video"
                poster=""
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Ready to see what this looks like in <span className="font-medium text-foreground">your</span> processes?{' '}
            <a href="#contact" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium">
              Book a discovery call →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
