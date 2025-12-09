import { useState, useEffect } from 'react';
import { useToast } from '@/app/providers/ToastProvider';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Plus, Search, Trash2, Building2, Link2, Copy, KeyRound, Clock, Mail, Phone, MapPin, Eye, Users, Calendar, TrendingUp, ArrowLeft } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface Barbershop {
  id: string;
  name: string;
  cnpj: string;
  city: string;
  state: string;
  plan: string;
  status: 'active' | 'inactive' | 'pending';
  email: string;
  phone: string;
  address: string;
  logo?: string;
}

interface BarbershopStats {
  bookingsToday: number;
  bookingsWeek: number;
  bookingsMonth: number;
  totalClients: number;
  totalBarbers: number;
  revenue: number;
}

interface RegistrationLink {
  token: string;
  expiresAt: Date;
  url: string;
}

export default function BarbershopsList() {
  const { showToast } = useToast();
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [registrationLink, setRegistrationLink] = useState<RegistrationLink | null>(null);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [selectedBarbershop, setSelectedBarbershop] = useState<Barbershop | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewingDetails, setViewingDetails] = useState<Barbershop | null>(null);
  const [barbershopStats, setBarbershopStats] = useState<BarbershopStats | null>(null);

  useEffect(() => {
    loadBarbershops();
  }, []);

  const loadBarbershops = () => {
    const stored = localStorage.getItem('admin_barbershops');
    const loaded: Barbershop[] = stored ? JSON.parse(stored) : [
      {
        id: 'bb1',
        name: 'Barbearia Elite',
        cnpj: '12.345.678/0001-90',
        city: 'São Paulo',
        state: 'SP',
        plan: 'Premium',
        status: 'active',
        email: 'contato@elite.com',
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123',
        logo: '/assets/images/profile/profile1.jpg',
      },
      {
        id: 'bb2',
        name: 'Corte & Estilo',
        cnpj: '23.456.789/0001-01',
        city: 'Rio de Janeiro',
        state: 'RJ',
        plan: 'Básico',
        status: 'pending',
        email: 'contato@corteestilo.com',
        phone: '(21) 97654-3210',
        address: 'Av. Principal, 456',
        logo: '/assets/images/profile/profile2.jpg',
      },
      {
        id: 'bb3',
        name: 'Barber Shop Classic',
        cnpj: '34.567.890/0001-12',
        city: 'Belo Horizonte',
        state: 'MG',
        plan: 'Premium',
        status: 'active',
        email: 'contato@classic.com',
        phone: '(31) 96543-2109',
        address: 'Praça Central, 789',
        logo: '/assets/images/profile/profile3.jpg',
      },
    ];
    setBarbershops(loaded);
    localStorage.setItem('admin_barbershops', JSON.stringify(loaded));
  };

  const loadBarbershopStats = (_barbershopId: string): BarbershopStats => {
    // Simulação de dados - futuramente virá do backend
    return {
      bookingsToday: Math.floor(Math.random() * 15) + 5,
      bookingsWeek: Math.floor(Math.random() * 50) + 20,
      bookingsMonth: Math.floor(Math.random() * 200) + 80,
      totalClients: Math.floor(Math.random() * 500) + 100,
      totalBarbers: Math.floor(Math.random() * 8) + 2,
      revenue: Math.random() * 10000 + 5000,
    };
  };

  const generateRegistrationLink = () => {
    const token = `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);
    
    const link: RegistrationLink = {
      token,
      expiresAt,
      url: `${window.location.origin}/barbershop/register?token=${token}`,
    };

    setRegistrationLink(link);
    setLinkModalOpen(true);
    showToast('Link de cadastro gerado com sucesso!', 'success');
  };

  const copyLinkToClipboard = () => {
    if (registrationLink) {
      navigator.clipboard.writeText(registrationLink.url);
      showToast('Link copiado para a área de transferência!', 'success');
    }
  };

  const openResetPasswordConfirm = (barbershop: Barbershop) => {
    setSelectedBarbershop(barbershop);
    setResetPasswordModalOpen(true);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminPassword === 'admin123') {
      showToast('Senha redefinida com sucesso! Nova senha: Admin12345', 'success');
      setResetPasswordModalOpen(false);
      setAdminPassword('');
      setSelectedBarbershop(null);
    } else {
      showToast('Senha do administrador incorreta!', 'error');
    }
  };

  const handleDelete = (id: string) => {
    const updated = barbershops.filter(b => b.id !== id);
    setBarbershops(updated);
    localStorage.setItem('admin_barbershops', JSON.stringify(updated));
    setDeleteId(null);
    showToast('Barbearia removida com sucesso!', 'success');
  };

  const openDetails = (barbershop: Barbershop) => {
    setViewingDetails(barbershop);
    const stats = loadBarbershopStats(barbershop.id);
    setBarbershopStats(stats);
  };

  const closeDetails = () => {
    setViewingDetails(null);
    setBarbershopStats(null);
  };

  const filteredBarbershops = barbershops.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.cnpj.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesPlan = planFilter === 'all' || b.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: 'completed',
      inactive: 'cancelled',
      pending: 'pending'
    };
    const labels: Record<string, string> = {
      active: 'Ativa',
      inactive: 'Inativa',
      pending: 'Pendente'
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getRemainingTime = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes > 0 ? `${minutes} minutos` : 'Expirado';
  };

  // Se está visualizando detalhes, mostra o dashboard da barbearia
  if (viewingDetails && barbershopStats) {
    return (
      <div className="grid gap-8 animate-fade-in">
        {/* Header com voltar */}
        <div>
          <button
            onClick={closeDetails}
            className="flex items-center gap-2 text-text hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">
                Detalhes da Barbearia
              </h1>
              <p className="text-text-dim">ID: {viewingDetails.id}</p>
            </div>
            {getStatusBadge(viewingDetails.status)}
          </div>
        </div>

        {/* Informações da Barbearia com foto */}
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/20 flex-shrink-0">
              <ImageWithFallback
                src={viewingDetails.logo || '/assets/images/ui/default.jpg'}
                alt={viewingDetails.name}
                rounded={true}
                containerClassName="w-20 h-20"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text mb-1">{viewingDetails.name}</h2>
              <p className="text-text-dim">{viewingDetails.city}, {viewingDetails.state}</p>
              <p className="text-sm text-text-dim mt-1">CNPJ: {viewingDetails.cnpj}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-text mb-1">{barbershopStats.bookingsToday}</p>
            <p className="text-sm text-text-dim">Agendamentos Hoje</p>
          </div>

          <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-text mb-1">{barbershopStats.bookingsWeek}</p>
            <p className="text-sm text-text-dim">Agendamentos na Semana</p>
          </div>

          <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gold" />
              </div>
            </div>
            <p className="text-2xl font-bold text-text mb-1">{barbershopStats.bookingsMonth}</p>
            <p className="text-sm text-text-dim">Agendamentos no Mês</p>
          </div>

          <div className="card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-text mb-1">R$ {barbershopStats.revenue.toFixed(2)}</p>
            <p className="text-sm text-text-dim">Receita do Mês</p>
          </div>
        </div>

        {/* Informações Gerais */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-semibold text-text mb-4">Informações Gerais</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Total de Barbeiros</p>
                  <p className="text-lg font-semibold text-text">{barbershopStats.totalBarbers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Total de Clientes</p>
                  <p className="text-lg font-semibold text-text">{barbershopStats.totalClients}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Plano</p>
                  <p className="text-lg font-semibold text-text">{viewingDetails.plan}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-semibold text-text mb-4">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Email</p>
                  <p className="text-text">{viewingDetails.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Telefone</p>
                  <p className="text-text">{viewingDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Endereço</p>
                  <p className="text-text">{viewingDetails.address}</p>
                  <p className="text-sm text-text-dim">{viewingDetails.city}, {viewingDetails.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Barbearias</h1>
          <p className="text-text-dim">Gerencie todas as barbearias da plataforma</p>
        </div>
        <button onClick={generateRegistrationLink} className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Gerar Link de Cadastro
        </button>
      </div>

      {/* Filters */}
      <div className="card animate-fade-in-delayed">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Buscar por nome, cidade ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativa</option>
            <option value="inactive">Inativa</option>
            <option value="pending">Pendente</option>
          </Select>
          <Select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="all">Todos os planos</option>
            <option value="Básico">Básico</option>
            <option value="Premium">Premium</option>
            <option value="Profissional">Profissional</option>
          </Select>
        </div>
      </div>

      {/* Barbershops Grid */}
      {filteredBarbershops.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-text-dim" />
          </div>
          <p className="text-text-dim">Nenhuma barbearia encontrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-delayed">
          {filteredBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="card card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14">
                    <ImageWithFallback
                      src={barbershop.logo || '/assets/images/ui/default.jpg'}
                      alt={barbershop.name}
                      rounded={true}
                      containerClassName="w-14 h-14 border-2 border-gold/20"
                    />
                  </div>
                </div>
                {getStatusBadge(barbershop.status)}
              </div>
              
              <h3 className="text-xl font-semibold text-text mb-1">{barbershop.name}</h3>
              <p className="text-sm text-text-dim mb-3">Plano {barbershop.plan}</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-text-dim">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>{barbershop.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-text-dim">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{barbershop.city}, {barbershop.state}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <button
                  onClick={() => openDetails(barbershop)}
                  className="flex-1 btn btn-primary"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalhes
                </button>
                <button
                  onClick={() => openResetPasswordConfirm(barbershop)}
                  className="btn btn-outline"
                >
                  <KeyRound className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(barbershop.id)}
                  className="btn btn-outline text-red-400 hover:bg-red-500/10 border-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registration Link Modal */}
      {linkModalOpen && registrationLink && (
        <Modal open={linkModalOpen} onClose={() => setLinkModalOpen(false)} size="fullscreen">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-10 h-10 text-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-gold mb-2">
                Link de Cadastro Gerado
              </h2>
              <p className="text-text-dim">
                Envie este link para a barbearia completar o cadastro
              </p>
            </div>
            
            <div className="card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-sm text-text-dim">Válido por</p>
                  <p className="text-lg font-semibold text-text">
                    {getRemainingTime(registrationLink.expiresAt)}
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-surface rounded-xl border border-border mb-4">
                <p className="text-xs text-text-dim mb-2">URL DE CADASTRO</p>
                <p className="text-sm text-text font-mono break-all">
                  {registrationLink.url}
                </p>
              </div>

              <button
                onClick={copyLinkToClipboard}
                className="w-full btn btn-primary"
              >
                <Copy className="w-5 h-5" />
                Copiar Link
              </button>
            </div>

            <div className="card bg-gold/5 border-gold/20">
              <h3 className="text-lg font-semibold text-gold mb-3">📋 Instruções</h3>
              <ul className="space-y-2 text-sm text-text-dim">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">1.</span>
                  <span>Copie o link gerado acima</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">2.</span>
                  <span>Envie para o responsável pela barbearia via email, WhatsApp ou outro meio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">3.</span>
                  <span>O link expira em 30 minutos. Após isso, será necessário gerar um novo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">4.</span>
                  <span>A barbearia preencherá os dados e criará a conta através do link</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setLinkModalOpen(false)} className="btn btn-outline">
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reset Password Modal */}
      {resetPasswordModalOpen && selectedBarbershop && (
        <Modal
          open={resetPasswordModalOpen}
          onClose={() => {
            setResetPasswordModalOpen(false);
            setAdminPassword('');
            setSelectedBarbershop(null);
          }}
          size="fullscreen"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-10 h-10 text-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-gold mb-2">
                Redefinir Senha
              </h2>
              <p className="text-text-dim">
                Confirme a redefinição da senha da barbearia
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="grid gap-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-text mb-4">Informações da Barbearia</h3>
                <p className="text-text-dim mb-2">
                  Você está prestes a redefinir a senha da barbearia:
                </p>
                <p className="text-gold font-semibold text-xl mb-4">
                  {selectedBarbershop.name}
                </p>
                <div className="card bg-gold/5 border-gold/20">
                  <p className="text-sm text-text-dim text-center">
                    A senha será redefinida para o padrão do sistema: <span className="font-mono text-text font-semibold">Admin12345</span>
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-text mb-4">Autenticação do Administrador</h3>
                <p className="text-sm text-text-dim mb-6">
                  Por segurança, confirme sua senha de administrador para continuar.
                </p>
                
                <Input
                  label="Senha do Administrador"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setResetPasswordModalOpen(false);
                    setAdminPassword('');
                    setSelectedBarbershop(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirmar Redefinição
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <Modal
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          title="Confirmar Exclusão"
          size="md"
        >
          <p className="text-text-dim mb-6">
            Tem certeza que deseja excluir esta barbearia? Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setDeleteId(null)} className="btn btn-outline">
              Cancelar
            </button>
            <button onClick={() => handleDelete(deleteId)} className="btn btn-danger">
              Excluir
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
