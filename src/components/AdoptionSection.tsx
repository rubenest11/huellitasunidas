import React from 'react';
import { AdoptionCard } from './AdoptionCard';

const dogs = [
  {
    id: 1,
    name: "Bella",
    age: "2 años",
    breed: "Golden Retriever Mix",
    size: "Mediano",
    gender: "Hembra",
    description: "Bella es una perrita muy cariñosa y juguetona. Le encanta estar con niños y otros perros. Perfecta para familias activas.",
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: ["Cariñosa", "Juguetona", "Buena con niños"],
    vaccinated: true,
    sterilized: true,
    location: "Ciudad de México"
  },
  {
    id: 2,
    name: "Max",
    age: "4 años",
    breed: "Labrador",
    size: "Grande",
    gender: "Macho",
    description: "Max es un perro muy tranquilo y obediente. Ha sido entrenado en comandos básicos y es perfecto como compañero fiel.",
    image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: ["Tranquilo", "Obediente", "Entrenado"],
    vaccinated: true,
    sterilized: true,
    location: "Guadalajara"
  },
  {
    id: 3,
    name: "Luna",
    age: "1 año",
    breed: "Pastor Alemán Mix",
    size: "Mediano",
    gender: "Hembra",
    description: "Luna es muy inteligente y aprende rápido. Es protectora pero gentil, ideal para personas que buscan un compañero leal.",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: ["Inteligente", "Protectora", "Leal"],
    vaccinated: true,
    sterilized: false,
    location: "Monterrey"
  },
  {
    id: 4,
    name: "Charlie",
    age: "6 meses",
    breed: "Beagle Mix",
    size: "Pequeño",
    gender: "Macho",
    description: "Charlie es un cachorro lleno de energía que busca una familia que le enseñe y lo acompañe en sus aventuras.",
    image: "https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: ["Energético", "Cachorro", "Aventurero"],
    vaccinated: true,
    sterilized: false,
    location: "Puebla"
  },
  {
    id: 5,
    name: "Mía",
    age: "3 años",
    breed: "Chihuahua Mix",
    size: "Pequeño",
    gender: "Hembra",
    description: "Mía es perfecta para apartamentos. Es muy cariñosa con su familia y le gusta estar cerca de sus humanos favoritos.",
    image: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: ["Compacta", "Cariñosa", "Apartamento"],
    vaccinated: true,
    sterilized: true,
    location: "Tijuana"
  },
  {
    id: 6,
    name: "Bruno",
    age: "5 años",
    breed: "Pitbull Mix",
    size: "Grande",
    gender: "Macho",
    description: "Bruno es un gentil gigante que adora los abrazos. A pesar de su tamaño, es muy delicado y amoroso con todos.",
    image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: ["Gentil", "Amoroso", "Gigante"],
    vaccinated: true,
    sterilized: true,
    location: "Querétaro"
  }
];

interface AdoptionSectionProps {
  onDogSelect: (dogId: number) => void;
  onDogGallery: (dogId: number) => void;
}

export const AdoptionSection: React.FC<AdoptionSectionProps> = ({ onDogSelect, onDogGallery }) => {
  return (
    <section id="adoptions-section" className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Perritos Buscando Hogar</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estos hermosos perritos están listos para llenar tu hogar de amor incondicional y alegría
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog) => (
          <AdoptionCard 
            key={dog.id} 
            dog={dog} 
            onAdopt={() => onDogSelect(dog.id)}
            onMoreInfo={() => onDogGallery(dog.id)}
          />
        ))}
      </div>
    </section>
  );
};