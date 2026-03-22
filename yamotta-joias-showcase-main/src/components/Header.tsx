const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-center">
        <a href="/" className="font-display text-2xl md:text-3xl tracking-[0.2em] uppercase text-foreground font-light">
          Yamotta Joias
        </a>
      </div>
    </header>
  );
};

export default Header;
