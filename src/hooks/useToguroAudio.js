import { useEffect, useRef } from "react";

export function useToguroAudio() {
  const bgRef = useRef(null);
  const frasesRef = useRef([]);
  const unlockedRef = useRef(false);

  useEffect(() => {
    // BG
    bgRef.current = new Audio("/audio/bg1.mp3");
    bgRef.current.loop = true;
    bgRef.current.volume = 0.25;

    // Frases
    frasesRef.current = [
      "/audio/frase1.mp3",
      "/audio/frase2.mp3",
    //  "/audio/frase3.mp3"
    ];
  }, []);

  const unlockAudio = () => {
    if (unlockedRef.current) return;

    bgRef.current
      .play()
      .then(() => {
        bgRef.current.pause(); // libera autoplay
        unlockedRef.current = true;
      })
      .catch(() => {});
  };

  const startBG = () => {
    if (!bgRef.current) return;
    if (!unlockedRef.current) return;

    if (bgRef.current.paused) {
      bgRef.current.play();
    }
  };

  const pauseBG = () => {
    if (!bgRef.current) return;
    bgRef.current.pause();
  };

  const pauseBGFor = (ms) => {
    pauseBG();
    setTimeout(() => {
      startBG();
    }, ms);
  };

  const playRandomFrase = () => {
    if (!unlockedRef.current) return;

    const src =
      frasesRef.current[
        Math.floor(Math.random() * frasesRef.current.length)
      ];

    const frase = new Audio(src);
    frase.volume = 1;
    frase.play();

    // baixa bg enquanto fala
    bgRef.current.volume = 0.08;
    frase.onended = () => {
      bgRef.current.volume = 0.25;
    };
  };

  const setVolume = (v) => {
    if (bgRef.current) {
      bgRef.current.volume = v;
    }
  };

  return {
    unlockAudio,
    startBG,
    pauseBG,
    pauseBGFor,
    playRandomFrase,
    setVolume
  };
}
