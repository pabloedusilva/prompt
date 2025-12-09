import { useState } from 'react';
import { Send, Mail, Smartphone, MessageSquare } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { Table } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Tabs } from '../../../components/ui/Tabs';
import { formatDate } from '../../../utils/date';

interface Notification {
  id: string;
  title: string;
  recipients: number;
  channel: 'email' | 'push' | 'sms';
  sentAt: string;
  openRate: number;
  status: 'sent' | 'scheduled' | 'failed';
}

const mockNotifications: Notification[] = [
  { id: 'N001', title: 'Promoção Black Friday', recipients: 1250, channel: 'email', sentAt: '2024-11-25 10:00', openRate: 68, status: 'sent' },
  { id: 'N002', title: 'Lembrete de Agendamento', recipients: 45, channel: 'push', sentAt: '2024-12-08 09:00', openRate: 85, status: 'sent' },
  { id: 'N003', title: 'Confirmação de Reserva', recipients: 78, channel: 'sms', sentAt: '2024-12-07 14:30', openRate: 92, status: 'sent' },
  { id: 'N004', title: 'Novidades do Mês', recipients: 2340, channel: 'email', sentAt: '2024-12-01 08:00', openRate: 45, status: 'sent' },
  { id: 'N005', title: 'Lançamento Novo Serviço', recipients: 890, channel: 'push', sentAt: '2024-12-05 16:00', openRate: 72, status: 'sent' },
  { id: 'N006', title: 'Feliz Natal', recipients: 3200, channel: 'email', sentAt: '2024-12-24 00:00', openRate: 0, status: 'scheduled' },
  { id: 'N007', title: 'Pesquisa de Satisfação', recipients: 560, channel: 'email', sentAt: '2024-11-30 12:00', openRate: 38, status: 'sent' },
  { id: 'N008', title: 'Código Promocional', recipients: 150, channel: 'sms', sentAt: '2024-12-03 10:00', openRate: 88, status: 'sent' },
  { id: 'N009', title: 'Atualização de Sistema', recipients: 45, channel: 'push', sentAt: '2024-12-02 08:00', openRate: 65, status: 'sent' },
  { id: 'N010', title: 'Programa Fidelidade', recipients: 1100, channel: 'email', sentAt: '2024-11-28 09:00', openRate: 52, status: 'sent' },
  { id: 'N011', title: 'Agendamento Cancelado', recipients: 12, channel: 'sms', sentAt: '2024-12-06 11:00', openRate: 100, status: 'sent' },
  { id: 'N012', title: 'Nova Barbearia na Plataforma', recipients: 2100, channel: 'push', sentAt: '2024-11-26 15:00', openRate: 58, status: 'sent' },
  { id: 'N013', title: 'Dicas de Cuidados', recipients: 1800, channel: 'email', sentAt: '2024-11-24 10:00', openRate: 42, status: 'sent' },
  { id: 'N014', title: 'Confirmação de Pagamento', recipients: 340, channel: 'email', sentAt: '2024-12-01 16:30', openRate: 95, status: 'sent' },
  { id: 'N015', title: 'Horários Disponíveis', recipients: 230, channel: 'push', sentAt: '2024-12-04 08:00', openRate: 78, status: 'sent' },
  { id: 'N016', title: 'Avalie Seu Atendimento', recipients: 180, channel: 'sms', sentAt: '2024-12-05 18:00', openRate: 83, status: 'sent' },
  { id: 'N017', title: 'Aniversário da Plataforma', recipients: 4500, channel: 'email', sentAt: '2024-11-20 00:00', openRate: 61, status: 'sent' },
  { id: 'N018', title: 'Manutenção Programada', recipients: 89, channel: 'push', sentAt: '2024-11-29 20:00', openRate: 0, status: 'failed' },
  { id: 'N019', title: 'Recuperação de Senha', recipients: 67, channel: 'email', sentAt: '2024-12-07 22:00', openRate: 98, status: 'sent' },
  { id: 'N020', title: 'Ano Novo 2025', recipients: 5000, channel: 'email', sentAt: '2024-12-31 00:00', openRate: 0, status: 'scheduled' },
];

const channelIcons = {
  email: Mail,
  push: Smartphone,
  sms: MessageSquare,
};

const channelColors = {
  email: 'blue',
  push: 'purple',
  sms: 'green',
} as const;

const statusColors = {
  sent: 'green',
  scheduled: 'yellow',
  failed: 'red',
} as const;

const statusLabels = {
  sent: 'Enviada',
  scheduled: 'Agendada',
  failed: 'Falhou',
};

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredNotifications = mockNotifications.filter(notif => {
    const matchesTab = activeTab === 'all' || notif.channel === activeTab;
    const matchesStatus = !statusFilter || notif.status === statusFilter;
    return matchesTab && matchesStatus;
  });

  const tabs = [
    { id: 'all', label: 'Todas' },
    { id: 'email', label: 'Email' },
    { id: 'push', label: 'Push' },
    { id: 'sms', label: 'SMS' },
  ];

  const columns = [
    { key: 'title', label: 'Título' },
    {
      key: 'recipients',
      label: 'Destinatários',
      render: (notif: Notification) => notif.recipients.toLocaleString(),
    },
    {
      key: 'channel',
      label: 'Canal',
      render: (notif: Notification) => {
        const Icon = channelIcons[notif.channel];
        return (
          <Badge color={channelColors[notif.channel]}>
            <Icon className="w-3 h-3 mr-1" />
            {notif.channel.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      key: 'sentAt',
      label: 'Enviado em',
      render: (notif: Notification) => formatDate(notif.sentAt),
    },
    {
      key: 'openRate',
      label: 'Taxa Abertura',
      render: (notif: Notification) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${notif.openRate}%` }}
            />
          </div>
          <span className="text-sm font-medium">{notif.openRate}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (notif: Notification) => (
        <Badge color={statusColors[notif.status]}>
          {statusLabels[notif.status]}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notificações</h1>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Enviar Notificação
        </Button>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="flex gap-4">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="sent">Enviada</option>
              <option value="scheduled">Agendada</option>
              <option value="failed">Falhou</option>
            </Select>
          </div>

          <Table data={filteredNotifications} columns={columns} />
        </div>
      </Card>
    </div>
  );
}

export default NotificationsPage
