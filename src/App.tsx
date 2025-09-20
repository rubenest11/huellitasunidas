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

function App() {
  const [activeSection, setActiveSection] = useState<'donations' | 'adoptions' | 'shelters' | 'admin'>('donations');
  const [selectedDog, setSelectedDog] = useState<number | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<number | null>(null);

  if (selectedDonation !== null) {
    return (
      <div className="min-h-screen bg-white">
        <DonationDetail 
          donationId={selectedDonation} 
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
        <AdminPanel onBack={() => setActiveSection('donations')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'donations' ? (
          <DonationSection onDonationSelect={setSelectedDonation} />
        ) : activeSection === 'shelters' ? (
          <SheltersSection onShelterSelect={setSelectedShelter} />
        ) : (
          <AdoptionSection 
            onDogSelect={setSelectedDog}
            onDogGallery={setSelectedDog}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;