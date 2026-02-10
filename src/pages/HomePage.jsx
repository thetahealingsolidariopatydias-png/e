import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles, Coffee, Palette, Smartphone, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <div className="pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Transforme seu Negócio
            </span>
            <br />
            com Sites que <span className="text-pink-500">Impressionam</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Templates digitais premium com efeitos 3D, animações suaves e designs
            que fazem seus clientes se apaixonarem pelo seu negócio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/templates" className="btn-primary text-lg py-4 px-8">
              <Sparkles className="inline mr-2" />
              Ver Templates
            </Link>
            <Link to="/template/cafe" className="border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-500/10">
              Ver Demonstração
            </Link>
          </div>

          {/* Cards de Features */}
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <div className="glass-effect p-6 rounded-2xl">
              <Coffee className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">3D Interativo</h3>
              <p className="text-gray-400">Elementos que ganham vida</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl">
              <Smartphone className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Responsivo</h3>
              <p className="text-gray-400">Perfeito em todos dispositivos</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rápido</h3>
              <p className="text-gray-400">Otimizado para performance</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl">
              <Palette className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Design Premium</h3>
              <p className="text-gray-400">Visual profissional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Preços */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Planos que <span className="text-gradient">Cabem no seu Bolso</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Plano Simples */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Simples</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 120</span>
                <span className="text-gray-400"> + R$ 15-25/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Design Responsivo</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 4 Páginas</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Formulário de Contato</li>
              </ul>
              <button className="btn-secondary w-full">Escolher Plano</button>
            </div>
            
            {/* Plano Ousado */}
            <div className="glass-effect p-8 rounded-2xl border-2 border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  MAIS POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ousado</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 350</span>
                <span className="text-gray-400"> + R$ 30-50/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Animações 3D Leves</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 6 Páginas</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Integração WhatsApp</li>
              </ul>
              <button className="btn-primary w-full">Escolher Plano</button>
            </div>
            
            {/* Plano Exclusivo */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Exclusivo</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 800</span>
                <span className="text-gray-400"> + R$ 50-80/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Cena 3D Completa</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Páginas Ilimitadas</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Suporte Prioritário</li>
              </ul>
              <button className="btn-secondary w-full">Escolher Plano</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;