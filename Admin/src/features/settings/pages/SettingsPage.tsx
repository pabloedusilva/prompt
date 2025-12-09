import { useState } from 'react';
import { Save, Shield } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Tabs } from '../../../components/ui/Tabs';
import { Table } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Switch } from '../../../components/ui/Switch';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: 'active' | 'inactive';
}

interface Integration {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const mockAdminUsers: AdminUser[] = [
  { id: '1', name: 'João Admin', email: 'admin@regua.com', role: 'Super Admin', permissions: ['Tudo'], status: 'active' },
  { id: '2', name: 'Maria Suporte', email: 'suporte@regua.com', role: 'Suporte', permissions: ['Clientes', 'Agendamentos'], status: 'active' },
  { id: '3', name: 'Pedro Moderador', email: 'moderador@regua.com', role: 'Moderador', permissions: ['Barbearias', 'Barbeiros'], status: 'active' },
  { id: '4', name: 'Ana Financeiro', email: 'financeiro@regua.com', role: 'Financeiro', permissions: ['Faturamento', 'Planos'], status: 'active' },
  { id: '5', name: 'Carlos Marketing', email: 'marketing@regua.com', role: 'Marketing', permissions: ['Promoções', 'Notificações'], status: 'inactive' },
];

const mockIntegrations: Integration[] = [
  { id: '1', name: 'Email (SMTP)', description: 'Envio de emails transacionais e marketing', enabled: true },
  { id: '2', name: 'SMS', description: 'Notificações via SMS', enabled: true },
  { id: '3', name: 'Push Notifications', description: 'Notificações push no app mobile', enabled: true },
  { id: '4', name: 'Google Analytics', description: 'Rastreamento e análise de dados', enabled: true },
  { id: '5', name: 'Stripe', description: 'Gateway de pagamento', enabled: false },
  { id: '6', name: 'WhatsApp Business', description: 'Notificações via WhatsApp', enabled: false },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Régua Máxima',
    contactEmail: 'contato@reguamaxima.com',
    contactPhone: '(11) 99999-9999',
    supportEmail: 'suporte@reguamaxima.com',
  });
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const handleSaveGeneral = () => {
    // Lógica para salvar configurações gerais
    alert('Configurações salvas com sucesso!');
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(int =>
        int.id === id ? { ...int, enabled: !int.enabled } : int
      )
    );
  };

  const tabs = [
    { id: 'general', label: 'Geral' },
    { id: 'users', label: 'Usuários Admin' },
    { id: 'integrations', label: 'Integrações' },
  ];

  const userColumns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Função' },
    {
      key: 'permissions',
      label: 'Permissões',
      render: (user: AdminUser) => (
        <div className="flex gap-1 flex-wrap">
          {user.permissions.map((perm, idx) => (
            <Badge key={idx} color="blue" size="sm">
              {perm}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user: AdminUser) => (
        <Badge color={user.status === 'active' ? 'green' : 'gray'}>
          {user.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Card>
        <div className="p-6 space-y-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nome da Plataforma
                  </label>
                  <Input
                    value={generalSettings.platformName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, platformName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email de Contato
                    </label>
                    <Input
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefone de Contato
                    </label>
                    <Input
                      value={generalSettings.contactPhone}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email de Suporte
                  </label>
                  <Input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveGeneral}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Gerencie os usuários administradores e suas permissões
                </p>
                <Button size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Adicionar Admin
                </Button>
              </div>
              <Table data={mockAdminUsers} columns={userColumns} />
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Ative ou desative as integrações com serviços externos
              </p>
              
              <div className="space-y-3">
                {integrations.map((integration) => (
                  <Card key={integration.id}>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                      <Switch
                        checked={integration.enabled}
                        onChange={() => handleToggleIntegration(integration.id)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage
