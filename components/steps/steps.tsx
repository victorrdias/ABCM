"use client";

import { Leaf } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { associationSteps } from "@/lib/navigation";

const TOTAL_STEPS = associationSteps.length;
const STEP_DELAY_MS = 750;

function StepItem({
  label,
  index,
  activeStep,
  isLeaf,
}: {
  label: string;
  index: number;
  activeStep: number;
  isLeaf?: boolean;
}) {
  const stepNumber = index + 1;
  const isCompleted = stepNumber <= activeStep;
  const isCurrent = stepNumber === activeStep;

  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex min-w-[7.5rem] shrink-0 flex-col items-center gap-3 sm:min-w-[8.5rem] lg:min-w-0 lg:flex-1">
      <div
        className={`relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 ${
          isCurrent ? "animate-step-pulse-once" : ""
        }`}
      >
        <svg
          className="absolute inset-0 z-1 h-full w-full -rotate-90"
          viewBox="0 0 80 80"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={`stepGradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="var(--brand-blue)" />
              <stop offset="100%" stopColor="var(--brand-green)" />
            </linearGradient>
          </defs>
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--brand-green-light)"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={`url(#stepGradient-${index})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isCompleted ? 0 : circumference}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>

        <div className="relative z-10 flex h-[calc(100%-6px)] w-[calc(100%-6px)] items-center justify-center rounded-full bg-white">
          <span
            className={`inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border bg-brand-green-light sm:h-12 sm:w-12 transition-colors duration-500 ${
              isCompleted
                ? "border-brand-blue/40"
                : "border-brand-blue/20 opacity-60"
            } ${isCurrent && isLeaf ? "animate-leaf-emerge" : ""}`}
          >
            {isLeaf ? (
              <Leaf
                aria-hidden
                className={`h-6 w-6 sm:h-7 sm:w-7 ${
                  isCompleted ? "text-brand-blue" : "text-brand-blue/60"
                }`}
                strokeWidth={1.75}
              />
            ) : (
              <span
                className={`text-sm font-semibold sm:text-base ${
                  isCompleted ? "text-brand-blue" : "text-brand-blue/60"
                }`}
              >
                {stepNumber}
              </span>
            )}
          </span>
        </div>
      </div>

      <p
        className={`w-full px-1 text-center text-xs font-semibold leading-snug transition-colors duration-500 sm:text-sm ${
          isCompleted ? "text-brand-blue" : "text-brand-blue/50"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export function Steps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || activeStep >= TOTAL_STEPS) return;

    const delay = activeStep === 0 ? 400 : STEP_DELAY_MS;
    const timer = window.setTimeout(() => {
      setActiveStep((prev) => prev + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [hasStarted, activeStep]);

  const progress = (activeStep / TOTAL_STEPS) * 100;

  return (
    <section
      ref={sectionRef}
      className="border-y border-slate-200/80 bg-surface-muted"
    >
      <div className="mx-auto w-full max-w-[100rem] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Passo a Passo
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
            Confira abaixo o que é necessário para ter acesso aos produtos da
            associação.
          </p>
        </div>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-10 hidden h-1 overflow-hidden rounded-full bg-brand-blue/10 lg:block lg:top-12"
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-brand-blue via-brand-blue to-brand-green transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="overflow-x-auto pb-2 lg:overflow-visible">
            <div className="mx-auto flex w-max min-w-full items-start justify-center lg:w-full lg:justify-between">
              {associationSteps.map((step, index) => (
                <Fragment key={step.label}>
                  <StepItem
                    label={step.label}
                    index={index}
                    activeStep={activeStep}
                    isLeaf={"icon" in step && step.icon === "leaf"}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
