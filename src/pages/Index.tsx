import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundParticles from "@/components/BackgroundParticles";
import DotsCanvas from "@/components/DotsCanvas";
import HeartFormation from "@/components/HeartFormation";
import MusicPlayer from "@/components/MusicPlayer";
import Countdown from "@/components/Countdown";

const Index = () => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [showDotsCanvas, setShowDotsCanvas] = useState(false);
  const [showHeartFormation, setShowHeartFormation] = useState(false);
  const [key, setKey] = useState(0);

  // Set target date - change this to the actual birthday!
  // For demo, set to 5 seconds from now
  const targetDate = new Date("2025-12-25T10:55:00");

  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    setShowDotsCanvas(true);
  }, []);

  const handleAllClicked = useCallback(() => {
    setShowDotsCanvas(false);
    setShowHeartFormation(true);
  }, []);

  const handleRestart = useCallback(() => {
    setShowHeartFormation(false);
    setShowDotsCanvas(true);
    setKey((prev) => prev + 1);
  }, []);

  return (
    <main className="min-h-screen w-full overflow-hidden relative">
      {/* SEO */}
      <h1 className="sr-only">Happy Birthday Love - A Romantic Interactive Experience</h1>

      {/* Background particles/stars */}
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {/* Countdown */}
        {showCountdown && (
          <Countdown
            key="countdown"
            targetDate={targetDate}
            onComplete={handleCountdownComplete}
          />
        )}

        {/* Main interactive dots canvas */}
        {showDotsCanvas && (
          <DotsCanvas key={`dots-${key}`} onAllClicked={handleAllClicked} />
        )}

        {/* Heart formation with final message */}
        {showHeartFormation && (
          <HeartFormation key="heart" onRestart={handleRestart} />
        )}
      </AnimatePresence>

      {/* Music player */}
      <MusicPlayer />
    </main>
  );
};

export default Index;
