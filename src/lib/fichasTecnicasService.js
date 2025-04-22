'use client';

import { useState, useEffect } from 'react';

// Função para conectar com o banco de dados
export async function getFichasTecnicas() {
  // Em uma implementação real, isso seria uma chamada à API
  // Por enquanto, retornamos dados simulados
  return [
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
  ];
}

export async function getFichaTecnicaById(id) {
  // Em uma implementação real, isso seria uma chamada à API
  const fichas = await getFichasTecnicas();
  return fichas.find(f => f.id === parseInt(id)) || null;
}

export async function salvarFichaTecnica(ficha) {
  // Em uma implementação real, isso seria uma chamada à API
  console.log('Ficha técnica salva:', ficha);
  return { success: true, ficha };
}

export async function excluirFichaTecnica(id) {
  // Em uma implementação real, isso seria uma chamada à API
  console.log('Ficha técnica excluída:', id);
  return { success: true };
}

export async function getCategoriasReceitas() {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { value: 'Entradas', label: 'Entradas' },
    { value: 'Pratos Principais', label: 'Pratos Principais' },
    { value: 'Sobremesas', label: 'Sobremesas' },
    { value: 'Bebidas', label: 'Bebidas' },
    { value: 'Molhos', label: 'Molhos' },
    { value: 'Massas', label: 'Massas' },
  ];
}

export async function getUnidadesRendimento() {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { value: 'porções', label: 'Porções' },
    { value: 'unidades', label: 'Unidades' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'l', label: 'Litros (l)' },
    { value: 'g', label: 'Gramas (g)' },
    { value: 'kg', label: 'Quilogramas (kg)' },
  ];
}

export async function getIngredientesPorFicha(fichaId) {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { id: 1, produto: 'Arroz Arbóreo', quantidade: '400g', custo: 'R$ 12,00', observacao: 'Lavado e escorrido' },
    { id: 2, produto: 'Cogumelos Funghi Secos', quantidade: '50g', custo: 'R$ 18,50', observacao: 'Hidratados em água morna por 20 minutos' },
    { id: 3, produto: 'Cebola', quantidade: '1 unidade', custo: 'R$ 1,20', observacao: 'Picada finamente' },
    { id: 4, produto: 'Alho', quantidade: '2 dentes', custo: 'R$ 0,80', observacao: 'Picado' },
    { id: 5, produto: 'Vinho Branco Seco', quantidade: '100ml', custo: 'R$ 5,00', observacao: 'De boa qualidade' },
    { id: 6, produto: 'Queijo Parmesão', quantidade: '80g', custo: 'R$ 8,00', observacao: 'Ralado' },
    { id: 7, produto: 'Manteiga', quantidade: '30g', custo: 'R$ 1,50', observacao: 'Sem sal' },
    { id: 8, produto: 'Azeite Extra Virgem', quantidade: '30ml', custo: 'R$ 1,75', observacao: '' },
  ];
}

export async function getInfoNutricionalFicha(fichaId) {
  // Em uma implementação real, isso seria uma chamada à API
  return {
    calorias: 320,
    carboidratos: 45,
    proteinas: 8,
    gordurasTotais: 12,
    gordurasSaturadas: 5,
    gordurasTrans: 0,
    fibras: 2,
    sodio: 380
  };
}
