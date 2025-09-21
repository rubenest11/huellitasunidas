import React, { useState } from 'react';
import { Check, Star, Shield, Zap, Users, BarChart3, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'premium' | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const plans = [
    {
      id: 'trial',
      name: 'Plan de Prueba',
      price: 'Gratis',
      duration: '1 mes',
      description: 'Perfecto para conocer la plataforma',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Hasta 10 perritos en adopción',
        '2 campañas de donación activas',
        'Panel administrativo básico',
        'Soporte por email',
        'Estadísticas básicas',
        'Galería de fotos (hasta 3 por perrito)'
      ],
      limitations: [
        'Funciones limitadas',
        'Sin personalización avanzada',
        'Soporte estándar'
      ]
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '$299',
      duration: 'por mes',
      description: 'Acceso total a todas las características',
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'Perritos ilimitados en adopción',
        'Campañas de donación ilimitadas',
        'Panel administrativo completo',
        'Soporte prioritario 24/7',
        'Estadísticas avanzadas y reportes',
        'Galería de fotos ilimitada',
        'Personalización completa del perfil',
        'Integración con redes sociales',
        'Sistema de seguimiento de adopciones',
        'Herramientas de marketing',
        'Certificados de adopción automáticos',
        'Base de datos de adoptantes'
      ]
    }
  ];

  const ContactForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Contacta con Nosotros</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Refugio</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="Nombre de tu refugio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="contacto@turefugio.org"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="+52 55 1234 5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="Ciudad, Estado"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan de Interés</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
              <option value="trial">Plan de Prueba (1 mes gratis)</option>
              <option value="premium">Plan Premium ($299/mes)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje (Opcional)</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Cuéntanos sobre tu refugio..."
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Enviar Solicitud
            </button>
            <button
              type="button"
              onClick={() => setShowContactForm(false)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <section id="register-section" className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Únete a Huellitas Unidas</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Forma parte de la red de refugios más grande de México. Aumenta tus adopciones y donaciones con nuestra plataforma especializada.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Por qué elegir Huellitas Unidas?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Mayor Alcance</h4>
            <p className="text-gray-600 text-sm">Conecta con miles de adoptantes potenciales en toda la república mexicana</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Más Donaciones</h4>
            <p className="text-gray-600 text-sm">Sistema optimizado para campañas de donación con mayor tasa de conversión</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Gestión Profesional</h4>
            <p className="text-gray-600 text-sm">Herramientas administrativas diseñadas específicamente para refugios</p>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
              plan.popular ? 'ring-4 ring-purple-200' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Más Popular
                </div>
              </div>
            )}
            
            <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.duration && <span className="text-lg opacity-90">{plan.duration}</span>}
              </div>
              <p className="opacity-90">{plan.description}</p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Características Incluidas:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h5 className="font-medium text-gray-700 mb-2">Limitaciones:</h5>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="text-sm text-gray-600">• {limitation}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => setShowContactForm(true)}
                className={`w-full bg-gradient-to-r ${plan.color} text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
              >
                <Zap className="w-5 h-5" />
                {plan.id === 'trial' ? 'Comenzar Prueba Gratis' : 'Suscribirse Ahora'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Tienes Preguntas?</h3>
          <p className="text-gray-600">Nuestro equipo está aquí para ayudarte a elegir el plan perfecto para tu refugio</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Teléfono</h4>
            <p className="text-gray-600 text-sm">+52 55 1234 5678</p>
            <p className="text-gray-500 text-xs">Lun - Vie, 9:00 - 18:00</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
            <p className="text-gray-600 text-sm">registro@huellitasunidas.org</p>
            <p className="text-gray-500 text-xs">Respuesta en 24 horas</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Oficinas</h4>
            <p className="text-gray-600 text-sm">Ciudad de México</p>
            <p className="text-gray-500 text-xs">Citas disponibles</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Lo que dicen nuestros refugios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">
              "Desde que nos unimos a Huellitas Unidas, nuestras adopciones aumentaron un 300%. La plataforma es increíble."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">María González</div>
                <div className="text-sm text-gray-600">Refugio San Ángel</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">
              "El sistema de donaciones es fantástico. Hemos recaudado más fondos que nunca para nuestros rescatados."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Carlos Ruiz</div>
                <div className="text-sm text-gray-600">Patitas Felices</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showContactForm && <ContactForm />}
    </section>
  );
};