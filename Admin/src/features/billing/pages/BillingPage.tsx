import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Select } from '../../../components/ui/Select';
import { Table } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { LineChart } from '../../../components/charts/LineChart';
import { formatDate } from '../../../utils/date';

interface Transaction {
  id: string;
  date: string;
  barbershop: string;
  plan: string;
  value: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
}

const mockTransactions: Transaction[] = [
  { id: 'T001', date: '2024-12-01', barbershop: 'Barbearia Elite', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T002', date: '2024-12-02', barbershop: 'Classic Cut', plan: 'Profissional', value: 199, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T003', date: '2024-12-03', barbershop: 'Style Kings', plan: 'Básico', value: 99, status: 'pending', paymentMethod: 'Boleto' },
  { id: 'T004', date: '2024-12-01', barbershop: 'The Barber Shop', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T005', date: '2024-12-04', barbershop: 'Corte Fino', plan: 'Profissional', value: 199, status: 'overdue', paymentMethod: 'Boleto' },
  { id: 'T006', date: '2024-11-28', barbershop: 'Barbearia Elite', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T007', date: '2024-11-29', barbershop: 'Gentleman Cut', plan: 'Básico', value: 99, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T008', date: '2024-12-05', barbershop: 'Classic Cut', plan: 'Premium', value: 299, status: 'pending', paymentMethod: 'Boleto' },
  { id: 'T009', date: '2024-11-30', barbershop: 'Style Kings', plan: 'Profissional', value: 199, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T010', date: '2024-12-01', barbershop: 'Urban Barber', plan: 'Enterprise', value: 499, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T011', date: '2024-11-27', barbershop: 'The Barber Shop', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T012', date: '2024-12-06', barbershop: 'Corte Fino', plan: 'Profissional', value: 199, status: 'pending', paymentMethod: 'Boleto' },
  { id: 'T013', date: '2024-11-26', barbershop: 'Barbearia Elite', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T014', date: '2024-12-07', barbershop: 'Gentleman Cut', plan: 'Básico', value: 99, status: 'overdue', paymentMethod: 'Boleto' },
  { id: 'T015', date: '2024-11-25', barbershop: 'Classic Cut', plan: 'Profissional', value: 199, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T016', date: '2024-11-24', barbershop: 'Style Kings', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T017', date: '2024-12-08', barbershop: 'Urban Barber', plan: 'Enterprise', value: 499, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T018', date: '2024-11-23', barbershop: 'The Barber Shop', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T019', date: '2024-11-22', barbershop: 'Corte Fino', plan: 'Profissional', value: 199, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T020', date: '2024-11-21', barbershop: 'Barbearia Elite', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T021', date: '2024-11-20', barbershop: 'Gentleman Cut', plan: 'Básico', value: 99, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T022', date: '2024-11-19', barbershop: 'Classic Cut', plan: 'Profissional', value: 199, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T023', date: '2024-11-18', barbershop: 'Style Kings', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Pix' },
  { id: 'T024', date: '2024-11-17', barbershop: 'Urban Barber', plan: 'Enterprise', value: 499, status: 'paid', paymentMethod: 'Cartão de Crédito' },
  { id: 'T025', date: '2024-11-16', barbershop: 'The Barber Shop', plan: 'Premium', value: 299, status: 'paid', paymentMethod: 'Pix' },
];

const revenueData = [
  { month: 'Jul', revenue: 4200 },
  { month: 'Ago', revenue: 5100 },
  { month: 'Set', revenue: 4800 },
  { month: 'Out', revenue: 6300 },
  { month: 'Nov', revenue: 5900 },
  { month: 'Dez', revenue: 7200 },
];

const statusColors = {
  paid: 'green',
  pending: 'yellow',
  overdue: 'red',
} as const;

const statusLabels = {
  paid: 'Pago',
  pending: 'Pendente',
  overdue: 'Vencido',
};

export function BillingPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  const totalRevenue = mockTransactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.value, 0);

  const pendingRevenue = mockTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.value, 0);

  const overdueCount = mockTransactions.filter(t => t.status === 'overdue').length;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    const matchesMethod = !methodFilter || transaction.paymentMethod === methodFilter;
    return matchesStatus && matchesMethod;
  });

  const paymentMethods = Array.from(new Set(mockTransactions.map(t => t.paymentMethod)));

  const columns = [
    {
      key: 'date',
      label: 'Data',
      render: (t: Transaction) => formatDate(t.date),
    },
    { key: 'barbershop', label: 'Barbearia' },
    { key: 'plan', label: 'Plano' },
    {
      key: 'value',
      label: 'Valor',
      render: (t: Transaction) => `R$ ${t.value.toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (t: Transaction) => (
        <Badge color={statusColors[t.status]}>
          {statusLabels[t.status]}
        </Badge>
      ),
    },
    { key: 'paymentMethod', label: 'Método' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Faturamento</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Receita Total</p>
                <p className="text-2xl font-bold mt-2">R$ {totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pendente</p>
                <p className="text-2xl font-bold mt-2">R$ {pendingRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recebido (Dez)</p>
                <p className="text-2xl font-bold mt-2">R$ 7,200.00</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inadimplentes</p>
                <p className="text-2xl font-bold mt-2">{overdueCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Receita Mensal</h2>
          <div className="h-80">
            <LineChart data={revenueData} xKey="month" yKey="revenue" color="#3b82f6" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Transações Recentes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="overdue">Vencido</option>
            </Select>

            <Select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="">Todos os métodos</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </Select>
          </div>

          <Table data={filteredTransactions} columns={columns} />
        </div>
      </Card>
    </div>
  );
}

export default BillingPage
