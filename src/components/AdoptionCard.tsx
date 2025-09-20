import React from 'react';
import { Heart, MapPin, Check, X } from 'lucide-react';

interface Dog {
  id: number;
  name: string;
  age: string;
  breed: string;
  size: string;
  gender: string;
  description: string;
  image: string;
  traits: string[];
  vaccinated: boolean;
  sterilized: boolean;
  location: string;
}

interface AdoptionCardProps {
  dog: Dog;
  onAdopt: () => void;
  onMoreInfo: () => void;
}

export const AdoptionCard: React.FC<AdoptionCardProps> = ({ dog, onAdopt, onMoreInfo }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img 
          src={dog.image} 
          alt={dog.name}
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {dog.size}
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{dog.name}</h3>
            <p className="text-sm sm:text-base text-gray-600">{dog.age} • {dog.breed}</p>
            <div className="flex items-center gap-1 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{dog.location}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            dog.gender === 'Macho' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
          }`}>
            {dog.gender}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{dog.description}</p>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {dog.traits.map((trait, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {trait}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              {dog.vaccinated ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={dog.vaccinated ? 'text-green-700' : 'text-red-700'}>
                Vacunado
              </span>
            </div>
            <div className="flex items-center gap-2">
              {dog.sterilized ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={dog.sterilized ? 'text-green-700' : 'text-red-700'}>
                Esterilizado
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onAdopt}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Adoptar
            </button>
            <button 
              onClick={onMoreInfo}
              className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300 text-sm"
            >
              Más Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};