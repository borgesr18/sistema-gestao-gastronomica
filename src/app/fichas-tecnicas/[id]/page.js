'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';

export default function FichaTecnicaDetalhesPage({ params }) {
  // Em uma implementação real, buscaríamos os dados da ficha técnica pelo ID
  // Aqui estamos simulando uma ficha técnica para demonstração
  const [ficha, setFicha] = useState({
    id: 1,
    nome: 'Risoto de Funghi',
    descricao: 'Risoto cremoso com cogumelos funghi, finalizado com manteiga e queijo parmesão.',
    categoria: 'Pratos Principais',
    rendimento: '4 porções',
    tempoPreparo: 45,
    custoTotal: 48.75,
    custoPorcao: 12.19,
    criadoPor: 'Chef João Silva',
    dataCriacao: '10/04/2025',
    modoPreparo: `1. Em uma panela, aqueça o azeite e refogue a cebola e o alho até ficarem transparentes.
2. Adicione o arroz e refogue por 2 minutos, mexendo sempre.
3. Adicione o vinho branco e mexa até evaporar.
4. Adicione os cogumelos hidratados e a água do molho (filtrada).
5. Comece a adicionar o caldo de legumes, uma concha por vez, mexendo sempre e esperando o arroz absorver o líquido antes de adicionar mais.
6. Continue esse processo por aproximadamente 18 minutos, até o arroz ficar al dente.
7. Retire do fogo, adicione a manteiga e o queijo parmesão, misture bem.
8. Tempere com sal e pimenta a gosto.
9. Sirva imediatamente, decorado com mais queijo parmesão ralado e folhas de salsa.`,
    observacoes: 'Para um sabor mais intenso, utilize cogumelos frescos junto com os secos. O risoto deve ser servido imediatamente após o preparo.'
  });

  // Ingredientes simulados para a ficha técnica
  const ingredientes = [
    { id: 1, produto: 'Arroz Arbóreo', quantidade: '400g', custo: 'R$ 12,00', observacao: 'Lavado e escorrido' },
    { id: 2, produto: 'Cogumelos Funghi Secos', quantidade: '50g', custo: 'R$ 18,50', observacao: 'Hidratados em água morna por 20 minutos' },
    { id: 3, produto: 'Cebola', quantidade: '1 unidade', custo: 'R$ 1,20', observacao: 'Picada finamente' },
    { id: 4, produto: 'Alho', quantidade: '2 dentes', custo: 'R$ 0,80', observacao: 'Picado' },
    { id: 5, produto: 'Vinho Branco Seco', quantidade: '100ml', custo: 'R$ 5,00', observacao: 'De boa qualidade' },
    { id: 6, produto: 'Queijo Parmesão', quantidade: '80g', custo: 'R$ 8,00', observacao: 'Ralado' },
    { id: 7, produto: 'Manteiga', quantidade: '30g', custo: 'R$ 1,50', observacao: 'Sem sal' },
    { id: 8, produto: 'Azeite Extra Virgem', quantidade: '30ml', custo: 'R$ 1,75', observacao: '' },
  ];

  // Colunas para a tabela de ingredientes
  const colunasIngredientes = [
    { header: 'Produto', accessor: 'produto' },
    { header: 'Quantidade', accessor: 'quantidade' },
    { header: 'Custo', accessor: 'custo' },
    { header: 'Observação', accessor: 'observacao' }
  ];

  // Informações nutricionais simuladas
  const infoNutricional = {
    calorias: 320,
    carboidratos: 45,
    proteinas: 8,
    gordurasTotais: 12,
    gordurasSaturadas: 5,
    gordurasTrans: 0,
    fibras: 2,
    sodio: 380
  };

  // Função para imprimir a ficha técnica
  const imprimirFicha = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <h1 className="text-2xl font-bold text-gray-800">Detalhes da Ficha Técnica</h1>
        <div className="flex space-x-2">
          <Button 
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
          <Button 
            onClick={() => window.location.href = `/fichas-tecnicas/editar/${ficha.id}`}
          >
            Editar
          </Button>
          <Button 
            onClick={imprimirFicha}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            }
          >
            Imprimir
          </Button>
        </div>
      </div>

      {/* Versão para impressão */}
      <div className="print-only text-center mb-6 hidden">
        <h1 className="text-3xl font-bold">Meu Restaurante</h1>
        <p className="text-gray-600">Ficha Técnica de Preparação</p>
      </div>

      {/* Ficha Técnica */}
      <div className="ficha-tecnica-print">
        {/* Cabeçalho da Ficha */}
        <Card className="animate-fadeIn">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">{ficha.nome}</h2>
            <p className="text-gray-600">{ficha.descricao}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Categoria</p>
                <p>{ficha.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rendimento</p>
                <p>{ficha.rendimento}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tempo de Preparo</p>
                <p>{ficha.tempoPreparo} minutos</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Custo por Porção</p>
                <p className="font-medium text-green-600">R$ {ficha.custoPorcao.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Ingredientes */}
        <Card title="Ingredientes" className="animate-fadeIn mt-6">
          <Table 
            columns={colunasIngredientes} 
            data={ingredientes} 
            emptyMessage="Nenhum ingrediente adicionado."
          />
          <div className="mt-4 text-right">
            <p className="text-lg font-medium">
              Custo Total: R$ {ficha.custoTotal.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </Card>

        {/* Modo de Preparo */}
        <Card title="Modo de Preparo" className="animate-fadeIn mt-6">
          <div className="bg-gray-50 p-4 rounded-md">
            {ficha.modoPreparo.split('\n').map((step, index) => (
              <p key={index} className="mb-2">{step}</p>
            ))}
          </div>
        </Card>

        {/* Informações Nutricionais */}
        <Card title="Informações Nutricionais (por porção)" className="animate-fadeIn mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Calorias</p>
              <p>{infoNutricional.calorias} kcal</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Carboidratos</p>
              <p>{infoNutricional.carboidratos} g</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Proteínas</p>
              <p>{infoNutricional.proteinas} g</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gorduras Totais</p>
              <p>{infoNutricional.gordurasTotais} g</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gorduras Saturadas</p>
              <p>{infoNutricional.gordurasSaturadas} g</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gorduras Trans</p>
              <p>{infoNutricional.gordurasTrans} g</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fibras</p>
              <p>{infoNutricional.fibras} g</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sódio</p>
              <p>{infoNutricional.sodio} mg</p>
            </div>
          </div>
        </Card>

        {/* Observações */}
        {ficha.observacoes && (
          <Card title="Observações" className="animate-fadeIn mt-6">
            <p className="text-gray-700">{ficha.observacoes}</p>
          </Card>
        )}

        {/* Informações de Criação */}
        <Card className="animate-fadeIn mt-6">
          <div className="text-sm text-gray-500">
            <p>Criado por: {ficha.criadoPor}</p>
            <p>Data de criação: {ficha.dataCriacao}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
