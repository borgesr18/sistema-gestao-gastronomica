'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';

export default function ProdutoDetalhesPage({ params }) {
  // Em uma implementação real, buscaríamos os dados do produto pelo ID
  // Aqui estamos simulando um produto para demonstração
  const [produto, setProduto] = useState({
    id: 1,
    nome: 'Farinha de Trigo',
    marca: 'Dona Benta',
    categoria: 'Farinhas',
    unidade: 'kg',
    preco: 5.90,
    fornecedor: 'Distribuidora Alimentos SA',
    estoque: 45,
    estoqueMinimo: 10,
    observacoes: 'Farinha de trigo tipo 1, enriquecida com ferro e ácido fólico.',
    calorias: 364,
    carboidratos: 76.3,
    proteinas: 9.8,
    gordurasTotais: 1.4,
    gordurasSaturadas: 0.2,
    gordurasTrans: 0,
    fibras: 2.3,
    sodio: 1
  });

  // Simulação de fichas técnicas que usam este produto
  const fichasTecnicas = [
    { id: 1, nome: 'Pão Francês', quantidade: '500g', categoria: 'Massas' },
    { id: 2, nome: 'Bolo de Chocolate', quantidade: '200g', categoria: 'Sobremesas' },
    { id: 3, nome: 'Pizza Margherita', quantidade: '150g', categoria: 'Pratos Principais' }
  ];

  // Simulação de histórico de preços
  const historicoPrecos = [
    { data: '15/04/2025', precoAnterior: 'R$ 5,50', precoNovo: 'R$ 5,90', alteradoPor: 'Administrador' },
    { data: '10/03/2025', precoAnterior: 'R$ 5,20', precoNovo: 'R$ 5,50', alteradoPor: 'Administrador' },
    { data: '05/02/2025', precoAnterior: 'R$ 4,90', precoNovo: 'R$ 5,20', alteradoPor: 'Administrador' }
  ];

  // Colunas para a tabela de fichas técnicas
  const colunasFichas = [
    { header: 'Nome da Ficha', accessor: 'nome' },
    { header: 'Quantidade Utilizada', accessor: 'quantidade' },
    { header: 'Categoria', accessor: 'categoria' }
  ];

  // Colunas para a tabela de histórico de preços
  const colunasHistorico = [
    { header: 'Data', accessor: 'data' },
    { header: 'Preço Anterior', accessor: 'precoAnterior' },
    { header: 'Preço Novo', accessor: 'precoNovo' },
    { header: 'Alterado Por', accessor: 'alteradoPor' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Detalhes do Produto</h1>
        <div className="flex space-x-2">
          <Button 
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
          <Button>
            Editar Produto
          </Button>
        </div>
      </div>

      {/* Informações Gerais */}
      <Card title="Informações Gerais" className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-lg font-medium">{produto.nome}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Marca</p>
                <p>{produto.marca || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Categoria</p>
                <p>{produto.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Unidade de Medida</p>
                <p>{produto.unidade}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Preço por Unidade</p>
                <p className="text-lg font-medium text-green-600">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fornecedor</p>
                <p>{produto.fornecedor || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estoque Atual</p>
                <p className={`${produto.estoque < produto.estoqueMinimo ? 'text-red-600 font-medium' : ''}`}>
                  {produto.estoque} {produto.unidade}
                  {produto.estoque < produto.estoqueMinimo && ' (Abaixo do mínimo)'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estoque Mínimo</p>
                <p>{produto.estoqueMinimo} {produto.unidade}</p>
              </div>
            </div>
          </div>
          {produto.observacoes && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Observações</p>
              <p className="mt-1">{produto.observacoes}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Informações Nutricionais */}
      <Card title="Informações Nutricionais (por 100g/100ml)" className="animate-fadeIn">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Calorias</p>
            <p className="text-lg font-medium">{produto.calorias} kcal</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Carboidratos</p>
            <p>{produto.carboidratos} g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Proteínas</p>
            <p>{produto.proteinas} g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gorduras Totais</p>
            <p>{produto.gordurasTotais} g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gorduras Saturadas</p>
            <p>{produto.gordurasSaturadas} g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gorduras Trans</p>
            <p>{produto.gordurasTrans} g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Fibras</p>
            <p>{produto.fibras} g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Sódio</p>
            <p>{produto.sodio} mg</p>
          </div>
        </div>
      </Card>

      {/* Fichas Técnicas que usam este produto */}
      <Card title="Fichas Técnicas que utilizam este produto" className="animate-fadeIn">
        <Table 
          columns={colunasFichas} 
          data={fichasTecnicas} 
          emptyMessage="Este produto não é utilizado em nenhuma ficha técnica."
        />
      </Card>

      {/* Histórico de Preços */}
      <Card title="Histórico de Preços" className="animate-fadeIn">
        <Table 
          columns={colunasHistorico} 
          data={historicoPrecos} 
          emptyMessage="Não há histórico de alterações de preço para este produto."
        />
      </Card>

      {/* Imagem do Produto */}
      <Card title="Imagem do Produto" className="animate-fadeIn">
        <div className="flex justify-center">
          <div className="w-full max-w-md h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Imagem do produto não disponível</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
