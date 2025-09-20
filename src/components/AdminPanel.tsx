import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit3, Trash2, Search, Filter, Save, X } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

// Mock data para administración
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

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'donations' | 'adoptions' | 'shelters'>('donations');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const EditForm = ({ item, type, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(item || {});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refugio</label>
              <select
                value={formData.shelter || ''}
                onChange={(e) => setFormData({...formData, shelter: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Seleccionar refugio</option>
                <option value="Refugio San Ángel">Refugio San Ángel</option>
                <option value="Patitas Felices">Patitas Felices</option>
                <option value="Hogar Canino">Hogar Canino</option>
                <option value="Rescate Tijuana">Rescate Tijuana</option>
              </select>
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
    console.log('Guardando:', data);
    setEditingItem(null);
    setShowAddForm(false);
    // Aquí implementarías la lógica para guardar en la base de datos
  };

  const handleDelete = (id: number, type: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar este ${type}?`)) {
      console.log('Eliminando:', id, type);
      // Aquí implementarías la lógica para eliminar de la base de datos
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
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Volver</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  {mockDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{donation.title}</div>
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
                      <td className="px-6 py-4 text-sm text-gray-600">{donation.shelter}</td>
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
                  {mockDogs.map((dog) => (
                    <tr key={dog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{dog.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dog.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dog.breed}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          dog.status === 'available' ? 'bg-green-100 text-green-800' :
                          dog.status === 'adopted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {dog.status === 'available' ? 'Disponible' : 
                           dog.status === 'adopted' ? 'Adoptado' : dog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dog.shelter}</td>
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
              <h3 className="text-lg font-medium mb-2">Gestión de Refugios</h3>
              <p>Aquí podrás administrar la información de los refugios afiliados.</p>
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