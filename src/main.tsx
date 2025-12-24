import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Easter egg for dev console 💖
console.log(
  "%cloveee uu babeee ❤️",
  "color: #ff69b4; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #ff69b4;"
);

createRoot(document.getElementById("root")!).render(<App />);
