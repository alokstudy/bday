import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { finalMessage } from "@/data/messages";

interface HeartFormationProps {
  onRestart: () => void;
}

const HeartFormation = ({ onRestart }: HeartFormationProps) => {
  // Generate heart shape positions
  const heartPoints = [];
  for (let t = 0; t < Math.PI * 2; t += 0.15) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    heartPoints.push({ x: x * 8, y: y * 8 });
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-start p-4 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-romantic" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(340 80% 20% / 0.3) 0%, transparent 60%)",
        }}
      />

      {/* Floating hearts background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
            rotate: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Heart
            className="text-primary fill-primary/30"
            size={Math.random() * 20 + 10}
          />
        </motion.div>
      ))}

      {/* Heart formation at top */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.5,
        }}
      >
        <div className="relative w-64 h-56 md:w-80 md:h-72">
          {heartPoints.map((point, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"
              style={{
                left: `calc(50% + ${point.x}px)`,
                top: `calc(50% + ${point.y}px)`,
                boxShadow: "0 0 15px hsl(340 80% 65% / 0.8)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.8 + i * 0.02,
                type: "spring",
                stiffness: 300,
              }}
            />
          ))}
          {/* Center heart icon */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-16 h-16 md:w-20 md:h-20 text-primary fill-primary"
                style={{
                  filter: "drop-shadow(0 0 25px hsl(340 80% 65% / 0.8))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Final message below */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        {/* Title */}
        <motion.h2
          className="font-romantic text-xl md:text-3xl text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          {finalMessage.title}
        </motion.h2>

        {/* Main message */}
        <motion.h1
          className="font-romantic text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 text-glow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 3,
            type: "spring",
            stiffness: 100,
          }}
        >
          {finalMessage.message}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-romantic text-lg md:text-2xl text-primary italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
        >
          {finalMessage.subtitle}
        </motion.p>

        {/* Restart button */}
        <motion.button
          className="romantic-button mt-8"
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience Again ✨
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeartFormation;
