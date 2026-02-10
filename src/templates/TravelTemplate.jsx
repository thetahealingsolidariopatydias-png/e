import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Phone, MapPin, Globe, Plane, Mountain, Waves, Wind, Building2, 
  ChevronRight, Calendar, Users, Award, Compass, Sun, Moon, 
  Cloud, Map, Ticket, Shield, Clock, Heart 
} from 'lucide-react';
import ParallaxSection from "../components/ParallaxSection";
import ExperienceSection from "../components/ExperienceSection";
import JourneyExperienceSection from "../components/JourneyExperienceSection";
// URLs de imagens Unsplash para parallax
const IMAGES = {
  mountainBg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80',
  mountainMid: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
  mountainClose: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80',
  foliage: 'https://images.unsplash.com/photo-1518834103328-4dbb0d8400de?auto=format&fit=crop&w=2000&q=30',
  clouds: 'https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?auto=format&fit=crop&w=2000&q=60',
  beachBg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
  beachWater: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
  desertBg: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80',
  desertMid: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?auto=format&fit=crop&w=2000&q=80',
  citySkyline: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2000&q=80',
  cityBuildings: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80'
};

// Componente Parallax Layer simples
const ParallaxLayer = ({ image, speed = 0, offset = 0, scale = 1, opacity = 1, blur = 0, children, className = "" }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100]);
  const scaleAnim = useTransform(scrollYProgress, [0, 1], [scale, scale * 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        scale: scaleAnim,
        opacity,
        filter: blur ? `blur(${blur}px)` : 'none'
      }}
      className={`absolute inset-0 ${className}`}
    >
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundAttachment: 'fixed'
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

// Componente Floating Elements simples


 


// Componente Fog Effect simples
const FogEffect = ({ intensity = 0.3 }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [intensity, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-white/10 to-white/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
    </motion.div>
  );
};

// Componente Wave Effect (simples)
const WaveEffect = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      <svg 
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className="fill-blue-500/20"
        />
        <path 
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          className="fill-blue-400/15"
        />
      </svg>
    </div>
  );
};

// Componente principal simplificado
const TravelTemplate = () => {
  const containerRef = useRef();
  const [activeSection, setActiveSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveSection(0);
      else if (latest < 0.5) setActiveSection(1);
      else if (latest < 0.75) setActiveSection(2);
      else setActiveSection(3);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Destinos (mantido original)
  const destinations = [
    {
      title: "Alpes Suíços",
      description: "Picos nevados, ar puro e aventuras alpinas inesquecíveis.",
      price: "R$ 8.900",
      duration: "7 dias",
      season: "Inverno",
      icon: Mountain,
      color: "from-blue-900/40 to-emerald-900/40",
      features: ["Esqui Premium", "Cabanas Alpinas", "Trilhas Panorâmicas", "Teleféricos"]
    },
    {
      title: "Maldivas",
      description: "Ilhas paradisíacas com resorts luxuosos sobre águas cristalinas.",
      price: "R$ 12.500",
      duration: "10 dias",
      season: "Ano Todo",
      icon: Waves,
      color: "from-cyan-900/40 to-blue-900/40",
      features: ["Bangalôs Overwater", "Mergulho Profundo", "Spa na Praia", "Pôr do Sol Privativo"]
    },
    {
      title: "Deserto do Saara",
      description: "Dunas douradas e noites estreladas sob um céu infinito.",
      price: "R$ 6.800",
      duration: "5 dias",
      season: "Outono/Primavera",
      icon: Sun,
      color: "from-amber-900/40 to-orange-900/40",
      features: ["Acampamento Beduíno", "Passeio de Camelo", "Observação de Estrelas", "Cerimônia do Chá"]
    },
    {
      title: "Nova York",
      description: "A energia pulsante da cidade que nunca dorme.",
      price: "R$ 10.200",
      duration: "8 dias",
      season: "Primavera/Outono",
      icon: Building2,
      color: "from-gray-900/40 to-purple-900/40",
      features: ["Broadway Shows", "Topo do Empire State", "Compras 5ª Avenida", "Central Park"]
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
      {/* Loading Screen simples 
       <AnimatePresence>
         {!isLoaded && (
           <motion.div
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-black flex items-center justify-center"
           >
             <div className="text-center">
               <div className="text-4xl mb-4">🌍</div>
               <div className="text-lg text-gray-400">Carregando aventuras...</div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
       */}

      

      {/* SEÇÃO 1: MONTANHAS */}
      <>
     {/*  <div className="h-screen bg-black" /> */}

      <ParallaxSection />
      <JourneyExperienceSection />
        <ExperienceSection />
        
      <div className="h-screen bg-blue-900" />
      </>
      {/* SEÇÃO 2: PRAIA */}
        
      {/* SEÇÃO 3: CIDADE */}
     

    
      {/* SEÇÃO DE DESTINOS (MANTIDO ORIGINAL) */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Destinos dos Sonhos
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Pacotes exclusivos criados por especialistas que conhecem cada segredo dos destinos
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {destinations.map((dest, idx) => {
              const Icon = dest.icon;
              return (
                <motion.div
                  key={dest.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -20, transition: { duration: 0.3 } }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800/50 group-hover:border-gray-700/80 transition-colors">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <Icon className="w-12 h-12 text-white" />
                        <span className="text-sm bg-white/10 px-4 py-1.5 rounded-full">
                          {dest.season}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{dest.title}</h3>
                      <p className="text-gray-400 mb-6">{dest.description}</p>
                      
                      <div className="space-y-3 mb-8">
                        {dest.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="text-3xl font-bold">{dest.price}</div>
                          <div className="text-sm text-gray-500">por pessoa</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{dest.duration}</div>
                          <div className="text-sm text-gray-500">duração</div>
                        </div>
                      </div>
                      
                      <button className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        <Ticket className="w-5 h-5" />
                        Solicitar Cotação
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "15K+", label: "Clientes Satisfeitos", icon: Users },
              { value: "18", label: "Anos de Experiência", icon: Award },
              { value: "97%", label: "Taxa de Recomendação", icon: Heart },
              { value: "24/7", label: "Suporte Personalizado", icon: Clock }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-gray-900/50 rounded-2xl"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (MANTIDO ORIGINAL) */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-900">
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
                Criamos experiências de viagem que transformam não apenas destinos, mas pessoas.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Destinos
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">América do Sul</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Europa</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ásia</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Oceania</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seguro Viagem</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Assistência 24h</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Certificações</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Políticas</a></li>
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
          
          <div className="pt-8 border-t border-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Horizonte Viajante. Todos os direitos reservados.
              </div>
              <div className="text-gray-600 text-sm">
                Template Premium por{' '}
                <a href="/templates" className="text-cyan-400 hover:text-cyan-300">
                  Digital Templates PRO
                </a>
                {' '}— Demonstração avançada
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelTemplate;