"""Interactive piano player desktop app.

Renders a 2-octave piano with Tkinter. Clicking a key (or pressing the mapped
keyboard key) plays a synthesized piano-like tone. No audio files needed -
sounds are generated at startup with numpy and played through pygame's mixer.
"""

import tkinter as tk

import numpy as np
import pygame


SAMPLE_RATE = 44100


def generate_piano_tone(frequency, duration=1.6):
    """Generate a piano-like tone using additive synthesis with an envelope."""
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    wave = (
        1.000 * np.sin(2 * np.pi * frequency * t)
        + 0.500 * np.sin(2 * np.pi * 2 * frequency * t)
        + 0.250 * np.sin(2 * np.pi * 3 * frequency * t)
        + 0.125 * np.sin(2 * np.pi * 4 * frequency * t)
    )
    attack = int(0.005 * SAMPLE_RATE)
    envelope = np.ones_like(wave)
    envelope[:attack] = np.linspace(0, 1, attack)
    decay = np.exp(-2.5 * t)
    envelope = envelope * decay
    wave = wave * envelope
    wave = wave / np.max(np.abs(wave)) * 0.6
    audio = (wave * 32767).astype(np.int16)
    return pygame.sndarray.make_sound(audio)


# (note name, frequency Hz, is_black_key, keyboard shortcut)
NOTES = [
    ("C4",  261.63, False, "a"),
    ("C#4", 277.18, True,  "w"),
    ("D4",  293.66, False, "s"),
    ("D#4", 311.13, True,  "e"),
    ("E4",  329.63, False, "d"),
    ("F4",  349.23, False, "f"),
    ("F#4", 369.99, True,  "t"),
    ("G4",  392.00, False, "g"),
    ("G#4", 415.30, True,  "y"),
    ("A4",  440.00, False, "h"),
    ("A#4", 466.16, True,  "u"),
    ("B4",  493.88, False, "j"),
    ("C5",  523.25, False, "k"),
    ("C#5", 554.37, True,  "o"),
    ("D5",  587.33, False, "l"),
    ("D#5", 622.25, True,  "p"),
    ("E5",  659.25, False, ";"),
    ("F5",  698.46, False, "'"),
]


class PianoApp:
    WHITE_KEY_W = 64
    WHITE_KEY_H = 260
    BLACK_KEY_W = 40
    BLACK_KEY_H = 165

    WHITE_FILL = "#fafafa"
    WHITE_PRESS = "#7ec8ff"
    BLACK_FILL = "#1a1a1a"
    BLACK_PRESS = "#3d6e9e"
    BG = "#202024"

    def __init__(self, root):
        self.root = root
        self.root.title("Piano Player")
        self.root.configure(bg=self.BG)
        self.root.resizable(False, False)

        self.sounds = {name: generate_piano_tone(freq) for name, freq, _, _ in NOTES}

        white_count = sum(1 for _, _, is_black, _ in NOTES if not is_black)
        canvas_w = white_count * self.WHITE_KEY_W + 2
        canvas_h = self.WHITE_KEY_H + 2

        tk.Label(
            root, text="Piano Player",
            font=("Helvetica", 22, "bold"), bg=self.BG, fg="white",
        ).pack(pady=(18, 4))

        tk.Label(
            root, text="Click a key or use your keyboard to play",
            font=("Helvetica", 11), bg=self.BG, fg="#bbbbbb",
        ).pack(pady=(0, 12))

        self.canvas = tk.Canvas(
            root, width=canvas_w, height=canvas_h,
            bg=self.BG, highlightthickness=0,
        )
        self.canvas.pack(padx=20, pady=(0, 20))

        self.key_rect = {}        # note name -> canvas rectangle id
        self.key_default = {}     # note name -> default fill color
        self.shortcut_to_note = {}

        white_x = {}
        x = 1
        for i, (name, _, is_black, _) in enumerate(NOTES):
            if not is_black:
                white_x[i] = x
                x += self.WHITE_KEY_W

        for i, (name, _, is_black, shortcut) in enumerate(NOTES):
            if is_black:
                continue
            x0 = white_x[i]
            rect = self.canvas.create_rectangle(
                x0, 1, x0 + self.WHITE_KEY_W, 1 + self.WHITE_KEY_H,
                fill=self.WHITE_FILL, outline="#111111", width=1,
            )
            self.canvas.create_text(
                x0 + self.WHITE_KEY_W / 2, self.WHITE_KEY_H - 32,
                text=name, fill="#777777", font=("Helvetica", 9, "bold"),
            )
            self.canvas.create_text(
                x0 + self.WHITE_KEY_W / 2, self.WHITE_KEY_H - 14,
                text=shortcut.upper(), fill="#aaaaaa", font=("Helvetica", 9),
            )
            self.canvas.tag_bind(rect, "<Button-1>", lambda _e, n=name: self.play_note(n))
            self.key_rect[name] = rect
            self.key_default[name] = self.WHITE_FILL
            self.shortcut_to_note[shortcut] = name

        for i, (name, _, is_black, shortcut) in enumerate(NOTES):
            if not is_black:
                continue
            prev_white_x = white_x[i - 1]
            x0 = prev_white_x + self.WHITE_KEY_W - self.BLACK_KEY_W / 2
            rect = self.canvas.create_rectangle(
                x0, 1, x0 + self.BLACK_KEY_W, 1 + self.BLACK_KEY_H,
                fill=self.BLACK_FILL, outline="#000000", width=1,
            )
            self.canvas.create_text(
                x0 + self.BLACK_KEY_W / 2, self.BLACK_KEY_H - 14,
                text=shortcut.upper(), fill="#dddddd", font=("Helvetica", 9, "bold"),
            )
            self.canvas.tag_bind(rect, "<Button-1>", lambda _e, n=name: self.play_note(n))
            self.key_rect[name] = rect
            self.key_default[name] = self.BLACK_FILL
            self.shortcut_to_note[shortcut] = name

        root.bind("<KeyPress>", self.on_key_press)
        root.focus_set()

    def play_note(self, name):
        self.sounds[name].stop()
        self.sounds[name].play()
        self.flash_key(name)

    def flash_key(self, name):
        rect = self.key_rect[name]
        default = self.key_default[name]
        press_color = self.WHITE_PRESS if default == self.WHITE_FILL else self.BLACK_PRESS
        self.canvas.itemconfig(rect, fill=press_color)
        self.root.after(140, lambda: self.canvas.itemconfig(rect, fill=default))

    def on_key_press(self, event):
        key = event.char.lower()
        if key in self.shortcut_to_note:
            self.play_note(self.shortcut_to_note[key])


def main():
    pygame.mixer.pre_init(frequency=SAMPLE_RATE, size=-16, channels=1, buffer=512)
    pygame.mixer.init()
    pygame.mixer.set_num_channels(32)

    root = tk.Tk()
    PianoApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
