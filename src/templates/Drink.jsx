import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Globe, Phone, MapPin, Shield } from "lucide-react";

import CanModel from "../components/CanModel";
import { FLAVORS } from "../assets/dataSabor/flavors";
import { useToguroAudio } from "../hooks/useToguroAudio";
import ToguroRandomGif from "../components/ToguroRandomGif";

const Drink = () => {
  const containerRef = useRef(null);
  const startedRef = useRef(false);

  const [flavorIndex, setFlavorIndex] = useState(0);
  const flavor = FLAVORS[flavorIndex];

  // 🔊 SISTEMA DE ÁUDIO — USADO UMA ÚNICA VEZ
  const {
    unlockAudio,
    startBG,
    playRandomFrase,
    pauseBGFor,
    setVolume,
  } = useToguroAudio();

  // 🔓 primeira interação (necessário pra autoplay)
  const ensureAudioStarted = () => {
    if (!startedRef.current) {
      unlockAudio();     // libera autoplay (browser)
      startBG();         // começa som ambiente em loop
      setVolume(0.5);    // volume inicial
      startedRef.current = true;
    }
  };

  // 🍹 clique na lata
  const handleCanClick = () => {
    ensureAudioStarted();

    setFlavorIndex((prev) => (prev + 1) % FLAVORS.length);
    playRandomFrase();     // frase aleatória
    pauseBGFor(0);      // pausa bg por 1.5s e volta sozinho
  };

  return (
    <div
      ref={containerRef}
      className="relative text-white min-h-screen overflow-hidden"
      onClick={ensureAudioStarted} // qualquer clique desbloqueia áudio
    >
      {/* FUNDO */}
      <motion.div
        key={flavor.id}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${flavor.bg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <ToguroRandomGif />

      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5" />

      {/* FRUTAS */}
      {flavor.fruits.map((fruit, idx) => (
        <motion.img
          key={idx}
          src={fruit}
          className="absolute w-24 h-24 z-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4 + idx }}
          style={{
            left: `${10 + idx * 20}%`,
            top: `${10 + idx * 15}%`,
          }}
        />
      ))}

      {/* CONTEÚDO */}
      <section className="relative flex flex-col md:flex-row items-center justify-center md:h-screen px-8 md:px-32 z-20 pt-10 pb-20">
        {/* LATA 3D */}
        <div className="relative w-full md:w-1/2 h-[500px] md:h-[600px] flex justify-center items-end md:items-center">
          <Canvas
            style={{ width: "105%", height: "105%" }}
            camera={{ position: [0, 0, 4], fov: 45 }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            <CanModel
              textures={flavor.texture ? [flavor.texture] : []}
              onClick={handleCanClick}
            />
          </Canvas>
        </div>

        {/* INFO */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:ml-16 w-full md:w-1/3 bg-gray-900/70 backdrop-blur-sm rounded-3xl p-8"
        >
          <h2 className="text-4xl font-bold mb-2" style={{ color: flavor.color }}>
            {flavor.name}
          </h2>

          <p className="text-gray-300 mb-4">{flavor.description}</p>

          <div className="space-y-2 mb-6">
            <p><strong>Aroma:</strong> {flavor.aroma}</p>
            <p><strong>Doçura:</strong> {flavor.sweetness}</p>
            <p><strong>Acidez:</strong> {flavor.acidity}</p>
            <p><strong>Preço:</strong> {flavor.price}</p>
            <p><strong>Conceito:</strong> {flavor.concept}</p>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-semibold">
            Comprar Agora
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/80 border-t border-gray-900 z-20">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-cyan-400" />
              <h3 className="text-xl font-bold">Horizonte Viajante</h3>
            </div>
            <p className="text-gray-400">
              Criamos experiências únicas.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3 flex gap-2">
              <Shield /> Segurança
            </h4>
            <p className="text-gray-400">Entrega segura</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contato</h4>
            <p className="flex gap-2"><Phone /> (11) 98765-4321</p>
            <p className="flex gap-2"><MapPin /> São Paulo</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Drink;
