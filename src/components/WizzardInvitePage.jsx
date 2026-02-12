import { motion } from "framer-motion";
import { Sparkles, Rocket, Globe, ShieldCheck, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

export default function WizzardInvitePage() {

  /* SLIDER BACKGROUND */
  const images = [
    "/textures/programador1.png",
    "/textures/programador2.png",
    "/textures/programador3.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-white overflow-hidden">

      {/* BACKGROUND FIXO ESTÁVEL */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* TODAS AS IMAGENS MONTADAS */}
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.05
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-black/80 to-purple-950/80" />

        {/* Grid tecnológico */}
        <div
          className="absolute inset-0 opacity-10
          [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
          [background-size:40px_40px]"
        />
      </div>

      {/* CONTEÚDO SEMPRE NA FRENTE */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]"
          >
            WIZZARD STUDIO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-gray-300 text-lg"
          >
            Criação de Sites e Experiências Digitais Imersivas.
            Seu negócio merece mais que um site. Ele merece presença digital.
          </motion.p>

          <motion.a
            href="#planos"
            whileHover={{ scale: 1.05 }}
            className="mt-10 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-900/40 hover:shadow-blue-900/40 transition-all"
          >
            Quero Criar Meu Site 🚀
          </motion.a>

        </section>

        {/* APRESENTAÇÃO */}
        <section className="py-24 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">
            Mais que um Site. Uma Experiência.
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Na Wizzard Studio você não recebe apenas páginas digitais.
            Você recebe uma experiência visual imersiva com design tecnológico,
            storytelling interativo e templates pensados para converter visitantes
            em clientes.
          </p>
        </section>

        {/* BENEFÍCIOS */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
          <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">

            <Feature icon={Rocket} title="Design que Vende">
              Templates criados para conversão real.
            </Feature>

            <Feature icon={Globe} title="Presença Digital Forte">
              Seu cartão de visita online profissional.
            </Feature>

            <Feature icon={ShieldCheck} title="Segurança & SEO">
              SSL e otimização para Google inclusos.
            </Feature>

            <Feature icon={Sparkles} title="Experiência 3D">
              Layouts modernos e imersivos.
            </Feature>

          </div>
        </section>

        {/* PLANOS */}
        <section id="planos" className="py-28 px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">Escolha Seu Plano</h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            <PlanCard
              title="LAND PAGE 190"
              price="R$ 190,00"
              variant="green"
              features={[
                "Template pronto",
                "Design moderno",
                "Ideal para serviços e eventos"
              ]}
            />

            <PlanCard
              title="LAND PAGE 290"
              price="R$ 290,00"
              variant="blue"
              features={[
                "Template 100% personalizado",
                "Exclusivo para sua marca",
                "Layout profissional único"
              ]}
            />

          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 text-center bg-gradient-to-t from-purple-950/40 to-black">
          <h2 className="text-4xl font-bold mb-8">
            Pronto para transformar sua marca?
          </h2>

          <a
            href="https://wa.me/5531995705028"
            className="inline-flex items-center gap-2 bg-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-500 transition"
          >
            <PhoneCall size={20} />
            Falar no WhatsApp
          </a>

          <p className="mt-4 text-gray-400">
            📞 (31) 9 9570-5028
          </p>
        </section>

      </div>
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function Feature({ icon: Icon, title, children }) {
  return (
    <div className="text-center">
      <Icon className="mx-auto mb-4 text-purple-400" size={40} />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{children}</p>
    </div>
  );
}

function PlanCard({ title, price, features, variant }) {

  const styles = {
    green: "border-green-700 bg-green-900/10",
    blue: "border-blue-700 bg-blue-900/10"
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-8 rounded-2xl border ${styles[variant]} backdrop-blur-md`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-4xl font-bold my-6">{price}</p>

      <ul className="space-y-2 text-gray-300">
        {features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>
    </motion.div>
  );
}
