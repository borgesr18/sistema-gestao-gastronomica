-- Inicialização do banco de dados para o Sistema de Gestão Gastronômica
-- Criação das tabelas principais para o sistema de fichas técnicas

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    cargo TEXT NOT NULL,
    nivel_acesso TEXT NOT NULL CHECK (nivel_acesso IN ('admin', 'chef', 'nutricionista', 'cozinheiro', 'visualizador')),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de Fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    contato TEXT,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    observacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Unidades de Medida
CREATE TABLE IF NOT EXISTS unidades_medida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sigla TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('massa', 'volume', 'unidade', 'outro'))
);

-- Tabela de Categorias de Produtos
CREATE TABLE IF NOT EXISTS categorias_produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT
);

-- Tabela de Produtos (Insumos)
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    marca TEXT,
    categoria_id INTEGER,
    unidade_medida_id INTEGER NOT NULL,
    preco_unitario REAL NOT NULL,
    fornecedor_id INTEGER,
    imagem_url TEXT,
    estoque_atual REAL DEFAULT 0,
    estoque_minimo REAL DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_produtos(id),
    FOREIGN KEY (unidade_medida_id) REFERENCES unidades_medida(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
);

-- Tabela de Informações Nutricionais dos Produtos
CREATE TABLE IF NOT EXISTS info_nutricional (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    calorias REAL DEFAULT 0,
    carboidratos REAL DEFAULT 0,
    proteinas REAL DEFAULT 0,
    gorduras_totais REAL DEFAULT 0,
    gorduras_saturadas REAL DEFAULT 0,
    gorduras_trans REAL DEFAULT 0,
    fibras REAL DEFAULT 0,
    sodio REAL DEFAULT 0,
    porcao REAL DEFAULT 100,
    unidade_porcao TEXT DEFAULT 'g',
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- Tabela de Categorias de Receitas
CREATE TABLE IF NOT EXISTS categorias_receitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT
);

-- Tabela de Fichas Técnicas (Receitas)
CREATE TABLE IF NOT EXISTS fichas_tecnicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria_id INTEGER,
    modo_preparo TEXT,
    tempo_preparo INTEGER, -- em minutos
    rendimento_total REAL NOT NULL,
    unidade_rendimento TEXT NOT NULL,
    custo_total REAL,
    custo_porcao REAL,
    observacoes TEXT,
    criado_por INTEGER,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias_receitas(id),
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);

-- Tabela de Ingredientes das Fichas Técnicas
CREATE TABLE IF NOT EXISTS ingredientes_ficha (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade REAL NOT NULL,
    custo_calculado REAL,
    observacao TEXT,
    FOREIGN KEY (ficha_id) REFERENCES fichas_tecnicas(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Tabela de Informações Nutricionais das Fichas Técnicas (calculadas)
CREATE TABLE IF NOT EXISTS nutricional_ficha (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ficha_id INTEGER NOT NULL,
    calorias_total REAL DEFAULT 0,
    carboidratos_total REAL DEFAULT 0,
    proteinas_total REAL DEFAULT 0,
    gorduras_totais_total REAL DEFAULT 0,
    gorduras_saturadas_total REAL DEFAULT 0,
    gorduras_trans_total REAL DEFAULT 0,
    fibras_total REAL DEFAULT 0,
    sodio_total REAL DEFAULT 0,
    calorias_porcao REAL DEFAULT 0,
    carboidratos_porcao REAL DEFAULT 0,
    proteinas_porcao REAL DEFAULT 0,
    gorduras_totais_porcao REAL DEFAULT 0,
    gorduras_saturadas_porcao REAL DEFAULT 0,
    gorduras_trans_porcao REAL DEFAULT 0,
    fibras_porcao REAL DEFAULT 0,
    sodio_porcao REAL DEFAULT 0,
    FOREIGN KEY (ficha_id) REFERENCES fichas_tecnicas(id) ON DELETE CASCADE
);

-- Tabela de Histórico de Alterações de Preços
CREATE TABLE IF NOT EXISTS historico_precos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    preco_anterior REAL NOT NULL,
    preco_novo REAL NOT NULL,
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alterado_por INTEGER,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (alterado_por) REFERENCES usuarios(id)
);

-- Tabela de Configurações do Sistema
CREATE TABLE IF NOT EXISTS configuracoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_restaurante TEXT,
    logo_url TEXT,
    endereco TEXT,
    telefone TEXT,
    email TEXT,
    site TEXT,
    moeda TEXT DEFAULT 'R$',
    formato_data TEXT DEFAULT 'DD/MM/YYYY',
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais para unidades de medida
INSERT INTO unidades_medida (nome, sigla, tipo) VALUES
('Grama', 'g', 'massa'),
('Quilograma', 'kg', 'massa'),
('Mililitro', 'ml', 'volume'),
('Litro', 'l', 'volume'),
('Unidade', 'un', 'unidade'),
('Colher de Sopa', 'cs', 'volume'),
('Colher de Chá', 'cc', 'volume'),
('Xícara', 'xic', 'volume');

-- Inserir categorias de produtos iniciais
INSERT INTO categorias_produtos (nome, descricao) VALUES
('Carnes', 'Carnes bovinas, suínas, aves e peixes'),
('Laticínios', 'Leite, queijos, manteiga e derivados'),
('Grãos', 'Arroz, feijão, lentilha e outros grãos'),
('Farinhas', 'Farinhas e produtos para panificação'),
('Frutas', 'Frutas frescas e processadas'),
('Legumes', 'Legumes e verduras'),
('Temperos', 'Ervas, especiarias e condimentos'),
('Bebidas', 'Bebidas alcoólicas e não alcoólicas');

-- Inserir categorias de receitas iniciais
INSERT INTO categorias_receitas (nome, descricao) VALUES
('Entradas', 'Aperitivos e entradas'),
('Pratos Principais', 'Pratos principais e acompanhamentos'),
('Sobremesas', 'Doces e sobremesas'),
('Bebidas', 'Bebidas e coquetéis'),
('Molhos', 'Molhos e condimentos'),
('Massas', 'Massas e produtos de panificação');

-- Inserir usuário administrador inicial
INSERT INTO usuarios (nome, email, senha, cargo, nivel_acesso) VALUES
('Administrador', 'admin@sistema.com', 'senha_criptografada_aqui', 'Administrador do Sistema', 'admin');

-- Inserir configuração inicial
INSERT INTO configuracoes (nome_restaurante, moeda, formato_data) VALUES
('Meu Restaurante', 'R$', 'DD/MM/YYYY');
