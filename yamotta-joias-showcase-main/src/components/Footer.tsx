const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-xl tracking-[0.15em] uppercase text-foreground/70 font-light">
          Yamotta Joias
        </p>
        <p className="mt-2 text-sm text-muted-foreground font-body">
          Prata 925 · Feito com amor · Entrega em todo Brasil
        </p>
        <div className="mt-6 w-12 h-px bg-primary/40 mx-auto" />
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Yamotta Joias. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
