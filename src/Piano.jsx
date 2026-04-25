import { useCallback, useEffect, useRef, useState } from "react";
import { NOTES } from "./notes.js";
import { playNote } from "./audio.js";
import "./Piano.css";

export default function Piano() {
  const [active, setActive] = useState(() => new Set());
  const activeRef = useRef(active);
  activeRef.current = active;

  const press = useCallback((note) => {
    playNote(note.freq);
    setActive((prev) => {
      const next = new Set(prev);
      next.add(note.name);
      return next;
    });
    window.setTimeout(() => {
      setActive((prev) => {
        if (!prev.has(note.name)) return prev;
        const next = new Set(prev);
        next.delete(note.name);
        return next;
      });
    }, 160);
  }, []);

  useEffect(() => {
    const byCode = new Map(NOTES.map((n) => [n.code, n]));
    const onKeyDown = (e) => {
      if (e.repeat) return;
      const note = byCode.get(e.code);
      if (note) {
        e.preventDefault();
        press(note);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [press]);

  const whiteNotes = NOTES.filter((n) => !n.isBlack);
  const whiteIndexByName = new Map(whiteNotes.map((n, i) => [n.name, i]));

  // For black keys, work out which pair of white keys they sit between so we
  // can position them with `left: <whiteIndex + 1> * whiteWidth - blackWidth/2`.
  const blackKeys = NOTES.filter((n) => n.isBlack).map((n) => {
    const idx = NOTES.indexOf(n);
    const prevWhite = NOTES.slice(0, idx).reverse().find((x) => !x.isBlack);
    return { ...n, leftWhiteIndex: whiteIndexByName.get(prevWhite.name) };
  });

  return (
    <div className="piano-wrapper">
      <header className="piano-header">
        <h1>Piano Player</h1>
        <p>Click a key or use your keyboard to play.</p>
      </header>

      <div
        className="piano"
        style={{ "--white-count": whiteNotes.length }}
      >
        {whiteNotes.map((n) => (
          <button
            key={n.name}
            type="button"
            className={`key white ${active.has(n.name) ? "pressed" : ""}`}
            onMouseDown={() => press(n)}
            onTouchStart={(e) => {
              e.preventDefault();
              press(n);
            }}
          >
            <span className="label">
              <span className="note">{n.name}</span>
              <span className="shortcut">{n.key.toUpperCase()}</span>
            </span>
          </button>
        ))}

        {blackKeys.map((n) => (
          <button
            key={n.name}
            type="button"
            className={`key black ${active.has(n.name) ? "pressed" : ""}`}
            style={{ "--left-white-index": n.leftWhiteIndex }}
            onMouseDown={(e) => {
              e.stopPropagation();
              press(n);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              press(n);
            }}
          >
            <span className="shortcut">{n.key.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
