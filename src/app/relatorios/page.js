'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import Select from '@/components/ui/Select';

export default function RelatoriosPage() {
  const [tipoRelatorio, setTipoRelatorio] = useState('custos');
  const [periodoRelatorio, setPeriodoRelatorio] = useState('mes');
  const [formatoExportacao, setFormatoExportacao] = useState('pdf');
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Opções para os selects
  const tiposRelatorioOptions = [
    { value: 'custos', label: 'Relatório de Custos' },
    { value: 'produtos', label: 'Relatório de Produtos' },
    { value: 'fichas', label: 'Relatório de Fichas Técnicas' },
    { value: 'estoque', label: 'Relatório de Estoque' },
    { value: 'nutricional', label: 'Relatório Nutricional' }
  ];

  const periodosOptions = [
    { value: 'semana', label: 'Última Semana' },
    { value: 'mes', label: 'Último Mês' },
    { value: 'trimestre', label: 'Último Trimestre' },
    { value: 'ano', label: 'Último Ano' },
    { value: 'todos', label: 'Todo o Período' }
  ];

  const formatosOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'csv', label: 'CSV' }
  ];

  // Colunas para diferentes tipos de relatórios
  const colunasPorTipo = {
    custos: [
      { header: 'Ficha Técnica', accessor: 'nome' },
      { header: 'Categoria', accessor: 'categoria' },
      { header: 'Custo Total', accessor: 'custoTotal', render: (row) => `R$ ${row.custoTotal.toFixed(2).replace('.', ',')}` },
      { header: 'Custo por Porção', accessor: 'custoPorcao', render: (row) => `R$ ${row.custoPorcao.toFixed(2).replace('.', ',')}` },
      { header: 'Margem de Lucro', accessor: 'margemLucro', render: (row) => `${row.margemLucro}%` }
    ],
    produtos: [
      { header: 'Produto', accessor: 'nome' },
      { header: 'Categoria', accessor: 'categoria' },
      { header: 'Preço Unitário', accessor: 'preco', render: (row) => `R$ ${row.preco.toFixed(2).replace('.', ',')}` },
      { header: 'Estoque Atual', accessor: 'estoque' },
      { header: 'Valor em Estoque', accessor: 'valorEstoque', render: (row) => `R$ ${row.valorEstoque.toFixed(2).replace('.', ',')}` }
    ],
    fichas: [
      { header: 'Ficha Técnica', accessor: 'nome' },
      { header: 'Categoria', accessor: 'categoria' },
      { header: 'Rendimento', accessor: 'rendimento' },
      { header: 'Ingredientes', accessor: 'qtdIngredientes' },
      { header: 'Criado Por', accessor: 'criadoPor' },
      { header: 'Data de Criação', accessor: 'dataCriacao' }
    ],
    estoque: [
      { header: 'Produto', accessor: 'nome' },
      { header: 'Categoria', accessor: 'categoria' },
      { header: 'Estoque Atual', accessor: 'estoque' },
      { header: 'Estoque Mínimo', accessor: 'estoqueMinimo' },
      { header: 'Status', accessor: 'status', render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Crítico' ? 'bg-red-100 text-red-800' : row.status === 'Baixo' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {row.status}
        </span>
      )}
    ],
    nutricional: [
      { header: 'Ficha Técnica', accessor: 'nome' },
      { header: 'Calorias', accessor: 'calorias', render: (row) => `${row.calorias} kcal` },
      { header: 'Proteínas', accessor: 'proteinas', render: (row) => `${row.proteinas} g` },
      { header: 'Carboidratos', accessor: 'carboidratos', render: (row) => `${row.carboidratos} g` },
      { header: 'Gorduras', accessor: 'gorduras', render: (row) => `${row.gorduras} g` }
    ]
  };

  // Dados simulados para cada tipo de relatório
  const dadosSimulados = {
    custos: [
      { id: 1, nome: 'Risoto de Funghi', categoria: 'Pratos Principais', custoTotal: 48.75, custoPorcao: 12.19, margemLucro: 70 },
      { id: 2, nome: 'Salada Caesar', categoria: 'Entradas', custoTotal: 18.40, custoPorcao: 9.20, margemLucro: 65 },
      { id: 3, nome: 'Tiramisu', categoria: 'Sobremesas', custoTotal: 85.80, custoPorcao: 14.30, margemLucro: 80 },
      { id: 4, nome: 'Molho Pesto', categoria: 'Molhos', custoTotal: 23.40, custoPorcao: 7.80, margemLucro: 60 },
      { id: 5, nome: 'Filé ao Molho Madeira', categoria: 'Pratos Principais', custoTotal: 120.50, custoPorcao: 30.13, margemLucro: 75 }
    ],
    produtos: [
      { id: 1, nome: 'Farinha de Trigo', categoria: 'Farinhas', preco: 5.90, estoque: 45, valorEstoque: 265.50 },
      { id: 2, nome: 'Azeite Extra Virgem', categoria: 'Temperos', preco: 28.50, estoque: 12, valorEstoque: 342.00 },
      { id: 3, nome: 'Creme de Leite', categoria: 'Laticínios', preco: 3.75, estoque: 28, valorEstoque: 105.00 },
      { id: 4, nome: 'Filé Mignon', categoria: 'Carnes', preco: 65.90, estoque: 15, valorEstoque: 988.50 },
      { id: 5, nome: 'Tomate', categoria: 'Legumes', preco: 8.90, estoque: 20, valorEstoque: 178.00 }
    ],
    fichas: [
      { id: 1, nome: 'Risoto de Funghi', categoria: 'Pratos Principais', rendimento: '4 porções', qtdIngredientes: 8, criadoPor: 'Chef João Silva', dataCriacao: '10/04/2025' },
      { id: 2, nome: 'Salada Caesar', categoria: 'Entradas', rendimento: '2 porções', qtdIngredientes: 6, criadoPor: 'Nutricionista Ana Paula', dataCriacao: '12/04/2025' },
      { id: 3, nome: 'Tiramisu', categoria: 'Sobremesas', rendimento: '6 porções', qtdIngredientes: 7, criadoPor: 'Chef Patissier Maria', dataCriacao: '15/04/2025' },
      { id: 4, nome: 'Molho Pesto', categoria: 'Molhos', rendimento: '300ml', qtdIngredientes: 5, criadoPor: 'Chef João Silva', dataCriacao: '18/04/2025' },
      { id: 5, nome: 'Filé ao Molho Madeira', categoria: 'Pratos Principais', rendimento: '4 porções', qtdIngredientes: 10, criadoPor: 'Chef João Silva', dataCriacao: '20/04/2025' }
    ],
    estoque: [
      { id: 1, nome: 'Farinha de Trigo', categoria: 'Farinhas', estoque: 45, estoqueMinimo: 10, status: 'Normal' },
      { id: 2, nome: 'Azeite Extra Virgem', categoria: 'Temperos', estoque: 3, estoqueMinimo: 5, status: 'Crítico' },
      { id: 3, nome: 'Creme de Leite', categoria: 'Laticínios', estoque: 7, estoqueMinimo: 8, status: 'Baixo' },
      { id: 4, nome: 'Filé Mignon', categoria: 'Carnes', estoque: 15, estoqueMinimo: 5, status: 'Normal' },
      { id: 5, nome: 'Tomate', categoria: 'Legumes', estoque: 6, estoqueMinimo: 10, status: 'Crítico' }
    ],
    nutricional: [
      { id: 1, nome: 'Risoto de Funghi', calorias: 320, proteinas: 8, carboidratos: 45, gorduras: 12 },
      { id: 2, nome: 'Salada Caesar', calorias: 180, proteinas: 12, carboidratos: 8, gorduras: 14 },
      { id: 3, nome: 'Tiramisu', calorias: 420, proteinas: 6, carboidratos: 52, gorduras: 22 },
      { id: 4, nome: 'Molho Pesto', calorias: 120, proteinas: 3, carboidratos: 2, gorduras: 12 },
      { id: 5, nome: 'Filé ao Molho Madeira', calorias: 380, proteinas: 28, carboidratos: 12, gorduras: 24 }
    ]
  };

  // Função para gerar o relatório
  const gerarRelatorio = () => {
    setCarregando(true);
    
    // Simulando uma chamada de API
    setTimeout(() => {
      setDadosRelatorio(dadosSimulados[tipoRelatorio]);
      setCarregando(false);
    }, 1000);
  };

  // Função para exportar o relatório
  const exportarRelatorio = () => {
    alert(`Exportando relatório no formato ${formatoExportacao.toUpperCase()}`);
    // Em uma implementação real, isso geraria um arquivo para download
  };

  // Gerar relatório inicial ao carregar a página
  useEffect(() => {
    gerarRelatorio();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
      </div>
      
      {/* Filtros de Relatório */}
      <Card title="Configurações do Relatório" className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Tipo de Relatório"
            id="tipoRelatorio"
            value={tipoRelatorio}
            onChange={(e) => setTipoRelatorio(e.target.value)}
            options={tiposRelatorioOptions}
          />
          
          <Select
            label="Período"
            id="periodoRelatorio"
            value={periodoRelatorio}
            onChange={(e) => setPeriodoRelatorio(e.target.value)}
            options={periodosOptions}
          />
          
          <Select
            label="Formato de Exportação"
            id="formatoExportacao"
            value={formatoExportacao}
            onChange={(e) => setFormatoExportacao(e.target.value)}
            options={formatosOptions}
          />
          
          <div className="md:col-span-3 flex justify-end space-x-2">
            <Button 
              variant="secondary" 
              onClick={gerarRelatorio}
              disabled={carregando}
            >
              {carregando ? 'Gerando...' : 'Gerar Relatório'}
            </Button>
            
            <Button 
              onClick={exportarRelatorio}
              disabled={carregando || dadosRelatorio.length === 0}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
            >
              Exportar
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Resultados do Relatório */}
      <Card 
        title={`${tiposRelatorioOptions.find(t => t.value === tipoRelatorio)?.label} - ${periodosOptions.find(p => p.value === periodoRelatorio)?.label}`} 
        className="animate-fadeIn"
      >
        {carregando ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Carregando relatório...</p>
          </div>
        ) : (
          <>
            <Table 
              columns={colunasPorTipo[tipoRelatorio]} 
              data={dadosRelatorio} 
              emptyMessage="Nenhum dado encontrado para o relatório selecionado."
            />
            
            <div className="mt-4 text-right text-sm text-gray-500">
              <p>Relatório gerado em: {new Date().toLocaleString('pt-BR')}</p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
