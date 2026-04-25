import { useState } from "react";
import Piano from "./Piano.jsx";
import WindowView from "./WindowView.jsx";
import "./Scene.css";

const MODES = [
  { id: "day", label: "Dia" },
  { id: "sunset", label: "Tarde" },
  { id: "night", label: "Noite" },
];

export default function App() {
  const [mode, setMode] = useState("day");

  return (
    <div className={`scene scene--${mode}`}>
      <div className="ambient" />

      <div className="wall">
        <div className="window">
          <div className="window-frame">
            <WindowView />
            <div className="mullion mullion--v" />
            <div className="mullion mullion--h" />
            <div className="window-light" />
          </div>
          <div className="window-sill">
            <div className="plant plant--left">
              <div className="pot" />
              <div className="leaves" />
            </div>
            <div className="plant plant--right">
              <div className="pot" />
              <div className="leaves" />
            </div>
          </div>
        </div>
      </div>

      <div className="floor" />

      <div className="piano-stage">
        <Piano />
      </div>

      <div className="mode-switcher" role="radiogroup" aria-label="Hora do dia">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            className={`mode-btn ${mode === m.id ? "active" : ""}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
