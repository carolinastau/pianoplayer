# Piano Player

An interactive piano you play in the browser. Click the on-screen keys (or
use your keyboard) to play synthesized piano tones. Built with React + Vite,
sound generated with the Web Audio API - no audio files required.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

The first click/keypress unlocks audio (browsers require a user gesture
before playing sound).

## Production build

```bash
npm run build      # outputs static site to ./dist
npm run preview    # serves the built site for a quick check
```

The contents of `dist/` are static - you can drop them on GitHub Pages,
Netlify, Vercel, or any static host.

## Keyboard map

Lower octave (C4-B4): **A W S E D F T G Y H U J**
Upper octave (C5-F5): **K O L P ; '**

| Key | Note | | Key | Note |
|-----|------|-|-----|------|
| A   | C4   | | K   | C5   |
| W   | C#4  | | O   | C#5  |
| S   | D4   | | L   | D5   |
| E   | D#4  | | P   | D#5  |
| D   | E4   | | ;   | E5   |
| F   | F4   | | '   | F5   |
| T   | F#4  | |     |      |
| G   | G4   | |     |      |
| Y   | G#4  | |     |      |
| H   | A4   | |     |      |
| U   | A#4  | |     |      |
| J   | B4   | |     |      |
