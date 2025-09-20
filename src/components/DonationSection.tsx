import React from 'react';
import { DonationCard } from './DonationCard';

const donations = [
  {
    id: 1,
    title: "Cirugía de Emergencia para Luna",
    description: "Luna fue encontrada con una fractura en la pata y necesita cirugía urgente para caminar de nuevo.",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: 3200,
    goal: 5000,
    donors: 67,
    urgent: true
  },
  {
    id: 2,
    title: "Refugio para 20 Cachorros Abandonados",
    description: "Estos pequeños fueron encontrados sin madre y necesitan cuidado veterinario y alimento especial.",
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: 8500,
    goal: 12000,
    donors: 143,
    urgent: false
  },
  {
    id: 3,
    title: "Tratamiento contra el Parvovirus",
    description: "Max necesita tratamiento inmediato contra el parvovirus. Con tu ayuda, puede recuperarse completamente.",
    image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: 1800,
    goal: 3500,
    donors: 42,
    urgent: true
  },
  {
    id: 4,
    title: "Alimentación para Perros Adultos Mayores",
    description: "Nuestros perritos senior necesitan comida especial y suplementos para mantener su salud.",
    image: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: 2400,
    goal: 4000,
    donors: 89,
    urgent: false
  },
  {
    id: 5,
    title: "Rehabilitación para Rocky",
    description: "Rocky fue víctima de maltrato y necesita terapia física y emocional para volver a confiar en los humanos.",
    image: "https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: 5200,
    goal: 7500,
    donors: 98,
    urgent: false
  },
  {
    id: 6,
    title: "Vacunación Masiva de Rescatados",
    description: "50 perritos recién rescatados necesitan sus vacunas completas para estar protegidos y listos para adopción.",
    image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: 6800,
    goal: 10000,
    donors: 156,
    urgent: false
  }
];

interface DonationSectionProps {
  onDonationSelect: (donationId: number) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ onDonationSelect }) => {
  return (
    <section id="donations-section" className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Campañas de Donación Activas</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cada donación, sin importar el monto, hace la diferencia en la vida de un perrito necesitado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.map((donation) => (
          <DonationCard 
            key={donation.id} 
            donation={donation} 
            onDonate={() => onDonationSelect(donation.id)}
          />
        ))}
      </div>
    </section>
  );
};