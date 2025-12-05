import React from 'react';
import { CartItem } from '../types/types';
import { Button } from '../components/Button';
import { Lock, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutProps {
  cartItems: CartItem[];
  total: number;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, total }) => {
  return (
    <div className="checkout-layout animate-fade-in">
      {/* Left Column: Form Details */}
      <div>
        <div className="checkout-section">
          <h2 className="checkout-header">Contact Information</h2>
          <div className="form-grid">
            <div className="form-group form-grid-full">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="you@example.com" autoComplete="email" />
            </div>
          </div>
        </div>

        <div className="checkout-section">
          <h2 className="checkout-header">Shipping Address</h2>
          <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" className="form-input" autoComplete="given-name" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" className="form-input" autoComplete="family-name" />
              </div>
              <div className="form-group form-grid-full">
                <label className="form-label" htmlFor="address">Address</label>
                <input type="text" id="address" name="address" className="form-input" placeholder="123 Luxury Lane" autoComplete="address-line1" />
              </div>
              <div className="form-group form-grid-full">
                <label className="form-label" htmlFor="apartment">Apartment, suite, etc.</label>
                <input type="text" id="apartment" name="apartment" className="form-input" autoComplete="address-line2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="city">City</label>
                <input type="text" id="city" name="city" className="form-input" autoComplete="address-level2" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" className="form-input" autoComplete="postal-code" />
              </div>
              <div className="form-group form-grid-full">
                <label className="form-label" htmlFor="country">Country</label>
                <select id="country" name="country" className="form-input bg-white" autoComplete="country">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
          </div>
        </div>

        <div className="checkout-section">
          <h2 className="checkout-header flex items-center justify-between">
            Payment Method
            <div className="flex gap-2">
              <div className="bg-stone-100 p-1 rounded">
                <CreditCard className="w-4 h-4 text-stone-500" />
              </div>
            </div>
          </h2>
          
          <div className="bg-stone-50 p-4 border border-stone-200 rounded mb-4">
             <div className="flex items-center gap-2 text-stone-600 text-sm mb-4">
               <ShieldCheck className="w-4 h-4 text-emerald-700" />
               <span>Payments are secure and encrypted.</span>
             </div>
             
             {/* Stripe Payment Element Placeholder */}
             <div className="stripe-element-container">
               <span className="font-medium text-stone-900">Stripe Payment Element</span>
               <span className="text-xs text-stone-400">Card number, Expiry, CVC would appear here</span>
             </div>
          </div>
          
          <Button fullWidth size="lg">
            Pay ${total.toFixed(2)}
          </Button>
          <div className="text-center mt-4 flex items-center justify-center gap-1 text-xs text-stone-400">
             <Lock className="w-3 h-3" />
             Secure Checkout powered by Stripe
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div>
        <div className="checkout-summary-container">
          <h3 className="font-serif text-xl mb-6 text-stone-900">Order Summary</h3>
          
          <div className="max-h-80 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-img" />
                <div className="flex-1">
                  <h4 className="font-serif text-sm font-bold text-stone-900">{item.name}</h4>
                  <p className="text-xs text-stone-500">{item.category}</p>
                  <div className="flex justify-between mt-1 text-sm text-stone-600">
                    <span>Qty: {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>Calculated at next step</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};