import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl text-stone-900">Your Bag</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                <ShoppingBag className="w-12 h-12 opacity-20" />
                <p>Your bag is empty.</p>
                <Button variant="outline" onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-serif text-stone-900 leading-snug">{item.name}</h3>
                      <p className="text-xs text-stone-500 mt-1">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="quantity-control">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="quantity-btn"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="quantity-btn"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="flex items-center justify-between text-stone-900 font-serif text-lg">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-stone-500 text-center">Shipping & taxes calculated at checkout.</p>
              <Button fullWidth size="lg" onClick={onCheckout}>Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};