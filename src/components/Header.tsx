import React from 'react';
import { useEffect } from 'react';
import { Heart, Home, DollarSign, Building2, Settings, UserPlus } from 'lucide-react';

interface HeaderProps {
  activeSection: 'donations' | 'adoptions' | 'shelters' | 'register' | 'admin';
  setActiveSection: (section: 'donations' | 'adoptions' | 'shelters' | 'register' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const scrollToSection = (section: 'donations' | 'adoptions' | 'shelters' | 'register' | 'admin') => {
    setActiveSection(section);
    
    // No hacer scroll para admin ya que es una página separada
    if (section === 'admin') return;
    
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
          
          <nav className="flex flex-wrap gap-1 bg-gray-100 rounded-2xl p-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => scrollToSection('donations')}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                activeSection === 'donations'
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-white'
              }`}
            >
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Donar</span>
            </button>
            <button
              onClick={() => scrollToSection('adoptions')}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                activeSection === 'adoptions'
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-white'
              }`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Adoptar</span>
            </button>
            <button
              onClick={() => scrollToSection('shelters')}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                activeSection === 'shelters'
                  ? 'bg-green-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-green-500 hover:bg-white'
              }`}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Refugios</span>
            </button>
            <button
              onClick={() => scrollToSection('register')}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                activeSection === 'register'
                  ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-500 hover:bg-white'
              }`}
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Registrate</span>
            </button>
            <div className="w-px bg-gray-300 mx-1"></div>
            <button
              onClick={() => scrollToSection('admin')}
              className={`flex items-center justify-center px-2 sm:px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeSection === 'admin'
                  ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-500 hover:bg-white'
              }`}
              title="Panel de Administración"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};