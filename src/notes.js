// 2 octaves: C4 to F5
// `code` is the physical-key identifier (event.code) so shortcuts work the
// same on any keyboard layout (US, ABNT2, etc). `key` is just the visual
// label rendered on the on-screen key.
export const NOTES = [
  { name: "C4",  freq: 261.63, isBlack: false, key: "a", code: "KeyA" },
  { name: "C#4", freq: 277.18, isBlack: true,  key: "w", code: "KeyW" },
  { name: "D4",  freq: 293.66, isBlack: false, key: "s", code: "KeyS" },
  { name: "D#4", freq: 311.13, isBlack: true,  key: "e", code: "KeyE" },
  { name: "E4",  freq: 329.63, isBlack: false, key: "d", code: "KeyD" },
  { name: "F4",  freq: 349.23, isBlack: false, key: "f", code: "KeyF" },
  { name: "F#4", freq: 369.99, isBlack: true,  key: "t", code: "KeyT" },
  { name: "G4",  freq: 392.00, isBlack: false, key: "g", code: "KeyG" },
  { name: "G#4", freq: 415.30, isBlack: true,  key: "y", code: "KeyY" },
  { name: "A4",  freq: 440.00, isBlack: false, key: "h", code: "KeyH" },
  { name: "A#4", freq: 466.16, isBlack: true,  key: "u", code: "KeyU" },
  { name: "B4",  freq: 493.88, isBlack: false, key: "j", code: "KeyJ" },
  { name: "C5",  freq: 523.25, isBlack: false, key: "k", code: "KeyK" },
  { name: "C#5", freq: 554.37, isBlack: true,  key: "o", code: "KeyO" },
  { name: "D5",  freq: 587.33, isBlack: false, key: "l", code: "KeyL" },
  { name: "D#5", freq: 622.25, isBlack: true,  key: "p", code: "KeyP" },
  { name: "E5",  freq: 659.25, isBlack: false, key: ";", code: "Semicolon" },
  { name: "F5",  freq: 698.46, isBlack: false, key: "'", code: "Quote" },
];
