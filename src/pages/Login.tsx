
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/components/Providers';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      await login(email, password);
      navigate('/scan');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow mt-16 py-12">
        <div className="container max-w-md mx-auto px-6">
          <AuthForm 
            type="login" 
            onSubmit={handleLogin} 
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
