import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import type { Produto } from "@/lib/api";
import { fetchProdutos } from "@/lib/api";

const Index = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProdutos()
      .then(setProdutos)
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-card">
      <Header />

      {/* Hero */}
      <section className="relative py-24 md:py-36 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-light/50 to-transparent" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-wide animate-fade-up">
            Prata que conta histórias
          </h1>
          <p className="mt-6 font-body text-sm md:text-base tracking-[0.15em] uppercase text-muted-foreground animate-fade-up" style={{ animationDelay: "200ms" }}>
            Prata 925 · Feito com amor · Entrega em todo Brasil
          </p>
          <div className="mt-8 w-16 h-px bg-primary mx-auto animate-fade-in" style={{ animationDelay: "500ms" }} />
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex-1">
        <h2 className="font-display text-2xl md:text-3xl text-center font-light tracking-[0.1em] uppercase text-foreground mb-12">
          Nossa Coleção
        </h2>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center text-muted-foreground py-12 font-body">{error}</p>
        )}

        {!loading && !error && produtos.length === 0 && (
          <p className="text-center text-muted-foreground py-12 font-body">
            Nenhum produto disponível no momento.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {produtos.map((produto, i) => (
            <ProductCard key={produto.id} produto={produto} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
