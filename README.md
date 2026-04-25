# Piano Player

A simple interactive piano desktop app. Click the on-screen keys (or use the
mapped keyboard keys) to play synthesized piano tones.

## Features

- 2-octave piano (C4 - F5) with 11 white keys and 7 black keys
- Click a key with the mouse to play it
- Keyboard shortcuts shown on each key (e.g. `A` = C4, `S` = D4, `W` = C#4)
- Tones synthesized at runtime - no external audio files required

## Requirements

- Python 3.9+
- `numpy`
- `pygame`
- Tkinter (bundled with most Python distributions; on Debian/Ubuntu install
  `python3-tk` if missing)

## Install

```bash
pip install -r requirements.txt
```

## Run

```bash
python piano.py
```

## Keyboard map

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
