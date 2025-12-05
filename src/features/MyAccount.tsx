
import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Heart, 
  LogOut, 
  User, 
  Plus,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Product, Order, Address, PaymentMethod, UserProfile } from '../types/types';
import { ProductCard } from './ProductCard';
import { Button } from '../components/Button';
import { AddressModal } from './AddressModal';
import { PaymentModal } from './PaymentModal';

interface MyAccountProps {
  user: UserProfile;
  orders: Order[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  wishlistProducts: Product[];
  onLogout: () => void;
  onDeleteAccount: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

type Tab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'billing';

export const MyAccount: React.FC<MyAccountProps> = ({
  user,
  orders,
  addresses: initialAddresses,
  paymentMethods: initialPaymentMethods,
  wishlistProducts,
  onLogout,
  onDeleteAccount,
  onProductClick,
  onAddToCart,
  onToggleWishlist
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // --- Address State ---
  const [addressList, setAddressList] = useState<Address[]>(initialAddresses);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // --- Payment State ---
  const [paymentList, setPaymentList] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);

  // --- Address Handlers ---
  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleRemoveAddress = (id: string) => {
    if (window.confirm("Are you sure you want to remove this address?")) {
      setAddressList(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSaveAddress = (address: Address) => {
    setAddressList(prev => {
      let newList = prev;
      if (editingAddress) {
        newList = prev.map(a => a.id === address.id ? address : a);
      } else {
        newList = [...prev, address];
      }
      
      // Handle Default Logic: If new address is default, uncheck others of same type
      if (address.isDefault) {
        newList = newList.map(a => 
          (a.type === address.type && a.id !== address.id) ? { ...a, isDefault: false } : a
        );
      }
      return newList;
    });
    setIsAddressModalOpen(false);
  };

  // --- Payment Handlers ---
  const handleAddPayment = () => {
    setEditingPayment(null);
    setIsPaymentModalOpen(true);
  };

  const handleEditPayment = (payment: PaymentMethod) => {
    setEditingPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const handleRemovePayment = (id: string) => {
    if (window.confirm("Are you sure you want to remove this payment method?")) {
      setPaymentList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSavePayment = (payment: PaymentMethod) => {
    setPaymentList(prev => {
      let newList = prev;
      if (editingPayment) {
        newList = prev.map(p => p.id === payment.id ? payment : p);
      } else {
        newList = [...prev, payment];
      }

      // Handle Default Logic
      if (payment.isDefault) {
        newList = newList.map(p => p.id !== payment.id ? { ...p, isDefault: false } : p);
      }
      return newList;
    });
    setIsPaymentModalOpen(false);
  };

  // --- Danger Zone Handler ---
  const handleDeleteClick = () => {
    const confirmation = window.prompt("To verify, type 'DELETE' to permanently delete your account.");
    if (confirmation === 'DELETE') {
      onDeleteAccount();
    }
  };


  // --- Render Functions ---

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="bg-stone-100 p-6 rounded-md">
        <h3 className="font-serif text-xl mb-2 text-stone-900">Welcome back, {user.name}</h3>
        <p className="text-stone-500 text-sm">Member since {user.memberSince}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="info-card cursor-pointer" onClick={() => setActiveTab('orders')}>
           <div className="flex items-center gap-3 mb-4 text-stone-900">
             <Package className="w-5 h-5" />
             <h4 className="font-bold uppercase text-xs tracking-widest">Recent Orders</h4>
           </div>
           <div className="flex-1">
             {orders.length > 0 ? (
               <div className="space-y-2">
                 <p className="text-sm font-medium">{orders[0].id}</p>
                 <p className="text-xs text-stone-500">{orders[0].items.length} items • {orders[0].status}</p>
               </div>
             ) : (
               <p className="text-stone-500 text-sm">No recent orders</p>
             )}
           </div>
           <div className="mt-4 pt-4 border-t border-stone-200 text-xs font-bold flex items-center justify-between group">
             View All History <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
           </div>
        </div>

        <div className="info-card cursor-pointer" onClick={() => setActiveTab('wishlist')}>
           <div className="flex items-center gap-3 mb-4 text-stone-900">
             <Heart className="w-5 h-5" />
             <h4 className="font-bold uppercase text-xs tracking-widest">Wishlist</h4>
           </div>
           <div className="flex-1">
             <p className="text-3xl font-serif">{wishlistProducts.length}</p>
             <p className="text-xs text-stone-500 mt-1">Saved Items</p>
           </div>
           <div className="mt-4 pt-4 border-t border-stone-200 text-xs font-bold flex items-center justify-between group">
             View Favorites <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
           </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="danger-zone">
        <h4 className="danger-title flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Delete Profile
        </h4>
        <p className="danger-desc">
          Permanently remove your account, order history, and saved data. This action cannot be undone.
        </p>
        <Button 
          variant="outline" 
          className="btn-danger"
          onClick={handleDeleteClick}
        >
          Delete My Account
        </Button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h2 className="section-title">Order History</h2>
      {orders.length === 0 ? (
        <div className="empty-state">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>
                    <span className="order-id">{order.id}</span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="font-medium">${order.total.toFixed(2)}</td>
                  <td>
                    <div className="order-items-preview">
                      {order.items.map((item, idx) => (
                        <img key={idx} src={item.image} alt={item.name} title={item.name} />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-10 h-12 bg-stone-100 flex items-center justify-center text-xs text-stone-500 rounded-sm">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div>
      <h2 className="section-title">Address Book</h2>
      <div className="info-grid">
        {addressList.map(addr => (
          <div key={addr.id} className="info-card">
            <div>
              <div className="info-card-header">
                <span className="info-badge">{addr.type}</span>
                {addr.isDefault && <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">Default</span>}
              </div>
              <div className="info-text">
                <span className="info-name">{addr.firstName} {addr.lastName}</span>
                {addr.line1}<br />
                {addr.line2 && <>{addr.line2}<br /></>}
                {addr.city}, {addr.postalCode}<br />
                {addr.country}
              </div>
            </div>
            <div className="info-actions">
              <button 
                className="text-link"
                onClick={() => handleEditAddress(addr)}
              >
                Edit
              </button>
              <button 
                className="text-link text-stone-400 hover:text-red-600"
                onClick={() => handleRemoveAddress(addr.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button 
          className="info-card add-new-card"
          onClick={handleAddAddress}
        >
          <Plus className="w-6 h-6" />
          <span className="font-medium text-sm">Add New Address</span>
        </button>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div>
      <h2 className="section-title">Payment Methods</h2>
      <div className="info-grid">
        {paymentList.map(pm => (
          <div key={pm.id} className="info-card">
            <div>
              <div className="info-card-header">
                <span className="info-badge">{pm.brand}</span>
                {pm.isDefault && <span className="text-xs text-emerald-700 font-medium">Default</span>}
              </div>
              <div className="info-text">
                <div className="flex items-center gap-2 mb-2">
                  <div className="card-icon-wrapper">
                    <CreditCard className="w-5 h-5 text-stone-600" />
                  </div>
                  <span className="card-number-display">•••• •••• •••• {pm.last4}</span>
                </div>
                <span className="text-stone-500 text-xs">Expires {pm.expiry}</span>
              </div>
            </div>
            <div className="info-actions">
              <button 
                className="text-link"
                onClick={() => handleEditPayment(pm)}
              >
                Edit
              </button>
              <button 
                className="text-link text-stone-400 hover:text-red-600"
                onClick={() => handleRemovePayment(pm.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
         <button 
          className="info-card add-new-card"
          onClick={handleAddPayment}
         >
          <Plus className="w-6 h-6" />
          <span className="font-medium text-sm">Add Payment Method</span>
        </button>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div>
      <h2 className="section-title">Your Wishlist</h2>
      {wishlistProducts.length === 0 ? (
        <div className="empty-state">
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Your wishlist is empty.</p>
          <Button className="mt-4" onClick={() => window.scrollTo(0,0)}>Start Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
              onAddToCart={onAddToCart}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'orders': return renderOrders();
      case 'addresses': return renderAddresses();
      case 'billing': return renderBilling();
      case 'wishlist': return renderWishlist();
      case 'overview':
      default: return renderOverview();
    }
  };

  return (
    <>
      <div className="account-container animate-fade-in">
        {/* Header */}
        <div className="account-header">
          <div>
            <h1 className="account-title">My Account</h1>
            <p className="account-subtitle">Manage your orders and preferences.</p>
          </div>
        </div>

        <div className="account-layout">
          {/* Sidebar */}
          <div className="account-sidebar">
            <nav className="account-nav">
              <button 
                className={`account-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <User className="w-4 h-4" /> Overview
              </button>
              <button 
                className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package className="w-4 h-4" /> Orders
              </button>
               <button 
                className={`account-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart className="w-4 h-4" /> Wishlist
              </button>
              <button 
                className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin className="w-4 h-4" /> Addresses
              </button>
              <button 
                className={`account-nav-btn ${activeTab === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveTab('billing')}
              >
                <CreditCard className="w-4 h-4" /> Billing
              </button>
              
              <button 
                className="account-nav-btn logout"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="account-content">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSave={handleSavePayment}
        initialData={editingPayment}
      />
    </>
  );
};
