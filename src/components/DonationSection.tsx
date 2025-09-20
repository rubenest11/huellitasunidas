import React from 'react';
import { DonationCard } from './DonationCard';

interface DonationSectionProps {
  onDonationSelect: (donationId: number) => void;
  donations: any[];
}

export const DonationSection: React.FC<DonationSectionProps> = ({ onDonationSelect, donations }) => {
  // Convertir datos del admin al formato esperado por DonationCard
  const formattedDonations = donations.map(donation => ({
    id: donation.id,
    title: donation.title,
    description: donation.title, // Usar título como descripción por ahora
    image: donation.images && donation.images.length > 0 ? donation.images[0] : "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    raised: donation.raised,
    goal: donation.goal,
    donors: Math.floor(donation.raised / 50), // Calcular donadores aproximados
    urgent: donation.status === 'urgent'
  }));

  return (
    <section id="donations-section" className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Campañas de Donación Activas</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cada donación, sin importar el monto, hace la diferencia en la vida de un perrito necesitado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formattedDonations.map((donation) => (
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