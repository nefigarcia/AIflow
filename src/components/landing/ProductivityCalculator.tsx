'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AI_EFFICIENCY_RATE = 0.62;

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    if (start === end) return;

    const duration = 400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    };

    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayed.toLocaleString()}
      {suffix}
    </span>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{format(value)}</span>
      </div>
      <div className="relative h-2 rounded-full bg-secondary">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow transition-all duration-150"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function ProductivityCalculator() {
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(45);

  const totalHours = employees * hoursPerWeek;
  const savedHoursWeek = Math.round(totalHours * AI_EFFICIENCY_RATE);
  const savedCostMonth = Math.round(savedHoursWeek * hourlyRate * 4);
  const savedCostYear = savedCostMonth * 12;

  return (
    <Card className="w-full max-w-md border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl">
      <CardContent className="p-6 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            ROI Calculator
          </p>
          <h3 className="text-lg font-bold leading-snug">
            How much could AI save your team?
          </h3>
        </div>

        <div className="space-y-5">
          <Slider
            label="Employees on the process"
            value={employees}
            min={1}
            max={50}
            step={1}
            format={(v) => `${v} people`}
            onChange={setEmployees}
          />
          <Slider
            label="Manual hours / week per person"
            value={hoursPerWeek}
            min={1}
            max={40}
            step={1}
            format={(v) => `${v} hrs`}
            onChange={setHoursPerWeek}
          />
          <Slider
            label="Average hourly rate"
            value={hourlyRate}
            min={15}
            max={200}
            step={5}
            format={(v) => `$${v}`}
            onChange={setHourlyRate}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center space-y-1">
            <Clock className="h-4 w-4 text-primary mx-auto" />
            <p className="text-lg font-bold">
              <AnimatedNumber value={savedHoursWeek} suffix="h" />
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">saved / week</p>
          </div>
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center space-y-1">
            <DollarSign className="h-4 w-4 text-primary mx-auto" />
            <p className="text-lg font-bold">
              <AnimatedNumber value={savedCostMonth} prefix="$" />
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">saved / month</p>
          </div>
          <div className="rounded-lg bg-accent/10 border border-accent/30 p-3 text-center space-y-1">
            <TrendingUp className="h-4 w-4 text-accent mx-auto" />
            <p className="text-lg font-bold text-accent">
              <AnimatedNumber value={savedCostYear} prefix="$" />
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">saved / year</p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Based on{' '}
          <span className="font-semibold text-foreground">{Math.round(AI_EFFICIENCY_RATE * 100)}%</span>{' '}
          average automation efficiency across our client deployments.
        </p>

        <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 group">
          <a href="#contact">
            Get my custom AI plan
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
