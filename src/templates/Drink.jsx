import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from "@react-three/fiber";
import { Globe, Phone, MapPin, Shield } from 'lucide-react';
import CanModel from "../components/CanModel";
import { FLAVORS } from "../assets/dataSabor/flavors";

const Drink = () => {
  const containerRef = useRef();
  const [flavorIndex, setFlavorIndex] = useState(0);
  const flavor = FLAVORS[flavorIndex];

  const handleCanClick = () => {
    setFlavorIndex((prev) => (prev + 1) % FLAVORS.length);
  };

  return (
    <div ref={containerRef} className="relative text-white min-h-screen overflow-hidden">

      {/* DIV DE FUNDO DA PÁGINA */}
      <motion.div
        key={flavor.id}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${flavor.bg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      {/* Overlay leve para contraste */}
      <div className="absolute inset-0 z-5 bg-black/20 backdrop-blur-sm" />

      {/* Frutas flutuantes */}
      {flavor.fruits.map((fruit, idx) => (
        <motion.img
          key={idx}
          src={fruit}
          className="absolute w-20 h-20 md:w-28 md:h-28"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: [0, 20, 0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 4 + idx }}
          style={{
            left: `${10 + idx * 20}%`,
            top: `${10 + idx * 15}%`,
            zIndex: 10,
            width : 100 ,
            height : 100
          }}
        />
      ))}

      {/* Lata 3D e ficha técnica */}
  <section className="relative flex flex-col md:flex-row items-center justify-center md:h-screen px-8 md:px-32 z-20
                    pt-10 md:pt-0 pb-20 md:pb-0">

       {/* Lata 3D maior, mobile maior e mais baixa */}
  
<div className="relative w-full md:w-1/2 h-[500px] md:h-[600px] flex justify-center items-end md:items-center mt-10 md:mt-0">
    <Canvas
    style={{ width: '105%', height: '105%', background: 'transparent' }}
    camera={{ position: [0, 0, 4], fov: 45 }}
    gl={{ antialias: true, physicallyCorrectLights: true, alpha: true }}
  >
    <ambientLight intensity={1} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} />
    <CanModel
      textures={flavor.texture ? [flavor.texture] : []}
      onClick={handleCanClick}
    />
  </Canvas>
</div>

        {/* Ficha técnica */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 md:mt-0 md:ml-16 w-full md:w-1/3 bg-gray-900/70 backdrop-blur-sm rounded-3xl p-8"
        >
          <h2 className="text-4xl font-bold mb-2" style={{ color: flavor.color }}>
            {flavor.name}
          </h2>
          <p className="text-gray-300 mb-4">{flavor.description}</p>
          <div className="space-y-2 mb-6">
            <p><span className="font-semibold">Aroma:</span> {flavor.aroma}</p>
            <p><span className="font-semibold">Doçura:</span> {flavor.sweetness}</p>
            <p><span className="font-semibold">Acidez:</span> {flavor.acidity}</p>
            <p><span className="font-semibold">Preço:</span> {flavor.price}</p>
            <p><span className="font-semibold">Conceito:</span> {flavor.concept}</p>
          </div>
          <button className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Comprar Agora
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-900 z-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-10 h-10 text-cyan-400" />
                <div>
                  <div className="text-2xl font-bold">Horizonte Viajante</div>
                  <div className="text-sm text-gray-500">Beyond the ordinary</div>
                </div>
              </div>
              <p className="text-gray-400">
                Criamos experiências únicas que transformam momentos simples em extraordinários.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Segurança
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Garantia de Qualidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Entrega Segura</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contato VIP</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="font-semibold">(11) 98765-4321</div>
                    <div className="text-sm text-gray-500">WhatsApp VIP</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="font-semibold">São Paulo - SP</div>
                    <div className="text-sm text-gray-500">Consultório VIP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Horizonte Viajante. Todos os direitos reservados.
            </div>
            <div className="text-gray-600 text-sm">
              Template Premium por{' '}
              <a href="/templates" className="text-cyan-400 hover:text-cyan-300">Digital Templates PRO</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Drink;
