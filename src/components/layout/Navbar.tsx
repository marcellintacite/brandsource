import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AppStatus } from '../../types';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  status: AppStatus;
  reset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ status, reset }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 z-[60] w-full flex flex-col items-center bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="w-full max-w-7xl py-2.5 md:py-3 flex flex-row justify-between items-center px-6 md:px-4">
        <div className="flex items-center gap-3 md:gap-5">
          <Link to="/" onClick={reset} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 md:w-9 md:h-9 brand-bg-primary rounded-lg md:rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <div className="w-0.5 h-3 md:h-4 bg-white rounded-full"></div>
              <div className="w-0.5 h-1.5 md:h-2 bg-white/40 rounded-full ml-1"></div>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <h1 className="text-base md:text-lg font-brand font-bold tracking-tighter text-slate-900 leading-none">
                BrandSource <span className="brand-text-primary italic">Studio</span>
              </h1>
            </div>
          </Link>
          
          <div className="h-5 w-px bg-slate-100 mx-2 hidden md:block"></div>
          
          <div className="flex items-center gap-1 md:gap-4 ml-2 md:ml-0">
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all active:scale-95 ${location.pathname === '/' ? 'text-slate-900 bg-slate-50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Studio
            </Link>
            <Link 
              to="/projets" 
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all active:scale-95 ${location.pathname === '/projets' ? 'text-slate-900 bg-slate-50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Projets
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {user ? (
            <div className="flex items-center gap-2 md:gap-3 py-1 px-2 md:px-3 bg-white border border-slate-100 rounded-full md:rounded-xl shadow-sm">
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white shadow-sm" />
              )}
              <div className="hidden sm:flex flex-col">
                <span className="text-[9px] font-bold text-slate-800 leading-tight">{user.displayName?.split(' ')[0]}</span>
                <button 
                  onClick={logout}
                  className="text-[7px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors text-left active:scale-95"
                >
                  Déconnexion
                </button>
              </div>
              <button 
                onClick={logout} 
                className="sm:hidden p-1 text-slate-400 hover:text-red-500 active:scale-90"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          ) : (
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-4">Beta Access</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
