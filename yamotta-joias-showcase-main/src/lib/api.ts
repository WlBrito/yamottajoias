const API_BASE = "http://localhost:5259/api";

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade?: number;
  imagemUrl?: string;
  categoria?: string;
}

function getToken(): string | null {
  return localStorage.getItem("yamotta_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchProdutos(): Promise<Produto[]> {
  const res = await fetch(`${API_BASE}/Produtos`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function login(usuario: string, senha: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha }),
  });
  if (!res.ok) throw new Error("Credenciais inválidas");
  const data = await res.json();
  const token = data.token || data.accessToken || data;
  localStorage.setItem("yamotta_token", typeof token === "string" ? token : JSON.stringify(token));
  return token;
}

export async function createProduto(produto: Omit<Produto, "id">): Promise<Produto> {
  const res = await fetch(`${API_BASE}/Produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

export async function updateProduto(id: number, produto: Partial<Produto>): Promise<Produto> {
  const res = await fetch(`${API_BASE}/Produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ ...produto, id }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

export async function deleteProduto(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Produtos/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Erro ao deletar produto");
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function whatsappLink(productName: string): string {
  const msg = encodeURIComponent(`Olá! Tenho interesse em: ${productName}`);
  return `https://wa.me/553298504709?text=${msg}`;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout(): void {
  localStorage.removeItem("yamotta_token");
}
