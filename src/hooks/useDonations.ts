import { useState, useEffect } from 'react';

export interface DonationRecord {
  id: number;
  donor: string;
  amount: number;
  date: string;
  message: string;
  campaignId: number;
}

export interface CampaignStats {
  raised: number;
  donors: number;
}

// Simulamos una base de datos local para el demo
let donationsDatabase: DonationRecord[] = [
  { id: 1, donor: "María González", amount: 500, date: "Hace 2 horas", message: "Espero que Luna se recupere pronto ❤️", campaignId: 1 },
  { id: 2, donor: "Carlos Ruiz", amount: 200, date: "Hace 5 horas", message: "Por todos los perritos que necesitan ayuda", campaignId: 1 },
  { id: 3, donor: "Ana López", amount: 150, date: "Hace 8 horas", message: "", campaignId: 1 },
  { id: 4, donor: "Roberto Silva", amount: 300, date: "Hace 1 día", message: "Luna merece una vida feliz", campaignId: 1 },
  { id: 5, donor: "Sofía Martín", amount: 100, date: "Hace 1 día", message: "Pequeña ayuda para Luna", campaignId: 1 },
  { id: 6, donor: "Diego Herrera", amount: 250, date: "Hace 2 días", message: "Fuerza Luna! 🐕", campaignId: 1 },
  { id: 7, donor: "Lucía Torres", amount: 400, date: "Hace 2 días", message: "Espero que la cirugía sea exitosa", campaignId: 1 },
  { id: 8, donor: "Miguel Ángel", amount: 180, date: "Hace 3 días", message: "", campaignId: 1 },
  { id: 9, donor: "Familia Rodríguez", amount: 800, date: "Hace 1 hora", message: "Por todos los cachorros ❤️", campaignId: 2 },
  { id: 10, donor: "Elena Vásquez", amount: 300, date: "Hace 3 horas", message: "Espero que crezcan sanos", campaignId: 2 },
  { id: 11, donor: "Pedro Jiménez", amount: 450, date: "Hace 6 horas", message: "Los cachorros merecen amor", campaignId: 2 }
];

let nextId = 12;

export const useDonations = (campaignId: number) => {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [stats, setStats] = useState<CampaignStats>({ raised: 0, donors: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDonations();
  }, [campaignId]);

  const loadDonations = () => {
    const campaignDonations = donationsDatabase
      .filter(d => d.campaignId === campaignId)
      .sort((a, b) => b.id - a.id);
    
    setDonations(campaignDonations);
    
    const totalRaised = campaignDonations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonors = campaignDonations.length;
    
    setStats({ raised: totalRaised, donors: totalDonors });
  };

  const addDonation = async (donorName: string, amount: number, message: string = '') => {
    setLoading(true);
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDonation: DonationRecord = {
      id: nextId++,
      donor: donorName,
      amount,
      date: "Hace unos segundos",
      message,
      campaignId
    };
    
    donationsDatabase.unshift(newDonation);
    loadDonations();
    setLoading(false);
    
    return newDonation;
  };

  return {
    donations,
    stats,
    loading,
    addDonation
  };
};