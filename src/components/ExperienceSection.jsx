import { motion } from "framer-motion";
import { Compass, ShieldCheck, Star, Plane } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Roteiros Personalizados",
    desc: "Cada viagem é planejada com base no perfil e desejos do viajante."
  },
  {
    icon: ShieldCheck,
    title: "Segurança Total",
    desc: "Parcerias globais garantem suporte e assistência durante toda a jornada."
  },
  {
    icon: Star,
    title: "Experiências Exclusivas",
    desc: "Acesso a locais e atividades que turistas comuns não conseguem."
  },
  {
    icon: Plane,
    title: "Logística Premium",
    desc: "Planejamento completo desde passagens até experiências locais."
  }
];

export default function ExperienceSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-blue-950 via-black to-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-[180px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-600 blur-[180px] bottom-[-200px] right-[-200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            Viajar é mais que destino
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Criamos jornadas que conectam pessoas, culturas e experiências inesquecíveis.
          </p>
        </motion.div>

        {/* Grid Diferenciais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 transition-all"
              >
                <Icon className="w-12 h-12 mb-6 text-cyan-400" />

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bloco CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-14 rounded-3xl bg-gradient-to-r from-cyan-700/40 to-purple-700/40 backdrop-blur-xl border border-white/10 text-center"
        >
          <h3 className="text-4xl font-bold mb-6">
            Pronto para sua próxima aventura?
          </h3>

          <p className="text-gray-300 mb-10 max-w-xl mx-auto">
            Nossos especialistas criam experiências únicas com planejamento completo.
          </p>

          <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl font-semibold hover:scale-105 transition-transform">
            Planejar Minha Viagem
          </button>
        </motion.div>

      </div>
    </section>
  );
}
