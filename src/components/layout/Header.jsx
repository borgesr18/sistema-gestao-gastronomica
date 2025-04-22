'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-gray-800 md:block hidden">
          Sistema de Gestão Gastronômica
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Botão de pesquisa */}
        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notificações */}
        <div className="relative">
          <button 
            className="text-gray-500 hover:text-gray-700 relative"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUserMenuOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                Notificações
              </div>
              <div className="max-h-60 overflow-y-auto">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b">
                  <p className="font-medium">Estoque baixo</p>
                  <p className="text-xs text-gray-500">O produto "Farinha de Trigo" está com estoque abaixo do mínimo.</p>
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b">
                  <p className="font-medium">Nova ficha técnica</p>
                  <p className="text-xs text-gray-500">A ficha técnica "Risoto de Funghi" foi adicionada por Maria.</p>
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <p className="font-medium">Atualização de preço</p>
                  <p className="text-xs text-gray-500">O preço do produto "Azeite Extra Virgem" foi atualizado.</p>
                </a>
              </div>
              <a href="#" className="block text-center px-4 py-2 text-sm text-blue-600 border-t">
                Ver todas as notificações
              </a>
            </div>
          )}
        </div>

        {/* Menu do usuário */}
        <div className="relative">
          <button 
            className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationsOpen(false);
            }}
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              A
            </div>
            <span className="ml-2 text-sm font-medium hidden md:block">Administrador</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Perfil
              </Link>
              <Link href="/configuracoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Configurações
              </Link>
              <div className="border-t border-gray-100"></div>
              <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sair
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
