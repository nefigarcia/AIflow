import { Heart, BarChart2, ShoppingCart, Truck, Megaphone, Scale } from 'lucide-react';

const industries = [
  {
    icon: BarChart2,
    name: 'Finance & Accounting',
    useCases: ['Automated invoice processing', 'Fraud detection pipelines', 'Regulatory reporting agents'],
  },
  {
    icon: Heart,
    name: 'Healthcare & Clinics',
    useCases: ['Patient intake automation', 'Medical record extraction', 'Appointment scheduling AI'],
  },
  {
    icon: ShoppingCart,
    name: 'E-commerce & Retail',
    useCases: ['Inventory management agents', 'AI-powered product descriptions', 'Customer support automation'],
  },
  {
    icon: Truck,
    name: 'Operations & Logistics',
    useCases: ['Route optimization AI', 'Supplier communication agents', 'Real-time tracking pipelines'],
  },
  {
    icon: Megaphone,
    name: 'Marketing & Sales',
    useCases: ['Lead qualification agents', 'Content generation pipelines', 'CRM data enrichment'],
  },
  {
    icon: Scale,
    name: 'Legal & Compliance',
    useCases: ['Contract review automation', 'Compliance monitoring agents', 'Document classification AI'],
  },
];

export default function Industries() {
  return (
    <section id="industries" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Industries We Serve</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            AI Integration Across Every Vertical
          </h2>
          <p className="max-w-[700px] text-foreground/70 md:text-xl/relaxed">
            Whether you're in healthcare, finance, or logistics, we understand your operational context and build AI that fits your industry's specific constraints and requirements.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group flex flex-col gap-4 rounded-xl border border-border/60 bg-background p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <industry.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-base">{industry.name}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {industry.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-muted-foreground text-sm">Don't see your industry? Every business process can be improved with AI.</p>
          <a
            href="#contact"
            className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Tell us about your process →
          </a>
        </div>
      </div>
    </section>
  );
}
