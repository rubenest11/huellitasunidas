import React from 'react';
import { ShelterCard } from './ShelterCard';

const shelters = [
  {
    id: 1,
    name: "Refugio San Ángel",
    location: "Ciudad de México",
    description: "Refugio especializado en rescate y rehabilitación de perros abandonados. Con más de 10 años de experiencia.",
    image: "https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=800",
    dogsRescued: 1247,
    dogsAdopted: 923,
    activeCampaigns: 8,
    totalRaised: 84592,
    established: "2014",
    contact: {
      phone: "+52 55 1234 5678",
      email: "info@refugiosanangel.org",
      website: "www.refugiosanangel.org"
    },
    services: ["Rescate", "Rehabilitación", "Adopciones", "Esterilización"],
    capacity: 150,
    currentDogs: 89
  },
  {
    id: 2,
    name: "Patitas Felices Guadalajara",
    location: "Guadalajara, Jalisco",
    description: "Organización dedicada al bienestar animal con enfoque en cachorros huérfanos y perros senior.",
    image: "https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=800",
    dogsRescued: 856,
    dogsAdopted: 634,
    activeCampaigns: 5,
    totalRaised: 52340,
    established: "2016",
    contact: {
      phone: "+52 33 9876 5432",
      email: "adopciones@patitasfelices.org",
      website: "www.patitasfelices.org"
    },
    services: ["Cuidado de Cachorros", "Atención Senior", "Adopciones", "Educación"],
    capacity: 100,
    currentDogs: 67
  },
  {
    id: 3,
    name: "Hogar Canino Monterrey",
    location: "Monterrey, Nuevo León",
    description: "Refugio moderno con instalaciones veterinarias propias y programas de entrenamiento.",
    image: "https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=800",
    dogsRescued: 692,
    dogsAdopted: 521,
    activeCampaigns: 6,
    totalRaised: 38750,
    established: "2018",
    contact: {
      phone: "+52 81 5555 1234",
      email: "contacto@hogarcanino.org",
      website: "www.hogarcanino.org"
    },
    services: ["Hospital Veterinario", "Entrenamiento", "Adopciones", "Terapia"],
    capacity: 80,
    currentDogs: 45
  },
  {
    id: 4,
    name: "Rescate Tijuana",
    location: "Tijuana, Baja California",
    description: "Refugio fronterizo que trabaja en colaboración con organizaciones de Estados Unidos.",
    image: "https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=800",
    dogsRescued: 1089,
    dogsAdopted: 876,
    activeCampaigns: 7,
    totalRaised: 67890,
    established: "2015",
    contact: {
      phone: "+52 664 123 4567",
      email: "rescate@tijuanarescue.org",
      website: "www.tijuanarescue.org"
    },
    services: ["Rescate Fronterizo", "Adopciones Internacionales", "Transporte", "Rehabilitación"],
    capacity: 120,
    currentDogs: 78
  },
  {
    id: 5,
    name: "Amor Perruno Puebla",
    location: "Puebla, Puebla",
    description: "Refugio familiar que se especializa en casos de maltrato y abandono extremo.",
    image: "https://images.pexels.com/photos/7210755/pexels-photo-7210755.jpeg?auto=compress&cs=tinysrgb&w=800",
    dogsRescued: 543,
    dogsAdopted: 412,
    activeCampaigns: 4,
    totalRaised: 29650,
    established: "2019",
    contact: {
      phone: "+52 222 987 6543",
      email: "info@amorperruno.org",
      website: "www.amorperruno.org"
    },
    services: ["Rehabilitación Psicológica", "Casos de Maltrato", "Adopciones", "Terapia"],
    capacity: 60,
    currentDogs: 34
  },
  {
    id: 6,
    name: "Segundo Hogar Querétaro",
    location: "Querétaro, Querétaro",
    description: "Refugio sustentable con programas de voluntariado y educación comunitaria.",
    image: "https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg?auto=compress&cs=tinysrgb&w=800",
    dogsRescued: 378,
    dogsAdopted: 289,
    activeCampaigns: 3,
    totalRaised: 21450,
    established: "2020",
    contact: {
      phone: "+52 442 555 7890",
      email: "contacto@segundohogar.org",
      website: "www.segundohogar.org"
    },
    services: ["Educación Comunitaria", "Voluntariado", "Adopciones", "Sustentabilidad"],
    capacity: 50,
    currentDogs: 28
  }
];

interface SheltersSectionProps {
  onShelterSelect: (shelterId: number) => void;
}

export const SheltersSection: React.FC<SheltersSectionProps> = ({ onShelterSelect }) => {
  return (
    <section id="shelters-section" className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Refugios Afiliados</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Conoce los refugios que forman parte de nuestra red de rescate y adopción
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shelters.map((shelter) => (
          <ShelterCard 
            key={shelter.id} 
            shelter={shelter} 
            onViewDetails={() => onShelterSelect(shelter.id)}
          />
        ))}
      </div>
    </section>
  );
};