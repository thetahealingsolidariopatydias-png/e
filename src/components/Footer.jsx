import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Digital
                </span>
                <span className="text-white">Templates</span>
              </span>
            </div>
            <p className="text-gray-400">
              Criamos experiências digitais que transformam visitantes em clientes.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
              <li><Link to="/template/cafe" className="text-gray-400 hover:text-white">Demo Café</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Templates</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Cafés & Restaurantes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Lojas & E-commerce</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Artistas & Criativos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contato</h4>
            <p className="text-gray-400">contatoshake@hotmail.com</p>
            <p className="text-gray-400">(31) 99570-5028</p>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          <p>© {new Date().getFullYear()} Wizzard Digital Templates Pro. Todos os direitos reservados.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Feito com <Heart className="w-4 h-4 text-red-500" /> para pequenos negócios
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;