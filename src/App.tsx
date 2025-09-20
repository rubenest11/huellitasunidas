import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DonationSection } from './components/DonationSection';
import { AdoptionSection } from './components/AdoptionSection';
import { SheltersSection } from './components/SheltersSection';
import { DogDetail } from './components/DogDetail';
import { DonationDetail } from './components/DonationDetail';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

// Estado global para datos de refugios
const initialShelterData = {
  'refugio-san-angel': {
    donations: [
      { id: 1, title: "Cirugía de Emergencia para Luna", raised: 3200, goal: 5000, status: "active", images: ["https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"] },
    ],
    dogs: [
      { id: 1, name: "Bella", age: "2 años", breed: "Golden Retriever Mix", status: "available", images: ["https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
      { id: 4, name: "Charlie", age: "6 meses", breed: "Beagle Mix", status: "available", images: ["https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800"] },
    ]
  },
  'patitas-felices': {
    donations: [
      { id: 2, title: "Cirugía de Emergencia para Max", raised: 2800, goal: 4500, status: "urgent", images: ["https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
    ],
    dogs: [
      { id: 2, name: "Max", age: "4 años", breed: "Labrador", status: "available", images: ["https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"] },
      { id: 6, name: "Bruno", age: "5 años", breed: "Pitbull Mix", status: "adopted", images: ["https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
    ]
  },
  'hogar-canino': {
    donations: [
      { id: 3, title: "Cirugía de Emergencia para Rocky", raised: 1800, goal: 3500, status: "active", images: ["https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800"] },
    ],
    dogs: [
      { id: 3, name: "Luna", age: "1 año", breed: "Pastor Alemán Mix", status: "available", images: ["https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
      { id: 5, name: "Mía", age: "3 años", breed: "Chihuahua Mix", status: "reserved", images: ["https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800"] },
    ]
  }
};

function App() {
  const [activeSection, setActiveSection] = useState<'donations' | 'adoptions' | 'shelters' | 'admin'>('donations');
  const [selectedDog, setSelectedDog] = useState<number | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<number | null>(null);
  const [shelterData, setShelterData] = useState(initialShelterData);

  // Función para obtener todas las donaciones combinadas
  const getAllDonations = () => {
    const allDonations = [];
    Object.values(shelterData).forEach(shelter => {
      allDonations.push(...shelter.donations);
    });
    return allDonations;
  };

  // Función para obtener todos los perros combinados
  const getAllDogs = () => {
    const allDogs = [];
    Object.values(shelterData).forEach(shelter => {
      allDogs.push(...shelter.dogs);
    });
    return allDogs;
  };

  if (selectedDonation !== null) {
    return (
      <div className="min-h-screen bg-white">
        <DonationDetail 
          donationId={selectedDonation} 
          shelterData={shelterData}
          onBack={() => {
            setSelectedDonation(null);
          }} 
        />
      </div>
    );
  }

  if (selectedDog !== null) {
    return (
      <div className="min-h-screen bg-white">
        <DogDetail 
          dogId={selectedDog} 
          shelterData={shelterData}
          onBack={() => {
            setSelectedDog(null);
          }} 
        />
      </div>
    );
  }

  if (activeSection === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminPanel 
          onBack={() => setActiveSection('donations')} 
          shelterData={shelterData}
          setShelterData={setShelterData}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'donations' ? (
          <DonationSection 
            onDonationSelect={setSelectedDonation} 
            donations={getAllDonations()}
          />
        ) : activeSection === 'shelters' ? (
          <SheltersSection onShelterSelect={setSelectedShelter} />
        ) : (
          <AdoptionSection 
            onDogSelect={setSelectedDog}
            onDogGallery={setSelectedDog}
            dogs={getAllDogs()}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;