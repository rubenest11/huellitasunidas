import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Clock, Users, DollarSign, Calendar, Share2, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { DonationForm } from './DonationForm';
import { useDonations } from '../hooks/useDonations';

// Mock data para las donaciones detalladas
const donationDetails = {
  1: {
    id: 1,
    title: "Cirugía de Emergencia para Luna",
    description: "Luna fue encontrada con una fractura en la pata y necesita cirugía urgente para caminar de nuevo.",
    story: "Luna fue encontrada hace tres semanas en las calles de la Ciudad de México. Una familia la vio cojeando y claramente en dolor, así que inmediatamente la trajeron a nuestro refugio. Los veterinarios confirmaron que tiene una fractura compleja en su pata trasera izquierda que requiere cirugía inmediata. Sin esta operación, Luna podría quedar coja permanentemente o incluso perder la pata. Es una perrita muy dulce de apenas 2 años que merece una segunda oportunidad para correr y jugar como cualquier perro feliz. La cirugía incluye la colocación de placas de titanio y un período de rehabilitación de 8 semanas. Con tu ayuda, Luna podrá volver a caminar y encontrar una familia amorosa.",
    images: [
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    raised: 3200,
    goal: 5000,
    donors: 67,
    urgent: true,
    createdDate: "15 de enero, 2025",
    endDate: "28 de febrero, 2025",
    category: "Cirugía de Emergencia",
    location: "Ciudad de México",
    veterinary: "Hospital Veterinario San Ángel"
  },
  2: {
    id: 2,
    title: "Refugio para 20 Cachorros Abandonados",
    description: "Estos pequeños fueron encontrados sin madre y necesitan cuidado veterinario y alimento especial.",
    story: "La semana pasada recibimos una llamada de emergencia: 20 cachorros de apenas 4 semanas habían sido abandonados en una caja de cartón cerca de un parque. Sin su madre, estos pequeños necesitan alimentación cada 2 horas con fórmula especial, cuidado veterinario constante y un ambiente cálido y seguro. Hemos convertido una de nuestras salas en una guardería especial para ellos, pero los costos de alimentación, vacunas, desparasitación y cuidado médico son enormes. Cada cachorro necesita aproximadamente $600 pesos en cuidados durante sus primeros 3 meses de vida. Tu donación nos ayudará a darles la mejor oportunidad de crecer sanos y fuertes hasta que estén listos para encontrar sus hogares para siempre.",
    images: [
      "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    raised: 8500,
    goal: 12000,
    donors: 143,
    urgent: false,
    createdDate: "8 de enero, 2025",
    endDate: "31 de marzo, 2025",
    category: "Cuidado de Cachorros",
    location: "Guadalajara",
    veterinary: "Clínica Veterinaria Patitas"
  }
};

interface DonationDetailProps {
  donationId: number;
  onBack: () => void;
}

export const DonationDetail: React.FC<DonationDetailProps> = ({ donationId, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  
  const { donations, stats, loading, addDonation } = useDonations(donationId);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const donation = donationDetails[donationId as keyof typeof donationDetails];
  
  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaña no encontrada</h2>
          <button 
            onClick={onBack}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  // Usar stats dinámicos en lugar de datos estáticos
  const currentRaised = stats.raised;
  const percentage = Math.round((currentRaised / donation.goal) * 100);
  const remaining = donation.goal - currentRaised;

  const handleDonationSuccess = async (donorName: string, amount: number, message: string) => {
    await addDonation(donorName, amount, message);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Compartir</span>
              </button>
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <img 
              src={donation.images[currentImageIndex]} 
              alt={`${donation.title} - Foto ${currentImageIndex + 1}`}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
            />
            {donation.urgent && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                <Clock className="w-4 h-4" />
                URGENTE
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {donation.images.slice(1, 5).map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${donation.title} - Foto ${index + 2}`}
                className="w-full h-44 lg:h-60 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentImageIndex(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{donation.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {donation.category}
                    </span>
                    <span>•</span>
                    <span>{donation.location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{donation.description}</p>

              {/* Progress Section */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Progreso de la Campaña</h3>
                  <span className="text-2xl font-bold text-orange-600">{percentage}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-pink-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">${currentRaised.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Recaudado</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">${remaining.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Falta</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{stats.donors}</div>
                    <div className="text-sm text-gray-600">Donadores</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Historia Completa</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <p className="text-gray-700 leading-relaxed">{donation.story}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-gray-800">Fecha de inicio:</strong>
                    <div className="text-gray-600">{donation.createdDate}</div>
                  </div>
                  <div>
                    <strong className="text-gray-800">Fecha límite:</strong>
                    <div className="text-gray-600">{donation.endDate}</div>
                  </div>
                  <div>
                    <strong className="text-gray-800">Veterinaria:</strong>
                    <div className="text-gray-600">{donation.veterinary}</div>
                  </div>
                  <div>
                    <strong className="text-gray-800">Ubicación:</strong>
                    <div className="text-gray-600">{donation.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Donaciones Recientes</h3>
              <div className="space-y-4">
                {donations.slice(0, 8).map((donationItem) => (
                  <div key={donationItem.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{donationItem.donor}</div>
                            <div className="text-sm text-gray-600">{donationItem.date}</div>
                          </div>
                        </div>
                        {donationItem.message && (
                          <p className="text-gray-700 text-sm ml-13">{donationItem.message}</p>
                        )}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ${donationItem.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Donation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DonationForm
                campaignId={donationId}
                campaignTitle={donation.title}
                onDonationSuccess={handleDonationSuccess}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setShowAllImages(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <img 
              src={donation.images[currentImageIndex]} 
              alt={`${donation.title} - Foto ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="flex justify-center mt-4 gap-2">
              {donation.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};