import React, { useState } from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Heart, MapPin, Check, X, Calendar, Weight, Ruler, Phone, Mail, Share2, Camera } from 'lucide-react';

// Mock data - en una app real esto vendría de una API
const dogDetails = {
  1: {
    id: 1,
    name: "Bella",
    age: "2 años",
    breed: "Golden Retriever Mix",
    size: "Mediano",
    gender: "Hembra",
    weight: "22 kg",
    height: "55 cm",
    description: "Bella es una perrita muy cariñosa y juguetona. Le encanta estar con niños y otros perros. Perfecta para familias activas.",
    story: "Bella fue encontrada vagando por las calles de la Ciudad de México cuando tenía apenas 8 meses. Estaba desnutrida y asustada, pero con mucho amor y cuidado veterinario, se ha convertido en la perrita más amorosa que puedas imaginar. Ha estado en nuestro refugio por más de un año, esperando pacientemente por su familia perfecta. Bella adora jugar con pelotas, nadar cuando tiene la oportunidad, y especialmente le encanta acurrucarse en el sofá después de un día de juegos.",
    images: [
      "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    traits: ["Cariñosa", "Juguetona", "Buena con niños", "Sociable", "Activa"],
    vaccinated: true,
    sterilized: true,
    location: "Ciudad de México",
    rescueDate: "15 de marzo, 2023",
    personality: {
      energy: 85,
      friendliness: 95,
      training: 70,
      independence: 40
    },
    requirements: [
      "Casa con patio o acceso a parques cercanos",
      "Familia activa que disfrute de caminatas diarias",
      "Experiencia previa con perros medianos/grandes",
      "Tiempo para socialización y entrenamiento"
    ],
    medicalInfo: "Bella está completamente sana. Ha sido esterilizada, tiene todas sus vacunas al día y ha sido desparasitada. Recibe tratamiento preventivo mensual contra pulgas y garrapatas.",
    contact: {
      name: "María González",
      phone: "+52 55 1234 5678",
      email: "adopciones@huellitasunidas.org",
      whatsapp: "+52 55 1234 5678"
    }
  },
  // Agregar más perros aquí...
  2: {
    id: 2,
    name: "Max",
    age: "4 años",
    breed: "Labrador",
    size: "Grande",
    gender: "Macho",
    weight: "32 kg",
    height: "62 cm",
    description: "Max es un perro muy tranquilo y obediente. Ha sido entrenado en comandos básicos y es perfecto como compañero fiel.",
    story: "Max llegó a nosotros cuando su familia anterior ya no pudo cuidarlo debido a un cambio de vivienda. Es un perro increíblemente bien educado que conoce comandos básicos como sentarse, quedarse quieto y venir cuando se le llama. Max es el compañero perfecto para alguien que busca un perro maduro, tranquilo y leal.",
    images: [
      "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    traits: ["Tranquilo", "Obediente", "Entrenado", "Leal", "Maduro"],
    vaccinated: true,
    sterilized: true,
    location: "Guadalajara",
    rescueDate: "8 de enero, 2024",
    personality: {
      energy: 60,
      friendliness: 90,
      training: 95,
      independence: 70
    },
    requirements: [
      "Hogar tranquilo y estable",
      "Dueño con experiencia en perros grandes",
      "Rutina de ejercicio moderado",
      "Mucho amor y atención"
    ],
    medicalInfo: "Max está en excelente salud. Todas las vacunas al día, esterilizado y con chequeos veterinarios regulares.",
    contact: {
      name: "Carlos Ruiz",
      phone: "+52 33 9876 5432",
      email: "guadalajara@huellitasunidas.org",
      whatsapp: "+52 33 9876 5432"
    }
  }
};

interface DogDetailProps {
  dogId: number;
  onBack: () => void;
}

export const DogDetail: React.FC<DogDetailProps> = ({ dogId, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [shelterData, setShelterData] = useState(() => {
    try {
      const savedData = localStorage.getItem('huellitasUnidas_shelterData');
      console.log('DogDetail cargando datos:', savedData ? 'Datos encontrados' : 'No hay datos');
      if (savedData && savedData !== 'undefined') {
        const parsed = JSON.parse(savedData);
        console.log('DogDetail datos parseados:', parsed);
        return parsed;
      }
      return {};
    } catch {
      console.error('Error cargando datos en DogDetail');
      return {};
    }
  });
  
  // Recargar datos cuando cambie el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedData = localStorage.getItem('huellitasUnidas_shelterData');
        if (savedData && savedData !== 'undefined') {
          const parsed = JSON.parse(savedData);
          console.log('DogDetail recargando datos por cambio:', parsed);
          setShelterData(parsed);
        }
      } catch (error) {
        console.error('Error recargando datos:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También verificar cambios cada segundo (para cambios en la misma pestaña)
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Buscar el perro en los datos del refugio
  const findDogInShelterData = () => {
    console.log('Buscando perro con ID:', dogId, 'en datos:', shelterData);
    for (const shelter of Object.values(shelterData)) {
      const foundDog = (shelter as any).dogs?.find((d: any) => d.id === dogId);
      if (foundDog) {
        console.log('Perro encontrado:', foundDog);
        return foundDog;
      }
    }
    console.log('Perro no encontrado en datos del refugio');
    return null;
  };
  
  const shelterDog = findDogInShelterData();
  const dog = dogDetails[dogId as keyof typeof dogDetails];
  
  // Usar datos del refugio si están disponibles, sino usar datos mock
  const currentDog = shelterDog || dog;
  
  if (!currentDog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Perrito no encontrado</h2>
          <button 
            onClick={onBack}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }
  
  // Combinar datos del refugio con datos mock para campos faltantes
  const dogData = {
    ...dog,
    ...shelterDog,
    // Asegurar que los campos críticos estén presentes
    name: shelterDog?.name || dog?.name || 'Perrito',
    age: shelterDog?.age || dog?.age || '1 año',
    breed: shelterDog?.breed || dog?.breed || 'Mestizo',
    size: shelterDog?.size || dog?.size || 'Mediano',
    gender: shelterDog?.gender || dog?.gender || 'Hembra',
    weight: shelterDog?.weight || dog?.weight || '20 kg',
    height: shelterDog?.height || dog?.height || '50 cm',
    description: shelterDog?.description || dog?.description || 'Un perrito muy especial',
    story: shelterDog?.story || dog?.story || 'Historia del perrito',
    traits: Array.isArray(shelterDog?.traits) ? shelterDog.traits : 
            (shelterDog?.traits ? shelterDog.traits.split(',').map(t => t.trim()) : 
            (dog?.traits || ['Cariñoso', 'Juguetón'])),
    vaccinated: shelterDog?.vaccinated !== undefined ? shelterDog.vaccinated : (dog?.vaccinated || false),
    sterilized: shelterDog?.sterilized !== undefined ? shelterDog.sterilized : (dog?.sterilized || false),
    personality: shelterDog?.personality || dog?.personality || {
      energy: 70,
      friendliness: 85,
      training: 60,
      independence: 50
    },
    requirements: shelterDog?.requirements || dog?.requirements || [
      "Hogar amoroso y responsable",
      "Tiempo para ejercicio diario",
      "Experiencia con mascotas"
    ],
    medicalInfo: shelterDog?.medicalInfo || dog?.medicalInfo || 'Información médica no disponible',
    images: shelterDog?.images || dog?.images || ["https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"],
    location: shelterDog?.location || dog?.location || 'México',
    contact: dog?.contact || {
      name: "Coordinador de Adopciones",
      phone: "+52 55 1234 5678",
      email: "adopciones@huellitasunidas.org",
      whatsapp: "+52 55 1234 5678"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Compartir</span>
              </button>
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <img 
              src={dogData.images[currentImageIndex]} 
              alt={`${dogData.name} - Foto ${currentImageIndex + 1}`}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
            />
            {dogData.urgent && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Urgente
              </div>
            )}
            <button 
              onClick={() => setShowAllImages(true)}
              className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-100 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">Ver todas las fotos</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {dogData.images.slice(1, 5).map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${dogData.name} - Foto ${index + 2}`}
                className="w-full h-44 lg:h-60 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentImageIndex(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{dogData.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>{dogData.breed}</span>
                    <span>•</span>
                    <span>{dogData.age}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{dogData.location}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  dogData.gender === 'Macho' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                  {dogData.gender}
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">{dogData.description}</p>
            </div>

            {/* Characteristics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Weight className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{dogData.weight}</div>
                <div className="text-sm text-gray-600">Peso</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Ruler className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{dogData.height}</div>
                <div className="text-sm text-gray-600">Altura</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{dogData.age}</div>
                <div className="text-sm text-gray-600">Edad</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <MapPin className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{dogData.size}</div>
                <div className="text-sm text-gray-600">Tamaño</div>
              </div>
            </div>

            {/* Personality */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalidad</h3>
              <div className="space-y-4">
                {Object.entries(dogData.personality).map(([trait, value]) => (
                  <div key={trait}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700 capitalize">
                        {trait === 'energy' ? 'Energía' : 
                         trait === 'friendliness' ? 'Amigabilidad' :
                         trait === 'training' ? 'Entrenamiento' : 'Independencia'}
                      </span>
                      <span className="text-sm text-gray-600">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Historia de {dogData.name}</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <p className="text-gray-700 leading-relaxed">{dogData.story}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Fecha de rescate:</strong> {dogData.rescueDate || 'No disponible'}
                </div>
              </div>
            </div>

            {/* Traits */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Características</h3>
              <div className="flex flex-wrap gap-3">
                {dogData.traits.map((trait, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Requisitos para Adopción</h3>
              <ul className="space-y-3">
                {dogData.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Información Médica</h3>
              <div className="bg-green-50 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {dogData.vaccinated ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                    <span className={dogData.vaccinated ? 'text-green-700' : 'text-red-700'}>
                      Vacunado
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {dogData.sterilized ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                    <span className={dogData.sterilized ? 'text-green-700' : 'text-red-700'}>
                      Esterilizado
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{dogData.medicalInfo}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">¿Interesado en adoptar a {dogData.name}?</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{dogData.contact.name}</div>
                      <div className="text-sm text-gray-600">Coordinadora de Adopciones</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <a 
                    href={`tel:${dogData.contact.phone}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Llamar Ahora
                  </a>
                  
                  <a 
                    href={`https://wa.me/${dogData.contact.whatsapp.replace(/\s+/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                  
                  <a 
                    href={`mailto:${dogData.contact.email}?subject=Interés en adoptar a ${dogData.name}`}
                    className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Enviar Email
                  </a>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Al contactarnos, aceptas seguir nuestro proceso de adopción responsable
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setShowAllImages(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={dogData.images[currentImageIndex]} 
              alt={`${dogData.name} - Foto ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="flex justify-center mt-4 gap-2">
              {dogData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};