import React, { useState } from 'react';
import { useEffect } from 'react';
import { Lock, Eye, EyeOff, Building2 } from 'lucide-react';

interface Shelter {
  id: string;
  name: string;
  code: string;
  location: string;
}

const shelters: Shelter[] = [
  {
    id: 'refugio-san-angel',
    name: 'Refugio San Ángel',
    code: '248159',
    location: 'Ciudad de México'
  },
  {
    id: 'patitas-felices',
    name: 'Patitas Felices',
    code: '736482',
    location: 'Guadalajara'
  },
  {
    id: 'hogar-canino',
    name: 'Hogar Canino',
    code: '591037',
    location: 'Monterrey'
  }
];

// Función para cargar refugios registrados dinámicamente
const loadRegisteredShelters = (): Shelter[] => {
  try {
    const savedShelters = localStorage.getItem('huellitasUnidas_shelters');
    if (savedShelters) {
      const parsed = JSON.parse(savedShelters);
      return Object.values(parsed).map((shelter: any) => ({
        id: shelter.id,
        name: shelter.name,
        code: shelter.code,
        location: shelter.location
      }));
    }
  } catch (error) {
    console.error('Error loading registered shelters:', error);
  }
  return [];
};

interface LoginFormProps {
  onLogin: (shelter: Shelter) => void;
  onCancel: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCancel }) => {
  const [selectedShelter, setSelectedShelter] = useState<string>('');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [allShelters, setAllShelters] = useState<Shelter[]>([]);

  // Cargar refugios al montar el componente
  useEffect(() => {
    const defaultShelters = shelters;
    const registeredShelters = loadRegisteredShelters();
    setAllShelters([...defaultShelters, ...registeredShelters]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!selectedShelter || !code) {
      setError('Por favor selecciona un refugio e ingresa el código');
      setLoading(false);
      return;
    }

    const shelter = allShelters.find(s => s.id === selectedShelter);
    if (!shelter) {
      setError('Refugio no encontrado');
      setLoading(false);
      return;
    }

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === shelter.code) {
      onLogin(shelter);
    } else {
      setError('Código de acceso incorrecto');
    }
    
    setLoading(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Administrativo</h2>
          <p className="text-gray-600">Ingresa con las credenciales de tu refugio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona tu refugio
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedShelter}
                onChange={(e) => setSelectedShelter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white"
                required
              >
                <option value="">Seleccionar refugio...</option>
                {allShelters.map((shelter) => (
                  <option key={shelter.id} value={shelter.id}>
                    {shelter.name} - {shelter.location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de acceso (6 dígitos)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={handleCodeChange}
                placeholder="••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !selectedShelter || code.length !== 6}
              className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                loading || !selectedShelter || code.length !== 6
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
              }`}
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            ¿Olvidaste tu código de acceso? Contacta al administrador principal
          </p>
        </div>
      </div>
    </div>
  );
};