'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // Dados simulados para o dashboard
  const estatisticas = {
    totalProdutos: 124,
    totalFichas: 48,
    custoMedio: 'R$ 12,75',
    produtosBaixoEstoque: 7
  };

  const fichasRecentes = [
    { id: 1, nome: 'Risoto de Funghi', categoria: 'Pratos Principais', custo: 'R$ 18,50', rendimento: '4 porções' },
    { id: 2, nome: 'Salada Caesar', categoria: 'Entradas', custo: 'R$ 9,20', rendimento: '2 porções' },
    { id: 3, nome: 'Tiramisu', categoria: 'Sobremesas', custo: 'R$ 14,30', rendimento: '6 porções' },
    { id: 4, nome: 'Molho Pesto', categoria: 'Molhos', custo: 'R$ 7,80', rendimento: '300ml' }
  ];

  const produtosMaisUsados = [
    { id: 1, nome: 'Farinha de Trigo', quantidade: '45kg', fichas: 12 },
    { id: 2, nome: 'Azeite Extra Virgem', quantidade: '12L', fichas: 18 },
    { id: 3, nome: 'Creme de Leite', quantidade: '28kg', fichas: 9 },
    { id: 4, nome: 'Sal', quantidade: '8kg', fichas: 32 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Nova Ficha Técnica
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            Novo Produto
          </button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total de Produtos</p>
              <p className="text-2xl font-semibold text-gray-800">{estatisticas.totalProdutos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Fichas Técnicas</p>
              <p className="text-2xl font-semibold text-gray-800">{estatisticas.totalFichas}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Custo Médio/Porção</p>
              <p className="text-2xl font-semibold text-gray-800">{estatisticas.custoMedio}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Baixo Estoque</p>
              <p className="text-2xl font-semibold text-gray-800">{estatisticas.produtosBaixoEstoque}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seções principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fichas Técnicas Recentes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Fichas Técnicas Recentes</h2>
            <Link href="/fichas-tecnicas" className="text-blue-600 hover:text-blue-800 text-sm">
              Ver todas
            </Link>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimento</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fichasRecentes.map((ficha) => (
                    <tr key={ficha.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                        <Link href={`/fichas-tecnicas/${ficha.id}`}>
                          {ficha.nome}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ficha.categoria}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ficha.custo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ficha.rendimento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Produtos Mais Utilizados */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Produtos Mais Utilizados</h2>
            <Link href="/produtos" className="text-blue-600 hover:text-blue-800 text-sm">
              Ver todos
            </Link>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade Usada</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fichas</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produtosMaisUsados.map((produto) => (
                    <tr key={produto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                        <Link href={`/produtos/${produto.id}`}>
                          {produto.nome}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.quantidade}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.fichas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de atividade recente - Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Gráfico de atividade será implementado aqui</p>
        </div>
      </div>
    </div>
  );
}
