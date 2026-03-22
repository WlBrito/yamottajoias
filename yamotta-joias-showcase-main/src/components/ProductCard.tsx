import type { Produto } from "@/lib/api";
import { formatPrice, whatsappLink } from "@/lib/api";

interface ProductCardProps {
  produto: Produto;
  index: number;
}

const ProductCard = ({ produto, index }: ProductCardProps) => {
  return (
    <div
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
        {produto.imagemUrl ? (
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl text-primary/30">Y</span>
          </div>
        )}
        {produto.categoria && (
          <span className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-xs tracking-[0.1em] uppercase px-3 py-1 text-foreground/70 font-body">
            {produto.categoria}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-medium text-foreground tracking-wide">
        {produto.nome}
      </h3>
      <p className="mt-1 text-foreground/60 font-body text-sm">
        {formatPrice(produto.preco)}
      </p>
      <a
        href={whatsappLink(produto.nome)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs tracking-[0.1em] uppercase font-body font-medium transition-all duration-300 hover:bg-foreground hover:text-card"
      >
        Comprar via WhatsApp
      </a>
    </div>
  );
};

export default ProductCard;
