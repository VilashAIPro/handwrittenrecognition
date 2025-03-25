
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl border border-border p-8 shadow-medium">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {type === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>

        {error && (
          <div className="mb-6 p-3 text-sm bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              {type === 'login' && (
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/90 transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={type === 'login' ? 'Enter your password' : 'Create a password'}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-colors",
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{type === 'login' ? 'Signing in...' : 'Creating account...'}</span>
              </div>
            ) : (
              <span>{type === 'login' ? 'Sign in' : 'Create account'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {type === 'login' ? (
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/90 transition-colors">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary/90 transition-colors">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
