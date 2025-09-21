import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit3, Trash2, Search, Filter, Save, X, Camera } from 'lucide-react';
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

const shelterColors = {
  'refugio-san-angel': 'from-orange-500 to-red-500',
  'patitas-felices': 'from-blue-500 to-purple-500',
  'hogar-canino': 'from-green-500 to-teal-500'
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

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, shelterData, setShelterData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentShelter, setCurrentShelter] = useState<Shelter | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [activeTab, setActiveTab] = useState<'donations' | 'adoptions' | 'shelters'>('donations');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
    const newData = { ...shelterData };
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
          // Asegurar que tenga todos los campos necesarios para la vista pública
          name: data.name || 'Nuevo Perrito',
          age: data.age || '1 año',
          breed: data.breed || 'Mestizo',
          size: data.size || 'Mediano',
          gender: data.gender || 'Hembra',
          weight: data.weight || '',
          description: data.description || `${data.name || 'Este perrito'} es muy especial y busca un hogar amoroso.`,
          story: data.story || '',
          traits: Array.isArray(data.traits) ? data.traits : (data.traits ? data.traits.split(',').map(t => t.trim()) : ['Cariñoso', 'Juguetón']),
          vaccinated: data.vaccinated || false,
          sterilized: data.sterilized || false,
          medicalInfo: data.medicalInfo || '',
          status: data.status || 'available',
          images: data.images || [],
          personality: data.personality || {
            energy: 50,
            friendliness: 50,
            training: 50,
            independence: 50
          },
          requirements: data.requirements || []
        };
        newData[shelterKey].dogs.push(newDog);
      }
    }
    
    // Actualizar el estado y guardar en localStorage
    setShelterData(newData);
    
    // Forzar guardado inmediato
    try {
      localStorage.setItem('huellitasUnidas_shelterData', JSON.stringify(newData));
      console.log('Datos guardados exitosamente:', newData);
    } catch (error) {
      console.error('Error guardando datos:', error);
    }
    
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: number, type: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar este ${type}?`)) {
      if (!currentShelter) return;
      
      const newData = { ...prevData };
      const shelterKey = currentShelter.id as keyof typeof newData;
      
      if (activeTab === 'donations') {
        newData[shelterKey].donations = newData[shelterKey].donations.filter((donation: any) => donation.id !== id);
      } else if (activeTab === 'adoptions') {
        newData[shelterKey].dogs = newData[shelterKey].dogs.filter((dog: any) => dog.id !== id);
      }
      
      // Actualizar el estado y guardar en localStorage
      setShelterData(newData);
      
      // Forzar guardado inmediato
      try {
        localStorage.setItem('huellitasUnidas_shelterData', JSON.stringify(newData));
        console.log('Datos eliminados y guardados exitosamente');
      } catch (error) {
        console.error('Error guardando datos después de eliminar:', error);
      }
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
              className={`bg-gradient-to-r ${shelterColors[currentShelter.id as keyof typeof shelterColors]} text-white font-semibold py-2 px-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2`}
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
            onClick={() => setActiveTab('shelters')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'shelters'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            Refugios
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

          {activeTab === 'shelters' && (
            <div className="p-6 text-center text-gray-500">
              <div className={`bg-gradient-to-r ${shelterColors[currentShelter.id as keyof typeof shelterColors]} text-white rounded-2xl p-8 mb-6`}>
                <h3 className="text-2xl font-bold mb-2">{currentShelter.name}</h3>
                <p className="text-lg opacity-90">{currentShelter.location}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-orange-800 mb-2">Campañas de Donación</h4>
                  <p className="text-3xl font-bold text-orange-600">{currentDonations.length}</p>
                  <p className="text-sm text-orange-700">Campañas activas</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">Perritos en Adopción</h4>
                  <p className="text-3xl font-bold text-blue-600">{currentDogs.length}</p>
                  <p className="text-sm text-blue-700">Esperando hogar</p>
                </div>
              </div>
            </div>
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