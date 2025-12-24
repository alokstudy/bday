import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with romantic ambient music
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2024/11/03/audio_56b8e41b00.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      className="fixed bottom-4 right-4 z-40 romantic-button flex items-center gap-2"
      onClick={toggleMusic}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {!isLoaded ? (
        <Music size={18} className="animate-pulse" />
      ) : isPlaying ? (
        <Volume2 size={18} />
      ) : (
        <VolumeX size={18} />
      )}
      <span className="text-sm hidden sm:inline">
        {isPlaying ? "Pause" : "Play"} Music
      </span>
    </motion.button>
  );
};

export default MusicPlayer;
