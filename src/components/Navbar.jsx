import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Rocket, ChevronDown, Crown ,Globe, Mountain, Plane , Waves, Building2 } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
    // No componente Navbar, adicione este estado:

  const [showTravelDropdown, setShowTravelDropdown] = useState(false);

  return (
    <nav className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Rocket className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Digital
              </span>
              <span className="text-white">Templates</span>
            </span>
          </Link>
          
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-purple-400">Home</Link>
            <Link to="/templates" className="hover:text-purple-400">Templates</Link>
            

                  {/* NOVO: Dropdown para Templates Viagens */}
      {/*}      <div 
      //        className="relative"
      //        onMouseEnter={() => setShowTravelDropdown(true)}
      //        onMouseLeave={() => setShowTravelDropdown(false)}
      //      >
      //        <button className="hover:text-purple-400 flex items-center gap-2">
      //          <Globe className="w-4 h-4" />
      //          Demo Viagens
      //          <ChevronDown className="w-4 h-4" />
      //        </button>
      //        
      //        {showTravelDropdown && (
      //          <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      //            <Link 
      //              to="/template/viagens" 
      //              className="block px-4 py-3 hover:bg-gray-700/50"
      //              onClick={() => setShowTravelDropdown(false)}
      //            >
      //              <div className="flex items-center justify-between">
      //                <div className="flex items-center gap-2">
      //                  <Plane className="w-4 h-4 text-sky-400" />
      //                  <span className="font-semibold">Agência de Viagens</span>
      //                </div>
      //                <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-1 rounded">
      //                  Parallax 3D
      //                </span>
      //              </div>
      //              <p className="text-xs text-gray-400 mt-1">4 camadas com efeitos incríveis</p>
      //            </Link>
      //          </div>
      //        )}
      //      </div>

            {/* Dropdown para Templates Viagens */}
            <div 
              className="relative"
              onMouseEnter={() => setShowTravelDropdown(true)}
              onMouseLeave={() => setShowTravelDropdown(false)}
            >
        {/*}      <button className="hover:text-purple-400 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Demo Viagens
                <ChevronDown className="w-4 h-4" />
              </button>
              */}
            

            {/* Dropdown para Templates Café */}
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="hover:text-purple-400 flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                Demo Café
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                  <Link 
                    to="/template/cafe" 
                    className="block px-4 py-3 hover:bg-gray-700/50 border-b border-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        <span>Café Simples</span>
                      </div>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                        Básico
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Template elegante e funcional</p>
                  </Link>
                  
              {/* Dropdown para Templates Café 
                  <Link 
                    to="/template/cafe-pro" 
                    className="block px-4 py-3 hover:bg-gray-700/50 border-b border-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                   
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="font-semibold">Café PRO</span>
                      </div>
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                        Premium
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Com 3D e imagens premium</p>
                  </Link>
                  */} 
                   <Link 
                    to="/template/cafepro" 
                    className="block px-4 py-3 hover:bg-gray-700/50 border-b border-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span className="font-semibold">Café PRO 2</span>
                      </div>
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                        Avançado
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Versão ainda mais avançada</p>
                  </Link>

                  <Link 
                    to="/template/cafe-pro2" 
                    className="block px-4 py-3 hover:bg-gray-700/50"
                    onClick={() => setShowDropdown(false)}
                  >
                   
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span className="font-semibold">Café PRO 2</span>
                      </div>
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                        Avançado
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Versão ainda mais avançada</p>
                  </Link>

                   <Link 
                    to="/template/cafepro2" 
                    className="block px-4 py-3 hover:bg-gray-700/50"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span className="font-semibold">Café PRO 2</span>
                      </div>
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                        Avançado
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Versão ainda mais avançada</p>
                  </Link>
                
                </div>
              )}
            </div>
            
            <Link to="/templates" className="btn-primary">
              Começar Agora
            </Link>
          </div>
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;