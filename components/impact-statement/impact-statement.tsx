import { Fraunces } from "next/font/google";
import Image from "next/image";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
});

const LEAF_ICON =
  "/vecteezy_cannabis-leaf-silhouette-illustration-vector-image_.jpg";

const leafPattern = [
  {
    animationClass: "impact-leaf-fall-1",
    left: "10%",
    duration: 14,
    delay: 0,
    imageClassName:
      "h-44 w-44 mix-blend-multiply sm:h-56 sm:w-56 lg:h-72 lg:w-72",
  },
  {
    animationClass: "impact-leaf-fall-2",
    left: "68%",
    duration: 18,
    delay: -6,
    imageClassName:
      "h-40 w-40 mix-blend-multiply sm:h-52 sm:w-52 lg:h-64 lg:w-64",
  },
  {
    animationClass: "impact-leaf-fall-3",
    left: "38%",
    duration: 22,
    delay: -12,
    imageClassName:
      "h-48 w-48 mix-blend-multiply sm:h-60 sm:w-60 lg:h-72 lg:w-72",
  },
] as const;

export function ImpactStatement() {
  return (
    <section
      aria-label="Nossos valores"
      className="relative overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        {leafPattern.map((leaf, index) => (
          <div
            key={index}
            className={`impact-leaf-fall ${leaf.animationClass}`}
            style={{
              left: leaf.left,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <Image
              src={LEAF_ICON}
              alt=""
              width={288}
              height={288}
              className={leaf.imageClassName}
            />
          </div>
        ))}
      </div>

      <div className="@container relative z-10 mx-auto w-full max-w-[100rem] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <p
          className={`${fraunces.className} w-full text-balance text-center font-semibold leading-[1.08] tracking-[-0.02em] text-foreground text-[clamp(1.875rem,5.8cqw,5.75rem)]`}
        >
          Medicinal, consciente
          <br />
          acolhedora &amp; transformadora.
        </p>
      </div>
    </section>
  );
}
