'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';

export default function ProdutosPage() {
  // Estados para gerenciar a lista de produtos e filtros
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Farinha de Trigo', marca: 'Dona Benta', categoria: 'Farinhas', unidade: 'kg', preco: 5.90, fornecedor: 'Distribuidora Alimentos SA' },
    { id: 2, nome: 'Azeite Extra Virgem', marca: 'Gallo', categoria: 'Temperos', unidade: 'l', preco: 28.50, fornecedor: 'Importadora Mediterrâneo' },
    { id: 3, nome: 'Creme de Leite', marca: 'Nestlé', categoria: 'Laticínios', unidade: 'g', preco: 3.75, fornecedor: 'Laticínios Brasil' },
    { id: 4, nome: 'Filé Mignon', marca: 'Premium Carnes', categoria: 'Carnes', unidade: 'kg', preco: 65.90, fornecedor: 'Frigorífico Central' },
    { id: 5, nome: 'Tomate', marca: 'Orgânicos do Vale', categoria: 'Legumes', unidade: 'kg', preco: 8.90, fornecedor: 'Hortifruti Distribuidora' },
  ]);
  
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  
  // Estado para o modal de novo produto
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizacao, setModalVisualizacao] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState({
    id: null,
    nome: '',
    marca: '',
    categoria: '',
    unidade: '',
    preco: '',
    fornecedor: '',
    estoque: '',
    estoqueMinimo: '',
    observacoes: '',
    // Campos para informações nutricionais
    calorias: '',
    carboidratos: '',
    proteinas: '',
    gordurasTotais: '',
    gordurasSaturadas: '',
    gordurasTrans: '',
    fibras: '',
    sodio: ''
  });
  
  // Opções para os selects
  const categoriasOptions = [
    { value: 'Carnes', label: 'Carnes' },
    { value: 'Laticínios', label: 'Laticínios' },
    { value: 'Grãos', label: 'Grãos' },
    { value: 'Farinhas', label: 'Farinhas' },
    { value: 'Frutas', label: 'Frutas' },
    { value: 'Legumes', label: 'Legumes' },
    { value: 'Temperos', label: 'Temperos' },
    { value: 'Bebidas', label: 'Bebidas' },
  ];
  
  const unidadesOptions = [
    { value: 'g', label: 'Gramas (g)' },
    { value: 'kg', label: 'Quilogramas (kg)' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'l', label: 'Litros (l)' },
    { value: 'un', label: 'Unidade (un)' },
    { value: 'cs', label: 'Colher de Sopa (cs)' },
    { value: 'cc', label: 'Colher de Chá (cc)' },
    { value: 'xic', label: 'Xícara (xic)' },
  ];
  
  const fornecedoresOptions = [
    { value: 'Distribuidora Alimentos SA', label: 'Distribuidora Alimentos SA' },
    { value: 'Importadora Mediterrâneo', label: 'Importadora Mediterrâneo' },
    { value: 'Laticínios Brasil', label: 'Laticínios Brasil' },
    { value: 'Frigorífico Central', label: 'Frigorífico Central' },
    { value: 'Hortifruti Distribuidora', label: 'Hortifruti Distribuidora' },
  ];
  
  // Colunas para a tabela de produtos
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
    { header: 'Marca', accessor: 'marca' },
    { header: 'Categoria', accessor: 'categoria' },
    { header: 'Unidade', accessor: 'unidade' },
    { 
      header: 'Preço', 
      accessor: 'preco',
      render: (row) => `R$ ${row.preco.toFixed(2).replace('.', ',')}`
    },
    { header: 'Fornecedor', accessor: 'fornecedor' },
    {
      header: 'Ações',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              editarProduto(row);
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
              excluirProduto(row.id);
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
  
  // Funções para manipulação de produtos
  const filtrarProdutos = () => {
    return produtos.filter(produto => {
      const nomeMatch = produto.nome.toLowerCase().includes(filtroNome.toLowerCase());
      const categoriaMatch = filtroCategoria === '' || produto.categoria === filtroCategoria;
      return nomeMatch && categoriaMatch;
    });
  };
  
  const abrirModalNovoProduto = () => {
    setProdutoAtual({
      id: null,
      nome: '',
      marca: '',
      categoria: '',
      unidade: '',
      preco: '',
      fornecedor: '',
      estoque: '',
      estoqueMinimo: '',
      observacoes: '',
      calorias: '',
      carboidratos: '',
      proteinas: '',
      gordurasTotais: '',
      gordurasSaturadas: '',
      gordurasTrans: '',
      fibras: '',
      sodio: ''
    });
    setModalAberto(true);
  };
  
  const editarProduto = (produto) => {
    setProdutoAtual({
      ...produto,
      preco: produto.preco.toString(),
      estoque: produto.estoque ? produto.estoque.toString() : '',
      estoqueMinimo: produto.estoqueMinimo ? produto.estoqueMinimo.toString() : '',
      calorias: produto.calorias ? produto.calorias.toString() : '',
      carboidratos: produto.carboidratos ? produto.carboidratos.toString() : '',
      proteinas: produto.proteinas ? produto.proteinas.toString() : '',
      gordurasTotais: produto.gordurasTotais ? produto.gordurasTotais.toString() : '',
      gordurasSaturadas: produto.gordurasSaturadas ? produto.gordurasSaturadas.toString() : '',
      gordurasTrans: produto.gordurasTrans ? produto.gordurasTrans.toString() : '',
      fibras: produto.fibras ? produto.fibras.toString() : '',
      sodio: produto.sodio ? produto.sodio.toString() : ''
    });
    setModalAberto(true);
  };
  
  const abrirVisualizacao = (produto) => {
    setProdutoAtual(produto);
    setModalVisualizacao(true);
  };
  
  const salvarProduto = () => {
    const novoProduto = {
      ...produtoAtual,
      preco: parseFloat(produtoAtual.preco),
      estoque: produtoAtual.estoque ? parseFloat(produtoAtual.estoque) : 0,
      estoqueMinimo: produtoAtual.estoqueMinimo ? parseFloat(produtoAtual.estoqueMinimo) : 0,
      calorias: produtoAtual.calorias ? parseFloat(produtoAtual.calorias) : 0,
      carboidratos: produtoAtual.carboidratos ? parseFloat(produtoAtual.carboidratos) : 0,
      proteinas: produtoAtual.proteinas ? parseFloat(produtoAtual.proteinas) : 0,
      gordurasTotais: produtoAtual.gordurasTotais ? parseFloat(produtoAtual.gordurasTotais) : 0,
      gordurasSaturadas: produtoAtual.gordurasSaturadas ? parseFloat(produtoAtual.gordurasSaturadas) : 0,
      gordurasTrans: produtoAtual.gordurasTrans ? parseFloat(produtoAtual.gordurasTrans) : 0,
      fibras: produtoAtual.fibras ? parseFloat(produtoAtual.fibras) : 0,
      sodio: produtoAtual.sodio ? parseFloat(produtoAtual.sodio) : 0
    };
    
    if (produtoAtual.id) {
      // Editar produto existente
      setProdutos(produtos.map(p => p.id === produtoAtual.id ? novoProduto : p));
    } else {
      // Adicionar novo produto
      const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;
      setProdutos([...produtos, { ...novoProduto, id: novoId }]);
    }
    
    setModalAberto(false);
  };
  
  const excluirProduto = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProdutoAtual({
      ...produtoAtual,
      [name]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Produtos</h1>
        <Button 
          onClick={abrirModalNovoProduto}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          Novo Produto
        </Button>
      </div>
      
      {/* Filtros */}
      <Card title="Filtros" className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Nome do Produto"
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
      
      {/* Tabela de Produtos */}
      <Card title="Produtos Cadastrados" className="animate-fadeIn">
        <Table 
          columns={colunas} 
          data={filtrarProdutos()} 
          emptyMessage="Nenhum produto encontrado com os filtros aplicados."
          onRowClick={abrirVisualizacao}
        />
      </Card>
      
      {/* Modal de Cadastro/Edição de Produto */}
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title={produtoAtual.id ? `Editar Produto: ${produtoAtual.nome}` : 'Novo Produto'}
        size="lg"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalAberto(false)}>Cancelar</Button>
            <Button onClick={salvarProduto}>Salvar</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Nome do Produto"
              id="nome"
              name="nome"
              value={produtoAtual.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Input
            label="Marca"
            id="marca"
            name="marca"
            value={produtoAtual.marca}
            onChange={handleInputChange}
          />
          
          <Select
            label="Categoria"
            id="categoria"
            name="categoria"
            value={produtoAtual.categoria}
            onChange={handleInputChange}
            options={categoriasOptions}
            required
          />
          
          <Select
            label="Unidade de Medida"
            id="unidade"
            name="unidade"
            value={produtoAtual.unidade}
            onChange={handleInputChange}
            options={unidadesOptions}
            required
          />
          
          <Input
            label="Preço por Unidade (R$)"
            id="preco"
            name="preco"
            type="number"
            step="0.01"
            value={produtoAtual.preco}
            onChange={handleInputChange}
            required
          />
          
          <Select
            label="Fornecedor"
            id="fornecedor"
            name="fornecedor"
            value={produtoAtual.fornecedor}
            onChange={handleInputChange}
            options={fornecedoresOptions}
          />
          
          <Input
            label="Estoque Atual"
            id="estoque"
            name="estoque"
            type="number"
            step="0.01"
            value={produtoAtual.estoque}
            onChange={handleInputChange}
          />
          
          <Input
            label="Estoque Mínimo"
            id="estoqueMinimo"
            name="estoqueMinimo"
            type="number"
            step="0.01"
            value={produtoAtual.estoqueMinimo}
            onChange={handleInputChange}
          />
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Informações Nutricionais (por 100g/100ml)</h3>
          </div>
          
          <Input
            label="Calorias (kcal)"
            id="calorias"
            name="calorias"
            type="number"
            step="0.01"
            value={produtoAtual.calorias}
            onChange={handleInputChange}
          />
          
          <Input
            label="Carboidratos (g)"
            id="carboidratos"
            name="carboidratos"
            type="number"
            step="0.01"
            value={produtoAtual.carboidratos}
            onChange={handleInputChange}
          />
          
          <Input
            label="Proteínas (g)"
            id="proteinas"
            name="proteinas"
            type="number"
            step="0.01"
            value={produtoAtual.proteinas}
            onChange={handleInputChange}
          />
          
          <Input
            label="Gorduras Totais (g)"
            id="gordurasTotais"
            name="gordurasTotais"
            type="number"
            step="0.01"
            value={produtoAtual.gordurasTotais}
            onChange={handleInputChange}
          />
          
          <Input
            label="Gorduras Saturadas (g)"
            id="gordurasSaturadas"
            name="gordurasSaturadas"
            type="number"
            step="0.01"
            value={produtoAtual.gordurasSaturadas}
            onChange={handleInputChange}
          />
          
          <Input
            label="Gorduras Trans (g)"
            id="gordurasTrans"
            name="gordurasTrans"
            type="number"
            step="0.01"
            value={produtoAtual.gordurasTrans}
            onChange={handleInputChange}
          />
          
          <Input
            label="Fibras (g)"
            id="fibras"
            name="fibras"
            type="number"
            step="0.01"
            value={produtoAtual.fibras}
            onChange={handleInputChange}
          />
          
          <Input
            label="Sódio (mg)"
            id="sodio"
            name="sodio"
            type="number"
            step="0.01"
            value={produtoAtual.sodio}
            onChange={handleInputChange}
          />
          
          <div className="md:col-span-2">
            <Textarea
              label="Observações"
              id="observacoes"
              name="observacoes"
              value={produtoAtual.observacoes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem do Produto
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Enviar arquivo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF até 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Modal de Visualização de Produto */}
      <Modal
        isOpen={modalVisualizacao}
        onClose={() => setModalVisualizacao(false)}
        title={`Detalhes do Produto: ${produtoAtual.nome}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalVisualizacao(false)}>Fechar</Button>
            <Button onClick={() => {
              setModalVisualizacao(false);
              editarProduto(produtoAtual);
            }}>Editar</Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Informações Gerais</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-base">{produtoAtual.nome}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Marca</p>
                <p className="text-base">{produtoAtual.marca || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Categoria</p>
                <p className="text-base">{produtoAtual.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Unidade de Medida</p>
                <p className="text-base">{produtoAtual.unidade}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Preço por Unidade</p>
                <p className="text-base">R$ {typeof produtoAtual.preco === 'number' ? produtoAtual.preco.toFixed(2).replace('.', ',') : produtoAtual.preco}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fornecedor</p>
                <p className="text-base">{produtoAtual.fornecedor || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estoque Atual</p>
                <p className="text-base">{produtoAtual.estoque || '0'} {produtoAtual.unidade}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estoque Mínimo</p>
                <p className="text-base">{produtoAtual.estoqueMinimo || '0'} {produtoAtual.unidade}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Informações Nutricionais (por 100g/100ml)</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Calorias</p>
                <p className="text-base">{produtoAtual.calorias || '0'} kcal</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Carboidratos</p>
                <p className="text-base">{produtoAtual.carboidratos || '0'} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Proteínas</p>
                <p className="text-base">{produtoAtual.proteinas || '0'} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gorduras Totais</p>
                <p className="text-base">{produtoAtual.gordurasTotais || '0'} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gorduras Saturadas</p>
                <p className="text-base">{produtoAtual.gordurasSaturadas || '0'} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gorduras Trans</p>
                <p className="text-base">{produtoAtual.gordurasTrans || '0'} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fibras</p>
                <p className="text-base">{produtoAtual.fibras || '0'} g</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sódio</p>
                <p className="text-base">{produtoAtual.sodio || '0'} mg</p>
              </div>
            </div>
          </div>
          
          {produtoAtual.observacoes && (
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Observações</h3>
              <p className="text-base text-gray-700">{produtoAtual.observacoes}</p>
            </div>
          )}
          
          {/* Placeholder para imagem do produto */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full max-w-md h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Imagem do produto não disponível</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
