import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FakeDotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FakeDotModal = ({ isOpen, onClose }: FakeDotModalProps) => {
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSecondMessage(false);
      const timer = setTimeout(() => {
        setShowSecondMessage(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showSecondMessage) {
      const closeTimer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(closeTimer);
    }
  }, [showSecondMessage, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
            initial={{ scale: 0.5, opacity: 0, y: "-40%" }}
            animate={{ scale: 1, opacity: 1, y: "-50%" }}
            exit={{ scale: 0.5, opacity: 0, y: "-40%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className="relative bg-card/95 backdrop-blur-md rounded-2xl p-8 border border-primary/30"
              style={{
                boxShadow: "0 0 50px hsl(340 80% 50% / 0.3)",
              }}
            >
              <AnimatePresence mode="wait">
                {!showSecondMessage ? (
                  <motion.div
                    key="first"
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <span className="text-5xl mb-4 block">😅</span>
                    <h3 className="font-romantic text-2xl md:text-3xl text-foreground">
                      Oops!
                    </h3>
                    <p className="font-body text-muted-foreground mt-2">
                      Wrong dot...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="second"
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-5xl mb-4 block">❤️</span>
                    <h3 className="font-romantic text-2xl md:text-3xl text-foreground">
                      Just kidding
                    </h3>
                    <p className="font-body text-primary mt-2">
                      I just wanted your attention ❤️
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FakeDotModal;
