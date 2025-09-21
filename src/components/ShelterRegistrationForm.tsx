import React, { useState } from 'react';
import { Building2, MapPin, Mail, Phone, Lock, Eye, EyeOff, User, Check } from 'lucide-react';

// Función para generar ID único de 5 caracteres
const generateShelterID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

interface ShelterRegistrationFormProps {
  onRegistrationSuccess: (shelterData: any) => void;
  onCancel: () => void;
}

export const ShelterRegistrationForm: React.FC<ShelterRegistrationFormProps> = ({ 
  onRegistrationSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del refugio es requerido';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length !== 6) {
      newErrors.password = 'La contraseña debe tener exactamente 6 dígitos';
    } else if (!/^\d{6}$/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener solo números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular delay de registro
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Crear ID único para el refugio
      const shelterKey = formData.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .substring(0, 20);

      const shelterID = generateShelterID();

      const newShelterData = {
        id: shelterKey,
        shelterID: shelterID,
        name: formData.name,
        code: formData.password,
        location: formData.city,
        email: formData.email,
        phone: formData.phone,
        registrationDate: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric'
        }),
        createdAt: new Date().toISOString(),
        donations: [],
        dogs: []
      };

      // Guardar en localStorage
      const existingShelters = JSON.parse(localStorage.getItem('huellitasUnidas_shelters') || '{}');
      existingShelters[shelterKey] = newShelterData;
      localStorage.setItem('huellitasUnidas_shelters', JSON.stringify(existingShelters));

      // También agregar a los datos principales
      const existingData = JSON.parse(localStorage.getItem('huellitasUnidas_shelterData') || '{}');
      existingData[shelterKey] = {
        donations: [],
        dogs: []
      };
      localStorage.setItem('huellitasUnidas_shelterData', JSON.stringify(existingData));

      onRegistrationSuccess(newShelterData);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrors({ general: 'Error al crear el perfil. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData({ ...formData, password: value });
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Perfil de Refugio</h2>
          <p className="text-gray-600">Únete a la red de refugios más grande de México</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del Refugio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Refugio *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="Refugio San Ángel"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                placeholder="Ciudad de México"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="contacto@refugio.org"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="+52 55 1234 5678"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña de Acceso (6 dígitos) *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="••••••"
                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 text-center text-lg tracking-widest ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <p className="text-xs text-gray-500 mt-1">Esta será tu contraseña para acceder al panel administrativo</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">{errors.general}</p>
            </div>
          )}

          {/* Botones */}
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
              disabled={loading}
              className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Creando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Crear Perfil
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">🎉 Plan de Prueba Incluido:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 1 mes completamente gratis</li>
            <li>• Hasta 10 perritos en adopción</li>
            <li>• 2 campañas de donación</li>
            <li>• Panel administrativo completo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};