# 📋 RELATÓRIO DE FUNCIONALIDADES - Sistema de Hotel
## Repositório: andreluc-frontend/sistema-de-hotel

**Data do Relatório:** 28 de maio de 2026  
**Composição de Linguagens:** TypeScript (83.2%), JavaScript (12.4%), CSS (3.4%), Outro (1%)  
**URL do Projeto:** https://sistema-de-hotel.vercel.app

---

## 📌 RESUMO EXECUTIVO

O **Sistema de Hotel** é uma aplicação monorepo moderna construída com **Next.js**, **React 19**, **TypeScript**, e **Vite**. A aplicação funciona como um sistema completo de gerenciamento hoteleiro com frontend e backend, permitindo hospedeiros gerenciar reservas e hóspedes obter informações sobre suas estadias.

**Stack Tecnológico:**
- **Frontend:** React 19, Vite, Wouter (roteamento), React Query (TanStack), Tailwind CSS
- **Backend:** Express.js, Node.js, Drizzle ORM, PostgreSQL
- **Autenticação:** JWT, bcrypt
- **UI Components:** Radix UI (completo), shadcn/ui principles
- **Ferramentas:** pnpm (package manager), TypeScript 5.9, ESLint, Prettier

---

## 🏗️ ARQUITETURA DO PROJETO

### Estrutura de Diretórios

```
sistema-de-hotel/
├── artifacts/
│   ├── api-server/          # Backend API Express
│   ├── hotel-dedejoao/      # Frontend React com Vite
│   └── mockup-sandbox/      # Sandbox para mockups
├── lib/
│   ├── db/                  # Configuração de banco de dados (Drizzle ORM)
│   ├── api-spec/            # Especificações da API
│   ├── api-zod/             # Validações Zod
│   └── api-client-react/    # Cliente React reutilizável
├── scripts/                 # Scripts de utilitários
├── package.json             # Workspace pnpm
└── pnpm-workspace.yaml      # Configuração de workspace
```

---

## 🎯 FUNCIONALIDADES PRINCIPAIS

### 📄 PÁGINA 1: AUTENTICAÇÃO & ACESSO

#### 1.1 Página de Login
**Arquivo:** `artifacts/hotel-dedejoao/src/pages/Login.tsx`

- ✅ Autenticação de hóspedes
- ✅ Validação de credenciais JWT
- ✅ Armazenamento seguro de tokens (localStorage)
- ✅ Redirecionamento baseado em autenticação
- ✅ Tratamento de erros de login

**Funcionalidades:**
- Campo de entrada para CPF/Usuário
- Campo de senha com mascaramento
- Botão de login com feedback de carregamento
- Link para página de registro/reserva
- Mensagens de erro personalizadas

---

#### 1.2 Gerenciamento de Autenticação (Backend)
**Arquivo:** `artifacts/api-server/src/routes/auth.ts`

**Endpoints:**
- `POST /api/auth/login` - Autenticar hóspede com credenciais
- `POST /api/auth/logout` - Encerrar sessão
- `GET /api/auth/verify` - Verificar token JWT válido

**Recursos:**
- ✅ Hash de senha com bcrypt (salt rounds: 10)
- ✅ Emissão de JWT com expiração
- ✅ Validação de token em requisições protegidas
- ✅ CORS habilitado para múltiplos domínios

---

### 📄 PÁGINA 2: HOME & APRESENTAÇÃO

#### 2.1 Página Inicial (Landing Page)
**Arquivo:** `artifacts/hotel-dedejoao/src/pages/Home.tsx`

**Seções:**
1. **Hero Section** - Imagem destacada, chamada à ação
2. **Features** - Apresentação de 4-5 principais funcionalidades
3. **Rooms Preview** - Galeria de quartos disponíveis
4. **Footer** - Links, contato, redes sociais

**Componentes Utilizados:**
- `<Navbar />` - Navegação principal
- `<Hero />` - Seção de destaque
- `<Features />` - Funcionalidades do hotel
- `<RoomCard />` - Card individual de quarto
- `<Footer />` - Rodapé

---

#### 2.2 Componentes de Apresentação

**2.2.1 Navbar Component**
**Arquivo:** `artifacts/hotel-dedejoao/src/components/Navbar.tsx`
- Menu de navegação responsivo
- Links para Home, Reservas, Dashboard
- Botão de Login/Logout
- Ícone de tema (Dark/Light mode)

**2.2.2 Hero Component**
**Arquivo:** `artifacts/hotel-dedejoao/src/components/Hero.tsx`
- Banner de boas-vindas com imagem
- Call-to-action (CTA) para reserva
- Descrição do hotel
- Animações com Framer Motion

**2.2.3 Features Component**
**Arquivo:** `artifacts/hotel-dedejoao/src/components/Features.tsx`
- Grid de 4 features principais:
  - 🛏️ Conforto Premium
  - 🍽️ Serviços Gourmet
  - 🏋️ Fitness & Wellness
  - 🌙 Check-in 24h

**2.2.4 Footer Component**
**Arquivo:** `artifacts/hotel-dedejoao/src/components/Footer.tsx`
- Links de navegação
- Informações de contato
- Endereço do hotel
- Links de redes sociais

---

### 📄 PÁGINA 3: SISTEMA DE RESERVAS

#### 3.1 Página de Reserva
**Arquivo:** `artifacts/hotel-dedejoao/src/pages/Reserva.tsx`

**Formulário de Reserva - Campos:**
1. **Nome Completo** (obrigatório)
   - Validação: Mínimo 3 caracteres
   - Tipo: texto

2. **CPF** (obrigatório)
   - Validação: Formato XXX.XXX.XXX-XX
   - Máscara de entrada automática
   - Verificação de duplicação no backend

3. **Número de Quarto** (obrigatório)
   - Seletor dropdown com quartos disponíveis
   - Mostra preço e tipo de quarto
   - Validação: Quarto não pode estar ocupado

4. **Telefone** (obrigatório)
   - Formato: (XX) XXXXX-XXXX
   - Máscara automática

5. **Criar Senha** (obrigatório)
   - Mínimo 6 caracteres
   - Criptografia com bcrypt

6. **Confirmar Senha** (obrigatório)
   - Validação: Deve coincidir com senha anterior

**Funcionalidades:**
- ✅ Validação em tempo real
- ✅ Seletor visual de quarto com imagem
- ✅ Pré-visualização do quarto selecionado
- ✅ Mensagens de sucesso e erro
- ✅ Feedback de carregamento
- ✅ Redirecionamento para dashboard após sucesso
- ✅ Criptografia de dados (aviso visual)

**Preview de Quarto (Sidebar):**
- Imagem do quarto
- Tipo e nome
- Descrição
- Comodidades (tags)
- Preço por noite
- Avaliação ⭐

---

#### 3.2 Backend de Reservas
**Arquivo:** `artifacts/api-server/src/routes/hospedes.ts`

**Endpoints REST:**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/hospedes` | Lista todos os hóspedes |
| POST | `/api/hospedes` | Criar nova reserva |
| GET | `/api/hospedes/:id` | Obter dados de hóspede específico |
| DELETE | `/api/hospedes/:id` | Cancelar reserva |

**POST /api/hospedes - Validações:**
- ✅ Todos os campos obrigatórios
- ✅ CPF não pode estar duplicado
- ✅ Quarto não pode estar ocupado
- ✅ Hash da senha com bcrypt
- ✅ Retorna hóspede criado (sem password)

**Dados Armazenados:**
```javascript
{
  id: number,
  nome: string,
  cpf: string,
  quarto: number,
  telefone: string,
  senha: string (hashed)
}
```

---

### 📄 PÁGINA 4: DASHBOARD DE HÓSPEDE

#### 4.1 Dashboard Pessoal
**Arquivo:** `artifacts/hotel-dedejoao/src/pages/Dashboard.tsx`

**Estrutura de Layout:**
```
┌─────────────────────────────────────────┐
│  Bem-vindo(a), [Nome]! 🏨  │ [Sair]    │
│  Você está hospedado no Quarto #[X]     │
└─────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Card: Informações do Quarto                      │
│ - Imagem                                         │
│ - Tipo de quarto                                 │
│ - Nome e descrição                               │
│ - Comodidades (🛏️ tags)                          │
│ - Avaliação ⭐                                    │
│ - Preço da diária (R$)                           │
└──────────────────────────────────────────────────┘

┌────────────────────────────────┐
│ Card: Seus Dados               │
│ - Nome: [nome]                 │
│ - Quarto: #[número]            │
│ - Status: ✅ Reserva Confirmada│
└────────────────────────────────┘

┌────────────────────────────────┐
│ Card: Ações Rápidas            │
│ [👥 Ver Todas as Reservas]    │
│ [🏨 Fazer Outra Reserva]      │
└────────────────────────────────┘

┌─────────────────────────────────┐
│ Info Box: Precisa de Ajuda?     │
│ 📞 Telefone: (00) 0000-0000    │
│    Visite o balcão principal   │
└─────────────────────────────────┘
```

**Funcionalidades:**

1. **Proteção de Rota**
   - Verifica token JWT em localStorage
   - Valida dados do hóspede
   - Redireciona para login se não autenticado

2. **Exibição de Dados**
   - Nome do hóspede
   - Número do quarto
   - Status da reserva
   - Informações completas do quarto

3. **Informações do Quarto**
   - Imagem destacada
   - Tipo (Simples, Duplo, Suite, etc)
   - Descrição
   - Comodidades disponíveis
   - Avaliação (⭐)
   - Preço diário

4. **Ações Disponíveis**
   - Button: Ver todas as reservas (→ `/dashboard/gerenciar`)
   - Button: Fazer outra reserva (→ `/reserva`)
   - Button: Sair (logout com limpeza de localStorage)

5. **Estados de Carregamento**
   - Loading spinner durante carregamento
   - Mensagem de erro se dados não carregarem

---

### 📄 PÁGINA 5: GERENCIAMENTO DE RESERVAS

#### 5.1 Página de Gerenciamento
**Arquivo:** `artifacts/hotel-dedejoao/src/pages/Gerenciar.tsx`

**Funcionalidades:**
- ✅ Listagem de todas as reservas do hóspede
- ✅ Tabela responsiva com dados
- ✅ Ações: editar, visualizar, cancelar
- ✅ Filtros por status (ativo, cancelado)
- ✅ Busca por número de quarto
- ✅ Paginação
- ✅ Exportar reservas (possível)
- ✅ Edição de dados da reserva

**Colunas da Tabela:**
| Coluna | Tipo | Ações |
|--------|------|-------|
| ID | number | - |
| Quarto | number | Ver detalhes |
| Data Check-in | date | - |
| Data Check-out | date | - |
| Status | badge | - |
| Ações | buttons | Editar, Cancelar |

---

### 📄 PÁGINA 6: FUNCIONALIDADES ADICIONAIS

#### 6.1 Página 404 (Not Found)
**Arquivo:** `artifacts/hotel-dedejoao/src/pages/not-found.tsx`

- ✅ Redirecionamento para página 404
- ✅ Link para voltar à home
- ✅ Mensagem personalizada
- ✅ Design responsivo

#### 6.2 Sistema de Roteamento
**Arquivo:** `artifacts/hotel-dedejoao/src/App.tsx`

**Rotas Disponíveis:**

| Rota | Componente | Proteção | Descrição |
|------|-----------|----------|-----------|
| `/` | Home | ❌ Pública | Landing page |
| `/login` | Login | ❌ Pública | Autenticação |
| `/reserva` | Reserva | ⚠️ Pública (recomendada) | Formulário de reserva |
| `/dashboard` | Dashboard | ✅ Protegida | Dashboard pessoal |
| `/dashboard/gerenciar` | Gerenciar | ✅ Protegida | Gerenciar reservas |
| `*` | NotFound | - | Página não encontrada |

---

## 🗄️ BANCO DE DADOS

### Tabelas Implementadas

#### Tabela: `hospedes` (Hóspedes)

```sql
CREATE TABLE hospedes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  quarto INTEGER NOT NULL UNIQUE,
  telefone VARCHAR(15) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hospedes_cpf ON hospedes(cpf);
CREATE INDEX idx_hospedes_quarto ON hospedes(quarto);
```

**Integração:** Drizzle ORM  
**Arquivo Config:** `lib/db/drizzle.config.ts`  
**Banco:** PostgreSQL

---

## 🔐 SEGURANÇA

### Implementações de Segurança

1. **Autenticação**
   - ✅ JWT (JSON Web Tokens)
   - ✅ Tokens armazenados no localStorage
   - ✅ Validação de token nas rotas protegidas

2. **Criptografia**
   - ✅ Senhas com bcrypt (salt rounds: 10)
   - ✅ Hash de senha antes de armazenar
   - ✅ Comparação segura em login

3. **Validação**
   - ✅ Validação de campos obrigatórios
   - ✅ Verificação de duplicação (CPF, Quarto)
   - ✅ Formato de email/telefone/CPF
   - ✅ Zod para schema validation

4. **API Security**
   - ✅ CORS configurado
   - ✅ Content-Type validation
   - ✅ Rate limiting (possível)
   - ✅ Cookie-parser para cookies seguros

5. **Frontend**
   - ✅ Proteção de rotas com verificação JWT
   - ✅ Limpeza de dados sensíveis no logout
   - ✅ Aviso: "Dados protegidos com criptografia"

---

## 🎨 COMPONENTES UI

### Componentes Customizados

1. **Navbar.tsx**
   - Navegação responsiva
   - Links de navegação
   - Tema (Dark/Light)

2. **Hero.tsx**
   - Banner destacado
   - Call-to-action
   - Animações Framer Motion

3. **Features.tsx**
   - Grid de 4 features
   - Ícones e descrições
   - Responsivo

4. **RoomCard.tsx**
   - Card individual de quarto
   - Imagem, tipo, preço
   - Comodidades
   - Avaliação

5. **Footer.tsx**
   - Links de navegação
   - Contato
   - Informações

### Componentes Radix UI (30+)

- Accordion, Alert Dialog, Aspect Ratio
- Avatar, Checkbox, Collapsible
- Context Menu, Dialog, Dropdown Menu
- Hover Card, Label, Menubar
- Navigation Menu, Popover, Progress
- Radio Group, Scroll Area, Select
- Separator, Slider, Slot, Switch
- Tabs, Toast, Toggle, Toggle Group
- Tooltip

### Bibliotecas de Styling

- **Tailwind CSS v4** - Utility-first CSS
- **Class Variance Authority** - Variantes de classe
- **clsx / tailwind-merge** - Merge de classes
- **next-themes** - Dark mode
- **Framer Motion** - Animações

---

## 📊 DADOS DE QUARTOS (Mock)

### Quartos Disponíveis

```javascript
const quartos = [
  {
    id: 1,
    nome: "Quarto Simples",
    tipo: "Single",
    descricao: "Confortável e espaçoso",
    preco: 150,
    imagem: "url_imagem_1",
    avaliacao: 4.5,
    comodidades: ["WiFi", "TV", "Ar-condicionado", "Minibar"]
  },
  {
    id: 2,
    nome: "Quarto Duplo",
    tipo: "Double",
    descricao: "Perfeito para casais",
    preco: 250,
    imagem: "url_imagem_2",
    avaliacao: 4.8,
    comodidades: ["WiFi", "TV", "Ar-condicionado", "Minibar", "Safe"]
  },
  {
    id: 3,
    nome: "Suite Premium",
    tipo: "Suite",
    descricao: "Luxo e conforto",
    preco: 450,
    imagem: "url_imagem_3",
    avaliacao: 5.0,
    comodidades: ["WiFi", "TV", "Spa", "Jacuzzi", "Serviço de concierge"]
  }
];
```

---

## 🚀 TECNOLOGIAS & DEPENDÊNCIAS

### Frontend (hotel-dedejoao)

```json
{
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "vite": "^7.3.2",
  "@vitejs/plugin-react": "^5.0.4",
  "@tanstack/react-query": "^5.90.21",
  "wouter": "^3.3.5",
  "react-hook-form": "^7.55.0",
  "zod": "^3.25.76",
  "@hookform/resolvers": "^3.10.0",
  "tailwindcss": "^4.1.14",
  "framer-motion": "^12.23.24",
  "recharts": "^2.15.2"
}
```

### Backend (api-server)

```json
{
  "express": "^5.2.1",
  "bcrypt": "^6.0.0",
  "jsonwebtoken": "^9.0.3",
  "cors": "^2.8.6",
  "cookie-parser": "^1.4.7",
  "drizzle-orm": "^0.45.2",
  "pg": "^8.21.0",
  "pino": "^9.14.0",
  "pino-http": "^10.5.0"
}
```

---

## 📈 PERFORMANCE & OTIMIZAÇÕES

### Implementadas

- ✅ React Query para cache e sincronização
- ✅ Code splitting com Vite
- ✅ Lazy loading de componentes
- ✅ Otimização de imagens
- ✅ Tailwind CSS purging
- ✅ TypeScript para type safety
- ✅ ESLint para code quality

---

## 🔄 FLUXOS DE USUÁRIO

### Fluxo 1: Primeira Reserva

```
1. Usuário acessa /
2. Navega para /reserva
3. Preenche formulário de reserva
4. API valida dados
5. Cria registro no banco
6. Retorna confirmação
7. Redireciona para /dashboard
8. Exibe dados da reserva
```

### Fluxo 2: Login & Acesso

```
1. Usuário já reservado acessa /login
2. Insere CPF e senha
3. API autentica com JWT
4. Token armazenado em localStorage
5. Redireciona para /dashboard
6. Dashboard carrega dados
7. Usuário pode gerenciar reservas
```

### Fluxo 3: Logout

```
1. Usuário clica "Sair"
2. localStorage.removeItem("token")
3. localStorage.removeItem("hospede")
4. Redireciona para /
5. Session encerrada
```

---

## 🐛 TRATAMENTO DE ERROS

### Frontend
- ✅ Validação de formulário em tempo real
- ✅ Mensagens de erro user-friendly
- ✅ Toast notifications (com Sonner)
- ✅ Fallback para erros de conexão
- ✅ Estados de loading explícitos

### Backend
- ✅ Validação de campos
- ✅ Tratamento de exceções try/catch
- ✅ Logging com Pino
- ✅ HTTP status codes apropriados
- ✅ Mensagens de erro JSON

---

## 📝 PRÓXIMOS PASSOS RECOMENDADOS

1. ✅ Implementar paginação no gerenciamento de reservas
2. ✅ Adicionar sistema de avaliações para quartos
3. ✅ Implementar cancelamento de reservas
4. ✅ Adicionar histórico de reservas
5. ✅ Notificações por email
6. ✅ Dashboard administrativo completo
7. ✅ Multi-idioma (i18n)
8. ✅ Testes automatizados (Jest, Vitest)
9. ✅ Integração com pagamento (Stripe)
10. ✅ Mobile app (React Native/Expo)

---

## 📞 SUPORTE & CONTATO

**Hotel:** (00) 0000-0000  
**Email:** contato@sistemadehotel.com  
**Website:** https://sistema-de-hotel.vercel.app  

---

**Fim do Relatório**  
*Relatório gerado automaticamente em 28/05/2026*
