import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToguroRandomGif() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const loop = () => {
      const delay = Math.random() * 15000 + 10000; // 10–25s
      setTimeout(() => {
        setShow(true);
        setTimeout(() => setShow(false), 1500);
        loop();
      }, delay);
    };
    loop();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.img
          src="../../public/textures/toguro.webp"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 w-80 z-[9999] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
