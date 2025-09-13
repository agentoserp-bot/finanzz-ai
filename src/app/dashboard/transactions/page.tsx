import { createClient } from '@/lib/supabase/server';

export default async function TransactionsPage() {
  // Aqui você buscaria as transações do usuário no Supabase
  // Por enquanto, vamos usar dados fictícios
  const transactions = [
    { id: 1, description: 'Salário', amount: 3500.00, type: 'income', category: 'Salário', date: '2023-09-05' },
    { id: 2, description: 'Aluguel', amount: -800.00, type: 'expense', category: 'Moradia', date: '2023-09-10' },
    { id: 3, description: 'Supermercado', amount: -350.00, type: 'expense', category: 'Alimentação', date: '2023-09-15' },
    { id: 4, description: 'Freelance', amount: 500.00, type: 'income', category: 'Freelance', date: '2023-09-20' },
    { id: 5, description: 'Internet', amount: -120.00, type: 'expense', category: 'Serviços', date: '2023-09-22' },
    { id: 6, description: 'Energia Elétrica', amount: -180.00, type: 'expense', category: 'Serviços', date: '2023-09-25' },
    { id: 7, description: 'Dividendos', amount: 150.00, type: 'income', category: 'Investimentos', date: '2023-09-28' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transações</h1>
        <div className="flex space-x-2">
          <a href="/dashboard/transactions/new?type=income" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Adicionar Receita
          </a>
          <a href="/dashboard/transactions/new?type=expense" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Adicionar Despesa
          </a>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select id="type" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todos</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select id="category" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todas</option>
              <option value="Salário">Salário</option>
              <option value="Freelance">Freelance</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Moradia">Moradia</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Serviços">Serviços</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
            <input type="date" id="startDate" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
            <input type="date" id="endDate" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Aplicar Filtros
          </button>
        </div>
      </div>
      
      {/* Lista de transações */}
      <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <a href={`/dashboard/transactions/edit/${transaction.id}`} className="text-blue-600 hover:text-blue-800">Editar</a>
                      <button className="text-red-600 hover:text-red-800">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}