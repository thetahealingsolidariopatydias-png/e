import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Phone,
  MapPin,
  Shield,
  Wine,
  Facebook,
  Instagram,
  Mail
} from "lucide-react";

import CanModel from "../components/CanModel";
import { FLAVORS } from "../assets/dataSabor/flavors";
import { useToguroAudio } from "../hooks/useToguroAudio";
import ToguroRandomGif from "../components/ToguroRandomGif";

const Drink = () => {
  const containerRef = useRef(null);
  const startedRef = useRef(false);

  const [flavorIndex, setFlavorIndex] = useState(0);
  const flavor = FLAVORS[flavorIndex];

  // 🔊 ÁUDIO (usado apenas uma vez)
  const {
    unlockAudio,
    startBG,
    playRandomFrase,
    pauseBGFor,
    setVolume,
  } = useToguroAudio();

  const ensureAudioStarted = () => {
    if (!startedRef.current) {
      unlockAudio();
      startBG();
      setVolume(0.5);
      startedRef.current = true;
    }
  };

  const handleCanClick = () => {
    ensureAudioStarted();

    setFlavorIndex((prev) => (prev + 1) % FLAVORS.length);
    playRandomFrase();
    pauseBGFor(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative isolate text-white min-h-screen overflow-hidden"
      onClick={ensureAudioStarted}
    >
      {/* BACKGROUND */}
      <motion.div
        key={flavor.id}
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${flavor.bg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-sm" />

      {/* GIF lateral */}
      <ToguroRandomGif />

      {/* FRUTAS FLUTUANTES */}
      {flavor.fruits.map((fruit, idx) => (
        <motion.img
          key={idx}
          src={fruit}
          className="absolute w-24 h-24 z-10 pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4 + idx }}
          style={{
            left: `${10 + idx * 20}%`,
            top: `${10 + idx * 15}%`,
          }}
        />
      ))}

      {/* CONTEÚDO PRINCIPAL */}
      <section className="relative z-20 flex flex-col md:flex-row items-center justify-center md:h-screen px-8 md:px-32 pt-10 pb-20">
        
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

        {/* INFO DO SABOR */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:ml-16 w-full md:w-1/3 bg-gray-900/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
        >
          <h2
            className="text-4xl font-bold mb-2"
            style={{ color: flavor.color }}
          >
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

          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:opacity-90 transition">
            Comprar Agora
          </button>
        </motion.div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer className="relative z-20 bg-gradient-to-t from-black to-purple-950/20 pt-20 pb-12 px-4 border-t border-purple-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Wine className="w-10 h-10 text-purple-400" />
                <span className="text-2xl font-bold">
                  Drinks Experience PRO
                </span>
              </div>
              <p className="text-purple-300/80">
                Criando experiências sensoriais com drinks autorais e coquetelaria moderna.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-purple-200">
                Horário do Bar
              </h4>
              <div className="space-y-3 text-purple-300/80">
                <p>Seg-Qui: <span className="text-purple-400 font-semibold">18h - 01h</span></p>
                <p>Sex-Sáb: <span className="text-purple-400 font-semibold">18h - 03h</span></p>
                <p>Dom: <span className="text-purple-400 font-semibold">17h - 00h</span></p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-purple-200">
                Contato & Reservas
              </h4>
              <div className="space-y-3 text-purple-300/80">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Rua Noturna, 777 - Centro
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (11) 99888-7766
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  reservas@drinksexperience.com
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-purple-200">
                Redes Sociais
              </h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-purple-900/30 rounded-lg hover:bg-purple-800/50 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-purple-900/30 rounded-lg hover:bg-purple-800/50 transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          <div className="text-center text-purple-700/60 text-sm pt-8 border-t border-purple-900/30">
            © {new Date().getFullYear()} Drinks Experience PRO. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Drink;
