
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, children, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-300",
        isActive 
          ? "bg-secondary text-foreground font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
        className
      )}
    >
      {children}
    </Link>
  );
};

const NavBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 glassmorphism">
      <div className="container flex items-center justify-between max-w-7xl">
        <Link to="/" className="transition-opacity duration-200 hover:opacity-80">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/scan">Scan</NavItem>
          <NavItem to="/history">History</NavItem>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/login"
            className="text-sm px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Log in
          </Link>
          <Link 
            to="/signup"
            className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
