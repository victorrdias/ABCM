import clsx from "clsx";
import { ChevronRight, Leaf, PawPrint, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { actionCards } from "@/lib/navigation";

const iconMap = {
  leaf: Leaf,
  paw: PawPrint,
  user: User,
  stethoscope: Stethoscope,
} as const;

export function ActionCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {actionCards.map((card) => {
        const Icon = iconMap[card.icon];

        return (
          <Link
            key={card.label}
            href={card.href}
            className={clsx(
              "group flex items-center gap-4 rounded-2xl bg-surface-card px-5 py-5 transition-all",
              "hover:bg-brand-green-light hover:shadow-sm",
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-blue">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="flex-1 text-sm font-semibold text-brand-blue sm:text-base">
              {card.label}
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-brand-blue/60 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-blue" />
          </Link>
        );
      })}
    </div>
  );
}
