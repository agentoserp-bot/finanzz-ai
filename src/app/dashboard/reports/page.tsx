'use client';

import { useState } from 'react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [period, setPeriod] = useState('current');
  
  // Dados fictícios para os gráficos
  const monthlyData = {
    income: [3500, 4000, 3800, 4200, 3900, 4100],
    expense: [2800, 3200, 2900, 3100, 3000, 3300],
    months: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
  };
  
  const categoryData = {
    labels: ['Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Lazer', 'Outros'],
    values: [800, 600, 400, 300, 200, 500],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
      
      {/* Filtros de relatório */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Relatório</label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Mensal</option>
              <option value="category">Por Categoria</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current">Mês Atual</option>
              <option value="last3">Últimos 3 Meses</option>
              <option value="last6">Últimos 6 Meses</option>
              <option value="year">Ano Atual</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              type="button"
              className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receitas x Despesas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Receitas x Despesas</h2>
          <div className="h-64 flex items-end justify-around">
            {monthlyData.months.map((month, index) => (
              <div key={month} className="flex flex-col items-center w-1/6">
                <div className="w-full flex flex-col items-center space-y-1">
                  <div 
                    className="w-8 bg-green-500" 
                    style={{ height: `${(monthlyData.income[index] / 5000) * 200}px` }}
                    title={`Receita: R$ ${monthlyData.income[index].toFixed(2)}`}
                  ></div>
                  <div 
                    className="w-8 bg-red-500" 
                    style={{ height: `${(monthlyData.expense[index] / 5000) * 200}px` }}
                    title={`Despesa: R$ ${monthlyData.expense[index].toFixed(2)}`}
                  ></div>
                </div>
                <span className="text-xs mt-2">{month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span className="text-sm">Receitas</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span className="text-sm">Despesas</span>
            </div>
          </div>
        </div>
        
        {/* Gráfico de Despesas por Categoria */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Despesas por Categoria</h2>
          <div className="h-64 flex items-end justify-around">
            {categoryData.labels.map((category, index) => (
              <div key={category} className="flex flex-col items-center w-1/6">
                <div 
                  className="w-12 bg-blue-500" 
                  style={{ height: `${(categoryData.values[index] / 1000) * 200}px` }}
                  title={`${category}: R$ ${categoryData.values[index].toFixed(2)}`}
                ></div>
                <span className="text-xs mt-2 text-center">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resumo do relatório */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Resumo Financeiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium text-gray-900">Total de Receitas</h3>
            <p className="text-2xl font-bold text-green-600">R$ 23.500,00</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium text-gray-900">Total de Despesas</h3>
            <p className="text-2xl font-bold text-red-600">R$ 18.300,00</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium text-gray-900">Saldo</h3>
            <p className="text-2xl font-bold text-blue-600">R$ 5.200,00</p>
          </div>
        </div>
      </div>
      
      {/* Ações */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Exportar PDF
        </button>
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Exportar CSV
        </button>
      </div>
    </div>
  );
}