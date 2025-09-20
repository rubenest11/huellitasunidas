import React from 'react';
import { Heart, Users, Clock } from 'lucide-react';

interface Donation {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  urgent: boolean;
}

interface DonationCardProps {
  donation: Donation;
  onDonate: () => void;
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation, onDonate }) => {
  const percentage = Math.round((donation.raised / donation.goal) * 100);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
      {donation.urgent && (
        <div className="bg-red-500 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4" />
          URGENTE
        </div>
      )}
      
      <div className="relative">
        <img 
          src={donation.image} 
          alt={donation.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {percentage}% completado
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{donation.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{donation.description}</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Progreso</span>
              <span className="text-sm font-semibold text-gray-700">
                ${donation.raised.toLocaleString()} de ${donation.goal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-400 to-pink-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{donation.donors} donadores</span>
            </div>
            <div className="text-gray-500">
              Faltan ${(donation.goal - donation.raised).toLocaleString()}
            </div>
          </div>
          
          <button 
            onClick={onDonate}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Heart className="w-5 h-5" />
            Ver Campaña
          </button>
        </div>
      </div>
    </div>
  );
};