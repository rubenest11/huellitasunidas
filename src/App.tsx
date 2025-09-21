import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DonationSection } from './components/DonationSection';
import { AdoptionSection } from './components/AdoptionSection';
import { SheltersSection } from './components/SheltersSection';
import { RegistrationSection } from './components/RegistrationSection';
import { DogDetail } from './components/DogDetail';
import { DonationDetail } from './components/DonationDetail';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

// Función para guardar datos en localStorage
const saveShelterData = (data: any) => {
  try {
    console.log('Guardando datos en localStorage:', data);
    localStorage.setItem('huellitasUnidas_shelterData', JSON.stringify(data));
    console.log('Datos guardados exitosamente');
  } catch (error) {
    console.error('Error saving shelter data:', error);
  }
};

// Función para cargar datos desde localStorage
const loadShelterData = () => {
  try {
    const savedData = localStorage.getItem('huellitasUnidas_shelterData');
    console.log('Cargando datos del localStorage:', savedData ? 'Datos encontrados' : 'No hay datos');
    if (savedData && savedData !== 'undefined') {
      const parsedData = JSON.parse(savedData);
      console.log('Datos parseados exitosamente');
      return parsedData;
    }
  } catch (error) {
    console.error('Error loading shelter data:', error);
  }
  
  console.log('Usando datos iniciales por defecto');
  // Datos iniciales por defecto
  return {
    'refugio-san-angel': {
      donations: [
        { 
          id: 1, 
          title: "Cirugía de Emergencia para Luna", 
          subtitle: "Luna fue encontrada con una fractura en la pata y necesita cirugía urgente para caminar de nuevo.",
          story: "Luna fue encontrada hace tres semanas en las calles de la Ciudad de México. Una familia la vio cojeando y claramente en dolor, así que inmediatamente la trajeron a nuestro refugio. Los veterinarios confirmaron que tiene una fractura compleja en su pata trasera izquierda que requiere cirugía inmediata. Sin esta operación, Luna podría quedar coja permanentemente o incluso perder la pata. Es una perrita muy dulce de apenas 2 años que merece una segunda oportunidad para correr y jugar como cualquier perro feliz. La cirugía incluye la colocación de placas de titanio y un período de rehabilitación de 8 semanas. Con tu ayuda, Luna podrá volver a caminar y encontrar una familia amorosa.",
          raised: 3200, 
          goal: 5000, 
          status: "active", 
          images: ["https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"] 
        },
      ],
      dogs: [
        { id: 1, name: "Bella", age: "2 años", breed: "Golden Retriever Mix", status: "available", images: ["https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
        { 
          id: 4, 
          name: "Charlie", 
          age: "6 meses", 
          breed: "Beagle Mix", 
          status: "available", 
          images: ["https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800"],
          personality: { energy: 85, friendliness: 95, training: 70, independence: 40 },
          requirements: ["Casa con patio", "Familia activa", "Experiencia con perros"]
        },
      ]
    },
    'patitas-felices': {
      donations: [
        { 
          id: 2, 
          title: "Cirugía de Emergencia para Max", 
          subtitle: "Max fue encontrado con una fractura en la pata y necesita cirugía urgente para caminar de nuevo.",
          story: "Max fue encontrado hace dos semanas en las calles de Guadalajara. Un transeúnte lo vio cojeando y claramente en dolor, así que inmediatamente lo trajo a nuestro refugio. Los veterinarios confirmaron que tiene una fractura compleja en su pata delantera derecha que requiere cirugía inmediata. Sin esta operación, Max podría quedar cojo permanentemente o incluso perder la pata. Es un perrito muy noble de 4 años que merece una segunda oportunidad para correr y jugar como cualquier perro feliz. La cirugía incluye la colocación de placas de titanio y un período de rehabilitación de 6 semanas. Con tu ayuda, Max podrá volver a caminar y encontrar una familia amorosa.",
          raised: 2800, 
          goal: 4500, 
          status: "urgent", 
          images: ["https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800"] 
        },
      ],
      dogs: [
        { id: 2, name: "Max", age: "4 años", breed: "Labrador", status: "available", images: ["https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"] },
        { id: 6, name: "Bruno", age: "5 años", breed: "Pitbull Mix", status: "adopted", images: ["https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
      ]
    },
    'hogar-canino': {
      donations: [
        { 
          id: 3, 
          title: "Cirugía de Emergencia para Rocky", 
          subtitle: "Rocky fue encontrado con una fractura en la pata y necesita cirugía urgente para caminar de nuevo.",
          story: "Rocky fue encontrado hace una semana en las calles de Monterrey. Una familia lo encontró cojeando y claramente en dolor, así que inmediatamente lo trajeron a nuestro refugio. Los veterinarios confirmaron que tiene una fractura compleja en su pata trasera derecha que requiere cirugía inmediata. Sin esta operación, Rocky podría quedar cojo permanentemente o incluso perder la pata. Es un perrito muy cariñoso de 3 años que merece una segunda oportunidad para correr y jugar como cualquier perro feliz. La cirugía incluye la colocación de placas de titanio y un período de rehabilitación de 7 semanas. Con tu ayuda, Rocky podrá volver a caminar y encontrar una familia amorosa.",
          raised: 1800, 
          goal: 3500, 
          status: "active", 
          images: ["https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800"] 
        },
      ],
      dogs: [
        { id: 3, name: "Luna", age: "1 año", breed: "Pastor Alemán Mix", status: "available", images: ["https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800"] },
        { id: 5, name: "Mía", age: "3 años", breed: "Chihuahua Mix", status: "reserved", images: ["https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800"] },
      ]
    },
    'lomitos-felices': {
      donations: [],
      dogs: [
        { id: 7, name: "Toby", age: "2 años", breed: "Poodle Mix", status: "available", images: ["https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800"] },
        { id: 8, name: "Coco", age: "4 años", breed: "Cocker Spaniel", status: "available", images: ["https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800"] },
      ]
    }
  };
};

const initialShelterData = loadShelterData();

function App() {
  const [activeSection, setActiveSection] = useState<'donations' | 'adoptions' | 'shelters' | 'register' | 'admin'>('donations');
  const [selectedDog, setSelectedDog] = useState<number | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<number | null>(null);
  const [shelterData, setShelterData] = useState(initialShelterData);

  // Función para actualizar datos y guardar en localStorage
  const updateShelterData = (newData: any) => {
    console.log('Actualizando datos del refugio:', newData);
    setShelterData(newData);
    saveShelterData(newData);
  };

  // Función para agregar información del refugio a las donaciones
  const enrichDonationsWithShelterInfo = (donations: any[]) => {
    return donations.map(donation => {
      // Encontrar a qué refugio pertenece esta donación
      let shelterName = 'Refugio';
      let location = 'México';
      
      Object.entries(shelterData).forEach(([shelterId, shelter]) => {
        const shelterDonations = (shelter as any).donations || [];
        if (shelterDonations.find((d: any) => d.id === donation.id)) {
          switch(shelterId) {
            case 'refugio-san-angel':
              shelterName = 'Refugio San Ángel';
              location = 'Ciudad de México';
              break;
            case 'patitas-felices':
              shelterName = 'Patitas Felices Guadalajara';
              location = 'Guadalajara, Jalisco';
              break;
            case 'hogar-canino':
              shelterName = 'Hogar Canino Monterrey';
              location = 'Monterrey, Nuevo León';
              break;
          }
        }
      });
      
      return {
        ...donation,
        shelterName,
        location
      };
    });
  };

  // Función para obtener todas las donaciones combinadas
  const getAllDonations = () => {
    const allDonations: any[] = [];
    Object.values(shelterData).forEach(shelter => {
      allDonations.push(...(shelter as any).donations);
    });
    return enrichDonationsWithShelterInfo(allDonations);
  };

  // Función para obtener todos los perros combinados
  const getAllDogs = () => {
    const allDogs: any[] = [];
    Object.values(shelterData).forEach(shelter => {
      allDogs.push(...(shelter as any).dogs);
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
          setShelterData={updateShelterData}
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
        ) : activeSection === 'register' ? (
          <RegistrationSection />
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