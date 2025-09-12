import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src="https://picsum.photos/500/500"
              alt="Founder of AgentFlow"
              width={400}
              height={400}
              data-ai-hint="portrait engineer"
              className="rounded-full object-cover aspect-square shadow-lg"
            />
          </div>
          <div className="space-y-4 flex flex-col justify-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">The AgentFlow Difference</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Your Solo AI Partner
            </h2>
            <p className="text-foreground/80 md:text-lg">
              AgentFlow isn't another faceless corporation. It's a solo AI engineering practice founded on a simple principle: deliver maximum value with minimum overhead. My name is Nefi(nefgtz), and I'm the founder, developer, and your direct point of contact.
            </p>
            <p className="text-foreground/80 md:text-lg">
              With years of experience building scalable AI systems, I saw businesses struggling with the slow, expensive, and bureaucratic processes of large consulting firms. I created AgentFlow to offer a better way: agile development, transparent communication, and a obsessive focus on solving your specific problems in the most efficient way possible. When you work with me, you get a dedicated partner invested in your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
