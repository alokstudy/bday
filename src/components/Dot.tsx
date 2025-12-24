import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DotProps {
  x: number;
  y: number;
  delay: number;
  isClicked: boolean;
  onClick: () => void;
}

const Dot = ({ x, y, delay, isClicked, onClick }: DotProps) => {
  const [showBurst, setShowBurst] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setShowBurst(true);
      onClick();
      setTimeout(() => setShowBurst(false), 500);
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: delay,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
    >
      {/* Main dot */}
      <motion.button
        className={`
          relative w-3 h-3 md:w-4 md:h-4 rounded-full
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
          ${isClicked 
            ? "bg-accent/60 shadow-[0_0_15px_hsl(30_70%_60%/0.6)]" 
            : "bg-primary dot-glow hover:dot-glow-hover hover:scale-150"
          }
        `}
        onClick={handleClick}
        whileHover={!isClicked ? { scale: 1.5 } : undefined}
        whileTap={!isClicked ? { scale: 0.9 } : undefined}
        animate={!isClicked ? {
          y: [0, -5, 0],
        } : undefined}
        transition={{
          y: {
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        aria-label="Click to reveal message"
      />

      {/* Burst effect on click */}
      <AnimatePresence>
        {showBurst && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{ 
                  x: "-50%", 
                  y: "-50%", 
                  scale: 1, 
                  opacity: 1 
                }}
                animate={{
                  x: `calc(-50% + ${Math.cos((i * 60 * Math.PI) / 180) * 30}px)`,
                  y: `calc(-50% + ${Math.sin((i * 60 * Math.PI) / 180) * 30}px)`,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dot;
