import { useState } from 'react';
import { Shield, Activity, Lock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Table } from '../../../components/ui/Table';
import { Tabs } from '../../../components/ui/Tabs';
import { Badge } from '../../../components/ui/Badge';
import { formatDate } from '../../../utils/date';

interface AuditLog {
  id: string;
  datetime: string;
  user: string;
  action: string;
  entity: string;
  ip: string;
}

interface LoginLog {
  id: string;
  datetime: string;
  user: string;
  ip: string;
  location: string;
  status: 'success' | 'failed';
}

const mockAuditLogs: AuditLog[] = [
  { id: 'A001', datetime: '2024-12-08 14:23', user: 'admin@regua.com', action: 'Criou', entity: 'Plano Premium', ip: '192.168.1.100' },
  { id: 'A002', datetime: '2024-12-08 14:15', user: 'admin@regua.com', action: 'Editou', entity: 'Barbearia Elite', ip: '192.168.1.100' },
  { id: 'A003', datetime: '2024-12-08 13:45', user: 'suporte@regua.com', action: 'Desativou', entity: 'Promoção Black Friday', ip: '192.168.1.105' },
  { id: 'A004', datetime: '2024-12-08 13:30', user: 'admin@regua.com', action: 'Aprovou', entity: 'Barbearia Classic Cut', ip: '192.168.1.100' },
  { id: 'A005', datetime: '2024-12-08 12:20', user: 'suporte@regua.com', action: 'Cancelou', entity: 'Agendamento #B045', ip: '192.168.1.105' },
  { id: 'A006', datetime: '2024-12-08 11:55', user: 'admin@regua.com', action: 'Criou', entity: 'Promoção Natal', ip: '192.168.1.100' },
  { id: 'A007', datetime: '2024-12-08 11:30', user: 'moderador@regua.com', action: 'Bloqueou', entity: 'Cliente João Silva', ip: '192.168.1.110' },
  { id: 'A008', datetime: '2024-12-08 10:45', user: 'admin@regua.com', action: 'Editou', entity: 'Configurações Gerais', ip: '192.168.1.100' },
  { id: 'A009', datetime: '2024-12-08 10:15', user: 'suporte@regua.com', action: 'Respondeu', entity: 'Ticket #1234', ip: '192.168.1.105' },
  { id: 'A010', datetime: '2024-12-08 09:50', user: 'admin@regua.com', action: 'Deletou', entity: 'Barbeiro Carlos', ip: '192.168.1.100' },
  { id: 'A011', datetime: '2024-12-07 18:30', user: 'admin@regua.com', action: 'Exportou', entity: 'Relatório Receita', ip: '192.168.1.100' },
  { id: 'A012', datetime: '2024-12-07 17:45', user: 'suporte@regua.com', action: 'Criou', entity: 'Notificação Sistema', ip: '192.168.1.105' },
  { id: 'A013', datetime: '2024-12-07 16:20', user: 'moderador@regua.com', action: 'Editou', entity: 'Permissões Usuário', ip: '192.168.1.110' },
  { id: 'A014', datetime: '2024-12-07 15:10', user: 'admin@regua.com', action: 'Ativou', entity: 'Integração SMS', ip: '192.168.1.100' },
  { id: 'A015', datetime: '2024-12-07 14:30', user: 'suporte@regua.com', action: 'Reembolsou', entity: 'Pagamento #P789', ip: '192.168.1.105' },
  { id: 'A016', datetime: '2024-12-07 13:45', user: 'admin@regua.com', action: 'Criou', entity: 'Cupom DESCONTO20', ip: '192.168.1.100' },
  { id: 'A017', datetime: '2024-12-07 12:20', user: 'moderador@regua.com', action: 'Suspendeu', entity: 'Barbearia Style Kings', ip: '192.168.1.110' },
  { id: 'A018', datetime: '2024-12-07 11:50', user: 'admin@regua.com', action: 'Atualizou', entity: 'Termos de Uso', ip: '192.168.1.100' },
  { id: 'A019', datetime: '2024-12-07 10:30', user: 'suporte@regua.com', action: 'Verificou', entity: 'Documento Barbearia', ip: '192.168.1.105' },
  { id: 'A020', datetime: '2024-12-07 09:15', user: 'admin@regua.com', action: 'Enviou', entity: 'Email Marketing', ip: '192.168.1.100' },
  { id: 'A021', datetime: '2024-12-06 18:45', user: 'admin@regua.com', action: 'Criou', entity: 'Barbeiro Pedro Machado', ip: '192.168.1.100' },
  { id: 'A022', datetime: '2024-12-06 17:30', user: 'suporte@regua.com', action: 'Alterou', entity: 'Status Agendamento', ip: '192.168.1.105' },
  { id: 'A023', datetime: '2024-12-06 16:15', user: 'moderador@regua.com', action: 'Desbloqueou', entity: 'IP 201.45.67.89', ip: '192.168.1.110' },
  { id: 'A024', datetime: '2024-12-06 15:00', user: 'admin@regua.com', action: 'Importou', entity: 'Lista Clientes CSV', ip: '192.168.1.100' },
  { id: 'A025', datetime: '2024-12-06 14:20', user: 'suporte@regua.com', action: 'Resetou', entity: 'Senha Cliente Maria', ip: '192.168.1.105' },
  { id: 'A026', datetime: '2024-12-06 13:35', user: 'admin@regua.com', action: 'Configurou', entity: 'Gateway Pagamento', ip: '192.168.1.100' },
  { id: 'A027', datetime: '2024-12-06 12:50', user: 'moderador@regua.com', action: 'Removeu', entity: 'Comentário Ofensivo', ip: '192.168.1.110' },
  { id: 'A028', datetime: '2024-12-06 11:25', user: 'admin@regua.com', action: 'Publicou', entity: 'Atualização Sistema', ip: '192.168.1.100' },
  { id: 'A029', datetime: '2024-12-06 10:40', user: 'suporte@regua.com', action: 'Processou', entity: 'Reembolso #R456', ip: '192.168.1.105' },
  { id: 'A030', datetime: '2024-12-06 09:20', user: 'admin@regua.com', action: 'Gerou', entity: 'Backup Database', ip: '192.168.1.100' },
  { id: 'A031', datetime: '2024-12-05 18:50', user: 'admin@regua.com', action: 'Editou', entity: 'Template Email', ip: '192.168.1.100' },
  { id: 'A032', datetime: '2024-12-05 17:35', user: 'suporte@regua.com', action: 'Arquivou', entity: 'Ticket #5678', ip: '192.168.1.105' },
  { id: 'A033', datetime: '2024-12-05 16:20', user: 'moderador@regua.com', action: 'Aprovou', entity: 'Review Barbearia', ip: '192.168.1.110' },
  { id: 'A034', datetime: '2024-12-05 15:10', user: 'admin@regua.com', action: 'Desativou', entity: 'Recurso Beta', ip: '192.168.1.100' },
  { id: 'A035', datetime: '2024-12-05 14:25', user: 'suporte@regua.com', action: 'Sincronizou', entity: 'Dados Analytics', ip: '192.168.1.105' },
  { id: 'A036', datetime: '2024-12-05 13:40', user: 'admin@regua.com', action: 'Criou', entity: 'Categoria Serviços', ip: '192.168.1.100' },
  { id: 'A037', datetime: '2024-12-05 12:15', user: 'moderador@regua.com', action: 'Baniu', entity: 'Usuário Spam', ip: '192.168.1.110' },
  { id: 'A038', datetime: '2024-12-05 11:30', user: 'admin@regua.com', action: 'Otimizou', entity: 'Performance Database', ip: '192.168.1.100' },
  { id: 'A039', datetime: '2024-12-05 10:45', user: 'suporte@regua.com', action: 'Migrou', entity: 'Dados Servidor', ip: '192.168.1.105' },
  { id: 'A040', datetime: '2024-12-05 09:30', user: 'admin@regua.com', action: 'Testou', entity: 'Nova Funcionalidade', ip: '192.168.1.100' },
  { id: 'A041', datetime: '2024-12-04 18:20', user: 'admin@regua.com', action: 'Implementou', entity: 'Segurança 2FA', ip: '192.168.1.100' },
  { id: 'A042', datetime: '2024-12-04 17:10', user: 'suporte@regua.com', action: 'Validou', entity: 'Documento Identidade', ip: '192.168.1.105' },
  { id: 'A043', datetime: '2024-12-04 16:25', user: 'moderador@regua.com', action: 'Monitorou', entity: 'Atividade Suspeita', ip: '192.168.1.110' },
  { id: 'A044', datetime: '2024-12-04 15:35', user: 'admin@regua.com', action: 'Atualizou', entity: 'Política Privacidade', ip: '192.168.1.100' },
  { id: 'A045', datetime: '2024-12-04 14:50', user: 'suporte@regua.com', action: 'Corrigiu', entity: 'Bug Agendamento', ip: '192.168.1.105' },
  { id: 'A046', datetime: '2024-12-04 13:20', user: 'admin@regua.com', action: 'Instalou', entity: 'Plugin Analytics', ip: '192.168.1.100' },
  { id: 'A047', datetime: '2024-12-04 12:40', user: 'moderador@regua.com', action: 'Investigou', entity: 'Fraude Pagamento', ip: '192.168.1.110' },
  { id: 'A048', datetime: '2024-12-04 11:15', user: 'admin@regua.com', action: 'Configurou', entity: 'Firewall Regras', ip: '192.168.1.100' },
  { id: 'A049', datetime: '2024-12-04 10:30', user: 'suporte@regua.com', action: 'Restaurou', entity: 'Dados Backup', ip: '192.168.1.105' },
  { id: 'A050', datetime: '2024-12-04 09:10', user: 'admin@regua.com', action: 'Lançou', entity: 'Versão 2.0', ip: '192.168.1.100' },
];

const mockLoginLogs: LoginLog[] = [
  { id: 'L001', datetime: '2024-12-08 14:30', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L002', datetime: '2024-12-08 13:45', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L003', datetime: '2024-12-08 12:20', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L004', datetime: '2024-12-08 11:15', user: 'admin@regua.com', ip: '45.67.89.123', location: 'Unknown', status: 'failed' },
  { id: 'L005', datetime: '2024-12-08 10:30', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L006', datetime: '2024-12-08 09:45', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L007', datetime: '2024-12-07 18:50', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L008', datetime: '2024-12-07 17:30', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L009', datetime: '2024-12-07 16:15', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L010', datetime: '2024-12-07 15:20', user: 'teste@test.com', ip: '201.34.56.78', location: 'Unknown', status: 'failed' },
  { id: 'L011', datetime: '2024-12-07 14:35', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L012', datetime: '2024-12-07 13:40', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L013', datetime: '2024-12-07 12:25', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L014', datetime: '2024-12-07 11:10', user: 'admin@regua.com', ip: '98.76.54.32', location: 'Unknown', status: 'failed' },
  { id: 'L015', datetime: '2024-12-07 10:30', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L016', datetime: '2024-12-07 09:15', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L017', datetime: '2024-12-06 18:45', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L018', datetime: '2024-12-06 17:20', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L019', datetime: '2024-12-06 16:35', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L020', datetime: '2024-12-06 15:50', user: 'hacker@evil.com', ip: '123.45.67.89', location: 'Unknown', status: 'failed' },
  { id: 'L021', datetime: '2024-12-06 14:25', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L022', datetime: '2024-12-06 13:10', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L023', datetime: '2024-12-06 12:40', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L024', datetime: '2024-12-06 11:15', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L025', datetime: '2024-12-06 10:30', user: 'test@test.com', ip: '234.56.78.90', location: 'Unknown', status: 'failed' },
  { id: 'L026', datetime: '2024-12-06 09:20', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L027', datetime: '2024-12-05 18:45', user: 'suporte@regua.com', ip: '192.168.1.105', location: 'Rio de Janeiro, BR', status: 'success' },
  { id: 'L028', datetime: '2024-12-05 17:30', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
  { id: 'L029', datetime: '2024-12-05 16:15', user: 'moderador@regua.com', ip: '192.168.1.110', location: 'Belo Horizonte, BR', status: 'success' },
  { id: 'L030', datetime: '2024-12-05 15:05', user: 'admin@regua.com', ip: '192.168.1.100', location: 'São Paulo, BR', status: 'success' },
];

const statusColors = {
  success: 'green',
  failed: 'red',
} as const;

const statusLabels = {
  success: 'Sucesso',
  failed: 'Falhou',
};

export function SecurityPage() {
  const [activeTab, setActiveTab] = useState('audit');

  const tabs = [
    { id: 'audit', label: 'Auditoria' },
    { id: 'logins', label: 'Logins' },
    { id: 'blocked', label: 'IPs Bloqueados' },
  ];

  const auditColumns = [
    {
      key: 'datetime',
      label: 'Data/Hora',
      render: (log: AuditLog) => formatDate(log.datetime),
    },
    { key: 'user', label: 'Usuário' },
    { key: 'action', label: 'Ação' },
    { key: 'entity', label: 'Entidade' },
    { key: 'ip', label: 'IP' },
  ];

  const loginColumns = [
    {
      key: 'datetime',
      label: 'Data/Hora',
      render: (log: LoginLog) => formatDate(log.datetime),
    },
    { key: 'user', label: 'Usuário' },
    { key: 'ip', label: 'IP' },
    { key: 'location', label: 'Localização' },
    {
      key: 'status',
      label: 'Status',
      render: (log: LoginLog) => (
        <Badge color={statusColors[log.status]}>
          {statusLabels[log.status]}
        </Badge>
      ),
    },
  ];

  const blockedIPs = [
    { ip: '45.67.89.123', reason: 'Múltiplas tentativas falhas', blockedAt: '2024-12-08 11:20', blockedBy: 'Sistema' },
    { ip: '98.76.54.32', reason: 'Atividade suspeita', blockedAt: '2024-12-07 11:15', blockedBy: 'admin@regua.com' },
    { ip: '123.45.67.89', reason: 'Tentativa de invasão', blockedAt: '2024-12-06 15:55', blockedBy: 'Sistema' },
    { ip: '234.56.78.90', reason: 'Força bruta', blockedAt: '2024-12-06 10:35', blockedBy: 'Sistema' },
  ];

  const blockedIPsColumns = [
    { key: 'ip', label: 'IP' },
    { key: 'reason', label: 'Motivo' },
    {
      key: 'blockedAt',
      label: 'Bloqueado em',
      render: (item: any) => formatDate(item.blockedAt),
    },
    { key: 'blockedBy', label: 'Bloqueado por' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Segurança</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ações Hoje</p>
                <p className="text-2xl font-bold mt-2">127</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Logins Falhados</p>
                <p className="text-2xl font-bold mt-2">5</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">IPs Bloqueados</p>
                <p className="text-2xl font-bold mt-2">{blockedIPs.length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Lock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'audit' && (
            <Table data={mockAuditLogs} columns={auditColumns} />
          )}

          {activeTab === 'logins' && (
            <Table data={mockLoginLogs} columns={loginColumns} />
          )}

          {activeTab === 'blocked' && (
            <Table data={blockedIPs} columns={blockedIPsColumns} />
          )}
        </div>
      </Card>
    </div>
  );
}

export default SecurityPage
