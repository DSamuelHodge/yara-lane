import React, { useState } from 'react';
import { Button } from './Button';
import { UserProfile } from '../types';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: UserProfile) => void;
  onSignup: (user: UserProfile) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      
      if (isLoginView) {
        // Mock Login Logic
        if (formData.email && formData.password) {
          // Success
          onLogin({
            name: 'Isabella V', // Mocked return user
            email: formData.email,
            memberSince: 'September 2024'
          });
        } else {
          setError('Please fill in all fields.');
        }
      } else {
        // Mock Signup Logic
        if (formData.name && formData.email && formData.password) {
          onSignup({
            name: formData.name,
            email: formData.email,
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          });
        } else {
          setError('Please fill in all fields.');
        }
      }
    }, 1500);
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isLoginView ? 'Welcome Back' : 'Join Yara Lane'}
          </h1>
          <p className="auth-subtitle">
            {isLoginView 
              ? 'Enter your details to access your curated collection.' 
              : 'Create an account to unlock exclusive rituals and rewards.'}
          </p>
        </div>

        {error && <div className="auth-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          
          {!isLoginView && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full pl-10"
                  placeholder="Isabella V"
                  required={!isLoginView}
                />
                <User className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full pr-10"
                placeholder="you@example.com"
                required
              />
              <Mail className="w-5 h-5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input w-full pr-10"
                placeholder="••••••••"
                required
              />
              <Lock className="w-5 h-5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>

        <div className="auth-divider">Or continue with</div>

        <button className="social-login-btn">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>

        <div className="auth-toggle-text">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleView} className="auth-toggle-link">
            {isLoginView ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};
