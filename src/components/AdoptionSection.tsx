import React from 'react';
import { AdoptionCard } from './AdoptionCard';

interface AdoptionSectionProps {
  onDogSelect: (dogId: number) => void;
  onDogGallery: (dogId: number) => void;
  dogs: any[];
}

export const AdoptionSection: React.FC<AdoptionSectionProps> = ({ onDogSelect, onDogGallery, dogs }) => {
  // Convertir datos del admin al formato esperado por AdoptionCard
  const formattedDogs = dogs.map(dog => ({
    id: dog.id,
    name: dog.name,
    age: dog.age,
    breed: dog.breed,
    size: dog.size || "Mediano",
    gender: dog.gender || "Hembra", 
    description: dog.description || `${dog.name} es un perrito muy especial que busca un hogar amoroso.`,
    image: dog.images && dog.images.length > 0 ? dog.images[0] : "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800",
    traits: dog.traits || ["Cariñoso", "Juguetón", "Leal"],
    vaccinated: dog.vaccinated || false,
    sterilized: dog.sterilized || false,
    location: dog.shelter === 'Refugio San Ángel' ? 'Ciudad de México' :
              dog.shelter === 'Patitas Felices' ? 'Guadalajara, Jalisco' :
              dog.shelter === 'Hogar Canino' ? 'Monterrey, Nuevo León' : 'México'
  }));

  return (
    <section id="adoptions-section" className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Perritos Buscando Hogar</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estos hermosos perritos están listos para llenar tu hogar de amor incondicional y alegría
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formattedDogs.map((dog) => (
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