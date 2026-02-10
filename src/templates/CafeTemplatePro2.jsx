import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Instagram, Facebook, Coffee as CoffeeIcon, Clock, Mail, Star, ChevronDown, X, Heart, Award, Users } from 'lucide-react';

// URLs das imagens do Unsplash (Premium)
const UNSPLASH_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
  interior: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
  beans: 'https://images.unsplash.com/photo-1587734195507-6b7c8b6a3e5c?auto=format&fit=crop&w=1600&q=80',
  barista: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1600&q=80',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
  process: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=1600&q=80',
};

// Componente da Xícara 3D Avançada
const CoffeeCup3D = () => {
  const cupRef = useRef();
  const coffeeRef = useRef();
  
  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      cupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
    if (coffeeRef.current) {
      coffeeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Xícara principal */}
      <mesh ref={cupRef} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.1, 1.6, 32]} />
        <meshStandardMaterial 
          color="#5D4037"
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      
      {/* Café dentro */}
      <mesh ref={coffeeRef} position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.4, 32]} />
        <meshStandardMaterial 
          color="#3E2723"
          roughness={0.7}
          transmission={0.2}
          thickness={1}
        />
      </mesh>
      
      {/* Asa da xícara */}
      <mesh position={[1.4, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 100]} />
        <meshStandardMaterial 
          color="#5D4037"
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      
      {/* Fumaça */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 2, 0]} scale={0.5}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            transparent
            opacity={0.15}
            roughness={1}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Grãos de café 3D interativos
const InteractiveCoffeeBeans = () => {
  const beans = useRef([]);
  const [hoveredBean, setHoveredBean] = useState(null);
  
  useFrame((state) => {
    beans.current.forEach((bean, i) => {
      if (bean) {
        const time = state.clock.elapsedTime;
        bean.rotation.x = time * 0.3 + i * 0.1;
        bean.rotation.y = time * 0.2 + i * 0.05;
        bean.position.y = Math.sin(time * 0.5 + i) * 0.15;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: 12 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={0.8}
          floatIntensity={1.2}
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * 4,
            (Math.random() - 0.5) * 8
          ]}
        >
          <mesh
            ref={(el) => (beans.current[i] = el)}
            scale={0.25}
            onPointerOver={() => setHoveredBean(i)}
            onPointerOut={() => setHoveredBean(null)}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color={hoveredBean === i ? "#D7CCC8" : i % 2 === 0 ? "#6F4E37" : "#8B4513"}
              roughness={0.8}
              emissive={hoveredBean === i ? "#FFD700" : "#000000"}
              emissiveIntensity={hoveredBean === i ? 0.3 : 0}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Componente Hero com imagem de fundo
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image com overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${UNSPLASH_IMAGES.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
      </div>
      
      {/* Conteúdo Hero */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-900/40 to-amber-800/40 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
        >
          <Award className="w-5 h-5 text-amber-300" />
          <span className="text-amber-300 font-semibold">★ Prêmio Excelência 2024</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Café Artesanal
          </span>
          <br />
          <span className="text-white text-5xl md:text-6xl">Experiência Premium</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-2xl text-amber-100 mb-12 max-w-3xl mx-auto"
        >
          Onde cada grão conta uma história e cada xícara é uma obra de arte
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <a 
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl font-bold text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Phone className="w-5 h-5" />
              Reservar Mesa VIP
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          
          <button className="group px-10 py-5 border-2 border-amber-400 text-amber-400 rounded-xl font-bold text-lg hover:bg-amber-400/10 transition-all duration-300 flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            Tour Virtual 360°
          </button>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto"
        >
          {[
            { value: '10K+', label: 'Clientes Satisfeitos', icon: Users },
            { value: '14', label: 'Anos de Tradição', icon: Award },
            { value: '50+', label: 'Premiações', icon: Star },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-amber-300 mb-2">{stat.value}</div>
                <div className="text-amber-100 flex items-center justify-center gap-2">
                  <Icon className="w-4 h-4" />
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Canvas 3D */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] z-0">
        <Canvas shadows camera={{ position: [0, 2, 6], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1} castShadow />
          
          <Suspense fallback={null}>
            <CoffeeCup3D />
            <InteractiveCoffeeBeans />
            <Environment preset="sunset" />
          </Suspense>
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </section>
  );
};

// Seção de Processo com imagens
const ProcessSection = () => {
  const processes = [
    {
      title: 'Seleção dos Grãos',
      description: 'Apenas os melhores grãos arábica das melhores regiões do mundo',
      image: UNSPLASH_IMAGES.beans,
      step: '01'
    },
    {
      title: 'Torra Artesanal',
      description: 'Torra lenta em pequenos lotes para desenvolver sabores complexos',
      image: UNSPLASH_IMAGES.process,
      step: '02'
    },
    {
      title: 'Preparo Meticuloso',
      description: 'Cada xícara preparada com atenção aos mínimos detalhes',
      image: UNSPLASH_IMAGES.barista,
      step: '03'
    },
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-black to-amber-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              O Processo Perfeito
            </span>
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            Do campo à sua xícara, cada etapa é cuidadosamente controlada para garantir excelência
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {processes.map((process, idx) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Imagem de fundo */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${process.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              {/* Conteúdo */}
              <div className="relative z-10 p-8 h-96 flex flex-col justify-end">
                <div className="text-amber-300 text-sm font-mono mb-4">— {process.step}</div>
                <h3 className="text-3xl font-bold text-white mb-3">{process.title}</h3>
                <p className="text-amber-200/90">{process.description}</p>
                
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="inline-flex items-center gap-2 text-amber-300">
                    <span>Explorar detalhes</span>
                    <ChevronDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
              
              {/* Efeito de borda */}
              <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl group-hover:border-amber-400/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção de Cardápio Premium
const PremiumMenuSection = () => {
  const menuItems = [
    {
      name: 'Especialidade da Casa',
      price: 'R$ 24,90',
      description: 'Blend exclusivo com notas de chocolate amargo e frutas vermelhas',
      highlight: true,
      ingredients: ['Grãos Geisha', 'Chocolate 70%', 'Cardamomo']
    },
    {
      name: 'Cappuccino Italiano',
      price: 'R$ 18,90',
      description: 'Espresso perfeito com espuma de leite aveludada',
      ingredients: ['Espresso duplo', 'Leite orgânico', 'Canela']
    },
    {
      name: 'Cold Brew Artesanal',
      price: 'R$ 21,90',
      description: 'Infusão a frio por 24 horas, suave e complexo',
      ingredients: ['Grãos Etiópia', 'Infusão 24h', 'Gelo esférico']
    },
  ];

  return (
    <section className="py-32 px-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '200px'
        }} />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Cardápio Premium
            </span>
          </h2>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">
            Criados por nossos baristas premiados para uma experiência sensorial única
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-2xl overflow-hidden ${
                item.highlight 
                  ? 'border-2 border-amber-500 shadow-2xl shadow-amber-900/30' 
                  : 'border border-amber-800/30'
              }`}
            >
              {item.highlight && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-1 rounded-full text-sm font-bold z-20">
                  MAIS PEDIDO
                </div>
              )}
              
              <div className="p-8 bg-gradient-to-b from-amber-950/80 to-amber-900/40 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                  <div className="text-3xl font-bold text-amber-400">{item.price}</div>
                </div>
                
                <p className="text-amber-300/90 mb-6">{item.description}</p>
                
                <div className="space-y-2 mb-8">
                  {item.ingredients.map((ingredient, i) => (
                    <div key={i} className="flex items-center gap-2 text-amber-400/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {ingredient}
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-800 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Adicionar ao Pedido
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente principal
const CafeTemplatePro2 = () => {
  const [showReservation, setShowReservation] = useState(false);

  return (
    <div className="bg-black text-white">
      {/* Hero Section com 3D */}
      <HeroSection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Premium Menu */}
      <PremiumMenuSection />
      
      {/* CTA Final */}
      <section className="py-32 px-4 bg-gradient-to-b from-amber-950/30 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Pronto para uma{' '}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Experiência Única?
            </span>
          </h2>
          
          <p className="text-xl text-amber-200 mb-12 max-w-2xl mx-auto">
            Visite-nos e descubra por que somos considerados a melhor cafeteria da região
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <button 
              onClick={() => setShowReservation(true)}
              className="group px-12 py-6 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-amber-900/40 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-6 h-6" />
                Reservar Experiência VIP
              </span>
            </button>
            
            <a 
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 border-2 border-amber-400 text-amber-400 rounded-xl font-bold text-xl hover:bg-amber-400/10 transition-all duration-300"
            >
              Falar com Concierge
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer Premium */}
      <footer className="bg-gradient-to-t from-black to-amber-950/20 pt-20 pb-12 px-4 border-t border-amber-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CoffeeIcon className="w-10 h-10 text-amber-400" />
                <span className="text-2xl font-bold">Café Artesanal PRO</span>
              </div>
              <p className="text-amber-300/80">
                Elevando a experiência do café a uma forma de arte desde 2010.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-amber-200">Horário Premium</h4>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-amber-300/80">Seg-Sex:</span> <span className="text-amber-400 font-semibold">7h - 23h</span></div>
                <div className="flex justify-between"><span className="text-amber-300/80">Sábado:</span> <span className="text-amber-400 font-semibold">8h - 00h</span></div>
                <div className="flex justify-between"><span className="text-amber-300/80">Domingo:</span> <span className="text-amber-400 font-semibold">9h - 22h</span></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-amber-200">Contato Exclusivo</h4>
              <div className="space-y-3">
                <p className="text-amber-300/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Av. Premium, 1000 - Jardins
                </p>
                <p className="text-amber-300/80 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (11) 98765-4321
                </p>
                <p className="text-amber-300/80 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  vip@cafepremium.com
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-amber-200">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-amber-900/30 rounded-lg hover:bg-amber-800/50 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-amber-900/30 rounded-lg hover:bg-amber-800/50 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-amber-700/60 text-sm pt-8 border-t border-amber-900/30">
            © {new Date().getFullYear()} Café Artesanal PRO. Todos os direitos reservados.
            <br />
            <span className="text-amber-800">
              Template Premium por{' '}
              <a href="/templates" className="hover:text-amber-600 font-semibold">
                Digital Templates PRO
              </a>
              {' '}— Esta é uma demonstração de template avançado
            </span>
          </div>
        </div>
      </footer>

      {/* Modal de Reserva */}
      <AnimatePresence>
        {showReservation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowReservation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-amber-950 to-amber-900 rounded-3xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowReservation(false)}
                className="absolute top-6 right-6 text-amber-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold mb-2 text-amber-100">Reserva VIP</h3>
              <p className="text-amber-300/90 mb-8">
                Garanta sua experiência premium em nosso espaço exclusivo
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 bg-amber-900/30 border border-amber-800/50 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-4 py-3 bg-amber-900/30 border border-amber-800/50 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                />
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-amber-900/30 border border-amber-800/50 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                />
                
                <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg font-bold hover:opacity-90 transition-opacity mt-6">
                  Confirmar Reserva VIP
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CafeTemplatePro2;