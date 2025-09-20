import React from 'react';
import { useEffect } from 'react';
import { Heart, Home, DollarSign } from 'lucide-react';

interface HeaderProps {
  activeSection: 'donations' | 'adoptions';
  setActiveSection: (section: 'donations' | 'adoptions') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const scrollToSection = (section: 'donations' | 'adoptions') => {
    setActiveSection(section);
    // Pequeño delay para asegurar que el contenido se renderice antes del scroll
    setTimeout(() => {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 px-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/Logo Huellitas Unidas.png" 
              alt="Huellitas Unidas Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Huellitas Unidas</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Salvando vidas, una patita a la vez</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-gray-100 rounded-full p-1 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('donations')}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 flex-1 sm:flex-none text-sm sm:text-base ${
                activeSection === 'donations'
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-white'
              }`}
            >
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Donaciones</span>
              <span className="sm:hidden">Donar</span>
            </button>
            <button
              onClick={() => scrollToSection('adoptions')}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 flex-1 sm:flex-none text-sm sm:text-base ${
                activeSection === 'adoptions'
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-white'
              }`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Adopciones</span>
              <span className="sm:hidden">Adoptar</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};