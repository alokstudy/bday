import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const MessageModal = ({ isOpen, message, onClose }: MessageModalProps) => {
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
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md w-full gradient-modal rounded-2xl border border-primary/20 p-8 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="close-button absolute top-4 right-4"
                aria-label="Close message"
              >
                <X size={20} />
              </button>

              {/* Decorative hearts */}
              <div className="absolute -top-3 -left-3">
                <Heart className="w-6 h-6 text-primary fill-primary/30 animate-heartbeat" />
              </div>
              <div className="absolute -bottom-3 -right-3">
                <Heart className="w-5 h-5 text-primary fill-primary/30 animate-heartbeat" style={{ animationDelay: "0.5s" }} />
              </div>

              {/* Message content */}
              <div className="text-center py-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Heart className="w-8 h-8 text-primary mx-auto mb-4 fill-primary/50" />
                </motion.div>

                <motion.p
                  className="font-romantic text-xl md:text-2xl text-foreground leading-relaxed text-glow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {message}
                </motion.p>
              </div>

              {/* Glow effect */}
              <div 
                className="absolute inset-0 -z-10 rounded-2xl opacity-50"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
