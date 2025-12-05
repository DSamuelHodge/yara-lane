import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Address } from '../types/types';
import { Button } from '../components/Button';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
  initialData?: Address | null;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState<Partial<Address>>({
    type: 'Shipping',
    firstName: '',
    lastName: '',
    line1: '',
    line2: '',
    city: '',
    postalCode: '',
    country: 'United States',
    isDefault: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        type: 'Shipping',
        firstName: '',
        lastName: '',
        line1: '',
        line2: '',
        city: '',
        postalCode: '',
        country: 'United States',
        isDefault: false
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation could go here
    onSave({
      ...formData as Address,
      id: initialData?.id || Math.random().toString(36).substr(2, 9)
    });
  };

  return (
    <div className="modal-backdrop-fixed">
      <div className="address-modal-container animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 transition-colors"
          aria-label="Close address modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>

        <h2 className="address-modal-header">
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="address-type">Address Type</label>
            <select 
              id="address-type"
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              className="form-input"
              aria-label="Address Type"
            >
              <option value="Shipping">Shipping</option>
              <option value="Billing">Billing</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName"
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              className="form-input" 
              required 
              autoComplete="given-name"
              aria-label="First Name"
              placeholder="First Name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName"
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              className="form-input" 
              required 
              autoComplete="family-name"
              aria-label="Last Name"
              placeholder="Last Name"
            />
          </div>

          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="line1">Street Address</label>
            <input 
              type="text" 
              id="line1"
              name="line1" 
              value={formData.line1} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="123 Luxury Lane"
              required 
              autoComplete="address-line1"
              aria-label="Street Address"
            />
          </div>

          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="line2">Apartment, Suite (Optional)</label>
            <input 
              type="text" 
              id="line2"
              name="line2" 
              value={formData.line2} 
              onChange={handleChange} 
              className="form-input" 
              autoComplete="address-line2"
              aria-label="Apartment, Suite, etc."
              placeholder="Apartment, Suite, etc."
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="city">City</label>
            <input 
              type="text" 
              id="city"
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              className="form-input" 
              required 
              autoComplete="address-level2"
              aria-label="City"
              placeholder="City"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="postalCode">Postal Code</label>
            <input 
              type="text" 
              id="postalCode"
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleChange} 
              className="form-input" 
              required 
              autoComplete="postal-code"
              aria-label="Postal Code"
              placeholder="Postal Code"
            />
          </div>

          <div className="form-group form-grid-full">
            <label className="form-label" htmlFor="country">Country</label>
            <select 
              id="country"
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              className="form-input"
              aria-label="Country"
              autoComplete="country"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="form-group form-grid-full flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="isDefault" 
              name="isDefault" 
              checked={formData.isDefault} 
              onChange={handleCheckboxChange} 
              className="w-4 h-4 text-stone-900 border-stone-300 rounded focus:ring-stone-500"
              aria-label="Set as default address"
            />
            <label htmlFor="isDefault" className="text-sm text-stone-600 cursor-pointer select-none">
              Set as default address
            </label>
          </div>

          <div className="form-grid-full mt-6 flex gap-3">
            <Button type="button" variant="outline" fullWidth onClick={onClose} aria-label="Cancel address modal">
              <span>Cancel</span>
            </Button>
            <Button type="submit" fullWidth aria-label="Save address">
              <span>Save Address</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
