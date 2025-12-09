# Admin Dashboard Frontend

Este documento define a estrutura completa e bem organizada do Frontend da Dashboard do Administrador da plataforma Régua Máxima. Escopo exclusivamente frontend; integrações com backend serão adicionadas futuramente.

## Objetivos
- Gerenciar barbearias, barbeiros, clientes e agendamentos em toda a plataforma
- Acompanhar métricas e faturamento em tempo real
- Controlar planos, cobranças, promoções e cupons
- Configurar identidade da plataforma, políticas e integrações (email, push, SMS)
- Garantir segurança, auditoria e relatórios avançados

## Princípios de Arquitetura
- Modularidade por domínio (features-first)
- Rotas aninhadas com layouts específicos (AppLayout, AuthLayout)
- Camadas claras: UI (components) → Pages → Features → Services (API) → State
- Tipagem forte (TypeScript) e isolamento de contratos (types)
- Hooks reutilizáveis para dados, filtros, paginação e permissões
- Providers para autenticação, tema, query cache (React Query), toasts/feedback
- Design system consistente: botões, tabelas, modais, inputs, selects e toasts
- Acessibilidade (ARIA), responsividade e desempenho

## Estrutura de Pastas (sugerida)
```
admin/
  src/
    app/
      App.tsx
      index.tsx
      layout/
        AuthLayout.tsx
        AdminLayout.tsx
        DashboardLayout.tsx
      providers/
        AuthProvider.tsx
        PermissionsProvider.tsx
        QueryProvider.tsx
        ThemeProvider.tsx
        ToastProvider.tsx
      routes/
        index.tsx
        guards/
          AdminGuard.tsx
          PermissionGuard.tsx
        groups/
          ManagementRoutes.tsx
          FinanceRoutes.tsx
          ReportsRoutes.tsx
    components/
      ui/
        Button.tsx
        Card.tsx
        Table.tsx
        Tabs.tsx
        Modal.tsx
        Form.tsx
        Input.tsx
        Select.tsx
        Switch.tsx
        Avatar.tsx
      charts/
        LineChart.tsx
        BarChart.tsx
        PieChart.tsx
        AreaChart.tsx
      feedback/
        Toast.tsx
        Spinner.tsx
        EmptyState.tsx
      filters/
        DateRangeFilter.tsx
        StatusFilter.tsx
        EntityFilter.tsx
      dialogs/
        ConfirmDialog.tsx
        PasswordPromptDialog.tsx
    features/
      overview/
        pages/
          DashboardHome.tsx
        components/
          MetricsGrid.tsx
          AlertsPanel.tsx
          Highlights.tsx
      barbershops/
        pages/
          ListBarbershops.tsx
          CreateBarbershop.tsx
          EditBarbershop.tsx
          BarbershopDetails.tsx
        components/
          BarbershopForm.tsx
          BarbershopCard.tsx
          ActivityTimeline.tsx
        services/
          barbershops.api.ts
      barbers/
        pages/
          ListBarbers.tsx
          CreateBarber.tsx
          EditBarber.tsx
          BarberDetails.tsx
        components/
          BarberForm.tsx
          LinkBarberToShopModal.tsx
        services/
          barbers.api.ts
      clients/
        pages/
          ListClients.tsx
          ClientDetails.tsx
        components/
          ClientFilters.tsx
        services/
          clients.api.ts
      bookings/
        pages/
          ListBookings.tsx
          BookingDetails.tsx
        components/
          BookingFilters.tsx
        services/
          bookings.api.ts
      billing/
        pages/
          FinanceOverview.tsx
          FinanceByBarbershop.tsx
          MonthlyReports.tsx
        components/
          RevenueTable.tsx
          CommissionBreakdown.tsx
        services/
          billing.api.ts
      plans/
        pages/
          PlansManager.tsx
          SubscriptionsManager.tsx
        components/
          PlanForm.tsx
          SubscriptionTable.tsx
        services/
          plans.api.ts
      promotions/
        pages/
          PromotionsManager.tsx
          CouponsManager.tsx
        components/
          CouponForm.tsx
        services/
          promotions.api.ts
      settings/
        pages/
          PlatformSettings.tsx
          TermsPrivacy.tsx
        components/
          BrandForm.tsx
          ThemeConfig.tsx
        services/
          settings.api.ts
      notifications/
        pages/
          NotificationsCenter.tsx
        components/
          NotificationForm.tsx
          BroadcastModal.tsx
        services/
          notifications.api.ts
      reports/
        pages/
          AdvancedReports.tsx
        components/
          ReportFilters.tsx
          ExportButtons.tsx
        services/
          reports.api.ts
      security/
        pages/
          SecurityCenter.tsx
        components/
          AuditLogsTable.tsx
          LoginHistory.tsx
        services/
          security.api.ts
    hooks/
      useDebounce.ts
      usePagination.ts
      useToggle.ts
      usePermissions.ts
      useFilters.ts
    lib/
      http.ts
      query.ts
      storage.ts
      analytics.ts
      security.ts
    services/
      apiClient.ts
    styles/
      index.css
      themes/
    types/
      barbershop.ts
      barber.ts
      client.ts
      booking.ts
      billing.ts
      plan.ts
      coupon.ts
      notification.ts
      report.ts
      security.ts
    utils/
      format.ts
      validators.ts
      constants.ts
      date.ts
```

## Navegação e Rotas
- `AdminLayout` com topbar, sidebar, avatar e menu de logout
- Grupos de rotas por domínio: Overview, Gestão, Financeiro, Relatórios, Segurança, Configurações
- Guards: `AdminGuard` (autenticado + perfil admin), `PermissionGuard` (escopos por módulo)

## Módulos e Funcionalidades

### Overview (Dashboard Home)
- Métricas em tempo real:
  - Total de barbearias cadastradas
  - Total de barbeiros ativos
  - Total de clientes
  - Total de agendamentos do dia / mês
  - Faturamento total da plataforma
  - Faturamento por barbearia
  - Agendamentos concluídos / cancelados / faltas
- Gráficos: Agendamentos por dia, Faturamento mensal, Crescimento de usuários
- Alertas do sistema: erros, pagamentos falhos, assinaturas vencendo

### Barbearias
- Cadastrar / editar / excluir barbearias
- Aprovar novas barbearias
- Dados completos: Nome, CNPJ/CPF, Endereço, Horário de funcionamento, Fotos
- Ativar / desativar barbearia
- Histórico de atividades da barbearia
- Resetar senha da barbearia:
  - Sem formulário. Botão "Resetar senha" abre modal `PasswordPromptDialog`
  - Modal pede "Senha do Administrador"
  - Sucesso: define senha padrão para a barbearia (ex.: `Barber@123`); exibe toast

### Barbeiros
- Cadastrar barbeiros manualmente
- Aprovar barbeiros cadastrados pelas barbearias
- Vincular barbeiro à barbearia
- Definir serviços que ele pode oferecer
- Ativar / bloquear barbeiros
- Histórico de atendimentos

### Clientes
- Lista completa de clientes
- Dados pessoais
- Histórico de agendamentos, faltas e cancelamentos
- Exportar base de clientes (LGPD): CSV/Excel com consentimento

### Agendamentos
- Ver todos os agendamentos da plataforma
- Filtros por data, barbearia, barbeiro, cliente, status
- Alterar agendamentos manualmente; cancelar; reagendar; marcar falta
- Histórico completo + logs de edição (quem alterou e quando)

### Financeiro
- Faturamento total do sistema e por barbearia
- Comissão da plataforma por agendamento
- Planos ativos
- Boletos, PIX, cartões
- Pagamentos em atraso
- Repasse para barbearias (se houver)
- Relatórios financeiros mensais
- Exportar relatórios (PDF/Excel)
- Controle de taxas de pagamento

### Planos e Assinaturas
- Criar planos: Básico / Pro / Premium
- Definir preço, limites (barbeiros, agendamentos, unidades), período de cobrança (mensal/anual)
- Ativar / desativar planos
- Gerenciar assinaturas ativas
- Upgrade/downgrade manual
- Bloqueio automático por inadimplência
- Mostrar tempo restante da assinatura; identificar plano (1 mês / 3 meses)

### Promoções e Cupons
- Criar cupons de desconto (limite de uso, validade)
- Promoções por barbearia e globais
- Relatório de cupons usados

### Configurações da Plataforma
- Nome da plataforma, logo, domínio
- Cores (tema), termos de uso, política de privacidade
- Integração com notificações (email, push, SMS)

### Relatórios Avançados
- Por barbeiro, barbearia, período, serviço
- Taxa de comparecimento, ticket médio
- Clientes novos x recorrentes
- Agendamentos por horário de pico
- Logs de todas as ações
- Backup automático
- Histórico de login
- Bloqueio por IP
- Controle de permissões por módulo
- Financeiro separado por empresa
- Relatórios exportáveis
- Logs de segurança

## Padrões de UI e Fluxos
- Tabelas com paginação, ordenação, busca e filtros
- Modais consistentes: confirmar ações, prompts de senha, broadcasts
- Formulários com validação (client-side), máscaras e hints
- Toasters para sucesso/erro/alerta; Empty states para listas vazias
- Botões e ações com roles/permissions
- Estado de carregamento com `Spinner`
- Charts com tema escuro e legibilidade

## Estado e Dados
- React Query para cache, loading e revalidação
- Providers: `AuthProvider` (token e perfil), `PermissionsProvider` (escopos)
- Services/API isolados por domínio; `apiClient.ts` com baseURL, interceptors, retries
- Tipos (types) por entidade; mapeamento de DTOs → modelos UI
- Storage helper (`storage.ts`) para persistências necessárias

## Segurança e Auditoria
- Roteamento protegido (guards)
- Permissões por módulo e ação (ex.: editar, excluir, exportar)
- Logs de auditoria: quem alterou e quando
- Histórico de login, bloqueio por IP (UI + integração futura)
- Backup automático (disparo via UI, confirmação)

## Notificações e Broadcasts
- Centro de notificações
- Broadcast para barbearias/barbeiros (email, push, SMS)
- Modais de anúncio na dashboard do barbeiro

## Integrações Futuras (Backend)
- Endpoints REST/GraphQL por domínio
- Webhooks para eventos (pagamentos, planos, alertas)
- Auth: OAuth/JWT com escopos por módulo
- Filas para processamento assíncrono (envio de notificações)

## Roadmap
- v1: Estrutura base, gestão de entidades, métricas, filtros, modais
- v1.1: Relatórios financeiros, exportações, cupons, planos
- v1.2: Segurança reforçada, auditoria completa, backups, bloqueio por IP

## Convenções
- Nomes de arquivos em `PascalCase` para componentes e páginas
- Nomes de hooks em `camelCase` começando com `use...`
- Pastas por domínio; evite acoplamento entre features
- Sem lógica de negócios dentro de componentes UI

---
Este guia é um blueprint completo do frontend da dashboard de administração. Ele reflete apenas o frontend; a camada de backend será integrada futuramente mantendo contratos e responsabilidades bem definidos.
