import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Instagram, Facebook, Coffee as CoffeeIcon, Clock, Mail, Star, ChevronDown, X } from 'lucide-react';

// Componente da Xícara 3D
const CoffeeCup3D = () => {
  const cupRef = useRef();
  
  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      cupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={cupRef}>
      {/* Xícara */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1, 1.5, 32]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Café dentro */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.3, 32]} />
        <meshStandardMaterial 
          color="#4A2C2A" 
          roughness={0.8}
        />
      </mesh>
      
      {/* Asa da xícara */}
      <mesh position={[1.3, 0.5, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

// Componente de Grãos Flutuantes
const FloatingBeans = ({ count = 15 }) => {
  const beans = useRef([]);
  
  useFrame((state) => {
    beans.current.forEach((bean, i) => {
      if (bean) {
        bean.rotation.x = state.clock.elapsedTime * 0.5;
        bean.rotation.y = state.clock.elapsedTime * 0.3;
        bean.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={1}
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 5,
            (Math.random() - 0.5) * 10
          ]}
        >
          <mesh
            ref={(el) => (beans.current[i] = el)}
            scale={0.3}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#6F4E37" : "#8B4513"} 
              roughness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Componente de Fumaça
const SmokeEffect = () => {
  const smokeParticles = useRef([]);
  
  useFrame((state) => {
    smokeParticles.current.forEach((particle, i) => {
      if (particle) {
        particle.position.y += 0.01;
        particle.scale.x *= 1.001;
        particle.scale.y *= 1.001;
        particle.scale.z *= 1.001;
        
        // Resetar partícula quando sair da tela
        if (particle.position.y > 5) {
          particle.position.y = 0;
          particle.scale.x = 0.1;
          particle.scale.y = 0.1;
          particle.scale.z = 0.1;
        }
      }
    });
  });

  return (
    <group>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (smokeParticles.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 0.5,
            Math.random() * 2,
            (Math.random() - 0.5) * 0.5
          ]}
          scale={0.1}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Componente de Coffee Drip Animation (efeito de café caindo)
const CoffeeDripAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const dripHeight = Math.min(scrollY * 1000, 500);
  
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 w-1 z-10 pointer-events-none">
      <div 
        className="bg-gradient-to-b from-amber-900 via-amber-700 to-transparent w-full"
        style={{ height: `${dripHeight}px` }}
      />
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-600"
        style={{ bottom: `${dripHeight}px` }}
      />
    </div>
  );
};

// Componente de Interactive Card (card que flutua e mostra info)
const InteractiveCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-effect p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        isHovered ? 'scale-105 shadow-2xl shadow-amber-500/20' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-10 h-10 text-amber-400" />
          {isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 rounded-full bg-amber-500"
            />
          )}
        </div>
        
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-amber-300/80">{description}</p>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-amber-800/30"
            >
              <p className="text-sm text-amber-400">
                Clique para saber mais sobre esta característica única do nosso café.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Modal para informações detalhadas
const InfoModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-amber-950 to-amber-900 rounded-2xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-2xl font-bold mb-4 text-amber-100">{title}</h3>
        <div className="text-amber-300/90 space-y-3">
          {content}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg font-semibold hover:opacity-90"
        >
          Entendi
        </button>
      </motion.div>
    </motion.div>
  );
};

// Página principal atualizada
const CafeTemplatePro = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  const modalContent = {
    torra: (
      <>
        <p>Nossa torra é feita artesanalmente em pequenos lotes, garantindo uniformidade e sabor excepcional.</p>
        <p className="mt-2">Tempo de torra: 12-15 minutos</p>
        <p>Temperatura controlada: 200-220°C</p>
      </>
    ),
    graos: (
      <>
        <p>Utilizamos apenas grãos arábica de origem controlada, com notas de sabor que vão do chocolate ao frutado.</p>
        <p className="mt-2">Origens: Colômbia, Etiópia, Brasil</p>
        <p>Processo: Lavado e Natural</p>
      </>
    ),
    preparo: (
      <>
        <p>Preparamos cada xícara com atenção aos detalhes, usando métodos que realçam as características únicas de cada grão.</p>
        <p className="mt-2">Métodos: Espresso, Pour Over, French Press</p>
        <p>Tempo de extração controlado</p>
      </>
    ),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-950 via-black to-amber-950 text-amber-50 overflow-hidden">
      {/* Layer 1: Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
        
        {/* Floating coffee beans background */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              🫘
            </motion.div>
          ))}
        </div>
      </div>

      {/* Layer 2: Coffee Drip Animation */}
      <CoffeeDripAnimation />

      {/* Layer 3: 3D Canvas */}
      <div className="fixed top-1/4 right-10 w-96 h-96 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <CoffeeCup3D />
          <FloatingBeans count={8} />
          <SmokeEffect />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Layer 4: Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <CoffeeIcon className="w-10 h-10 text-amber-400" />
                <h1 className="text-3xl font-bold">Café Artesanal do João</h1>
              </motion.div>
              
              <div className="hidden md:flex gap-6">
                {['Sobre', 'Cardápio', 'Contato', 'Localização'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-32 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/30 to-amber-800/30 px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-amber-300" />
              <span className="text-amber-300">Torra Artesanal Desde 2010</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-6"
            >
              Cada Xícara, Uma{' '}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Experiência
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-amber-200 mb-10"
            >
              Do grão à xícara, paixão em cada detalhe
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-20"
            >
              <ChevronDown className="w-8 h-8 mx-auto text-amber-400 animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* Interactive Cards Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">
              O <span className="text-amber-400">Segredo</span> do Nosso Café
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div onClick={() => setActiveModal('torra')}>
                <InteractiveCard
                  icon={CoffeeIcon}
                  title="Torra Perfeita"
                  description="Controlada ponto a ponto para realçar o sabor"
                  delay={0.1}
                />
              </div>
              
              <div onClick={() => setActiveModal('graos')}>
                <InteractiveCard
                  icon={Star}
                  title="Grãos Selecionados"
                  description="Apenas os melhores grãos arábica do mundo"
                  delay={0.2}
                />
              </div>
              
              <div onClick={() => setActiveModal('preparo')}>
                <InteractiveCard
                  icon={Clock}
                  title="Preparo Artesanal"
                  description="Cada xícara preparada com tempo e cuidado"
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cardápio com efeito parallax */}
        <section id="menu" className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/30 to-transparent" />
          
          <div className="relative max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">
              <span className="text-amber-400">Cardápio</span> Exclusivo
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Café Especial', price: 'R$ 8,90', desc: 'Grãos selecionados da Colômbia', emoji: '☕', color: 'from-amber-900/40 to-amber-800/40' },
                { name: 'Cappuccino Artesanal', price: 'R$ 12,90', desc: 'Com chocolate belga ralado', emoji: '✨', color: 'from-amber-800/40 to-amber-700/40' },
                { name: 'Expresso Perfeito', price: 'R$ 6,90', desc: 'Intenso, encorpado e cremoso', emoji: '⚡', color: 'from-amber-700/40 to-amber-600/40' },
              ].map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-sm border border-amber-800/30 rounded-2xl p-8 text-center cursor-pointer`}
                >
                  <motion.div 
                    className="text-6xl mb-6"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {item.emoji}
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-3">{item.name}</h4>
                  <p className="text-amber-300/90 mb-4">{item.desc}</p>
                  <div className="text-3xl font-bold text-amber-400">{item.price}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-amber-950/80 backdrop-blur-sm py-12 px-4 border-t border-amber-800/30 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CoffeeIcon className="w-5 h-5" />
                  Café Artesanal do João
                </h4>
                <p className="text-amber-300/80">
                  Transformando grãos em experiências memoráveis desde 2010.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4">Contato</h4>
                <div className="space-y-2">
                  <p className="text-amber-300/80 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Rua das Flores, 123 - Centro, SP
                  </p>
                  <p className="text-amber-300/80 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    (11) 99999-9999
                  </p>
                  <p className="text-amber-300/80 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    contato@cafeartesanal.com
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4">Conecte-se</h4>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-amber-900/40 rounded-lg hover:bg-amber-800/60 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 bg-amber-900/40 rounded-lg hover:bg-amber-800/60 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-amber-600/70 text-sm pt-8 border-t border-amber-800/30">
              © {new Date().getFullYear()} Café Artesanal do João. Todos os direitos reservados.
              <br />
              <span className="text-amber-700">
                Template criado com ❤️ por{' '}
                <a href="/" className="hover:text-amber-500">Digital Templates Pro</a>
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <InfoModal
            isOpen={!!activeModal}
            onClose={() => setActiveModal(null)}
            title={
              activeModal === 'torra' ? 'Torra Perfeita' :
              activeModal === 'graos' ? 'Grãos Selecionados' :
              'Preparo Artesanal'
            }
            content={modalContent[activeModal]}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CafeTemplatePro;