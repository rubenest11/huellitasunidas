import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/Logo Huellitas Unidas.png" 
                alt="Huellitas Unidas Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Huellitas Unidas</h3>
                <p className="text-sm text-gray-400">Salvando vidas</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nuestra misión es rescatar, rehabilitar y encontrar hogares amorosos para perritos necesitados en todo México.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cómo Ayudar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Voluntariado</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Historias de Éxito</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">info@puppyfund.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">+52 55 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">Ciudad de México, México</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-3">Recibe noticias sobre nuestros rescatados</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button className="bg-orange-500 px-4 py-2 text-sm font-medium rounded-r-md hover:bg-orange-600 transition-colors">
                  Suscribir
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Huellitas Unidas. Todos los derechos reservados. | 
            <a href="#" className="hover:text-white ml-1">Política de Privacidad</a> | 
            <a href="#" className="hover:text-white ml-1">Términos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
};