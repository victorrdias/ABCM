import Image from "next/image";
import type { Product } from "@/lib/products/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-brand-blue/20 hover:shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-surface-muted">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-blue backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-brand-blue">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
          {product.shortDescription}
        </p>

        {product.tags && product.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-brand-green-light px-3 py-1 text-xs font-medium text-brand-blue"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
