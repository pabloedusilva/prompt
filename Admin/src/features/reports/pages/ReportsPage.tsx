import { useState } from 'react';
import { FileText, Download, DollarSign, Calendar, Users, Scissors } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { Table } from '../../../components/ui/Table';
import { formatDate } from '../../../utils/date';

interface Report {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  period: string;
  size: string;
}

const mockReports: Report[] = [
  { id: 'R001', name: 'Relatório de Receita - Dezembro', type: 'Receita', generatedAt: '2024-12-08 10:00', period: '01/12/2024 - 08/12/2024', size: '2.4 MB' },
  { id: 'R002', name: 'Agendamentos da Semana', type: 'Agendamentos', generatedAt: '2024-12-07 15:00', period: '02/12/2024 - 08/12/2024', size: '1.8 MB' },
  { id: 'R003', name: 'Novos Clientes - Novembro', type: 'Clientes', generatedAt: '2024-12-01 09:00', period: '01/11/2024 - 30/11/2024', size: '890 KB' },
  { id: 'R004', name: 'Performance Barbeiros - Nov', type: 'Barbeiros', generatedAt: '2024-12-01 11:00', period: '01/11/2024 - 30/11/2024', size: '1.2 MB' },
  { id: 'R005', name: 'Receita Mensal - Outubro', type: 'Receita', generatedAt: '2024-11-01 08:00', period: '01/10/2024 - 31/10/2024', size: '3.1 MB' },
  { id: 'R006', name: 'Taxa de Cancelamento', type: 'Agendamentos', generatedAt: '2024-11-28 14:00', period: '01/11/2024 - 28/11/2024', size: '670 KB' },
  { id: 'R007', name: 'Clientes Inativos', type: 'Clientes', generatedAt: '2024-11-25 10:00', period: '01/08/2024 - 25/11/2024', size: '1.5 MB' },
  { id: 'R008', name: 'Top 10 Barbeiros', type: 'Barbeiros', generatedAt: '2024-11-20 16:00', period: '01/01/2024 - 20/11/2024', size: '450 KB' },
];

const reportTypes = [
  {
    id: 'revenue',
    name: 'Relatório de Receita',
    description: 'Análise completa de faturamento por período',
    icon: DollarSign,
    color: 'green',
  },
  {
    id: 'bookings',
    name: 'Relatório de Agendamentos',
    description: 'Estatísticas de agendamentos e cancelamentos',
    icon: Calendar,
    color: 'blue',
  },
  {
    id: 'clients',
    name: 'Relatório de Clientes',
    description: 'Análise de base de clientes e retenção',
    icon: Users,
    color: 'purple',
  },
  {
    id: 'barbers',
    name: 'Relatório de Barbeiros',
    description: 'Performance e produtividade dos barbeiros',
    icon: Scissors,
    color: 'orange',
  },
];

export function ReportsPage() {
  const [period, setPeriod] = useState('month');

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'type', label: 'Tipo' },
    { key: 'period', label: 'Período' },
    {
      key: 'generatedAt',
      label: 'Gerado em',
      render: (report: Report) => formatDate(report.generatedAt),
    },
    { key: 'size', label: 'Tamanho' },
    {
      key: 'actions',
      label: 'Ações',
      render: (_report: Report) => (
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Relatórios</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">Gerar Novo Relatório</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className={`w-12 h-12 bg-${type.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${type.color}-600`} />
                  </div>
                  <h3 className="font-semibold mb-2">{type.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                  <Button variant="outline" className="w-full" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Relatórios Gerados</h2>
            <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="today">Hoje</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="custom">Personalizado</option>
            </Select>
          </div>

          <Table data={mockReports} columns={columns} />
        </div>
      </Card>
    </div>
  );
}

export default ReportsPage
