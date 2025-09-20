import React from 'react';
import { MapPin, Heart, Home, DollarSign, Calendar, Phone, Mail, Globe } from 'lucide-react';

interface Shelter {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  dogsRescued: number;
  dogsAdopted: number;
  activeCampaigns: number;
  totalRaised: number;
  established: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  services: string[];
  capacity: number;
  currentDogs: number;
}

interface ShelterCardProps {
  shelter: Shelter;
  onViewDetails: () => void;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({ shelter, onViewDetails }) => {
  const occupancyPercentage = Math.round((shelter.currentDogs / shelter.capacity) * 100);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img 
          src={shelter.image} 
          alt={shelter.name}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Desde {shelter.established}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 line-clamp-2">{shelter.name}</h3>
            <div className="flex items-center gap-1 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{shelter.location}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{shelter.description}</p>
        
        <div className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{shelter.dogsRescued}</div>
              <div className="text-xs text-blue-700">Rescatados</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-green-600">{shelter.dogsAdopted}</div>
              <div className="text-xs text-green-700">Adoptados</div>
            </div>
          </div>

          {/* Capacity */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Ocupación</span>
              <span className="text-sm font-semibold text-gray-700">
                {shelter.currentDogs}/{shelter.capacity} ({occupancyPercentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  occupancyPercentage > 80 ? 'bg-red-400' : 
                  occupancyPercentage > 60 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Active Info */}
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span>{shelter.activeCampaigns} campañas</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span>${shelter.totalRaised.toLocaleString()}</span>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-2">
            {shelter.services.slice(0, 3).map((service, index) => (
              <span 
                key={index}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
            {shelter.services.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                +{shelter.services.length - 3} más
              </span>
            )}
          </div>

          {/* Contact */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{shelter.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{shelter.contact.email}</span>
            </div>
          </div>
          
          <button 
            onClick={onViewDetails}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
          >
            <Home className="w-5 h-5" />
            Ver Refugio
          </button>
        </div>
      </div>
    </div>
  );
};