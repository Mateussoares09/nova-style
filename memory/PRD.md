# PRD — NOVA STYLE

## Problem Statement (original)
Criar uma loja online moderna e profissional (React) para a marca fictícia NOVA STYLE: e-commerce premium de moda com hero, navegação (Home, Produtos, Categorias, Sobre, Contacto), lista de produtos com filtro por categorias, página de produto, carrinho, favoritos, compra via WhatsApp, checkout visual e formulário de contacto. Estilo luxury minimalista (preto/branco/cinza/prata, detalhe dourado), preços em Euro, número WhatsApp fictício (+244 923 000 000), backend completo. Projeto de portfólio profissional.

## Arquitetura
- Backend: FastAPI + MongoDB (motor). Produtos seed automático no startup (9 produtos, 5 categorias).
- Frontend: React 19 + framer-motion + lenis (smooth scroll) + react-fast-marquee + sonner + Tailwind.
- Carrinho/Favoritos: React Context + localStorage (persistente).
- Fontes: Cormorant Garamond (display) + Manrope (body).

## API (/api)
- GET /products (?category, ?featured), GET /products/{id}, GET /categories
- POST /orders, POST /contact, POST /newsletter

## Implementado (Jun 2026)
- Hero cinético com reveal mascarado linha a linha + parallax no scroll
- Marquee editorial, secção destaques, bento grid de categorias, manifesto numerado (dark + grain), reviews, newsletter (footer)
- Página Produtos com filtros por categoria (query param ?categoria=)
- Página detalhe: seletor de tamanhos, add-to-cart, favoritos, botão WhatsApp
- Cart drawer animado (qty +/-, remover, total, checkout, WhatsApp)
- Página Favoritos, Checkout visual (form → POST /orders → ecrã sucesso), Contacto (form + WhatsApp), Sobre (história + manifesto)
- Tudo verificado via curl + screenshots

## Backlog
- P1: Pesquisa de produtos; múltiplas imagens por produto
- P2: Admin de produtos; autenticação; pagamentos reais (Stripe); histórico de encomendas
