import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Coffee as CoffeeIcon, Clock, Mail, Star } from 'lucide-react';

const CafeTemplate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-black text-amber-50">
      {/* Header do Template */}
      <header className="pt-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CoffeeIcon className="w-10 h-10 text-amber-400" />
              <h1 className="text-3xl font-bold">Café Artesanal do João</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="hover:text-amber-300">Sobre</a>
              <a href="#menu" className="hover:text-amber-300">Cardápio</a>
              <a href="#contato" className="hover:text-amber-300">Contato</a>
              <a href="#localizacao" className="hover:text-amber-300">Localização</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-amber-300" />
            <span className="text-amber-300">Desde 2010</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            O Melhor Café da <span className="text-amber-400">Cidade</span>
          </h2>
          <p className="text-2xl text-amber-200 mb-10">
            Torrado artesanalmente com paixão. Cada xícara é uma experiência única.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center px-8 py-4"
            >
              <Phone className="mr-2" />
              Pedir por WhatsApp
            </a>
            <button className="btn-secondary flex items-center px-8 py-4">
              <MapPin className="mr-2" />
              Ver no Mapa
            </button>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-20 px-4 bg-amber-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">Nossa História</h3>
              <p className="text-lg text-amber-200 mb-4">
                Começamos em uma pequena loja no centro da cidade, com um sonho simples: 
                servir o melhor café da região usando técnicas artesanais de torra.
              </p>
              <p className="text-lg text-amber-200">
                Hoje, continuamos com a mesma paixão. Cada grão é selecionado manualmente, 
                torrado no ponto perfeito e moído na hora para garantir o aroma e sabor inigualáveis.
              </p>
            </div>
            <div className="glass-effect p-8 rounded-2xl">
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Horário de Funcionamento
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Segunda - Sexta:</span> <span className="text-amber-300 font-semibold">7h - 20h</span></div>
                <div className="flex justify-between"><span>Sábado:</span> <span className="text-amber-300 font-semibold">8h - 22h</span></div>
                <div className="flex justify-between"><span>Domingo:</span> <span className="text-amber-300 font-semibold">9h - 18h</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardápio */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">
            Nosso <span className="text-amber-400">Cardápio</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Café Especial', price: 'R$ 8,90', desc: 'Grãos selecionados da Colômbia', emoji: '☕' },
              { name: 'Cappuccino Artesanal', price: 'R$ 12,90', desc: 'Com chocolate belga', emoji: '✨' },
              { name: 'Expresso Perfeito', price: 'R$ 6,90', desc: 'Intenso e encorpado', emoji: '⚡' },
              { name: 'Chá Premium', price: 'R$ 10,90', desc: 'Seleção de chás especiais', emoji: '🍃' },
              { name: 'Bolos Caseiros', price: 'R$ 14,90', desc: 'Feitos diariamente', emoji: '🍰' },
              { name: 'Sanduíches', price: 'R$ 18,90', desc: 'Pães artesanais', emoji: '🥪' },
            ].map((item, idx) => (
              <div key={idx} className="glass-effect p-6 rounded-2xl text-center hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                <p className="text-amber-300 mb-4">{item.desc}</p>
                <div className="text-2xl font-bold text-amber-400">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer do Template */}
      <footer className="bg-amber-950/50 py-12 px-4 border-t border-amber-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Café Artesanal do João</h4>
              <p className="text-amber-300">
                O melhor café da cidade, feito com paixão, qualidade e dedicação artesanal.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Contato</h4>
              <div className="space-y-2">
                <p className="text-amber-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Rua das Flores, 123 - Centro
                </p>
                <p className="text-amber-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (11) 99999-9999
                </p>
                <p className="text-amber-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contato@cafeartesanal.com
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="text-amber-300 hover:text-amber-200 p-2 bg-amber-900/30 rounded-lg">
                  <Instagram />
                </a>
                <a href="#" className="text-amber-300 hover:text-amber-200 p-2 bg-amber-900/30 rounded-lg">
                  <Facebook />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-amber-500/70 text-sm pt-8 border-t border-amber-800/30">
            © {new Date().getFullYear()} Café Artesanal do João. Todos os direitos reservados.
            <br />
            <span className="text-amber-600">
              Template criado por <a href="/" className="hover:text-amber-400">Digital Templates Pro</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CafeTemplate;