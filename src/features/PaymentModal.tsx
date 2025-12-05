import React, { useState, useEffect } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { PaymentMethod } from '../types/types';
import { Button } from '../components/Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: PaymentMethod) => void;
  initialData?: PaymentMethod | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  
  // Reset/Init
  useEffect(() => {
    if (initialData) {
      // Editing Mode: We don't show full card number, only expiry and default
      setCardNumber(`•••• •••• •••• ${initialData.last4}`);
      setExpiry(initialData.expiry);
      setCvc('•••'); // Placeholder
      setIsDefault(initialData.isDefault);
    } else {
      // Add Mode
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setIsDefault(false);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic to simulate card processing
    let brand: 'Visa' | 'Mastercard' | 'Amex' = 'Visa';
    let last4 = '4242';

    if (initialData) {
      // Keep existing sensitive data if editing
      brand = initialData.brand;
      last4 = initialData.last4;
    } else {
      // Simple mock detection logic
      const num = cardNumber.replace(/\s/g, '');
      if (num.startsWith('5')) brand = 'Mastercard';
      if (num.startsWith('3')) brand = 'Amex';
      last4 = num.slice(-4) || '4242';
    }

    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      brand,
      last4,
      expiry,
      isDefault
    });
  };

  // Helper for formatting card number input (mock)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (initialData) return; // Prevent editing number in edit mode
    // Simple formatting logic could go here
    setCardNumber(e.target.value);
  };

  return (
    <div className="modal-backdrop-fixed">
      <div className="payment-modal-container animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="address-modal-header">
          {initialData ? 'Edit Payment Method' : 'Add Payment Method'}
        </h2>

        <form onSubmit={handleSubmit} className="form-grid">
          
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="payment-card-number">Card Number</label>
            <div className="relative">
              <input 
                type="text" 
                id="payment-card-number"
                name="cardNumber"
                autoComplete="cc-number"
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                className={`form-input w-full pr-10 ${initialData ? 'bg-stone-100 text-stone-500 cursor-not-allowed' : ''}`}
                placeholder="0000 0000 0000 0000"
                readOnly={!!initialData}
                required
              />
              <CreditCard className="w-5 h-5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="payment-expiry">Expiry Date (MM/YY)</label>
            <input 
              type="text" 
              id="payment-expiry"
              name="expiry"
              autoComplete="cc-exp"
              value={expiry} 
              onChange={(e) => setExpiry(e.target.value)} 
              className="form-input" 
              placeholder="MM/YY"
              maxLength={5}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="payment-cvc">CVC / CVV</label>
            <div className="relative">
              <input 
                type="password" 
                id="payment-cvc"
                name="cvc"
                autoComplete="cc-csc"
                value={cvc} 
                onChange={(e) => setCvc(e.target.value)} 
                className={`form-input w-full ${initialData ? 'bg-stone-100 cursor-not-allowed' : ''}`}
                placeholder="123"
                maxLength={4}
                readOnly={!!initialData}
                required={!initialData}
              />
              <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-group form-grid-full flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="isDefaultPayment" 
              checked={isDefault} 
              onChange={(e) => setIsDefault(e.target.checked)} 
              className="w-4 h-4 text-stone-900 border-stone-300 rounded focus:ring-stone-500"
            />
            <label htmlFor="isDefaultPayment" className="text-sm text-stone-600 cursor-pointer select-none">
              Set as default payment method
            </label>
          </div>

          <div className="form-grid-full mt-6 flex gap-3">
             <Button type="button" variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Save Card
            </Button>
          </div>
          
          <div className="form-grid-full text-center mt-2">
             <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
               <Lock className="w-3 h-3" /> Encrypted & Secure
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};
