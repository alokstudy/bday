import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Dot from "./Dot";
import MessageModal from "./MessageModal";
import FakeDotModal from "./FakeDotModal";
import { romanticMessages } from "@/data/messages";

// Text to render with dots
const TEXT_LINES = ["HAPPY", "BIRTHDAY", "LOVE"];

interface DotData {
  id: number;
  x: number;
  y: number;
  delay: number;
  messageIndex: number;
  isFake?: boolean;
}

interface DotsCanvasProps {
  onAllClicked: () => void;
}

// Generate dot positions for a character
const getCharDots = (
  char: string,
  offsetX: number,
  offsetY: number,
  dotSize: number,
  spacing: number
): { x: number; y: number }[] => {
  const dots: { x: number; y: number }[] = [];

  // Character patterns (5x7 grid for letters, custom for symbols)
  const patterns: Record<string, number[][]> = {
    H: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    A: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    P: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    Y: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    B: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
    ],
    I: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    R: [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 0, 1, 0],
    ],
    T: [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    D: [
      [1, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0],
      [1, 1, 1, 0, 0],
    ],
    L: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ],
    O: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
    V: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    E: [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ],
  };

  const pattern = patterns[char] || patterns.A;

  pattern.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 1) {
        dots.push({
          x: offsetX + colIndex * spacing,
          y: offsetY + rowIndex * spacing,
        });
      }
    });
  });

  return dots;
};

const DotsCanvas = ({ onAllClicked }: DotsCanvasProps) => {
  const [clickedDots, setClickedDots] = useState<Set<number>>(new Set());
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showFakeModal, setShowFakeModal] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate dots based on screen size
  const dots = useMemo((): DotData[] => {
    if (dimensions.width === 0) return [];

    const isMobile = dimensions.width < 768;
    const spacing = isMobile ? 10 : 16;
    const charWidth = 5 * spacing;
    const charSpacing = spacing * 1.5;
    const lineHeight = 6 * spacing;

    const allDots: DotData[] = [];
    let dotId = 0;

    // Calculate total dimensions for centering
    const maxLineWidth = Math.max(
      ...TEXT_LINES.map(
        (line) => line.length * charWidth + (line.length - 1) * charSpacing
      )
    );
    const totalHeight = TEXT_LINES.length * lineHeight;

    const startX = (dimensions.width - maxLineWidth) / 2;
    const startY = (dimensions.height - totalHeight) / 2;

    TEXT_LINES.forEach((line, lineIndex) => {
      const lineWidth =
        line.length * charWidth + (line.length - 1) * charSpacing;
      const lineStartX = startX + (maxLineWidth - lineWidth) / 2;

      [...line].forEach((char, charIndex) => {
        const charOffsetX = lineStartX + charIndex * (charWidth + charSpacing);
        const charOffsetY = startY + lineIndex * lineHeight;

        const charDots = getCharDots(
          char,
          charOffsetX,
          charOffsetY,
          isMobile ? 8 : 12,
          spacing
        );

        charDots.forEach((dot) => {
          allDots.push({
            id: dotId,
            x: dot.x,
            y: dot.y,
            delay: dotId * 0.02,
            messageIndex: dotId % romanticMessages.length,
            isFake: false,
          });
          dotId++;
        });
      });
    });

    // Add 2 fake dots at random positions around the text
    const fakePositions = [
      { x: startX - 50, y: startY + totalHeight / 2 },
      { x: startX + maxLineWidth + 50, y: startY + totalHeight / 2 },
    ];

    fakePositions.forEach((pos, i) => {
      allDots.push({
        id: dotId + i,
        x: pos.x + (Math.random() - 0.5) * 40,
        y: pos.y + (Math.random() - 0.5) * 80,
        delay: (dotId + i) * 0.02,
        messageIndex: 0,
        isFake: true,
      });
    });

    return allDots;
  }, [dimensions]);

  // Real dots only (for counting progress)
  const realDots = useMemo(() => dots.filter((d) => !d.isFake), [dots]);

  // Handle dot click
  const handleDotClick = useCallback(
    (dotId: number, messageIndex: number, isFake: boolean) => {
      if (isFake) {
        setShowFakeModal(true);
        return;
      }

      if (!clickedDots.has(dotId)) {
        const newClickedDots = new Set(clickedDots);
        newClickedDots.add(dotId);
        setClickedDots(newClickedDots);
        setSelectedMessage(romanticMessages[messageIndex]);

        // Check if all real dots are clicked
        if (newClickedDots.size === realDots.length) {
          setTimeout(() => {
            setSelectedMessage(null);
            onAllClicked();
          }, 2000);
        }
      }
    },
    [clickedDots, realDots.length, onAllClicked]
  );

  // Progress indicator
  const progress =
    realDots.length > 0 ? (clickedDots.size / realDots.length) * 100 : 0;

  return (
    <div className="fixed inset-0">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-primary z-30"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />

      {/* Progress text */}
      <motion.div
        className="fixed top-4 right-4 text-sm text-muted-foreground z-30 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {clickedDots.size} / {realDots.length} ✨
      </motion.div>

      {/* Dots */}
      {dots.map((dot) => (
        <Dot
          key={dot.id}
          x={dot.x}
          y={dot.y}
          delay={dot.delay}
          isClicked={clickedDots.has(dot.id)}
          onClick={() => handleDotClick(dot.id, dot.messageIndex, dot.isFake || false)}
        />
      ))}

      {/* Message Modal */}
      <MessageModal
        isOpen={selectedMessage !== null}
        message={selectedMessage || ""}
        onClose={() => setSelectedMessage(null)}
      />

      {/* Fake Dot Modal */}
      <FakeDotModal
        isOpen={showFakeModal}
        onClose={() => setShowFakeModal(false)}
      />
    </div>
  );
};

export default DotsCanvas;
