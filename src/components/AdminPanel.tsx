import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Save, X, Users, Heart, DollarSign, Home, Building2, BarChart3, Calendar, MapPin, Phone, Mail, Globe, Camera, Upload, Check, AlertCircle, Trash2, Edit3, Search, Filter } from 'lucide-react';
import { LoginForm } from './LoginForm';

interface Shelter {
  id: string;
  name: string;
  code: string;
  location: string;
}

interface AdminPanelProps {
  onBack: () => void;
  shelterData: any;
  setShelterData: (data: any) => void;
}

const shelterNames = {
  'refugio-san-angel': 'Refugio San Ángel',
  'patitas-felices': 'Patitas Felices',
  'hogar-canino': 'Hogar Canino'
};

// Función para cargar nombres de refugios dinámicamente
const loadShelterNames = () => {
  const names = { ...shelterNames };
  try {
    const savedShelters = localStorage.getItem('huellitasUnidas_shelters');
    if (savedShelters) {
      const parsed = JSON.parse(savedShelters);
      Object.values(parsed).forEach((shelter: any) => {
        names[shelter.id as keyof typeof names] = shelter.name;
      });
    }
  } catch (error) {
    console.error('Error loading shelter names:', error);
  }
  return names;
};

const shelterColors = {
  'refugio-san-angel': 'from-orange-500 to-red-500',
  'patitas-felices': 'from-blue-500 to-purple-500',
  'hogar-canino': 'from-green-500 to-teal-500'
};

// Función para asignar colores a refugios nuevos
const getShelterColor = (shelterId: string) => {
  const colors = [
    'from-orange-500 to-red-500',
    'from-blue-500 to-purple-500', 
    'from-green-500 to-teal-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-blue-500',
    'from-yellow-500 to-orange-500'
  ];
  
  if (shelterColors[shelterId as keyof typeof shelterColors]) {
    return shelterColors[shelterId as keyof typeof shelterColors];
  }
  
  // Asignar color basado en hash del ID
  const hash = shelterId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

const mockDonations = [
  { id: 1, title: "Cirugía de Emergencia para Luna", raised: 3200, goal: 5000, status: "active", shelter: "Refugio San Ángel" },
  { id: 2, title: "Refugio para 20 Cachorros", raised: 8500, goal: 12000, status: "active", shelter: "Patitas Felices" },
  { id: 3, title: "Tratamiento contra Parvovirus", raised: 1800, goal: 3500, status: "urgent", shelter: "Hogar Canino" },
];

const mockDogs = [
  { id: 1, name: "Bella", age: "2 años", breed: "Golden Retriever Mix", status: "available", shelter: "Refugio San Ángel" },
  { id: 2, name: "Max", age: "4 años", breed: "Labrador", status: "available", shelter: "Patitas Felices" },
  { id: 3, name: "Luna", age: "1 año", breed: "Pastor Alemán Mix", status: "adopted", shelter: "Hogar Canino" },
];

// Función para generar ID único de refugio
const generateShelterID = () => {
  const prefix = 'REF';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 3).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Componente para editar perfil del refugio
const ShelterProfileEditor: React.FC<{
  currentShelter: any;
  onUpdateShelter: (profile: any) => void;
}> = ({ currentShelter, onUpdateShelter }) => {
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [currentShelter]);

  const loadProfile = () => {
    try {
      const savedShelters = localStorage.getItem('huellitasUnidas_shelters');
      if (savedShelters) {
        const shelters = JSON.parse(savedShelters);
        const shelterProfile = shelters[currentShelter.id];
        if (shelterProfile) {
          setProfile(shelterProfile);
        } else {
          // Crear perfil básico
          const basicProfile = {
            id: currentShelter.id,
            shelterID: currentShelter.shelterID || generateShelterID(),
            name: currentShelter.name,
            location: currentShelter.location || 'México',
            email: currentShelter.email || 'contacto@refugio.org',
            phone: currentShelter.phone || '+52 55 1234 5678',
            description: 'Refugio dedicado al rescate y cuidado de perritos necesitados.',
            established: '2020',
            capacity: 50,
            currentDogs: 0,
            dogsRescued: 0,
            dogsAdopted: 0,
            activeCampaigns: 0,
            totalRaised: 0,
            services: ['Rescate', 'Rehabilitación', 'Adopciones', 'Esterilización'],
            website: 'www.refugio.org',
            image: 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=800',
            registrationDate: new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          };
          setProfile(basicProfile);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      // Simular delay de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdateShelter(profile);
      setEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProfile((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServicesChange = (services: string) => {
    const serviceArray = services.split(',').map(s => s.trim()).filter(s => s);
    setProfile((prev: any) => ({
      ...prev,
      services: serviceArray
    }));
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil del refugio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Perfil del Refugio</h2>
          <p className="text-gray-600">Administra la información pública de tu refugio</p>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button
                onClick={() => {
                  setEditing(false);
                  loadProfile(); // Recargar datos originales
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  loading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar Perfil
            </button>
          )}
        </div>
      </div>

      {/* Información Básica */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Refugio
            </label>
            {editing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID del Refugio
            </label>
            <p className="text-gray-800 font-mono bg-gray-100 px-3 py-2 rounded-lg">
              {profile.shelterID}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            {editing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año de Fundación
            </label>
            {editing ? (
              <input
                type="text"
                value={profile.established}
                onChange={(e) => handleInputChange('established', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.established}</p>
            )}
          </div>
        </div>
      </div>

      {/* Información de Contacto */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Información de Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            {editing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            {editing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{profile.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sitio Web
            </label>
            {editing ? (
              <input
                type="url"
                value={profile.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="www.turefugio.org"
              />
            ) : (
              <p className="text-gray-800">{profile.website}</p>
            )}
          </div>
        </div>
      </div>

      {/* Descripción y Servicios */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Descripción y Servicios</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Refugio
            </label>
            {editing ? (
              <textarea
                value={profile.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Describe tu refugio, su misión y valores..."
              />
            ) : (
              <p className="text-gray-800 leading-relaxed">{profile.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servicios Ofrecidos
            </label>
            {editing ? (
              <input
                type="text"
                value={profile.services?.join(', ') || ''}
                onChange={(e) => handleServicesChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Rescate, Rehabilitación, Adopciones, Esterilización"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.services?.map((service: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
            {editing && (
              <p className="text-sm text-gray-500 mt-1">
                Separa los servicios con comas
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Capacidad y Estadísticas */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Capacidad y Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad Total
            </label>
            {editing ? (
              <input
                type="number"
                value={profile.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-2xl font-bold text-blue-600">{profile.capacity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Perritos Actuales
            </label>
            {editing ? (
              <input
                type="number"
                value={profile.currentDogs || 0}
                onChange={(e) => handleInputChange('currentDogs', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-2xl font-bold text-green-600">{profile.currentDogs || 0}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Rescatados
            </label>
            {editing ? (
              <input
                type="number"
                value={profile.dogsRescued || 0}
                onChange={(e) => handleInputChange('dogsRescued', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-2xl font-bold text-purple-600">{profile.dogsRescued || 0}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Adoptados
            </label>
            {editing ? (
              <input
                type="number"
                value={profile.dogsAdopted || 0}
                onChange={(e) => handleInputChange('dogsAdopted', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-2xl font-bold text-orange-600">{profile.dogsAdopted || 0}</p>
            )}
          </div>
        </div>
      </div>

      {/* Imagen del Refugio */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Imagen del Refugio</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen Principal
            </label>
            {editing ? (
              <input
                type="url"
                value={profile.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            ) : (
              <p className="text-gray-800 break-all">{profile.image}</p>
            )}
          </div>
          
          {profile.image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Vista Previa:</p>
              <img 
                src={profile.image} 
                alt="Vista previa del refugio"
                className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Información de Registro */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de Registro</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Fecha de Registro:</span>
            <p className="text-gray-600">{profile.registrationDate}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">ID del Sistema:</span>
            <p className="text-gray-600 font-mono">{profile.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, shelterData, setShelterData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentShelter, setCurrentShelter] = useState<Shelter | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [activeTab, setActiveTab] = useState<'donations' | 'adoptions' | 'shelter'>('donations');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [deletingShelter, setDeletingShelter] = useState(false);

  const handleLogin = (shelter: Shelter) => {
    setCurrentShelter(shelter);
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentShelter(null);
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  const handleUpdateShelterProfile = (updatedData: any) => {
    if (!currentShelter) return;
    
    try {
      // Actualizar en localStorage de refugios
      const savedShelters = localStorage.getItem('huellitasUnidas_shelters');
      const shelters = savedShelters ? JSON.parse(savedShelters) : {};
      
      shelters[currentShelter.id] = {
        ...shelters[currentShelter.id],
        ...updatedData
      };
      
      localStorage.setItem('huellitasUnidas_shelters', JSON.stringify(shelters));
      
      // También actualizar en la sección pública de refugios
      const publicSheltersData = JSON.parse(localStorage.getItem('huellitasUnidas_publicShelters') || '{}');
      publicSheltersData[currentShelter.id] = {
        ...publicSheltersData[currentShelter.id],
        name: updatedData.name,
        location: updatedData.location,
        description: updatedData.description,
        image: updatedData.image,
        established: updatedData.established,
        contact: {
          phone: updatedData.phone,
          email: updatedData.email,
          website: updatedData.website
        },
        services: updatedData.services || [],
        capacity: updatedData.capacity || 0,
        currentDogs: updatedData.currentDogs || 0,
        dogsRescued: updatedData.dogsRescued || 0,
        dogsAdopted: updatedData.dogsAdopted || 0,
        totalRaised: updatedData.totalRaised || 0,
        activeCampaigns: updatedData.activeCampaigns || 0
      };
      localStorage.setItem('huellitasUnidas_publicShelters', JSON.stringify(publicSheltersData));
      
      console.log('Perfil del refugio actualizado exitosamente');
    } catch (error) {
      console.error('Error updating shelter profile:', error);
    }
  };

  if (showLogin || !isAuthenticated || !currentShelter) {
    return (
      <LoginForm 
        onLogin={handleLogin}
        onCancel={onBack}
      />
    );
  }

  // Obtener datos específicos del refugio
  const currentShelterData = shelterData[currentShelter.id as keyof typeof shelterData];
  const currentDonations = currentShelterData?.donations || [];
  const currentDogs = currentShelterData?.dogs || [];
  const dynamicShelterNames = loadShelterNames();
  const currentShelterColor = getShelterColor(currentShelter.id);

  const EditForm = ({ item, type, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item || {});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64String = event.target?.result as string;
            setFormData(prev => ({
              ...prev,
              images: [...(prev.images || []), base64String]
            }));
          };
          reader.readAsDataURL(file);
        });
      }
    };

    const removePhoto = (index: number) => {
      const updatedImages = formData.images.filter((_: any, i: number) => i !== index);
      setFormData({ ...formData, images: updatedImages });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {item ? 'Editar' : 'Agregar'} {type === 'donations' ? 'Donación' : 'Adopción'}
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'donations' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo/Descripción</label>
                  <textarea
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={2}
                    placeholder="Descripción breve del caso..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Historia Completa</label>
                  <textarea
                    value={formData.story || ''}
                    onChange={(e) => setFormData({...formData, story: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={6}
                    placeholder="Cuenta la historia completa del caso..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta ($)</label>
                    <input
                      type="number"
                      value={formData.goal || ''}
                      onChange={(e) => setFormData({...formData, goal: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recaudado ($)</label>
                    <input
                      type="number"
                      value={formData.raised || ''}
                      onChange={(e) => setFormData({...formData, raised: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="active">Activa</option>
                    <option value="urgent">Urgente</option>
                    <option value="completed">Completada</option>
                    <option value="paused">Pausada</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                    <input
                      type="text"
                      value={formData.age || ''}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Raza</label>
                    <input
                      type="text"
                      value={formData.breed || ''}
                      onChange={(e) => setFormData({...formData, breed: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
                    <select
                      value={formData.size || 'Mediano'}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pequeño">Pequeño</option>
                      <option value="Mediano">Mediano</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                    <select
                      value={formData.gender || 'Hembra'}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Hembra">Hembra</option>
                      <option value="Macho">Macho</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peso</label>
                    <input
                      type="text"
                      value={formData.weight || ''}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder="ej: 25 kg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder="Descripción general del perrito..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Historia Completa</label>
                  <textarea
                    value={formData.story || ''}
                    onChange={(e) => setFormData({...formData, story: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={6}
                    placeholder="Cuenta la historia completa del perrito..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Características (separadas por comas)</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Cariñoso', 'Juguetón', 'Tranquilo', 'Activo', 'Obediente',
                        'Sociable', 'Protector', 'Inteligente', 'Leal', 'Amigable',
                        'Bueno con niños', 'Bueno con otros perros', 'Bueno con gatos',
                        'Entrenado', 'Guardián', 'Tímido', 'Valiente', 'Dulce'
                      ].map((trait) => {
                        const selectedTraits = Array.isArray(formData.traits) 
                          ? formData.traits 
                          : (formData.traits || '').split(',').map(t => t.trim()).filter(t => t);
                        const isSelected = selectedTraits.includes(trait);
                        
                        return (
                          <button
                            key={trait}
                            type="button"
                            onClick={() => {
                              const currentTraits = Array.isArray(formData.traits) 
                                ? formData.traits 
                                : (formData.traits || '').split(',').map(t => t.trim()).filter(t => t);
                              
                              let newTraits;
                              if (isSelected) {
                                newTraits = currentTraits.filter(t => t !== trait);
                              } else {
                                newTraits = [...currentTraits, trait];
                              }
                              
                              setFormData({...formData, traits: newTraits});
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isSelected
                                ? 'bg-green-500 text-white shadow-md transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                            }`}
                          >
                            {trait}
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      Seleccionadas: {Array.isArray(formData.traits) 
                        ? formData.traits.length 
                        : (formData.traits || '').split(',').filter(t => t.trim()).length} características
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personalidad (Niveles del 1-100)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Energía</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.personality?.energy || 50}
                        onChange={(e) => setFormData({
                          ...formData, 
                          personality: {
                            ...formData.personality,
                            energy: Number(e.target.value)
                          }
                        })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 text-center">{formData.personality?.energy || 50}%</div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Amigabilidad</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.personality?.friendliness || 50}
                        onChange={(e) => setFormData({
                          ...formData, 
                          personality: {
                            ...formData.personality,
                            friendliness: Number(e.target.value)
                          }
                        })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 text-center">{formData.personality?.friendliness || 50}%</div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Entrenamiento</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.personality?.training || 50}
                        onChange={(e) => setFormData({
                          ...formData, 
                          personality: {
                            ...formData.personality,
                            training: Number(e.target.value)
                          }
                        })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 text-center">{formData.personality?.training || 50}%</div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Independencia</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.personality?.independence || 50}
                        onChange={(e) => setFormData({
                          ...formData, 
                          personality: {
                            ...formData.personality,
                            independence: Number(e.target.value)
                          }
                        })}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 text-center">{formData.personality?.independence || 50}%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requisitos para Adopción</label>
                  <div className="space-y-2">
                    {(formData.requirements || []).map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => {
                            const newRequirements = [...(formData.requirements || [])];
                            newRequirements[index] = e.target.value;
                            setFormData({...formData, requirements: newRequirements});
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Requisito para adopción..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newRequirements = (formData.requirements || []).filter((_, i) => i !== index);
                            setFormData({...formData, requirements: newRequirements});
                          }}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newRequirements = [...(formData.requirements || []), ''];
                        setFormData({...formData, requirements: newRequirements});
                      }}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                      + Agregar Requisito
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado Veterinario</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.vaccinated || false}
                          onChange={(e) => setFormData({...formData, vaccinated: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Vacunado</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.sterilized || false}
                          onChange={(e) => setFormData({...formData, sterilized: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Esterilizado</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Información Médica</label>
                    <textarea
                      value={formData.medicalInfo || ''}
                      onChange={(e) => setFormData({...formData, medicalInfo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                      placeholder="Información médica adicional..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={formData.status || 'available'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="available">Disponible</option>
                    <option value="adopted">Adoptado</option>
                    <option value="reserved">Reservado</option>
                    <option value="medical">En Tratamiento</option>
                  </select>
                </div>
              </>
            )}
            
            {/* Photo Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'donations' ? 'Fotos del caso' : 'Fotos del perrito'}
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                type === 'donations' 
                  ? 'border-orange-300 hover:border-orange-400 bg-orange-50' 
                  : 'border-blue-300 hover:border-blue-400 bg-blue-50'
              }`}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className={`w-12 h-12 mx-auto mb-4 ${
                    type === 'donations' ? 'text-orange-400' : 'text-blue-400'
                  }`} />
                  <p className="text-gray-600 mb-2">Haz clic para subir fotos o arrastra aquí</p>
                  <p className="text-sm text-gray-500">PNG, JPG hasta 5MB cada una</p>
                </label>
              </div>
              
              {/* Photo Preview Grid */}
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {formData.images.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refugio</label>
              <input
                type="text"
                value={currentShelter.name}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Guardar
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSave = (data: any) => {
    if (!currentShelter) return;
    
    // Actualizar los datos en el estado y guardar inmediatamente
    const newData = JSON.parse(JSON.stringify(shelterData)); // Deep copy
    const shelterKey = currentShelter.id as keyof typeof newData;
    
    if (activeTab === 'donations') {
      if (editingItem) {
        // Editar donación existente
        newData[shelterKey].donations = newData[shelterKey].donations.map((donation: any) =>
          donation.id === editingItem.id ? { ...donation, ...data } : donation
        );
      } else {
        // Agregar nueva donación
        const newId = Math.max(...newData[shelterKey].donations.map((d: any) => d.id), 0) + 1;
        const newDonation = {
          ...data,
          id: newId,
          // Asegurar que tenga todos los campos necesarios para la vista pública
          title: data.title || 'Nueva Campaña',
          subtitle: data.subtitle || 'Descripción del caso',
          story: data.story || 'Historia del caso',
          raised: data.raised || 0,
          goal: data.goal || 1000,
          status: data.status || 'active',
          images: data.images || []
        };
        newData[shelterKey].donations.push(newDonation);
      }
    } else if (activeTab === 'adoptions') {
      if (editingItem) {
        // Editar adopción existente
        newData[shelterKey].dogs = newData[shelterKey].dogs.map((dog: any) =>
          dog.id === editingItem.id ? { ...dog, ...data } : dog
        );
      } else {
        // Agregar nueva adopción
        const newId = Math.max(...newData[shelterKey].dogs.map((d: any) => d.id), 0) + 1;
        const newDog = {
          ...data,
          id: newId,
          // Asegurar que tenga todos los campos necesarios
          name: data.name || 'Nuevo Perrito',
          age: data.age || '1 año',
          breed: data.breed || 'Mestizo',
          size: data.size || 'Mediano',
          gender: data.gender || 'Hembra',
          weight: data.weight || '',
          height: data.height || '',
          description: data.description || `${data.name || 'Este perrito'} es muy especial y busca un hogar amoroso.`,
          story: data.story || '',
          traits: Array.isArray(data.traits) ? data.traits : ['Cariñoso', 'Juguetón'],
          vaccinated: data.vaccinated || false,
          sterilized: data.sterilized || false,
          medicalInfo: data.medicalInfo || '',
          status: data.status || 'available',
          images: data.images || [],
          location: currentShelter.location,
          personality: data.personality || {
            energy: data.personality?.energy || 70,
            friendliness: data.personality?.friendliness || 85,
            training: data.personality?.training || 60,
            independence: data.personality?.independence || 50
          },
          requirements: Array.isArray(data.requirements) ? data.requirements.filter(r => r.trim()) : [],
          rescueDate: new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          contact: {
            name: "Coordinador de Adopciones",
            phone: "+52 55 1234 5678",
            email: "adopciones@huellitasunidas.org",
            whatsapp: "+52 55 1234 5678"
          }
        };
        newData[shelterKey].dogs.push(newDog);
      }
    }
    
    // Actualizar el estado y guardar en localStorage
    setShelterData(newData);
    console.log('Datos guardados:', newData);
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: number, type: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar este ${type}?`)) {
      if (!currentShelter) return;
      
      const newData = JSON.parse(JSON.stringify(shelterData)); // Deep copy
      const shelterKey = currentShelter.id as keyof typeof newData;
      
      if (activeTab === 'donations') {
        newData[shelterKey].donations = newData[shelterKey].donations.filter((donation: any) => donation.id !== id);
      } else if (activeTab === 'adoptions') {
        newData[shelterKey].dogs = newData[shelterKey].dogs.filter((dog: any) => dog.id !== id);
      }
      
      // Actualizar el estado y guardar en localStorage
      setShelterData(newData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{currentShelter.name}</h1>
                <p className="text-sm text-gray-600">{currentShelter.location}</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className={`bg-gradient-to-r ${currentShelterColor} text-white font-semibold py-2 px-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2`}
            >
              <Plus className="w-5 h-5" />
              Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'donations'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Donaciones
          </button>
          <button
            onClick={() => setActiveTab('adoptions')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'adoptions'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Adopciones
          </button>
          <button
            onClick={() => setActiveTab('shelter')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'shelter' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Refugio
          </button>
        </div>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:border-purple-500 hover:text-purple-500 transition-all duration-300">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Content Tables */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeTab === 'donations' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Campaña</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progreso</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Refugio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {donation.images && donation.images.length > 0 && (
                            <div className="flex -space-x-2">
                              {donation.images.slice(0, 3).map((image: string, index: number) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Foto ${index + 1}`}
                                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                />
                              ))}
                              {donation.images.length > 3 && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                                  +{donation.images.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="font-medium text-gray-800">{donation.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          ${donation.raised.toLocaleString()} / ${donation.goal.toLocaleString()}
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-orange-400 h-2 rounded-full"
                            style={{ width: `${(donation.raised / donation.goal) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          donation.status === 'active' ? 'bg-green-100 text-green-800' :
                          donation.status === 'urgent' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {donation.status === 'active' ? 'Activa' : 
                           donation.status === 'urgent' ? 'Urgente' : donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{currentShelter.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingItem(donation)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(donation.id, 'donación')}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'adoptions' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Perrito</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Edad</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Raza</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Refugio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentDogs.map((dog) => (
                    <tr key={dog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {dog.images && dog.images.length > 0 && (
                            <div className="flex -space-x-2">
                              {dog.images.slice(0, 3).map((image: string, index: number) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Foto ${index + 1}`}
                                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                />
                              ))}
                              {dog.images.length > 3 && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                                  +{dog.images.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-800">{dog.name}</div>
                            <div className="text-xs text-gray-500">{dog.size} • {dog.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dog.age}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{dog.breed}</div>
                        {dog.weight && <div className="text-xs text-gray-500">{dog.weight}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          dog.status === 'available' ? 'bg-green-100 text-green-800' :
                          dog.status === 'adopted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {dog.status === 'available' ? 'Disponible' : 
                           dog.status === 'adopted' ? 'Adoptado' : dog.status}
                        </span>
                        <div className="flex gap-1 mt-1">
                          {dog.vaccinated && <span className="text-xs bg-green-100 text-green-600 px-1 rounded">💉</span>}
                          {dog.sterilized && <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">✂️</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{currentShelter.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingItem(dog)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(dog.id, 'adopción')}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shelter' && (
            <ShelterProfileEditor 
              currentShelter={currentShelter}
              onUpdateShelter={handleUpdateShelterProfile}
            />
          )}
        </div>
      </div>

      {/* Edit/Add Form Modal */}
      {(editingItem || showAddForm) && (
        <EditForm
          item={editingItem}
          type={activeTab}
          onSave={handleSave}
          onCancel={() => {
            setEditingItem(null);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};