import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import {
  Store,
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  color: string;
}

interface Barbershop {
  id: number;
  name: string;
  city: string;
  plan: string;
  status: 'active' | 'pending';
  registeredAt: string;
}

interface RevenueData {
  date: string;
  value: number;
}

interface Activity {
  id: number;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

export default function DashboardHome() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [recentBarbershops, setRecentBarbershops] = useState<Barbershop[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Mock de métricas principais
    setMetrics([
      {
        title: 'Total Barbearias',
        value: '48',
        change: '+12% vs mês anterior',
        changeType: 'positive',
        icon: <Store className="w-6 h-6" />,
        color: 'bg-blue-500',
      },
      {
        title: 'Total Barbeiros',
        value: '156',
        change: '+8% vs mês anterior',
        changeType: 'positive',
        icon: <UserCheck className="w-6 h-6" />,
        color: 'bg-green-500',
      },
      {
        title: 'Total Clientes',
        value: '2,847',
        change: '+23% vs mês anterior',
        changeType: 'positive',
        icon: <Users className="w-6 h-6" />,
        color: 'bg-purple-500',
      },
      {
        title: 'Receita Mensal',
        value: 'R$ 45.890',
        change: '+15% vs mês anterior',
        changeType: 'positive',
        icon: <DollarSign className="w-6 h-6" />,
        color: 'bg-amber-500',
      },
    ]);

    // Mock de receita dos últimos 7 dias
    setRevenueData([
      { date: '01/12', value: 5200 },
      { date: '02/12', value: 6800 },
      { date: '03/12', value: 5900 },
      { date: '04/12', value: 7200 },
      { date: '05/12', value: 8100 },
      { date: '06/12', value: 7800 },
      { date: '07/12', value: 9200 },
    ]);

    // Mock de últimas barbearias cadastradas
    setRecentBarbershops([
      {
        id: 1,
        name: 'Barbearia Elite',
        city: 'São Paulo - SP',
        plan: 'Premium',
        status: 'active',
        registeredAt: '2025-12-07',
      },
      {
        id: 2,
        name: 'Corte & Estilo',
        city: 'Rio de Janeiro - RJ',
        plan: 'Básico',
        status: 'pending',
        registeredAt: '2025-12-06',
      },
      {
        id: 3,
        name: 'Barber Shop Classic',
        city: 'Belo Horizonte - MG',
        plan: 'Premium',
        status: 'active',
        registeredAt: '2025-12-05',
      },
      {
        id: 4,
        name: 'The Kings Barber',
        city: 'Curitiba - PR',
        plan: 'Profissional',
        status: 'active',
        registeredAt: '2025-12-04',
      },
      {
        id: 5,
        name: 'Studio Hair Men',
        city: 'Porto Alegre - RS',
        plan: 'Básico',
        status: 'pending',
        registeredAt: '2025-12-03',
      },
    ]);

    // Mock de últimas atividades
    setActivities([
      {
        id: 1,
        description: 'Nova barbearia cadastrada: Barbearia Elite',
        time: 'Há 2 horas',
        type: 'success',
      },
      {
        id: 2,
        description: 'Pagamento pendente: Corte & Estilo',
        time: 'Há 4 horas',
        type: 'warning',
      },
      {
        id: 3,
        description: 'Novo barbeiro adicionado em Barber Shop Classic',
        time: 'Há 5 horas',
        type: 'info',
      },
      {
        id: 4,
        description: 'Plano atualizado: The Kings Barber',
        time: 'Há 1 dia',
        type: 'success',
      },
      {
        id: 5,
        description: 'Solicitação de aprovação: Studio Hair Men',
        time: 'Há 1 dia',
        type: 'warning',
      },
    ]);
  }, []);

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));
  const chartHeight = 200;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{metric.change}</span>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-lg text-white`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de receita */}
        <Card>
          <CardHeader title="Receita dos Últimos 7 Dias" />
          <CardContent>
            <div className="relative" style={{ height: chartHeight }}>
              <svg width="100%" height={chartHeight} className="overflow-visible">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={(chartHeight / 4) * i}
                    x2="100%"
                    y2={(chartHeight / 4) * i}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}

                {/* Line chart */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  points={revenueData
                    .map((d, i) => {
                      const x = (i / (revenueData.length - 1)) * 100;
                      const y = chartHeight - (d.value / maxRevenue) * chartHeight;
                      return `${x}%,${y}`;
                    })
                    .join(' ')}
                />

                {/* Points */}
                {revenueData.map((d, i) => {
                  const x = (i / (revenueData.length - 1)) * 100;
                  const y = chartHeight - (d.value / maxRevenue) * chartHeight;
                  return (
                    <g key={i}>
                      <circle cx={`${x}%`} cy={y} r="4" fill="#3b82f6" />
                      <text
                        x={`${x}%`}
                        y={chartHeight + 20}
                        textAnchor="middle"
                        className="text-xs fill-gray-600"
                      >
                        {d.date}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Últimas atividades */}
        <Card>
          <CardHeader title="Atividades Recentes" />
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de últimas barbearias */}
      <Card>
        <CardHeader title="Últimas Barbearias Cadastradas" />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cidade</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Plano</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentBarbershops.map((barbershop) => (
                  <tr key={barbershop.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{barbershop.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{barbershop.city}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{barbershop.plan}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          barbershop.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {barbershop.status === 'active' ? 'Ativa' : 'Pendente'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(barbershop.registeredAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
