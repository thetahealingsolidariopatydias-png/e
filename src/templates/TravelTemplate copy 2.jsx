import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import {
  Phone, MapPin, Globe, Plane, Mountain, Waves, Wind, Building2,
  ChevronRight, Calendar, Users, Award, Compass, Cloud, Sun,
  Map, Ticket, Shield, Clock, Heart, Navigation, Thermometer,
  Droplets, WindIcon, Zap, TreePine, Umbrella, Castle, Camera
} from 'lucide-react';

// ==================== COMPONENTES 3D INTERATIVOS ====================

// Montanha 3D que gira ao hover
const InteractiveMountain3D = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = hovered 
        ? state.clock.elapsedTime * 0.5
        : state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial
          color={hovered ? "#4ECDC4" : "#556B2F"}
          roughness={0.3}
          metalness={0.2}
          emissive={hovered ? "#4ECDC4" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
    </Float>
  );
};

// Palma 3D interativa
const PalmTree3D = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Tronco */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Folhas */}
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color={hovered ? "#32CD32" : "#228B22"} />
      </mesh>
    </group>
  );
};

// Avião 3D que voa
const Airplane3D = () => {
  const planeRef = useRef();
  
  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      planeRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.5 + 2;
      planeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={planeRef}>
      <mesh>
        <boxGeometry args={[2, 0.3, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Asas */}
      <mesh position={[0, 0, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.1, 0.05]} />
        <meshStandardMaterial color="#CCCCCC" />
      </mesh>
    </group>
  );
};

// ==================== COMPONENTES PARALLAX REAIS ====================

const ParallaxSection = ({ children, bgColor, id }) => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative h-screen overflow-hidden ${bgColor}`}
    >
      <AnimatePresence>
        {isVisible && children}
      </AnimatePresence>
    </section>
  );
};

// Componente de layer com parallax
const ParallaxLayer = ({ speed = 0, children, className = '', style = {} }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div
      ref={ref}
      style={{ y, ...style }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==================== TEMPLATE PRINCIPAL ====================

const TravelTemplate2 = () => {
  const containerRef = useRef();
  const [activeInfo, setActiveInfo] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Informações interativas
  const interactiveInfos = [
    {
      id: 'altitude',
      icon: Mountain,
      title: 'Altitude Extrema',
      description: 'Picos acima de 4.000m com oxigênio reduzido. Preparação física necessária.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'temperature',
      icon: Thermometer,
      title: 'Clima Extremo',
      description: 'Varia de -20°C à noite a 15°C durante o dia. Equipamento especial obrigatório.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      id: 'flora',
      icon: TreePine,
      title: 'Flora Única',
      description: 'Espécies endêmicas que só existem em altitudes elevadas. Vegetação alpina rara.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-gray-900 text-white overflow-hidden">
      {/* Menu flutuante de navegação */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex gap-4 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
          {['Montanhas', 'Praias', 'Desertos', 'Cidades'].map((item, idx) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-full transition-all ${
                Math.floor(scrollProgress * 4) === idx
                  ? 'bg-white text-black font-semibold'
                  : 'hover:bg-white/20'
              }`}
              onClick={() => {
                const section = document.getElementById(`section-${idx}`);
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* SEÇÃO 1: MONTANHAS COM PARALLAX REAL */}
      <ParallaxSection id="section-0" bgColor="bg-gradient-to-b from-blue-900 via-sky-900 to-gray-900">
        {/* Camada 1: Céu distante */}
        <ParallaxLayer speed={0.1}>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-sky-800">
            <Canvas className="absolute inset-0">
              <Stars radius={100} depth={50} count={2000} factor={4} fade />
            </Canvas>
          </div>
        </ParallaxLayer>

        {/* Camada 2: Montanhas distantes */}
        <ParallaxLayer speed={0.3}>
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="w-full h-64 bg-gradient-to-t from-gray-800/80 to-transparent">
              {/* Montanhas 3D */}
              <div className="absolute bottom-0 left-1/4 w-64 h-64">
                <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <InteractiveMountain3D position={[0, -1, 0]} />
                  <InteractiveMountain3D position={[2, -1.5, 1]} />
                  <InteractiveMountain3D position={[-2, -1.2, 0.5]} />
                </Canvas>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Camada 3: Neblina (PNG transparente simulado) */}
        <ParallaxLayer speed={0.5}>
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"
          />
        </ParallaxLayer>

        {/* Camada 4: Folhagem em primeiro plano */}
        <ParallaxLayer speed={-0.8}>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute bottom-0 left-0 right-0 h-48"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/60 to-transparent">
              {/* Folhas animadas */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 w-8 h-16 bg-emerald-700 rounded-t-full"
                  style={{
                    left: `${i * 5}%`,
                  }}
                  animate={{
                    height: [80, 120, 80],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        </ParallaxLayer>

        {/* Conteúdo interativo */}
        <div className="relative z-40 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Texto principal */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Explore o
                  </span>
                  <br />
                  <span className="text-white">Inexplorado</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Aventure-se pelos picos mais altos do mundo, onde apenas os mais corajosos
                  chegam. Cada montanha conta uma história milenar.
                </p>
                
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Começar Aventura
                  </button>
                  <button className="px-8 py-3 border-2 border-emerald-400 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-400/10">
                    Ver Roteiro
                  </button>
                </div>
              </motion.div>

              {/* Cards informativos interativos */}
              <div className="space-y-4">
                {interactiveInfos.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + interactiveInfos.indexOf(info) * 0.1 }}
                      whileHover={{ x: -10 }}
                      className={`p-6 rounded-2xl backdrop-blur-sm border border-white/10 cursor-pointer ${info.bgColor}`}
                      onClick={() => setActiveInfo(activeInfo === info.id ? null : info.id)}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <Icon className={`w-8 h-8 ${info.color}`} />
                        <h3 className="text-xl font-semibold">{info.title}</h3>
                      </div>
                      
                      <AnimatePresence>
                        {activeInfo === info.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-300 overflow-hidden"
                          >
                            {info.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      
                      {activeInfo !== info.id && (
                        <p className="text-gray-400 text-sm">
                          Clique para saber mais →
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronRight className="w-8 h-8 rotate-90 text-white/60" />
        </motion.div>
      </ParallaxSection>

      {/* SEÇÃO 2: PRAIAS */}
      <ParallaxSection id="section-1" bgColor="bg-gradient-to-b from-cyan-900 via-blue-900 to-emerald-900">
        {/* Camada de céu */}
        <ParallaxLayer speed={0.1}>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-600">
            {/* Sol */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-2xl shadow-yellow-400/50"
            />
          </div>
        </ParallaxLayer>

        {/* Camada de nuvens PNG (transparentes) */}
        <ParallaxLayer speed={0.4}>
          <div className="absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl opacity-30"
                style={{
                  left: `${i * 20}%`,
                  top: `${10 + i * 15}%`
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0]
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ☁️
              </motion.div>
            ))}
          </div>
        </ParallaxLayer>

        {/* Camada de palmeiras 3D */}
        <ParallaxLayer speed={0.6}>
          <div className="absolute bottom-0 left-0 right-0 h-96">
            <div className="absolute bottom-0 left-1/4 w-48 h-48">
              <Canvas>
                <ambientLight intensity={0.7} />
                <PalmTree3D position={[0, 0, 0]} />
              </Canvas>
            </div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48">
              <Canvas>
                <ambientLight intensity={0.7} />
                <PalmTree3D position={[0, 0, 0]} />
              </Canvas>
            </div>
          </div>
        </ParallaxLayer>

        {/* Água que sobe */}
        <ParallaxLayer speed={-0.3}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '30%' }}
            transition={{
              duration: 2,
              delay: 0.5
            }}
            className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-blue-500/40 via-cyan-400/30 to-transparent"
          />
        </ParallaxLayer>

        {/* Conteúdo */}
        <div className="relative z-40 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Paraíso
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-cyan-100">Tropical</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-cyan-200 mb-8 max-w-2xl mx-auto"
            >
              Ilhas de areia branca e águas cristalinas que revelam um mundo submarino colorido.
            </motion.p>

            {/* Estatísticas interativas */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { value: '26°C', label: 'Temperatura', icon: Thermometer, color: 'text-amber-400' },
                { value: '30m+', label: 'Visibilidade', icon: Droplets, color: 'text-cyan-400' },
                { value: '99%', label: 'Pureza', icon: Award, color: 'text-emerald-400' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl cursor-pointer"
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* SEÇÃO 3: DESERTO */}
      <ParallaxSection id="section-2" bgColor="bg-gradient-to-b from-amber-900 via-orange-900 to-amber-950">
        {/* Céu estrelado */}
        <div className="absolute inset-0">
          <Canvas>
            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
          </Canvas>
        </div>

        {/* Dunas com parallax */}
        <ParallaxLayer speed={0.3}>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-800/80 to-transparent">
            {/* Dunas animadas */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 h-32 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-full"
                style={{
                  left: `${i * 10}%`,
                  width: `${80 + Math.sin(i) * 40}px`,
                }}
                animate={{
                  height: [80, 120, 80],
                  x: [0, 20, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        {/* Areia voando */}
        <ParallaxLayer speed={0.8}>
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-amber-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        {/* Conteúdo */}
        <div className="relative z-40 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Silêncio
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-amber-100">Dourado</span>
            </motion.h2>

            {/* Contador interativo */}
            <div className="inline-flex items-center gap-8 mt-8">
              {[
                { value: '45°C', label: 'Máxima', color: 'text-red-400' },
                { value: '15°C', label: 'Mínima', color: 'text-blue-400' },
                { value: '10%', label: 'Umidade', color: 'text-cyan-400' }
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.2, type: "spring" }}
                  whileHover={{ scale: 1.2 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* SEÇÃO 4: CIDADE */}
      <ParallaxSection id="section-3" bgColor="bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        {/* Camadas de prédios */}
        <ParallaxLayer speed={0.2}>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-gray-800/50 to-transparent">
            {/* Janelas piscando */}
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `${Math.random() * 50}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2]
                }}
                transition={{
                  duration: 1 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        {/* Avião 3D voando */}
        <ParallaxLayer speed={0.5}>
          <div className="absolute top-1/4 left-0 right-0">
            <div className="flex justify-center">
              <div className="w-64 h-48">
                <Canvas>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Airplane3D />
                </Canvas>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Carro passando */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="absolute top-2/3 left-0 right-0 z-40"
        >
          <div className="flex justify-center">
            <div className="w-48 h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center">
              <div className="text-3xl mr-4">🚗</div>
              <div>
                <div className="w-16 h-1.5 bg-red-500 rounded-full mb-1" />
                <div className="w-12 h-1.5 bg-red-400 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <div className="relative z-40 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Energia
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-purple-100">Urbana</span>
            </motion.h2>

            {/* Botões interativos */}
            <div className="flex gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Reservar Tour
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-purple-400 text-purple-400 rounded-lg font-semibold flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Galeria 360°
              </motion.button>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* FOOTER */}
      <footer className="bg-black/90 backdrop-blur-sm py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para sua próxima <span className="text-cyan-400">aventura</span>?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Entre em contato com nossos especialistas e crie a viagem dos seus sonhos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-800/30 rounded-2xl">
              <Phone className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">WhatsApp VIP</h4>
              <p className="text-gray-400">(11) 98765-4321</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-2xl">
              <MapPin className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Escritório</h4>
              <p className="text-gray-400">São Paulo - SP</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-2xl">
              <Clock className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Horário</h4>
              <p className="text-gray-400">24/7 para emergências</p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Horizonte Viajante Premium
            <br />
            <span className="text-gray-600">
              Template criado por{' '}
              <a href="/" className="text-cyan-400 hover:text-cyan-300">
                Digital Templates PRO
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelTemplate;