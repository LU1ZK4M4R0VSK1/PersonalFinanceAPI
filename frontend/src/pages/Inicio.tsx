import { TrendingUp, TrendingDown, Wallet, Receipt } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { useFinancialSummary } from '@/hooks/useFinancialSummary';
import { StatCard } from '@/components/UI/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const Inicio = () => {
const { transactions } = useTransactions();
const { summary } = useFinancialSummary(transactions);
const format = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency:
'BRL' }).format(v);
return (
<div className="space-y-6">
<h1 className="text-3xl font-bold">Início</h1>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
<StatCard title="Saldo Total" value={format(summary.balance)} icon={Wallet}
variant="default" />
<StatCard title="Receitas" value={format(summary.totalIncome)} icon={TrendingUp}
variant="success" />
<StatCard title="Despesas" value={format(summary.totalExpense)}
icon={TrendingDown} variant="destructive" />
<StatCard title="Transações" value={summary.transactionCount} icon={Receipt} />
</div>
<Card>
<CardHeader><CardTitle>Transações Recentes</CardTitle></CardHeader>
<CardContent>
{transactions.length === 0 ? <p className="text-muted-foreground">Nenhuma
transação.</p> :
transactions.slice(0, 5).map(t => (
<div key={t.id} className="flex justify-between border-b py-2">
<span>{t.description}</span>
<span className={t.type === 'income' ? 'text-green-600' :
'text-red-600'}>{format(t.amount)}</span>
</div>
))}
</CardContent>
</Card>
</div>
);
};
export default Inicio;