import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Aqui você buscaria os dados financeiros do usuário no Supabase
  // Por enquanto, vamos usar dados fictícios
  const financialSummary = {
    totalBalance: 5000.00,
    income: 3500.00,
    expenses: 1500.00,
    savings: 1000.00,
  };
  
  const recentTransactions = [
    { id: 1, description: 'Salário', amount: 3500.00, type: 'income', date: '2023-09-05' },
    { id: 2, description: 'Aluguel', amount: -800.00, type: 'expense', date: '2023-09-10' },
    { id: 3, description: 'Supermercado', amount: -350.00, type: 'expense', date: '2023-09-15' },
    { id: 4, description: 'Freelance', amount: 500.00, type: 'income', date: '2023-09-20' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>
      <p className="text-gray-600">Bem-vindo, {user?.user_metadata?.name || 'Usuário'}!</p>
      
      {/* Resumo financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Saldo Total</h3>
          <p className="text-2xl font-bold text-blue-600">R$ {financialSummary.totalBalance.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Receitas</h3>
          <p className="text-2xl font-bold text-green-600">R$ {financialSummary.income.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Despesas</h3>
          <p className="text-2xl font-bold text-red-600">R$ {financialSummary.expenses.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Economia</h3>
          <p className="text-2xl font-bold text-purple-600">R$ {financialSummary.savings.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Transações recentes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Transações Recentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <a href="/dashboard/transactions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todas as transações →
          </a>
        </div>
      </div>
      
      {/* Ações rápidas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/dashboard/transactions/new?type=income" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Adicionar Receita
          </a>
          <a href="/dashboard/transactions/new?type=expense" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Adicionar Despesa
          </a>
          <a href="/dashboard/reports" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Gerar Relatório
          </a>
        </div>
      </div>
    </div>
  );
}