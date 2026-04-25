let ctx = null;

function getContext() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function playNote(frequency, duration = 1.6) {
  const audio = getContext();
  const now = audio.currentTime;

  const master = audio.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.55, now + 0.005);
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  master.connect(audio.destination);

  // Additive synthesis: fundamental + 3 harmonics, same recipe as before.
  const partials = [
    { mult: 1, gain: 1.0 },
    { mult: 2, gain: 0.5 },
    { mult: 3, gain: 0.25 },
    { mult: 4, gain: 0.125 },
  ];

  for (const { mult, gain } of partials) {
    const osc = audio.createOscillator();
    osc.type = "sine";
    osc.frequency.value = frequency * mult;
    const partialGain = audio.createGain();
    partialGain.gain.value = gain;
    osc.connect(partialGain).connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }
}
