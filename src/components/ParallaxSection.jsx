import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionValue } from "framer-motion";

/* =====================================================
(1) IMPORTAÇÃO DAS IMAGENS
Aqui você importa cada layer normalmente.
Depois basta adicionar no array "backgroundLayers".
===================================================== */

import layer2 from "../assets/layers/2.webp";
import layer4 from "../assets/layers/4.webp";//nuvens
import layer5 from "../assets/layers/5.webp";//nuvens    
import layer6 from "../assets/layers/6.webp";
import layer8 from "../assets/layers/8.png";
import layer9 from "../assets/layers/9.webp";
import layer11 from "../assets/layers/11.png";//FOG
import layer12 from "../assets/layers/12.png";//titulo minas gerais
import layer13 from "../assets/layers/13.webp";
import layer14 from "../assets/layers/14.webp";
import layer15 from "../assets/layers/15.png";//fog
import layer17 from "../assets/layers/17.webp";
import layer18 from "../assets/layers/18.webp";
import layer20 from "../assets/layers/20.webp";
import layer22 from "../assets/layers/22.png";//fog
import layer23 from "../assets/layers/23.png";//fog

/* Arbustos (foreground - NÃO entram no parallax do fundo) */
import bushLeft from "../assets/layers/35.png";
import bushRight from "../assets/layers/36.png";

/* =====================================================
(2) CONFIGURAÇÃO DAS CAMADAS DE FUNDO
depth = quem fica atrás ou na frente
===================================================== */

const backgroundLayers = [
{ img: layer2, speed: 0.2 ,depth:1},
{ img: layer4, speed: 0.30,depth:2},
{ img: layer5, speed: 0.31 ,depth:3},
{ img: layer6, speed: 0.28 ,depth:4},
{ img: layer9, speed: 0.32 ,depth:5},
{ img: layer11, speed: 0.36 ,depth:6},
{ img: layer12, speed: 0.38 ,depth:7},
{ img: layer13, speed: 0.44 ,depth:8},
{ img: layer14, speed: 0.47 ,depth:9},
{ img: layer15, speed: 0.49 ,depth:10},
{ img: layer17, speed: 0.51 ,depth:11},
{ img: layer18, speed: 0.54 ,depth:12},
{ img: layer20, speed: 0.57 ,depth:13},
{ img: layer22, speed: 0.58 ,depth:14},
{ img: layer23, speed: 0.63 ,depth:15},
];

/* =====================================================
(3) COMPONENTE QUE CRIA UMA CAMADA PARALLAX
===================================================== */

function ParallaxBackgroundLayer({ img, speed, scrollYProgress, mouseX, mouseY }) {

  // Movimento vertical (scroll)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${speed * 400}%`]
  );

  // Escala simulando profundidade
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 + speed * 0.15]
  );

  // Movimento lateral pelo mouse
  const x = useTransform(mouseX, [-0.5, 0.5], [-speed * 80, speed * 80]);

  // Movimento vertical pelo mouse
  const mouseYOffset = useTransform(mouseY, [-0.5, 0.5], [-speed * 40, speed * 40]);

  return (
    <motion.img
      src={img}
      className="absolute w-full h-full object-cover"
      style={{
        y,
        x,
        scale,
        zIndex: Math.floor(speed * 100),

        /* (3.1) Soma scroll + mouse vertical */
        translateY: mouseYOffset
      }}
    />
  );
}

/* =====================================================
(4) COMPONENTE PRINCIPAL
===================================================== */

export default function ParallaxSection() {

  /* (4.2) Valores de movimento do mouse */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ref = useRef();

  /* (4.3) Captura posição do mouse */
  function handleMouseMove(e) {

    const { innerWidth, innerHeight } = window;

    // Normaliza entre -0.5 e 0.5
    mouseX.set(e.clientX / innerWidth - 0.2);
    mouseY.set(e.clientY / innerHeight - 0.2);
  }

  /* (4.1) Detecta progresso do scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  /* =====================================================
  (5) ANIMAÇÃO DOS ARBUSTOS
  ===================================================== */

  const bushLeftX = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["-10%", "-50%"]
  );

  const bushRightX = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["10%", "50%"]
  );

  return (

    /* (6.1) MouseMove aplicado aqui */
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[200vh]"
    >

      {/* =====================================================
         (6) CONTAINER STICKY
      ===================================================== */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* =====================================================
        (7) RENDER AUTOMÁTICO DAS CAMADAS
        ===================================================== */}
        {[...backgroundLayers]
          .sort((a, b) => a.depth - b.depth)
          .map((layer, index) => (
            <ParallaxBackgroundLayer
              key={index}
              img={layer.img}
              speed={layer.speed}
              scrollYProgress={scrollYProgress}

              /* (7.1) PASSANDO CONTROLE DO MOUSE */
              mouseX={mouseX}
              mouseY={mouseY}
            />
        ))}

        {/* =====================================================
        (8) ARBUSTO ESQUERDO
        ===================================================== */}
        <motion.img
          src={bushLeft}
          style={{ x: bushLeftX, zIndex: 500 ,width: "50%"}} //z indica a aproximidade das camads quanto maior mais perto na frente das outras em direção a tela
          className="absolute bottom-0 left-0 h-full object-contain"
        />

        {/* =====================================================
        (9) ARBUSTO DIREITO
        ===================================================== */}
        <motion.img
          src={bushRight}
          style={{ x: bushRightX, zIndex: 500 , width: "50%"}} //z indica a aproximidade das camads quanto maior mais perto na frente das outras em direção a tela
          className="absolute bottom-0 right-0 h-full object-contain"
        />

        {/* =====================================================
        (10) CONTEÚDO SOBREPOSTO
        ===================================================== */}
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <h1 className="text-6xl font-bold">Minas Gerais</h1>
        </div>

      </div>
    </section>
  );
}
