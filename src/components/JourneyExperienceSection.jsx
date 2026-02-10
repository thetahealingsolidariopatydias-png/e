import { useEffect, useRef } from "react";

export default function JourneyExperienceSection() {

  const sectionRef = useRef();

  useEffect(() => {

    const cards = sectionRef.current.querySelectorAll(".reveal-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();

  }, []);

  return (

    <section
      ref={sectionRef}
      className="experience-section"
    >

      {/* AVIÃO */}
      <div className="plane"></div>

      {/* FUNDO POV CIDADE */}
      <div className="city-bg"></div>

      {/* TEXTO DE FUNDO */}
      <h1 className="background-text">
        EXPLORE O MUNDO
      </h1>

      {/* CARD 1 */}
      <div className="reveal-card left">
        <h2>Descubra lugares únicos</h2>
        <p>
          Experiências criadas para quem quer viajar além do comum.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="reveal-card right">
        <h2>Hospedagens inesquecíveis</h2>
        <p>
          Encontre destinos que contam histórias.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="reveal-card left">
        <h2>Aventura personalizada</h2>
        <p>
          Viagens moldadas para cada estilo de explorador.
        </p>
      </div>

    </section>
  );
}
