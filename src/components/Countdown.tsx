import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsComplete(true);
        // Fire confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ["#ff69b4", "#ff1493", "#db7093", "#ffb6c1", "#ffc0cb"];

        (function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();

        // Fire center burst
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          colors: colors,
        });

        setTimeout(() => {
          onComplete();
        }, 3000);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
        style={{
          boxShadow: "0 0 30px hsl(340 80% 50% / 0.3)",
        }}
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="font-romantic text-3xl md:text-5xl text-foreground"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="mt-2 text-sm md:text-base text-muted-foreground font-body">
        {label}
      </span>
    </div>
  );

  if (isComplete) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h1
          className="font-romantic text-5xl md:text-7xl text-foreground text-glow"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Happy Birthday! 🎂
        </motion.h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="font-romantic text-2xl md:text-4xl text-primary mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Countdown to Your Special Day 💖
      </motion.h2>

      <div className="flex gap-3 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <motion.p
        className="mt-8 text-muted-foreground font-body text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Something magical is coming... ✨
      </motion.p>
    </motion.div>
  );
};

export default Countdown;
