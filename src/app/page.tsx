import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          FINANZZ<span className="text-blue-600">.AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sistema inteligente de gestão financeira com IA para análise de transações e relatórios financeiros personalizados.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Relatórios Inteligentes</h3>
            <p className="text-gray-600">Análises avançadas com gráficos interativos e insights financeiros</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Controle Total</h3>
            <p className="text-gray-600">Gerencie receitas, despesas e categorize suas transações</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Seguro & Confiável</h3>
            <p className="text-gray-600">Seus dados protegidos com autenticação segura e criptografia</p>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/auth/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Começar Agora
          </Link>
          <Link
            href="/auth/login"
            className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Fazer Login
          </Link>
        </div>
        
        <div className="mt-16 text-sm text-gray-500">
          <p>Desenvolvido com Next.js, Supabase e Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}