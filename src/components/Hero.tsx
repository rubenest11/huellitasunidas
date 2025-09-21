import React from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 text-white py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Cada Perrito
              <br />
              <span className="text-yellow-300">Merece Amor</span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto lg:mx-0 opacity-90">
              Únete a nuestra misión de rescatar, cuidar y encontrar hogares amorosos para perritos necesitados
            </p>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Perrito feliz"
                className="w-80 h-80 sm:w-96 sm:h-96 object-cover rounded-full shadow-2xl border-8 border-white border-opacity-20"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-lg">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 text-center animate-bounce">
          <ArrowDown className="w-8 h-8 mx-auto opacity-70" />
        </div>
      </div>
    </section>
  );
};
          Cada Perrito
          <br />
          <span className="text-yellow-300">Merece Amor</span>
        </h2>
        <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 px-4">
          Únete a nuestra misión de rescatar, cuidar y encontrar hogares amorosos para perritos necesitados
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 justify-center items-center max-w-2xl mx-auto">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
            <div className="text-2xl sm:text-3xl font-bold">1,247</div>
            <div className="text-xs sm:text-sm opacity-80">Perritos Rescatados</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
            <div className="text-2xl sm:text-3xl font-bold">$84,592</div>
            <div className="text-xs sm:text-sm opacity-80">Recaudado Este Mes</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
            <div className="text-2xl sm:text-3xl font-bold">923</div>
            <div className="text-xs sm:text-sm opacity-80">Hogares Encontrados</div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 animate-bounce">
          <ArrowDown className="w-8 h-8 mx-auto opacity-70" />
        </div>
      </div>
    </section>
  );
};