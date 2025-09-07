import { Hexagon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Hexagon className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AgentFlow. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#solutions" className="hover:text-foreground">Solutions</Link>
          <Link href="#pricing" className="hover:text-foreground">Pricing</Link>
          <Link href="#about" className="hover:text-foreground">About</Link>
        </div>
      </div>
    </footer>
  );
}
