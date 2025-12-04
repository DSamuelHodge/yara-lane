import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User, Home, Grid, Heart, ChevronRight } from 'lucide-react';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Button } from './components/Button';
import { About } from './components/About';
import { Journal } from './components/Journal';
import { Checkout } from './components/Checkout';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, Category, ViewState } from './types';

function App() {
  // State
  const [currentView, setCurrentView] = useState<ViewState>('shop');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Computed
  const filteredProducts = currentView === 'wishlist' 
    ? PRODUCTS.filter(p => wishlistIds.includes(p.id))
    : (selectedCategory === 'All' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === selectedCategory));

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Handlers
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu if open
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <About />;
      case 'journal':
        return <Journal />;
      case 'checkout':
        return <Checkout cartItems={cartItems} total={cartTotal} />;
      case 'shop':
      case 'wishlist':
      default:
        return (
          <>
            {/* Show Hero only on main Shop view, not Wishlist */}
            {currentView === 'shop' && <Hero />}

            <section id="shop-section" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
              
              <div className="flex flex-col items-center mb-12 space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                  {currentView === 'wishlist' ? 'Your Wishlist' : 'The Collection'}
                </h2>
                <div className="w-16 h-px bg-stone-300" />
              </div>

              {/* Category Filter - Only show in Shop view */}
              {currentView === 'shop' && (
                <div className="flex overflow-x-auto snap-x-mandatory pb-6 mb-8 gap-4 justify-start md:justify-center no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as Category)}
                      className={`category-pill snap-center ${selectedCategory === cat ? 'active' : 'inactive'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={handleProductClick}
                      onAddToCart={handleAddToCart}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-4">
                  <p className="text-stone-500 text-lg">
                    {currentView === 'wishlist' 
                      ? "Your wishlist is currently empty." 
                      : "No products found in this category."}
                  </p>
                  {currentView === 'wishlist' && (
                    <Button onClick={() => navigateTo('shop')}>
                      Browse Collection
                    </Button>
                  )}
                </div>
              )}
            </section>
            
            {/* Brand Promise Section - Keep on Shop/Wishlist */}
            <section className="bg-stone-900 text-stone-50 py-24 px-6">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h3 className="font-serif text-3xl md:text-5xl leading-tight">
                  "Beauty is a ritual, not a routine."
                </h3>
                <p className="font-sans text-stone-400 max-w-lg mx-auto leading-relaxed">
                  We combine ancient botanical wisdom with modern minimalism to create products that ground you in the present moment.
                </p>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2 -ml-2 text-stone-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <span 
              className="font-serif text-2xl font-bold tracking-tight text-stone-900 cursor-pointer" 
              onClick={() => navigateTo('shop')}
            >
              Yara Lane
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            <button 
              onClick={() => navigateTo('shop')}
              className={`nav-link ${currentView === 'shop' ? 'text-stone-900' : ''}`}
            >
              Shop
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className={`nav-link ${currentView === 'about' ? 'text-stone-900' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => navigateTo('journal')}
              className={`nav-link ${currentView === 'journal' ? 'text-stone-900' : ''}`}
            >
              Journal
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex nav-icon-btn">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
            <button 
              className={`hidden md:flex nav-icon-btn ${currentView === 'wishlist' ? 'active' : ''}`}
              onClick={() => navigateTo('wishlist')}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} fill={currentView === 'wishlist' ? 'currentColor' : 'none'} />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-0 bg-stone-900 text-stone-50 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button 
              className="nav-icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-stone-900 text-stone-50 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {renderContent()}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 px-6 py-3 flex justify-between items-center z-40 pb-safe">
        <button 
          className={`flex flex-col items-center gap-1 ${currentView === 'shop' ? 'text-stone-900' : 'text-stone-400'}`}
          onClick={() => navigateTo('shop')}
        >
          <Home className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          className={`flex flex-col items-center gap-1 ${currentView === 'about' || currentView === 'journal' ? 'text-stone-900' : 'text-stone-400'}`}
           onClick={() => {
             // Basic mobile logic: Toggle menu or just go to Journal as a secondary discovery tab
             navigateTo('journal');
           }}
        >
          <Grid className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Read</span>
        </button>
        <button 
          className={`flex flex-col items-center gap-1 ${currentView === 'wishlist' ? 'text-stone-900' : 'text-stone-400'}`}
          onClick={() => navigateTo('wishlist')}
        >
          <Heart className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Saved</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-900"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-stone-50 text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Bag</span>
        </button>
      </div>

      {/* Overlays */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;