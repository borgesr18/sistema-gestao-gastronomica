'use client';

import { useState, useEffect } from 'react';

// Função para conectar com o banco de dados
export async function getProdutos() {
  // Em uma implementação real, isso seria uma chamada à API
  // Por enquanto, retornamos dados simulados
  return [
    { id: 1, nome: 'Farinha de Trigo', marca: 'Dona Benta', categoria: 'Farinhas', unidade: 'kg', preco: 5.90, fornecedor: 'Distribuidora Alimentos SA' },
    { id: 2, nome: 'Azeite Extra Virgem', marca: 'Gallo', categoria: 'Temperos', unidade: 'l', preco: 28.50, fornecedor: 'Importadora Mediterrâneo' },
    { id: 3, nome: 'Creme de Leite', marca: 'Nestlé', categoria: 'Laticínios', unidade: 'g', preco: 3.75, fornecedor: 'Laticínios Brasil' },
    { id: 4, nome: 'Filé Mignon', marca: 'Premium Carnes', categoria: 'Carnes', unidade: 'kg', preco: 65.90, fornecedor: 'Frigorífico Central' },
    { id: 5, nome: 'Tomate', marca: 'Orgânicos do Vale', categoria: 'Legumes', unidade: 'kg', preco: 8.90, fornecedor: 'Hortifruti Distribuidora' },
  ];
}

export async function getProdutoById(id) {
  // Em uma implementação real, isso seria uma chamada à API
  const produtos = await getProdutos();
  return produtos.find(p => p.id === parseInt(id)) || null;
}

export async function salvarProduto(produto) {
  // Em uma implementação real, isso seria uma chamada à API
  console.log('Produto salvo:', produto);
  return { success: true, produto };
}

export async function excluirProduto(id) {
  // Em uma implementação real, isso seria uma chamada à API
  console.log('Produto excluído:', id);
  return { success: true };
}

export async function getCategoriasProdutos() {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { value: 'Carnes', label: 'Carnes' },
    { value: 'Laticínios', label: 'Laticínios' },
    { value: 'Grãos', label: 'Grãos' },
    { value: 'Farinhas', label: 'Farinhas' },
    { value: 'Frutas', label: 'Frutas' },
    { value: 'Legumes', label: 'Legumes' },
    { value: 'Temperos', label: 'Temperos' },
    { value: 'Bebidas', label: 'Bebidas' },
  ];
}

export async function getUnidadesMedida() {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { value: 'g', label: 'Gramas (g)' },
    { value: 'kg', label: 'Quilogramas (kg)' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'l', label: 'Litros (l)' },
    { value: 'un', label: 'Unidade (un)' },
    { value: 'cs', label: 'Colher de Sopa (cs)' },
    { value: 'cc', label: 'Colher de Chá (cc)' },
    { value: 'xic', label: 'Xícara (xic)' },
  ];
}

export async function getFornecedores() {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { value: 'Distribuidora Alimentos SA', label: 'Distribuidora Alimentos SA' },
    { value: 'Importadora Mediterrâneo', label: 'Importadora Mediterrâneo' },
    { value: 'Laticínios Brasil', label: 'Laticínios Brasil' },
    { value: 'Frigorífico Central', label: 'Frigorífico Central' },
    { value: 'Hortifruti Distribuidora', label: 'Hortifruti Distribuidora' },
  ];
}

export async function getHistoricoPrecos(produtoId) {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { data: '15/04/2025', precoAnterior: 'R$ 5,50', precoNovo: 'R$ 5,90', alteradoPor: 'Administrador' },
    { data: '10/03/2025', precoAnterior: 'R$ 5,20', precoNovo: 'R$ 5,50', alteradoPor: 'Administrador' },
    { data: '05/02/2025', precoAnterior: 'R$ 4,90', precoNovo: 'R$ 5,20', alteradoPor: 'Administrador' }
  ];
}

export async function getFichasTecnicasPorProduto(produtoId) {
  // Em uma implementação real, isso seria uma chamada à API
  return [
    { id: 1, nome: 'Pão Francês', quantidade: '500g', categoria: 'Massas' },
    { id: 2, nome: 'Bolo de Chocolate', quantidade: '200g', categoria: 'Sobremesas' },
    { id: 3, nome: 'Pizza Margherita', quantidade: '150g', categoria: 'Pratos Principais' }
  ];
}
