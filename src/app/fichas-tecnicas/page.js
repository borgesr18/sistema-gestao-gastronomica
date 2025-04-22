'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';

export default function FichasTecnicasPage() {
  // Estados para gerenciar a lista de fichas técnicas e filtros
  const [fichas, setFichas] = useState([
    { 
      id: 1, 
      nome: 'Risoto de Funghi', 
      categoria: 'Pratos Principais', 
      rendimento: '4 porções', 
      tempoPreparo: 45, 
      custoTotal: 48.75, 
      custoPorcao: 12.19,
      criadoPor: 'Chef João Silva',
      dataCriacao: '10/04/2025'
    },
    { 
      id: 2, 
      nome: 'Salada Caesar', 
      categoria: 'Entradas', 
      rendimento: '2 porções', 
      tempoPreparo: 20, 
      custoTotal: 18.40, 
      custoPorcao: 9.20,
      criadoPor: 'Nutricionista Ana Paula',
      dataCriacao: '12/04/2025'
    },
    { 
      id: 3, 
      nome: 'Tiramisu', 
      categoria: 'Sobremesas', 
      rendimento: '6 porções', 
      tempoPreparo: 30, 
      custoTotal: 85.80, 
      custoPorcao: 14.30,
      criadoPor: 'Chef Patissier Maria',
      dataCriacao: '15/04/2025'
    },
    { 
      id: 4, 
      nome: 'Molho Pesto', 
      categoria: 'Molhos', 
      rendimento: '300ml', 
      tempoPreparo: 15, 
      custoTotal: 23.40, 
      custoPorcao: 7.80,
      criadoPor: 'Chef João Silva',
      dataCriacao: '18/04/2025'
    },
  ]);
  
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  
  // Estado para o modal de nova ficha técnica
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizacao, setModalVisualizacao] = useState(false);
  const [fichaAtual, setFichaAtual] = useState({
    id: null,
    nome: '',
    descricao: '',
    categoria: '',
    modoPreparo: '',
    tempoPreparo: '',
    rendimentoTotal: '',
    unidadeRendimento: '',
    observacoes: '',
    ingredientes: []
  });
  
  // Estado para o modal de adicionar ingrediente
  const [modalIngrediente, setModalIngrediente] = useState(false);
  const [ingredienteAtual, setIngredienteAtual] = useState({
    id: null,
    produto: '',
    quantidade: '',
    observacao: ''
  });
  
  // Opções para os selects
  const categoriasOptions = [
    { value: 'Entradas', label: 'Entradas' },
    { value: 'Pratos Principais', label: 'Pratos Principais' },
    { value: 'Sobremesas', label: 'Sobremesas' },
    { value: 'Bebidas', label: 'Bebidas' },
    { value: 'Molhos', label: 'Molhos' },
    { value: 'Massas', label: 'Massas' },
  ];
  
  const unidadesRendimentoOptions = [
    { value: 'porções', label: 'Porções' },
    { value: 'unidades', label: 'Unidades' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'l', label: 'Litros (l)' },
    { value: 'g', label: 'Gramas (g)' },
    { value: 'kg', label: 'Quilogramas (kg)' },
  ];
  
  // Produtos simulados para seleção de ingredientes
  const produtosOptions = [
    { value: 1, label: 'Farinha de Trigo' },
    { value: 2, label: 'Azeite Extra Virgem' },
    { value: 3, label: 'Creme de Leite' },
    { value: 4, label: 'Filé Mignon' },
    { value: 5, label: 'Tomate' },
    { value: 6, label: 'Cogumelos Funghi Secos' },
    { value: 7, label: 'Arroz Arbóreo' },
    { value: 8, label: 'Cebola' },
    { value: 9, label: 'Alho' },
    { value: 10, label: 'Vinho Branco Seco' },
    { value: 11, label: 'Queijo Parmesão' },
    { value: 12, label: 'Manteiga' },
    { value: 13, label: 'Sal' },
    { value: 14, label: 'Pimenta do Reino' },
  ];
  
  // Ingredientes simulados para a ficha técnica
  const [ingredientesSimulados, setIngredientesSimulados] = useState([
    { id: 1, produto: 'Arroz Arbóreo', quantidade: '400g', custo: 'R$ 12,00', observacao: 'Lavado e escorrido' },
    { id: 2, produto: 'Cogumelos Funghi Secos', quantidade: '50g', custo: 'R$ 18,50', observacao: 'Hidratados em água morna por 20 minutos' },
    { id: 3, produto: 'Cebola', quantidade: '1 unidade', custo: 'R$ 1,20', observacao: 'Picada finamente' },
    { id: 4, produto: 'Alho', quantidade: '2 dentes', custo: 'R$ 0,80', observacao: 'Picado' },
    { id: 5, produto: 'Vinho Branco Seco', quantidade: '100ml', custo: 'R$ 5,00', observacao: 'De boa qualidade' },
    { id: 6, produto: 'Queijo Parmesão', quantidade: '80g', custo: 'R$ 8,00', observacao: 'Ralado' },
    { id: 7, produto: 'Manteiga', quantidade: '30g', custo: 'R$ 1,50', observacao: 'Sem sal' },
    { id: 8, produto: 'Azeite Extra Virgem', quantidade: '30ml', custo: 'R$ 1,75', observacao: '' },
  ]);
  
  // Colunas para a tabela de fichas técnicas
  const colunas = [
    { 
      header: 'Nome', 
      accessor: 'nome',
      render: (row) => (
        <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => abrirVisualizacao(row)}>
          {row.nome}
        </span>
      )
    },
    { header: 'Categoria', accessor: 'categoria' },
    { header: 'Rendimento', accessor: 'rendimento' },
    { 
      header: 'Tempo de Preparo', 
      accessor: 'tempoPreparo',
      render: (row) => `${row.tempoPreparo} min`
    },
    { 
      header: 'Custo Total', 
      accessor: 'custoTotal',
      render: (row) => `R$ ${row.custoTotal.toFixed(2).replace('.', ',')}`
    },
    { 
      header: 'Custo por Porção', 
      accessor: 'custoPorcao',
      render: (row) => `R$ ${row.custoPorcao.toFixed(2).replace('.', ',')}`
    },
    {
      header: 'Ações',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              editarFicha(row);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              imprimirFicha(row.id);
            }}
            className="text-green-600 hover:text-green-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              excluirFicha(row.id);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    }
  ];
  
  // Colunas para a tabela de ingredientes
  const colunasIngredientes = [
    { header: 'Produto', accessor: 'produto' },
    { header: 'Quantidade', accessor: 'quantidade' },
    { header: 'Custo', accessor: 'custo' },
    { header: 'Observação', accessor: 'observacao' },
    {
      header: 'Ações',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => editarIngrediente(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => removerIngrediente(row.id)}
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    }
  ];
  
  // Funções para manipulação de fichas técnicas
  const filtrarFichas = () => {
    return fichas.filter(ficha => {
      const nomeMatch = ficha.nome.toLowerCase().includes(filtroNome.toLowerCase());
      const categoriaMatch = filtroCategoria === '' || ficha.categoria === filtroCategoria;
      return nomeMatch && categoriaMatch;
    });
  };
  
  const abrirModalNovaFicha = () => {
    setFichaAtual({
      id: null,
      nome: '',
      descricao: '',
      categoria: '',
      modoPreparo: '',
      tempoPreparo: '',
      rendimentoTotal: '',
      unidadeRendimento: '',
      observacoes: '',
      ingredientes: []
    });
    setIngredientesSimulados([]);
    setModalAberto(true);
  };
  
  const editarFicha = (ficha) => {
    setFichaAtual({
      ...ficha,
      tempoPreparo: ficha.tempoPreparo.toString(),
      rendimentoTotal: ficha.rendimento.split(' ')[0],
      unidadeRendimento: ficha.rendimento.split(' ')[1],
      ingredientes: ingredientesSimulados
    });
    setModalAberto(true);
  };
  
  const abrirVisualizacao = (ficha) => {
    setFichaAtual({
      ...ficha,
      tempoPreparo: ficha.tempoPreparo.toString(),
      rendimentoTotal: ficha.rendimento.split(' ')[0],
      unidadeRendimento: ficha.rendimento.split(' ')[1],
      ingredientes: ingredientesSimulados,
      modoPreparo: `1. Em uma panela, aqueça o azeite e refogue a cebola e o alho até ficarem transparentes.
2. Adicione o arroz e refogue por 2 minutos, mexendo sempre.
3. Adicione o vinho branco e mexa até evaporar.
4. Adicione os cogumelos hidratados e a água do molho (filtrada).
5. Comece a adicionar o caldo de legumes, uma concha por vez, mexendo sempre e esperando o arroz absorver o líquido antes de adicionar mais.
6. Continue esse processo por aproximadamente 18 minutos, até o arroz ficar al dente.
7. Retire do fogo, adicione a manteiga e o queijo parmesão, misture bem.
8. Tempere com sal e pimenta a gosto.
9. Sirva imediatamente, decorado com mais queijo parmesão ralado e folhas de salsa.`,
      descricao: 'Risoto cremoso com cogumelos funghi, finalizado com manteiga e queijo parmesão.'
    });
    setModalVisualizacao(true);
  };
  
  const salvarFicha = () => {
    const novaFicha = {
      ...fichaAtual,
      tempoPreparo: parseInt(fichaAtual.tempoPreparo),
      rendimento: `${fichaAtual.rendimentoTotal} ${fichaAtual.unidadeRendimento}`,
      custoTotal: calcularCustoTotal(),
      custoPorcao: calcularCustoPorcao()
    };
    
    if (fichaAtual.id) {
      // Editar ficha existente
      setFichas(fichas.map(f => f.id === fichaAtual.id ? novaFicha : f));
    } else {
      // Adicionar nova ficha
      const novoId = Math.max(...fichas.map(f => f.id), 0) + 1;
      const novaFichaCompleta = {
        ...novaFicha,
        id: novoId,
        criadoPor: 'Usuário Atual',
        dataCriacao: new Date().toLocaleDateString('pt-BR')
      };
      setFichas([...fichas, novaFichaCompleta]);
    }
    
    setModalAberto(false);
  };
  
  const excluirFicha = (id) => {
    if (confirm('Tem certeza que deseja excluir esta ficha técnica?')) {
      setFichas(fichas.filter(f => f.id !== id));
    }
  };
  
  const imprimirFicha = (id) => {
    // Em uma implementação real, isso abriria uma janela de impressão
    alert(`Imprimindo ficha técnica ID: ${id}`);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFichaAtual({
      ...fichaAtual,
      [name]: value
    });
  };
  
  // Funções para manipulação de ingredientes
  const abrirModalIngrediente = () => {
    setIngredienteAtual({
      id: null,
      produto: '',
      quantidade: '',
      observacao: ''
    });
    setModalIngrediente(true);
  };
  
  const editarIngrediente = (ingrediente) => {
    setIngredienteAtual({
      id: ingrediente.id,
      produto: ingrediente.produto,
      quantidade: ingrediente.quantidade,
      observacao: ingrediente.observacao
    });
    setModalIngrediente(true);
  };
  
  const salvarIngrediente = () => {
    const novoIngrediente = {
      ...ingredienteAtual,
      custo: `R$ ${(Math.random() * 20).toFixed(2).replace('.', ',')}`  // Simulando um custo
    };
    
    if (ingredienteAtual.id) {
      // Editar ingrediente existente
      setIngredientesSimulados(ingredientesSimulados.map(i => i.id === ingredienteAtual.id ? novoIngrediente : i));
    } else {
      // Adicionar novo ingrediente
      const novoId = Math.max(...ingredientesSimulados.map(i => i.id), 0) + 1;
      setIngredientesSimulados([...ingredientesSimulados, { ...novoIngrediente, id: novoId }]);
    }
    
    setModalIngrediente(false);
  };
  
  const removerIngrediente = (id) => {
    setIngredientesSimulados(ingredientesSimulados.filter(i => i.id !== id));
  };
  
  const handleIngredienteChange = (e) => {
    const { name, value } = e.target;
    setIngredienteAtual({
      ...ingredienteAtual,
      [name]: value
    });
  };
  
  // Funções para cálculos
  const calcularCustoTotal = () => {
    // Em uma implementação real, isso somaria os custos dos ingredientes
    return ingredientesSimulados.reduce((total, ingrediente) => {
      const custo = parseFloat(ingrediente.custo.replace('R$ ', '').replace(',', '.'));
      return total + custo;
    }, 0);
  };
  
  const calcularCustoPorcao = () => {
    const custoTotal = calcularCustoTotal();
    const rendimento = parseInt(fichaAtual.rendimentoTotal) || 1;
    return custoTotal / rendimento;
  };
  
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Fichas Técnicas</h1>
        <Button 
          onClick={abrirModalNovaFicha}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          Nova Ficha Técnica
        </Button>
      </div>
      
      {/* Filtros */}
      <Card title="Filtros" className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Nome da Ficha Técnica"
            id="filtroNome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            placeholder="Digite para buscar..."
          />
          <Select
            label="Categoria"
            id="filtroCategoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            options={[{ value: '', label: 'Todas as categorias' }, ...categoriasOptions]}
          />
          <div className="flex items-end">
            <Button 
              variant="secondary" 
              onClick={() => {
                setFiltroNome('');
                setFiltroCategoria('');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Tabela de Fichas Técnicas */}
      <Card title="Fichas Técnicas Cadastradas" className="animate-fadeIn">
        <Table 
          columns={colunas} 
          data={filtrarFichas()} 
          emptyMessage="Nenhuma ficha técnica encontrada com os filtros aplicados."
          onRowClick={abrirVisualizacao}
        />
      </Card>
      
      {/* Modal de Cadastro/Edição de Ficha Técnica */}
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title={fichaAtual.id ? `Editar Ficha Técnica: ${fichaAtual.nome}` : 'Nova Ficha Técnica'}
        size="xl"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalAberto(false)}>Cancelar</Button>
            <Button onClick={salvarFicha}>Salvar</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Nome da Ficha Técnica"
              id="nome"
              name="nome"
              value={fichaAtual.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <Textarea
              label="Descrição"
              id="descricao"
              name="descricao"
              value={fichaAtual.descricao}
              onChange={handleInputChange}
              rows={2}
            />
          </div>
          
          <Select
            label="Categoria"
            id="categoria"
            name="categoria"
            value={fichaAtual.categoria}
            onChange={handleInputChange}
            options={categoriasOptions}
            required
          />
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                label="Rendimento"
                id="rendimentoTotal"
                name="rendimentoTotal"
                type="number"
                value={fichaAtual.rendimentoTotal}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex-1">
              <Select
                label="Unidade"
                id="unidadeRendimento"
                name="unidadeRendimento"
                value={fichaAtual.unidadeRendimento}
                onChange={handleInputChange}
                options={unidadesRendimentoOptions}
                required
              />
            </div>
          </div>
          
          <Input
            label="Tempo de Preparo (minutos)"
            id="tempoPreparo"
            name="tempoPreparo"
            type="number"
            value={fichaAtual.tempoPreparo}
            onChange={handleInputChange}
            required
          />
          
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800">Ingredientes</h3>
              <Button 
                size="sm" 
                onClick={abrirModalIngrediente}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Adicionar Ingrediente
              </Button>
            </div>
            <Table 
              columns={colunasIngredientes} 
              data={ingredientesSimulados} 
              emptyMessage="Nenhum ingrediente adicionado. Clique em 'Adicionar Ingrediente' para começar."
            />
            
            {ingredientesSimulados.length > 0 && (
              <div className="mt-4 text-right">
                <p className="text-lg font-medium">
                  Custo Total: R$ {calcularCustoTotal().toFixed(2).replace('.', ',')}
                </p>
                <p className="text-sm text-gray-600">
                  Custo por {fichaAtual.unidadeRendimento || 'porção'}: R$ {calcularCustoPorcao().toFixed(2).replace('.', ',')}
                </p>
              </div>
            )}
          </div>
          
          <div className="md:col-span-2">
            <Textarea
              label="Modo de Preparo"
              id="modoPreparo"
              name="modoPreparo"
              value={fichaAtual.modoPreparo}
              onChange={handleInputChange}
              rows={8}
              required
              helpText="Descreva o passo a passo da preparação. Use números para os passos (1., 2., etc)."
            />
          </div>
          
          <div className="md:col-span-2">
            <Textarea
              label="Observações"
              id="observacoes"
              name="observacoes"
              value={fichaAtual.observacoes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
        </div>
      </Modal>
      
      {/* Modal de Adicionar/Editar Ingrediente */}
      <Modal
        isOpen={modalIngrediente}
        onClose={() => setModalIngrediente(false)}
        title={ingredienteAtual.id ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}
        size="md"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalIngrediente(false)}>Cancelar</Button>
            <Button onClick={salvarIngrediente}>Salvar</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select
            label="Produto"
            id="produto"
            name="produto"
            value={ingredienteAtual.produto}
            onChange={handleIngredienteChange}
            options={produtosOptions.map(p => ({ value: p.label, label: p.label }))}
            required
          />
          
          <Input
            label="Quantidade"
            id="quantidade"
            name="quantidade"
            value={ingredienteAtual.quantidade}
            onChange={handleIngredienteChange}
            required
            helpText="Ex: 200g, 1 unidade, 30ml"
          />
          
          <Textarea
            label="Observação"
            id="observacao"
            name="observacao"
            value={ingredienteAtual.observacao}
            onChange={handleIngredienteChange}
            rows={2}
            helpText="Ex: picado, fatiado, temperatura ambiente"
          />
        </div>
      </Modal>
      
      {/* Modal de Visualização de Ficha Técnica */}
      <Modal
        isOpen={modalVisualizacao}
        onClose={() => setModalVisualizacao(false)}
        title={`Ficha Técnica: ${fichaAtual.nome}`}
        size="xl"
        footer={
          <div className="flex justify-end space-x-2">
            <Button 
              variant="secondary" 
              onClick={() => setModalVisualizacao(false)}
            >
              Fechar
            </Button>
            <Button 
              variant="secondary"
              onClick={() => {
                setModalVisualizacao(false);
                editarFicha(fichaAtual);
              }}
            >
              Editar
            </Button>
            <Button 
              onClick={() => imprimirFicha(fichaAtual.id)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              }
            >
              Imprimir
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Cabeçalho da Ficha */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">{fichaAtual.nome}</h2>
            <p className="text-gray-600">{fichaAtual.descricao}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Categoria</p>
                <p>{fichaAtual.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rendimento</p>
                <p>{fichaAtual.rendimentoTotal} {fichaAtual.unidadeRendimento}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tempo de Preparo</p>
                <p>{fichaAtual.tempoPreparo} minutos</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Custo por Porção</p>
                <p className="font-medium text-green-600">R$ {fichaAtual.custoPorcao?.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          </div>
          
          {/* Ingredientes */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Ingredientes</h3>
            <Table 
              columns={colunasIngredientes.filter(col => col.accessor !== 'acoes')} 
              data={ingredientesSimulados} 
              emptyMessage="Nenhum ingrediente adicionado."
            />
          </div>
          
          {/* Modo de Preparo */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Modo de Preparo</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {fichaAtual.modoPreparo?.split('\n').map((step, index) => (
                <p key={index} className="mb-2">{step}</p>
              ))}
            </div>
          </div>
          
          {/* Informações Nutricionais */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Informações Nutricionais (por porção)</h3>
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
          </div>
          
          {/* Observações */}
          {fichaAtual.observacoes && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Observações</h3>
              <p className="text-gray-700">{fichaAtual.observacoes}</p>
            </div>
          )}
          
          {/* Informações de Criação */}
          <div className="border-t pt-4 text-sm text-gray-500">
            <p>Criado por: {fichaAtual.criadoPor}</p>
            <p>Data de criação: {fichaAtual.dataCriacao}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
