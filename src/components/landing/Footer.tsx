import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const links = [
  { name: 'Solutions', href: '#solutions' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Industries', href: '#industries' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container px-4 md:px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">AIflow</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI process integration specialists. We embed intelligent systems into your existing workflows to reduce costs and scale operations.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIflow. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built to integrate. Designed to last.
          </p>
        </div>
      </div>
    </footer>
  );
}
