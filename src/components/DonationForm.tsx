import React, { useState } from 'react';
import { CreditCard, User, MessageSquare, Loader2 } from 'lucide-react';
import stripePromise from '../lib/stripe';

interface DonationFormProps {
  campaignId: number;
  campaignTitle: string;
  onDonationSuccess: (donorName: string, amount: number, message: string) => void;
  loading: boolean;
}

export const DonationForm: React.FC<DonationFormProps> = ({ 
  campaignId, 
  campaignTitle, 
  onDonationSuccess, 
  loading 
}) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const suggestedAmounts = [100, 250, 500, 1000];

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !donorName.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setProcessing(true);

    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe no se pudo cargar');
      }

      // En una aplicación real, aquí crearías un PaymentIntent en tu backend
      // Por ahora simularemos el proceso de pago
      
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular éxito del pago (en producción esto vendría del webhook de Stripe)
      await onDonationSuccess(donorName.trim(), Number(amount), message.trim());
      
      // Limpiar formulario
      setAmount('');
      setSelectedAmount(null);
      setDonorName('');
      setMessage('');
      
      alert('¡Gracias por tu donación! Tu pago ha sido procesado exitosamente.');
      
    } catch (error) {
      console.error('Error procesando la donación:', error);
      alert('Hubo un error procesando tu donación. Por favor intenta de nuevo.');
    } finally {
      setProcessing(false);
    }
  };

  const isFormValid = amount && donorName.trim();
  const isSubmitting = processing || loading;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Hacer una Donación</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Selecciona o ingresa el monto:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
            {suggestedAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAmountSelect(value)}
                className={`p-2 sm:p-3 rounded-xl border-2 font-semibold transition-all text-sm sm:text-base ${
                  selectedAmount === value
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                ${value}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value === '' ? '' : Number(e.target.value));
                setSelectedAmount(null);
              }}
              placeholder="Otro monto"
              min="1"
              className="w-full pl-8 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Donor Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tu nombre *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Optional Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje opcional
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Deja un mensaje de apoyo..."
              rows={3}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
            isFormValid && !isSubmitting
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Donar ${amount || 0}
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        🔒 Tu donación es segura y procesada por Stripe
      </div>
    </div>
  );
};