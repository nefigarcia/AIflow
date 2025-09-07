'use client';

import { Bot, Cpu, Database, Share2, Users, FileInput } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NodeProps {
  icon: React.ElementType;
  title: string;
  className?: string;
  isPulsing?: boolean;
}

const Node = ({ icon: Icon, title, className, isPulsing = false }: NodeProps) => (
  <Card
    className={cn(
      'absolute z-10 w-32 h-20 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm shadow-lg',
      isPulsing && 'animate-pulse-glow',
      className
    )}
  >
    <CardContent className="p-2 flex flex-col items-center justify-center text-center">
      <Icon className="w-6 h-6 mb-1 text-primary" />
      <p className="text-xs font-semibold">{title}</p>
    </CardContent>
  </Card>
);

interface LineProps {
  className?: string;
}

const Line = ({ className }: LineProps) => (
  <div
    className={cn(
      'absolute z-0 bg-border/50',
      'after:absolute after:content-[""] after:block after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-primary/50 after:to-transparent after:opacity-50 after:animate-[shine_4s_ease-in-out_infinite]',
      className
    )}
  />
);

export default function AiDiagram() {
  return (
    <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] scale-75 md:scale-90 lg:scale-100">
      <Node icon={Users} title="User Input" className="top-1/2 -translate-y-1/2 left-0" isPulsing />
      <Node icon={FileInput} title="Data Ingestion" className="top-[10%] left-[25%]" />
      <Node icon={Cpu} title="Processing Agent" className="top-[10%] right-[25%]" />
      <Node icon={Bot} title="Analysis Agent" className="bottom-[10%] left-[25%]" />
      <Node icon={Database} title="External API" className="bottom-[10%] right-[25%]" />
      <Node icon={Share2} title="Business Output" className="top-1/2 -translate-y-1/2 right-0" />

      {/* Lines */}
      <Line className="top-1/2 left-32 h-0.5 w-12 -translate-y-0.5" />
      <div className="absolute left-[calc(25%-20px)] top-[calc(50%-1px)] h-[calc(40%+2px)] w-0.5 bg-border/50" />
      <Line className="top-[calc(20%)] left-[calc(25%+128px-16px)] h-0.5 w-[calc(50%-128px)]" />
      <Line className="bottom-[calc(20%)] left-[calc(25%+128px-16px)] h-0.5 w-[calc(50%-128px)] -translate-y-0.5" />

      <div className="absolute right-[calc(25%-20px)] top-[calc(20%-1px)] h-[calc(60%+2px)] w-0.5 bg-border/50" />
      <Line className="top-[calc(50%)] right-32 h-0.5 w-12 -translate-y-0.5" />
      
      {/* Arrow heads */}
      <div className="absolute top-1/2 left-[calc(25%-20px)] -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-primary" />
      <div className="absolute top-[20%] right-[calc(25%)] -translate-y-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-primary" />
      <div className="absolute bottom-[20%] right-[calc(25%)] -translate-y-0.5 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-primary" />
      <div className="absolute top-1/2 right-[128px] -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-primary" />
    </div>
  );
}
