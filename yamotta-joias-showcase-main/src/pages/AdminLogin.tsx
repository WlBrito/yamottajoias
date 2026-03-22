import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(usuario, senha);
      navigate("/painel");
    } catch {
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-sm animate-fade-up">
        <h1 className="font-display text-3xl text-center font-light tracking-[0.15em] uppercase text-foreground mb-2">
          Yamotta Joias
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-10 font-body">
          Acesso administrativo
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 font-body">
              Usuário
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full bg-card border border-border px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 font-body">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full bg-card border border-border px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center font-body">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-card py-3 text-xs tracking-[0.15em] uppercase font-body font-medium transition-all hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
