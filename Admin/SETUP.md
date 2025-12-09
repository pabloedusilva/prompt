# 🎯 Admin Dashboard - Régua Máxima

Dashboard administrativo completo para gerenciar toda a plataforma Régua Máxima.

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação & Segurança
- Login com email/senha
- Sistema de permissões por role (Super Admin, Admin, Support)
- Guards de rotas protegidas
- Auditoria de ações
- Histórico de logins
- Bloqueio de IPs

### 📊 Dashboard Overview
- Métricas principais (Barbearias, Barbeiros, Clientes, Receita)
- Gráficos de receita
- Atividades recentes
- Últimas barbearias cadastradas

### 🏪 Gestão de Barbearias
- Lista com filtros (nome, status, plano)
- Aprovação de cadastros
- Edição de dados
- Bloqueio/desbloqueio

### ✂️ Gestão de Barbeiros
- Lista com filtros
- Aprovação de profissionais
- Visualização de especialidades
- Ativação/desativação

### 👥 Gestão de Clientes
- Lista completa de clientes
- Exportação CSV
- Histórico de agendamentos
- Detalhes do cliente

### 📅 Gestão de Agendamentos
- Visualização de todos os agendamentos
- Filtros por data, status, barbearia
- Edição e cancelamento
- Status badges coloridos

### 💰 Billing & Cobranças
- Receita total e por período
- Transações recentes
- Inadimplentes
- Gráfico de receita mensal

### 📦 Gestão de Planos
- Planos disponíveis (Básico, Profissional, Premium, Enterprise)
- Edição de recursos
- Criação de novos planos
- Total de assinaturas por plano

### 🎁 Promoções & Cupons
- Criação de promoções
- Códigos de desconto
- Controle de validade e usos
- Duplicação de promoções

### 📢 Notificações
- Envio de notificações (Email, Push, SMS)
- Histórico de envios
- Taxa de abertura
- Templates

### 📈 Relatórios
- Relatórios de receita
- Relatórios de agendamentos
- Relatórios de clientes
- Exportação PDF/Excel

### ⚙️ Configurações
- Configurações gerais da plataforma
- Usuários administradores
- Integrações (Email, SMS, Push, Analytics)

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router v6** - Roteamento
- **React Query** - Estado e cache
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos
- **Axios** - HTTP client
- **Vite** - Build tool

## 📁 Estrutura do Projeto

```
admin/
├── src/
│   ├── app/                    # Core da aplicação
│   │   ├── App.tsx            # Root component
│   │   ├── layout/            # Layouts (Auth, Dashboard, Admin)
│   │   ├── providers/         # Context providers
│   │   ├── routes/            # Configuração de rotas
│   │   └── guards/            # Route guards
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/               # Componentes base (Button, Card, Table, etc)
│   │   ├── charts/           # Gráficos (Line, Bar, Pie, Area)
│   │   ├── feedback/         # Toast, Spinner, EmptyState
│   │   ├── filters/          # Filtros reutilizáveis
│   │   └── dialogs/          # Modais de confirmação
│   ├── features/             # Módulos por feature
│   │   ├── overview/         # Dashboard principal
│   │   ├── barbershops/      # Gestão de barbearias
│   │   ├── barbers/          # Gestão de barbeiros
│   │   ├── clients/          # Gestão de clientes
│   │   ├── bookings/         # Gestão de agendamentos
│   │   ├── billing/          # Cobranças
│   │   ├── plans/            # Planos
│   │   ├── promotions/       # Promoções
│   │   ├── notifications/    # Notificações
│   │   ├── reports/          # Relatórios
│   │   ├── security/         # Segurança
│   │   └── settings/         # Configurações
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilitários (http, query, storage)
│   ├── services/             # API clients
│   ├── types/                # TypeScript types
│   ├── utils/                # Helpers (format, validators, constants)
│   └── styles/               # CSS global e temas
├── public/                    # Assets estáticos
└── index.html                # HTML entry point
```

## 🚀 Como Usar

### Instalação

```bash
cd admin
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O servidor irá iniciar em `http://localhost:5174`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🔑 Credenciais de Teste

**Email:** qualquer email válido  
**Senha:** qualquer senha

_(Mock de autenticação - será substituído por API real)_

## 👥 Roles e Permissões

### Super Admin
- Acesso total a todas as funcionalidades
- Permissão: `*` (wildcard)

### Admin
- Gestão de barbearias, barbeiros, clientes
- Visualização de cobranças e relatórios
- Envio de notificações
- Configurações da plataforma

### Support
- Apenas visualização de dados
- Sem permissões de edição ou exclusão

## 🎨 Design System

### Cores
- **Gold:** `#d4af37` - Accent color
- **Background:** `#0a0a0a` - Fundo escuro
- **Surface:** `#141414` - Componentes
- **Border:** `#1f1f1f` - Bordas
- **Text:** `#e5e5e5` - Texto principal
- **Text Dim:** `#a3a3a3` - Texto secundário

### Componentes UI

- **Button:** Variantes primary, outline, danger, ghost
- **Card:** Container com padding e hover effects
- **Table:** Tabela responsiva com ordenação
- **Modal:** Overlay com animações
- **Input/Select:** Formulários com validação
- **Toast:** Notificações temporárias
- **Charts:** Gráficos interativos

## 📝 Próximos Passos

### Integração Backend
- [ ] Implementar chamadas reais de API
- [ ] Substituir dados mockados
- [ ] Autenticação JWT
- [ ] Upload de imagens
- [ ] WebSocket para notificações em tempo real

### Melhorias
- [ ] Testes unitários
- [ ] Testes E2E
- [ ] Internacionalização (i18n)
- [ ] PWA
- [ ] Dark/Light theme toggle
- [ ] Export de relatórios em PDF
- [ ] Busca global

## 📄 Licença

Propriedade de Régua Máxima © 2025

---

**Desenvolvido com ❤️ para Régua Máxima**
