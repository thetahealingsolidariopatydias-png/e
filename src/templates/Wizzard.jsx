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
import WizzardComponet from "../components/WizzardInvitePage"
const Wizzard = () => {
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
     

      {/* OVERLAY */}
     

    

      {/* inserir conteudo  */}
      <WizzardComponet />
      

    {/* FOOTER PREMIUM */}
<footer className="relative z-20 bg-gradient-to-t from-black to-purple-950/20 pt-20 pb-12 px-4 border-t border-purple-900/30">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-4 gap-12 mb-12">

      {/* Empresa */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Wine className="w-10 h-10 text-purple-400" />
          <span className="text-2xl font-bold">
            Drinks Experience PRO
          </span>
        </div>
        <p className="text-purple-300/80 mb-4">
         Especialistas na criação de páginas digitais 
         com design impactante, interatividade e foco em conversão.
        </p>
        <p className="text-purple-400 font-semibold">
          Desde 2012 elevando o padrão profissional.
        </p>
      </div>

      {/* Horário */}
      <div>
        <h4 className="text-lg font-bold mb-6 text-purple-200">
          Horário de Atendimento
        </h4>
        <div className="space-y-3 text-purple-300/80">
          <p>
            Seg-Qui:{" "}
            <span className="text-purple-400 font-semibold">
              09h - 18h
            </span>
          </p>
          <p>
            Sex-Sáb:{" "}
            <span className="text-purple-400 font-semibold">
              09h - 17h
            </span>
          </p>
          <p>
            Dom:{" "}
            <span className="text-purple-400 font-semibold">
              09h - 12h
            </span>
          </p>
        </div>
      </div>

      {/* Contato */}
      <div>
        <h4 className="text-lg font-bold mb-6 text-purple-200">
          Contato & Reservas
        </h4>
        <div className="space-y-4 text-purple-300/80">

          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Belo Horizonte - MG
          </p>

          <a
            href="tel:+5531995705028"
            className="flex items-center gap-2 hover:text-purple-400 transition"
          >
            <Phone className="w-4 h-4" />
            (31) 9 9570-5028
          </a>

          <a
            href="https://wa.me/5531995705028"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <Phone className="w-4 h-4" />
            WhatsApp: (31) 9 9570-5028
          </a>

          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            contatoshake@hotmail.com
          </p>

        </div>
      </div>

      {/* Redes */}
      <div>
        <h4 className="text-lg font-bold mb-6 text-purple-200">
          Redes Sociais
        </h4>
        <div className="flex gap-4">
          <a
            href="#"
            className="p-3 bg-purple-900/30 rounded-lg hover:bg-purple-800/50 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-3 bg-purple-900/30 rounded-lg hover:bg-purple-800/50 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>

    </div>

    <div className="text-center text-purple-700/60 text-sm pt-8 border-t border-purple-900/30">
      © {new Date().getFullYear()} Wizzard Experience PRO. 
      Todos os direitos reservados.
    </div>
  </div>
</footer>

    </div>
  );
};

export default Wizzard;
