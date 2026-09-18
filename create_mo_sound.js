const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const duration = 0.35;
const numSamples = Math.floor(sampleRate * duration);
const buffer = Buffer.alloc(44 + numSamples * 2);

// WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // PCM chunk size
buffer.writeUInt16LE(1, 20);  // Audio format 1 = PCM
buffer.writeUInt16LE(1, 22);  // Channels = 1 (Mono)
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28); // Byte rate
buffer.writeUInt16LE(2, 32);  // Block align
buffer.writeUInt16LE(16, 34); // Bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

const f0 = 560; // resonant hollow pitch of wooden fish (Mokugyo)
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;

  // 1. Mallet impact click transient
  const click = Math.exp(-t * 900) * (Math.sin(2 * Math.PI * 2200 * t) + (Math.random() * 2 - 1) * 0.5);

  // 2. Main hollow body resonant chamber
  const pitchCurve = 1 - 0.12 * Math.exp(-t * 60);
  const tone1 = Math.sin(2 * Math.PI * f0 * pitchCurve * t) * Math.exp(-t * 20);
  const tone2 = 0.4 * Math.sin(2 * Math.PI * f0 * 2.05 * pitchCurve * t) * Math.exp(-t * 40);
  const tone3 = 0.2 * Math.sin(2 * Math.PI * f0 * 3.1 * pitchCurve * t) * Math.exp(-t * 70);
  const subTone = 0.3 * Math.sin(2 * Math.PI * 240 * t) * Math.exp(-t * 30);

  let sample = click * 0.7 + tone1 * 0.85 + tone2 * 0.35 + tone3 * 0.15 + subTone * 0.25;

  // Warm acoustic soft clipping
  sample = Math.tanh(sample * 1.8);

  const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 31500)));
  buffer.writeInt16LE(intSample, 44 + i * 2);
}

const outPath = path.join(__dirname, 'assets', 'audio', 'mo.wav');
fs.writeFileSync(outPath, buffer);
console.log('Successfully created authentic wooden fish audio at:', outPath);
