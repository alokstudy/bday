import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { finalMessage } from "@/data/messages";

interface FinalMessageProps {
  onRestart: () => void;
}

const FinalMessage = ({ onRestart }: FinalMessageProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 gradient-romantic" />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(340 80% 20% / 0.3) 0%, transparent 60%)",
        }}
      />

      {/* Floating hearts background */}
      {[...Array(20)].map((_, i) => (
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

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Large animated heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.5, 
            type: "spring", 
            stiffness: 200,
            damping: 15 
          }}
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
              className="w-24 h-24 md:w-32 md:h-32 text-primary fill-primary mx-auto mb-8"
              style={{
                filter: "drop-shadow(0 0 30px hsl(340 80% 65% / 0.8))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-romantic text-2xl md:text-4xl text-muted-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {finalMessage.title}
        </motion.h2>

        {/* Main message */}
        <motion.h1
          className="font-romantic text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 text-glow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 1.5, 
            type: "spring",
            stiffness: 100,
          }}
        >
          {finalMessage.message}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-romantic text-xl md:text-3xl text-primary italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          {finalMessage.subtitle}
        </motion.p>

        {/* Restart button */}
        <motion.button
          className="romantic-button mt-12"
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience Again ✨
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FinalMessage;
