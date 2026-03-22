# Yamotta Joias 💍

Loja virtual de joias em Prata 925, desenvolvida com ASP.NET Core no backend e React no frontend. Projeto real da marca **Yamotta Joias**, construído também como portfólio técnico demonstrando uma arquitetura full-stack moderna.

---

## Sobre o Projeto

A Yamotta Joias é uma loja especializada em joias de Prata 925. Este sistema permite que clientes visualizem a vitrine de produtos e entrem em contato via WhatsApp para compra. O painel administrativo permite gerenciar o catálogo completo de produtos com autenticação segura.

---

## Funcionalidades

**Vitrine Pública**
- Listagem de produtos com foto, nome e preço
- Botão de compra via WhatsApp com mensagem pré-preenchida
- Design elegante e responsivo

**Painel Administrativo** *(rota protegida)*
- Autenticação via JWT
- Cadastro, edição e exclusão de produtos
- Acesso exclusivo pelo administrador

---

## Tecnologias

**Backend**
- C# com ASP.NET Core 8
- Entity Framework Core
- SQLite
- JWT Bearer Authentication
- Data Annotations para validação

**Frontend**
- React
- React Router DOM
- Lovable (geração e design)
- Fetch API

---

## Arquitetura

```
LojaPratasNew/
├── Backend/
│   └── LojaPratas.Api/
│       ├── Controllers/    ← ProdutosController, AuthController
│       ├── Models/         ← Produto, LoginRequest
│       ├── Data/           ← AppDbContext
│       └── Migrations/     ← histórico do banco
└── Frontend/
    └── yamotta-joias/
        └── src/
            ├── pages/      ← Vitrine, Login, Painel
            ├── components/ ← Header, Footer, ProductCard
            └── lib/        ← api.ts (integração com a API)
```

---

## Como Rodar

**Pré-requisitos:** .NET 8 SDK, Node.js

**Backend**
```bash
cd Backend/LojaPratas.Api
dotnet ef database update
dotnet run
# API disponível em http://localhost:5259
```

**Frontend**
```bash
cd Frontend/yamotta-joias
npm install
npm run dev
# Site disponível em http://localhost:8080
```

**Credenciais do painel admin**
```
Rota:   /admin
Usuário: admin
Senha:   admin123
```

---

## API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /api/Produtos | Lista produtos | Público |
| POST | /api/Produtos | Cadastra produto | JWT |
| PUT | /api/Produtos/{id} | Atualiza produto | JWT |
| DELETE | /api/Produtos/{id} | Remove produto | JWT |
| POST | /api/auth/login | Gera token JWT | Público |

---

## Aprendizados

Este projeto foi construído do zero com foco em entender cada camada da aplicação — desde o runtime do .NET, injeção de dependência, Migrations do EF Core, até autenticação JWT e integração frontend/backend.

---

Desenvolvido por **Whendell** · [LinkedIn](https://www.linkedin.com/in/wlbrito/)
