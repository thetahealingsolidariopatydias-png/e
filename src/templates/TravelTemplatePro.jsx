import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Cloud } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Globe, Plane, Mountain, Waves, Wind, Building2, ChevronRight, Calendar, Users, Award, Compass, Sun, Moon } from 'lucide-react';

// Componente 3D Montanha
const Mountain3D = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <coneGeometry args={[2, 3, 8]} />
      <meshStandardMaterial 
        color={position[1] > 1 ? "#FFFFFF" : "#4A7C59"}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

// Componente 3D Água/Ondas
const Water3D = () => {
  const waterRef = useRef();
  
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshStandardMaterial 
        color="#4A90E2"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
};

// Componente 3D Avião
const Airplane3D = ({ scrollProgress }) => {
  const planeRef = useRef();
  
  useFrame((state) => {
    if (planeRef.current) {
      // Movimento baseado no scroll
      planeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      planeRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.5 + 1;
      planeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={planeRef} scale={0.3}>
      <boxGeometry args={[3, 0.5, 0.5]} />
      <meshStandardMaterial color="#FFFFFF" />
      {/* Asas */}
      <mesh position={[0, 0, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[2, 0.1, 0.1]} />
        <meshStandardMaterial color="#CCCCCC" />
      </mesh>
    </mesh>
  );
};

// Componente de Partículas de Areia
const SandParticles = ({ count = 50 }) => {
  const particlesRef = useRef([]);
  
  useFrame((state) => {
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        particle.position.x += Math.sin(state.clock.elapsedTime + i) * 0.01;
        particle.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 2 - 1,
            (Math.random() - 0.5) * 10
          ]}
          scale={0.05}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#D4A76A" />
        </mesh>
      ))}
    </group>
  );
};

// Componente principal do Template
const TravelTemplatePro = () => {
  const containerRef = useRef();
  const [activeLayer, setActiveLayer] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Efeitos parallax para cada camada
  const mountainParallax = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const bushesScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.8]);
  
  const waterLevel = useTransform(scrollYProgress, [0.25, 0.5], [0, 100]);
  const beachOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  
  const sandWind = useTransform(scrollYProgress, [0.5, 0.75], [0, 200]);
  const desertScale = useTransform(scrollYProgress, [0.55, 0.7], [1, 1.1]);
  
  const cityParallax = useTransform(scrollYProgress, [0.75, 1], [0, -50]);
  const planePosition = useTransform(scrollYProgress, [0.8, 0.95], [100, -100]);

  // Destinos com informações
  const destinations = [
    {
      id: 1,
      title: "Alpes Suíços",
      description: "Montanhas majestosas cobertas de neve eterna, perfeitas para esqui e montanhismo.",
      features: ["Esqui Premium", "Cabanas Alpinas", "Trilhas Panorâmicas"],
      price: "R$ 8.900",
      duration: "7 dias",
      season: "Inverno",
      icon: Mountain,
      color: "from-emerald-900/40 to-sky-900/40"
    },
    {
      id: 2,
      title: "Maldivas",
      description: "Ilhas paradisíacas com águas cristalinas e resorts sobre o mar.",
      features: ["Bangalôs Overwater", "Mergulho com Tubarões", "Spa na Praia"],
      price: "R$ 12.500",
      duration: "10 dias",
      season: "Ano Todo",
      icon: Waves,
      color: "from-sky-900/40 to-blue-900/40"
    },
    {
      id: 3,
      title: "Deserto do Saara",
      description: "A maior extensão de areia do mundo, com noites estreladas inesquecíveis.",
      features: ["Acampamento Beduíno", "Passeio de Camelo", "Observação de Estrelas"],
      price: "R$ 6.800",
      duration: "5 dias",
      season: "Outono/Primavera",
      icon: Sun,
      color: "from-amber-900/40 to-orange-900/40"
    },
    {
      id: 4,
      title: "Nova York",
      description: "A cidade que nunca dorme, com arranha-céus, cultura e gastronomia mundial.",
      features: ["Broadway Shows", "Topo do Empire State", "Compras na 5ª Avenida"],
      price: "R$ 10.200",
      duration: "8 dias",
      season: "Primavera/Outono",
      icon: Building2,
      color: "from-gray-900/40 to-purple-900/40"
    }
  ];

  // Efeito para detectar layer ativa
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveLayer(0);
      else if (latest < 0.5) setActiveLayer(1);
      else if (latest < 0.75) setActiveLayer(2);
      else setActiveLayer(3);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
      {/* Indicador de Camada Ativa */}
      <div className="fixed top-1/2 right-8 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          {['🏔️', '🏖️', '🏜️', '🏙️'].map((emoji, index) => (
            <motion.div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl cursor-pointer ${
                activeLayer === index 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                const section = document.getElementById(`layer-${index}`);
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Camada 1: Montanhas */}
      <section id="layer-0" className="relative h-screen overflow-hidden">
        {/* Background gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-sky-900 to-blue-900">
          {/* Neblina */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        </div>
        
        {/* Canvas 3D Montanhas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            {/* Montanhas */}
            <Mountain3D position={[-3, -1, 0]} scale={1.2} />
            <Mountain3D position={[0, -0.5, 2]} scale={1} />
            <Mountain3D position={[3, -1.5, -1]} scale={0.8} />
            <Mountain3D position={[-2, 0, 3]} scale={0.6} />
            
            {/* Nuvens */}
            <Cloud position={[-4, 3, -2]} speed={0.1} />
            <Cloud position={[4, 2, -3]} speed={0.08} />
            
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          </Canvas>
        </div>
        
        {/* Arbustos na frente (fecham ao descer) */}
        <motion.div 
          style={{ scale: bushesScale }}
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-800/80 to-transparent"
        >
          <div className="absolute inset-0 flex justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="w-16 h-24 bg-emerald-700 rounded-t-full"
                style={{
                  transform: `translateX(${(i - 10) * 5}px)`,
                  height: `${80 + Math.sin(i) * 20}px`
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Conteúdo */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                Montanhas
              </span>
              <br />
              <span className="text-4xl md:text-5xl">que Tocam o Céu</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-sky-200 mb-12 max-w-2xl mx-auto"
            >
              Explore os picos mais altos do mundo e descubra vistas que vão além da imaginação
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 text-sky-300"
            >
              <Compass className="w-6 h-6" />
              <span>Altitude: 2.000m+ • Temperatura: -5°C a 15°C • Melhor época: Dez-Mar</span>
            </motion.div>
          </div>
        </div>
        
        {/* Seta indicadora */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
        >
          <ChevronRight className="w-8 h-8 rotate-90" />
        </motion.div>
      </section>

      {/* Camada 2: Praia */}
      <section id="layer-1" className="relative h-screen overflow-hidden">
        {/* Background gradiente praia */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-blue-400 to-emerald-400">
          {/* Sol */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full shadow-2xl shadow-yellow-400/50" />
        </div>
        
        {/* Água que sobe */}
        <motion.div 
          style={{ y: waterLevel }}
          className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-500/70 via-blue-400/50 to-transparent"
        />
        
        {/* Conchas na areia (desaparecem com a água) */}
        <motion.div 
          style={{ opacity: beachOpacity }}
          className="absolute bottom-10 left-0 right-0 flex justify-around"
        >
          {['🐚', '⭐', '🦀', '🐚', '⭐'].map((emoji, i) => (
            <motion.div
              key={i}
              className="text-4xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Conteúdo */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-sky-300 to-blue-300 bg-clip-text text-transparent">
                Praias
              </span>
              <br />
              <span className="text-4xl md:text-5xl">de Águas Cristalinas</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
            >
              Mergulhe em águas tão claras que parecem cristal e relaxe nas areias mais brancas do planeta
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Waves className="w-6 h-6" />
              <span>Temperatura da água: 26°C • Visibilidade: 30m+ • Melhor época: Abr-Out</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Camada 3: Deserto */}
      <section id="layer-2" className="relative h-screen overflow-hidden">
        {/* Background gradiente deserto */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-orange-400 to-amber-700">
          {/* Sol do deserto */}
          <div className="absolute top-4 right-1/4 w-40 h-40 bg-orange-300 rounded-full blur-xl opacity-60" />
        </div>
        
        {/* Areia que sopra */}
        <motion.div 
          style={{ x: sandWind }}
          className="absolute inset-0"
        >
          {/* Canvas 3D partículas de areia */}
          <div className="absolute inset-0">
            <Canvas>
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SandParticles count={100} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </motion.div>
        
        {/* Oásis (fixo) */}
        <div className="absolute bottom-1/4 left-1/4 w-64 h-48 bg-emerald-500/30 rounded-full blur-2xl" />
        
        {/* Conteúdo */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Desertos
              </span>
              <br />
              <span className="text-4xl md:text-5xl">de Areia Dourada</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto"
            >
              Caminhe por dunas infinitas sob um céu estrelado que parece tocar a terra
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Wind className="w-6 h-6" />
              <span>Temperatura: 15°C a 45°C • Umidade: 10-20% • Melhor época: Out-Mar</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Camada 4: Cidade */}
      <section id="layer-3" className="relative h-screen overflow-hidden">
        {/* Background gradiente cidade noturna */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
          {/* Janelas dos prédios */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `${Math.random() * 60}%`,
                  animation: `twinkle ${2 + Math.random() * 3}s infinite`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Avião passando */}
        <motion.div
          style={{ x: planePosition }}
          className="absolute top-1/4 w-full"
        >
          <div className="flex justify-center">
            <div className="w-64 h-32">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Airplane3D scrollProgress={scrollYProgress} />
              </Canvas>
            </div>
          </div>
          
          {/* Rastro do avião */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>
        
        {/* Conteúdo */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Metrópoles
              </span>
              <br />
              <span className="text-4xl md:text-5xl">que Nunca Dormem</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
            >
              Sinta a energia pulsante das maiores cidades do mundo, onde cada esquina tem uma história
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Building2 className="w-6 h-6" />
              <span>Altitude: 0-500m • Temperatura: 0°C a 30°C • Melhor época: Mar-Jun, Set-Nov</span>
            </motion.div>
          </div>
        </div>
        
        {/* Botão para voltar ao topo */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:opacity-90"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="flex items-center gap-2">
            <ChevronRight className="w-5 h-5 -rotate-90" />
            Voltar às Montanhas
          </span>
        </motion.button>
      </section>

      {/* Seção de Destinos (após o parallax) */}
      <section className="py-32 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                Nossos Pacotes Exclusivos
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Escolha seu próximo destino dos sonhos entre nossas experiências cuidadosamente elaboradas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => {
              const Icon = dest.icon;
              return (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: dest.id * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`bg-gradient-to-br ${dest.color} backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-10 h-10 text-white" />
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                        {dest.season}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{dest.title}</h3>
                    <p className="text-gray-300 mb-6">{dest.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {dest.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-3xl font-bold">{dest.price}</div>
                        <div className="text-sm text-gray-400">por pessoa</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{dest.duration}</div>
                        <div className="text-sm text-gray-400">duração</div>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors">
                      Solicitar Cotação
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm py-12 px-4 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-10 h-10 text-sky-400" />
                <span className="text-2xl font-bold">Mundo Viajante</span>
              </div>
              <p className="text-gray-400">
                Criando experiências de viagem inesquecíveis desde 2005. Do planejamento à memória.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contato VIP</h4>
              <div className="space-y-2">
                <p className="text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (11) 99999-8888
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Av. das Nações, 1000 - São Paulo
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Certificações</h4>
              <div className="flex flex-wrap gap-3">
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                  <Award className="inline w-3 h-3 mr-1" />
                  IATA
                </div>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  <Users className="inline w-3 h-3 mr-1" />
                  ABETA
                </div>
                <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  <Calendar className="inline w-3 h-3 mr-1" />
                  18 Anos
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800/50">
            © {new Date().getFullYear()} Mundo Viajante. Todos os direitos reservados.
            <br />
            <span className="text-gray-600">
              Template criado por{' '}
              <a href="/templates" className="hover:text-sky-400">
                Digital Templates PRO
              </a>
              {' '}— Demonstração de template avançado para agências de viagem
            </span>
          </div>
        </div>
      </footer>

      {/* CSS para animações */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TravelTemplatePro;