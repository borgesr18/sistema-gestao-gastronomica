'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';

export default function ConfiguracoesPage() {
  // Estados para as diferentes seções de configuração
  const [activeTab, setActiveTab] = useState('geral');
  const [modalUsuario, setModalUsuario] = useState(false);
  const [modalFornecedor, setModalFornecedor] = useState(false);
  
  // Estado para configurações gerais
  const [configGeral, setConfigGeral] = useState({
    nomeRestaurante: 'Meu Restaurante',
    endereco: 'Av. Paulista, 1000 - São Paulo, SP',
    telefone: '(11) 3456-7890',
    email: 'contato@meurestaurante.com',
    site: 'www.meurestaurante.com',
    moeda: 'R$',
    formatoData: 'DD/MM/YYYY'
  });
  
  // Estado para usuário atual em edição/criação
  const [usuarioAtual, setUsuarioAtual] = useState({
    id: null,
    nome: '',
    email: '',
    senha: '',
    cargo: '',
    nivelAcesso: ''
  });
  
  // Estado para fornecedor atual em edição/criação
  const [fornecedorAtual, setFornecedorAtual] = useState({
    id: null,
    nome: '',
    contato: '',
    telefone: '',
    email: '',
    endereco: '',
    observacoes: ''
  });
  
  // Dados simulados de usuários
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Administrador', email: 'admin@sistema.com', cargo: 'Administrador do Sistema', nivelAcesso: 'admin', ultimoAcesso: '21/04/2025 15:30' },
    { id: 2, nome: 'João Silva', email: 'joao@sistema.com', cargo: 'Chef de Cozinha', nivelAcesso: 'chef', ultimoAcesso: '20/04/2025 18:45' },
    { id: 3, nome: 'Ana Paula', email: 'ana@sistema.com', cargo: 'Nutricionista', nivelAcesso: 'nutricionista', ultimoAcesso: '19/04/2025 14:20' },
    { id: 4, nome: 'Carlos Souza', email: 'carlos@sistema.com', cargo: 'Cozinheiro', nivelAcesso: 'cozinheiro', ultimoAcesso: '21/04/2025 10:15' }
  ]);
  
  // Dados simulados de fornecedores
  const [fornecedores, setFornecedores] = useState([
    { id: 1, nome: 'Distribuidora Alimentos SA', contato: 'Maria Santos', telefone: '(11) 3333-4444', email: 'contato@distribuidora.com' },
    { id: 2, nome: 'Importadora Mediterrâneo', contato: 'José Oliveira', telefone: '(11) 5555-6666', email: 'jose@importadora.com' },
    { id: 3, nome: 'Laticínios Brasil', contato: 'Ana Ferreira', telefone: '(11) 7777-8888', email: 'ana@laticinios.com' },
    { id: 4, nome: 'Frigorífico Central', contato: 'Roberto Almeida', telefone: '(11) 9999-0000', email: 'roberto@frigorifico.com' },
    { id: 5, nome: 'Hortifruti Distribuidora', contato: 'Carla Mendes', telefone: '(11) 2222-3333', email: 'carla@hortifruti.com' }
  ]);
  
  // Opções para os selects
  const niveisAcessoOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'chef', label: 'Chef' },
    { value: 'nutricionista', label: 'Nutricionista' },
    { value: 'cozinheiro', label: 'Cozinheiro' },
    { value: 'visualizador', label: 'Visualizador' }
  ];
  
  const moedasOptions = [
    { value: 'R$', label: 'Real (R$)' },
    { value: '$', label: 'Dólar ($)' },
    { value: '€', label: 'Euro (€)' }
  ];
  
  const formatosDataOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];
  
  // Colunas para tabelas
  const colunasUsuarios = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Email', accessor: 'email' },
    { header: 'Cargo', accessor: 'cargo' },
    { header: 'Nível de Acesso', accessor: 'nivelAcesso', render: (row) => {
      const nivel = niveisAcessoOptions.find(n => n.value === row.nivelAcesso);
      return nivel ? nivel.label : row.nivelAcesso;
    }},
    { header: 'Último Acesso', accessor: 'ultimoAcesso' },
    {
      header: 'Ações',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => editarUsuario(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => excluirUsuario(row.id)}
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
  
  const colunasFornecedores = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Contato', accessor: 'contato' },
    { header: 'Telefone', accessor: 'telefone' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Ações',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => editarFornecedor(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => excluirFornecedor(row.id)}
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
  
  // Funções para manipulação de usuários
  const abrirModalNovoUsuario = () => {
    setUsuarioAtual({
      id: null,
      nome: '',
      email: '',
      senha: '',
      cargo: '',
      nivelAcesso: ''
    });
    setModalUsuario(true);
  };
  
  const editarUsuario = (usuario) => {
    setUsuarioAtual({
      ...usuario,
      senha: '' // Não exibimos a senha atual por segurança
    });
    setModalUsuario(true);
  };
  
  const salvarUsuario = () => {
    if (usuarioAtual.id) {
      // Editar usuário existente
      setUsuarios(usuarios.map(u => u.id === usuarioAtual.id ? { ...usuarioAtual, ultimoAcesso: u.ultimoAcesso } : u));
    } else {
      // Adicionar novo usuário
      const novoId = Math.max(...usuarios.map(u => u.id), 0) + 1;
      setUsuarios([...usuarios, { 
        ...usuarioAtual, 
        id: novoId, 
        ultimoAcesso: 'Nunca acessou' 
      }]);
    }
    
    setModalUsuario(false);
  };
  
  const excluirUsuario = (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };
  
  // Funções para manipulação de fornecedores
  const abrirModalNovoFornecedor = () => {
    setFornecedorAtual({
      id: null,
      nome: '',
      contato: '',
      telefone: '',
      email: '',
      endereco: '',
      observacoes: ''
    });
    setModalFornecedor(true);
  };
  
  const editarFornecedor = (fornecedor) => {
    setFornecedorAtual({
      ...fornecedor
    });
    setModalFornecedor(true);
  };
  
  const salvarFornecedor = () => {
    if (fornecedorAtual.id) {
      // Editar fornecedor existente
      setFornecedores(fornecedores.map(f => f.id === fornecedorAtual.id ? fornecedorAtual : f));
    } else {
      // Adicionar novo fornecedor
      const novoId = Math.max(...fornecedores.map(f => f.id), 0) + 1;
      setFornecedores([...fornecedores, { 
        ...fornecedorAtual, 
        id: novoId
      }]);
    }
    
    setModalFornecedor(false);
  };
  
  const excluirFornecedor = (id) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      setFornecedores(fornecedores.filter(f => f.id !== id));
    }
  };
  
  // Função para salvar configurações gerais
  const salvarConfiguracoesGerais = () => {
    alert('Configurações salvas com sucesso!');
    // Em uma implementação real, isso enviaria os dados para o servidor
  };
  
  // Handlers para inputs
  const handleConfigGeralChange = (e) => {
    const { name, value } = e.target;
    setConfigGeral({
      ...configGeral,
      [name]: value
    });
  };
  
  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setUsuarioAtual({
      ...usuarioAtual,
      [name]: value
    });
  };
  
  const handleFornecedorChange = (e) => {
    const { name, value } = e.target;
    setFornecedorAtual({
      ...fornecedorAtual,
      [name]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      </div>
      
      {/* Tabs de Configuração */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'geral'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('geral')}
          >
            Configurações Gerais
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'usuarios'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('usuarios')}
          >
            Usuários
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'fornecedores'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('fornecedores')}
          >
            Fornecedores
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'backup'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('backup')}
          >
            Backup e Restauração
          </button>
        </nav>
      </div>
      
      {/* Conteúdo da Tab Selecionada */}
      <div className="animate-fadeIn">
        {/* Configurações Gerais */}
        {activeTab === 'geral' && (
          <Card title="Configurações Gerais do Sistema">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome do Restaurante"
                id="nomeRestaurante"
                name="nomeRestaurante"
                value={configGeral.nomeRestaurante}
                onChange={handleConfigGeralChange}
              />
              
              <Input
                label="Endereço"
                id="endereco"
                name="endereco"
                value={configGeral.endereco}
                onChange={handleConfigGeralChange}
              />
              
              <Input
                label="Telefone"
                id="telefone"
                name="telefone"
                value={configGeral.telefone}
                onChange={handleConfigGeralChange}
              />
              
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={configGeral.email}
                onChange={handleConfigGeralChange}
              />
              
              <Input
                label="Site"
                id="site"
                name="site"
                value={configGeral.site}
                onChange={handleConfigGeralChange}
              />
              
              <Select
                label="Moeda"
                id="moeda"
                name="moeda"
                value={configGeral.moeda}
                onChange={handleConfigGeralChange}
                options={moedasOptions}
              />
              
              <Select
                label="Formato de Data"
                id="formatoData"
                name="formatoData"
                value={configGeral.formatoData}
                onChange={handleConfigGeralChange}
                options={formatosDataOptions}
              />
              
              <div className="md:col-span-2 flex justify-end mt-4">
                <Button onClick={salvarConfiguracoesGerais}>
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        {/* Usuários */}
        {activeTab === 'usuarios' && (
          <Card title="Gerenciamento de Usuários">
            <div className="mb-4 flex justify-end">
              <Button 
                onClick={abrirModalNovoUsuario}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Novo Usuário
              </Button>
            </div>
            
            <Table 
              columns={colunasUsuarios} 
              data={usuarios} 
              emptyMessage="Nenhum usuário cadastrado."
            />
          </Card>
        )}
        
        {/* Fornecedores */}
        {activeTab === 'fornecedores' && (
          <Card title="Gerenciamento de Fornecedores">
            <div className="mb-4 flex justify-end">
              <Button 
                onClick={abrirModalNovoFornecedor}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Novo Fornecedor
              </Button>
            </div>
            
            <Table 
              columns={colunasFornecedores} 
              data={fornecedores} 
              emptyMessage="Nenhum fornecedor cadastrado."
            />
          </Card>
        )}
        
        {/* Backup e Restauração */}
        {activeTab === 'backup' && (
          <Card title="Backup e Restauração de Dados">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Backup de Dados</h3>
                <p className="text-gray-600 mb-4">
                  Faça um backup completo dos dados do sistema. O arquivo será gerado e disponibilizado para download.
                </p>
                <Button 
                  onClick={() => alert('Backup iniciado. O download começará em breve.')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  }
                >
                  Gerar Backup
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Restauração de Dados</h3>
                <p className="text-gray-600 mb-4">
                  Restaure os dados do sistema a partir de um arquivo de backup. Atenção: esta ação substituirá todos os dados atuais.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Arquivo de Backup
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Selecionar arquivo</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Arquivo .zip ou .sql
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="danger"
                      onClick={() => {
                        if (confirm('ATENÇÃO: Esta ação substituirá todos os dados atuais do sistema. Deseja continuar?')) {
                          alert('Restauração iniciada. Este processo pode levar alguns minutos.');
                        }
                      }}
                    >
                      Restaurar Dados
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Backups Automáticos</h3>
                <p className="text-gray-600 mb-4">
                  Configure backups automáticos para garantir a segurança dos seus dados.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    id="backupAutomatico"
                    name="backupAutomatico"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="backupAutomatico" className="text-sm text-gray-700">
                    Ativar backups automáticos
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Frequência"
                    id="frequenciaBackup"
                    options={[
                      { value: 'diario', label: 'Diário' },
                      { value: 'semanal', label: 'Semanal' },
                      { value: 'mensal', label: 'Mensal' }
                    ]}
                  />
                  <Input
                    label="Hora do Backup"
                    id="horaBackup"
                    type="time"
                    value="03:00"
                  />
                  <div className="md:col-span-2 flex justify-end mt-2">
                    <Button onClick={() => alert('Configurações de backup automático salvas.')}>
                      Salvar Configurações
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Modal de Usuário */}
      <Modal
        isOpen={modalUsuario}
        onClose={() => setModalUsuario(false)}
        title={usuarioAtual.id ? `Editar Usuário: ${usuarioAtual.nome}` : 'Novo Usuário'}
        size="md"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalUsuario(false)}>Cancelar</Button>
            <Button onClick={salvarUsuario}>Salvar</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            id="nome"
            name="nome"
            value={usuarioAtual.nome}
            onChange={handleUsuarioChange}
            required
          />
          
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={usuarioAtual.email}
            onChange={handleUsuarioChange}
            required
          />
          
          <Input
            label="Senha"
            id="senha"
            name="senha"
            type="password"
            value={usuarioAtual.senha}
            onChange={handleUsuarioChange}
            required={!usuarioAtual.id}
            helpText={usuarioAtual.id ? "Deixe em branco para manter a senha atual" : ""}
          />
          
          <Input
            label="Cargo"
            id="cargo"
            name="cargo"
            value={usuarioAtual.cargo}
            onChange={handleUsuarioChange}
            required
          />
          
          <Select
            label="Nível de Acesso"
            id="nivelAcesso"
            name="nivelAcesso"
            value={usuarioAtual.nivelAcesso}
            onChange={handleUsuarioChange}
            options={niveisAcessoOptions}
            required
          />
        </div>
      </Modal>
      
      {/* Modal de Fornecedor */}
      <Modal
        isOpen={modalFornecedor}
        onClose={() => setModalFornecedor(false)}
        title={fornecedorAtual.id ? `Editar Fornecedor: ${fornecedorAtual.nome}` : 'Novo Fornecedor'}
        size="md"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setModalFornecedor(false)}>Cancelar</Button>
            <Button onClick={salvarFornecedor}>Salvar</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            id="nome"
            name="nome"
            value={fornecedorAtual.nome}
            onChange={handleFornecedorChange}
            required
          />
          
          <Input
            label="Contato"
            id="contato"
            name="contato"
            value={fornecedorAtual.contato}
            onChange={handleFornecedorChange}
          />
          
          <Input
            label="Telefone"
            id="telefone"
            name="telefone"
            value={fornecedorAtual.telefone}
            onChange={handleFornecedorChange}
          />
          
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={fornecedorAtual.email}
            onChange={handleFornecedorChange}
          />
          
          <Input
            label="Endereço"
            id="endereco"
            name="endereco"
            value={fornecedorAtual.endereco}
            onChange={handleFornecedorChange}
          />
          
          <Input
            label="Observações"
            id="observacoes"
            name="observacoes"
            value={fornecedorAtual.observacoes}
            onChange={handleFornecedorChange}
          />
        </div>
      </Modal>
    </div>
  );
}
