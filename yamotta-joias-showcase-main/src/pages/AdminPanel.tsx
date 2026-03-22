import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
  isAuthenticated,
  logout,
  formatPrice,
  type Produto,
} from "@/lib/api";

const emptyForm = { nome: "", descricao: "", preco: 0, quantidade: 0, imagemUrl: "" };

const AdminPanel = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin");
      return;
    }
    loadProdutos();
  }, [navigate]);

  const loadProdutos = async () => {
    setLoading(true);
    try {
      const data = await fetchProdutos();
      setProdutos(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId !== null) {
        await updateProduto(editingId, form);
      } else {
        await createProduto(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadProdutos();
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleEdit = (p: Produto) => {
    setEditingId(p.id);
    setForm({
      nome: p.nome,
      descricao: p.descricao || "",
      preco: p.preco,
      quantidade: p.quantidade || 0,
      imagemUrl: p.imagemUrl || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    await deleteProduto(id);
    await loadProdutos();
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl tracking-[0.15em] uppercase text-foreground font-light">
            Painel Yamotta
          </h1>
          <button
            onClick={handleLogout}
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-body hover:text-foreground transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Form */}
        <div className="bg-card border border-border p-6 md:p-8 mb-10">
          <h2 className="font-display text-xl font-light tracking-wide text-foreground mb-6">
            {editingId !== null ? "Editar Produto" : "Novo Produto"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 font-body">Nome</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
                className="w-full bg-secondary border border-border px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 font-body">Descrição</label>
              <textarea
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                rows={3}
                className="w-full bg-secondary border border-border px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 font-body">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: parseFloat(e.target.value) || 0 })}
                required
                className="w-full bg-secondary border border-border px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 font-body">Quantidade</label>
              <input
                type="number"
                value={form.quantidade}
                onChange={(e) => setForm({ ...form, quantidade: parseInt(e.target.value) || 0 })}
                className="w-full bg-secondary border border-border px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 font-body">URL da Imagem</label>
              <input
                type="url"
                value={form.imagemUrl}
                onChange={(e) => setForm({ ...form, imagemUrl: e.target.value })}
                className="w-full bg-secondary border border-border px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-foreground text-card px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-body font-medium hover:bg-primary transition-colors disabled:opacity-50"
              >
                {saving ? "Salvando..." : editingId !== null ? "Atualizar" : "Adicionar"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm(emptyForm); }}
                  className="px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-body text-muted-foreground hover:text-foreground transition-colors border border-border"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <h2 className="font-display text-xl font-light tracking-wide text-foreground mb-6">
          Produtos ({produtos.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : produtos.length === 0 ? (
          <p className="text-center text-muted-foreground font-body py-12">Nenhum produto cadastrado.</p>
        ) : (
          <div className="space-y-3">
            {produtos.map((p) => (
              <div key={p.id} className="bg-card border border-border p-4 flex items-center gap-4">
                {p.imagemUrl ? (
                  <img src={p.imagemUrl} alt={p.nome} className="w-14 h-14 object-cover bg-secondary flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg text-primary/30">Y</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base text-foreground truncate">{p.nome}</p>
                  <p className="text-sm text-muted-foreground font-body">{formatPrice(p.preco)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-xs tracking-[0.1em] uppercase text-muted-foreground font-body hover:text-foreground transition-colors px-3 py-1.5 border border-border"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs tracking-[0.1em] uppercase text-destructive font-body hover:bg-destructive hover:text-destructive-foreground transition-colors px-3 py-1.5 border border-border"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
