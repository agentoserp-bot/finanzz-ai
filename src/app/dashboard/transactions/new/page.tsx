'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const transactionSchema = z.object({
  description: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres'),
  amount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'O valor deve ser um número positivo',
  }),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Selecione uma categoria'),
  date: z.string().min(1, 'Selecione uma data'),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

export default function NewTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'expense';
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      amount: '',
      type: typeParam as 'income' | 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    setValue('type', typeParam as 'income' | 'expense');
  }, [typeParam, setValue]);

  const incomeCategories = [
    'Salário',
    'Freelance',
    'Investimentos',
    'Presente',
    'Outros',
  ];

  const expenseCategories = [
    'Moradia',
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Serviços',
    'Outros',
  ];

  const onSubmit = async (data: TransactionFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      
      // Converter o valor para número e aplicar sinal negativo se for despesa
      const amount = parseFloat(data.amount);
      const finalAmount = data.type === 'expense' ? -amount : amount;
      
      // Aqui você inseriria a transação no Supabase
      // Por enquanto, vamos apenas simular o sucesso
      
      // const { error: insertError } = await supabase
      //   .from('transactions')
      //   .insert({
      //     user_id: (await supabase.auth.getUser()).data.user?.id,
      //     description: data.description,
      //     amount: finalAmount,
      //     type: data.type,
      //     category: data.category,
      //     date: data.date,
      //   });
      
      // if (insertError) {
      //   throw new Error(insertError.message);
      // }
      
      // Redirecionar para a página de transações após o sucesso
      router.push('/dashboard/transactions');
      router.refresh();
    } catch (err) {
      setError('Ocorreu um erro ao salvar a transação. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {typeParam === 'income' ? 'Nova Receita' : 'Nova Despesa'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input
              id="description"
              type="text"
              {...register('description')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              {...register('amount')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.amount && (
              <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              id="type"
              {...register('type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
            {errors.type && (
              <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              id="category"
              {...register('category')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="">Selecione uma categoria</option>
              {typeParam === 'income'
                ? incomeCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                : expenseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              id="date"
              type="date"
              {...register('date')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${typeParam === 'income' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'}`}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}