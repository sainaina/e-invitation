const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const ffmpegPath = require('ffmpeg-static');

async function main() {
  console.log('Loading source image...');
  const imagePath = path.join(__dirname, '..', 'public', 'images', 'wedding_floral_bg.jpg');
  if (!fs.existsSync(imagePath)) {
    throw new Error('Image not found: ' + imagePath);
  }
  const bgImage = await loadImage(imagePath);
  const width = bgImage.width;   // 576
  const height = bgImage.height; // 1024

  console.log(`Image loaded: ${width}x${height}`);

  const fps = 30;
  const duration = 10; // 10 seconds for seamless loop
  const totalFrames = fps * duration; // 300 frames

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Sparkle locations on gold ornaments & roses for twinkling starbursts
  const starGlints = [
    { x: 288, y: 130, maxRadius: 18, phase: 0 },    // Top center rococo crest
    { x: 135, y: 145, maxRadius: 16, phase: 1.2 },  // Top left rose bouquet
    { x: 440, y: 155, maxRadius: 16, phase: 3.1 },  // Top right rose bouquet
    { x: 105, y: 450, maxRadius: 12, phase: 4.5 },  // Left frame mid
    { x: 470, y: 480, maxRadius: 12, phase: 2.0 },  // Right frame mid
    { x: 110, y: 810, maxRadius: 20, phase: 0.8 },  // Bottom left large rose
    { x: 460, y: 820, maxRadius: 20, phase: 5.2 },  // Bottom right large rose
    { x: 220, y: 885, maxRadius: 14, phase: 2.7 },  // Lower left rococo curl
    { x: 355, y: 885, maxRadius: 14, phase: 4.1 },  // Lower right rococo curl
    { x: 288, y: 70, maxRadius: 14, phase: 3.8 },  // Sky crest peak
  ];



  // Floating Golden Stardust (twinkling embers rising gently)
  const numSparks = 60;
  const sparks = [];
  for (let i = 0; i < numSparks; i++) {
    const cycleCount = 1 + (i % 2); // 1 or 2 cycles
    const travelDistance = height + 40;
    const speed = (cycleCount * travelDistance) / duration;
    const startProgress = (i / numSparks);
    const xBase = 20 + ((i * 31) % (width - 40));
    const swayAmp = 8 + (i % 4) * 4;
    const swayFreq = 1 + (i % 3);
    const twinkleFreq = 3 + (i % 5);
    const size = 1.0 + (i % 4) * 0.7;

    sparks.push({
      startProgress,
      travelDistance,
      speed,
      xBase,
      swayAmp,
      swayFreq,
      twinkleFreq,
      size,
    });
  }

  // Draw 4-point fairy starburst glint
  function drawGlint(ctx, x, y, radius, alpha) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, alpha);

    // Outer soft glow
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
    grad.addColorStop(0, 'rgba(255, 250, 220, 0.9)');
    grad.addColorStop(0.3, 'rgba(240, 200, 110, 0.5)');
    grad.addColorStop(1, 'rgba(220, 170, 70, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // 4-point diamond cross flare
    ctx.fillStyle = 'rgba(255, 255, 240, 0.95)';
    ctx.beginPath();
    ctx.moveTo(x, y - radius * 1.8);
    ctx.quadraticCurveTo(x, y, x + radius * 0.25, y);
    ctx.quadraticCurveTo(x, y, x, y + radius * 1.8);
    ctx.quadraticCurveTo(x, y, x - radius * 0.25, y);
    ctx.quadraticCurveTo(x, y, x, y - radius * 1.8);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - radius * 1.8, y);
    ctx.quadraticCurveTo(x, y, x, y - radius * 0.25);
    ctx.quadraticCurveTo(x, y, x + radius * 1.8, y);
    ctx.quadraticCurveTo(x, y, x, y + radius * 0.25);
    ctx.quadraticCurveTo(x, y, x - radius * 1.8, y);
    ctx.fill();

    // Center pinpoint
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }



  // Draw gentle water shimmer on the bottom lake (y: 890 to 1024)
  function drawWaterShimmer(ctx, t) {
    ctx.save();
    const waterTop = 890;
    const waterBottom = 1024;

    // Multiple ripples across horizontal bands
    for (let row = 0; row < 12; row++) {
      const y = waterTop + row * 11;
      const rowPhase = row * 0.7;
      // Integer oscillation over 10s: 2 or 3 cycles
      const cycleFreq = 2 + (row % 2);
      const intensity = 0.5 + 0.5 * Math.sin((2 * Math.PI * cycleFreq * t / duration) + rowPhase);

      if (intensity > 0.3) {
        ctx.globalAlpha = (intensity - 0.3) * 0.45;
        ctx.fillStyle = '#FFF8E0';

        // Ripple dashes across lake
        const dashCount = 6 + (row % 4);
        for (let d = 0; d < dashCount; d++) {
          const x = 50 + ((d * 85 + (row * 33)) % (width - 100)) + Math.sin(t * 1.5 + row) * 8;
          const w = 18 + ((row * 7 + d * 13) % 25);
          const h = 1.2 + (row / 12) * 1.2;

          ctx.beginPath();
          ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  // Soft atmospheric warm breathing glow
  function drawAtmosphereGlow(ctx, t) {
    ctx.save();
    // 1 full sine pulse over 10 seconds
    const breath = 0.5 + 0.5 * Math.sin(2 * Math.PI * t / duration);
    const alpha = 0.04 + breath * 0.05;

    // Top sky radial bloom
    const grad = ctx.createRadialGradient(width / 2, 100, 50, width / 2, 100, 450);
    grad.addColorStop(0, `rgba(255, 240, 210, ${alpha * 1.5})`);
    grad.addColorStop(0.6, `rgba(255, 220, 180, ${alpha})`);
    grad.addColorStop(1, 'rgba(255, 220, 180, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  // Setup ffmpeg output
  const outputMp4 = path.join(__dirname, '..', 'public', 'videos', 'floral_background.mp4');
  console.log('Rendering video to:', outputMp4);

  const ffmpegArgs = [
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', `${width}x${height}`,
    '-pix_fmt', 'rgba',
    '-r', `${fps}`,
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '19',
    '-movflags', '+faststart',
    outputMp4
  ];

  const ffmpegProcess = spawn(ffmpegPath, ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });

  ffmpegProcess.on('error', (err) => {
    console.error('FFmpeg process error:', err);
  });

  const renderFrame = (frameIndex) => {
    const t = frameIndex / fps; // current time in seconds [0, 10)

    // 1. Draw base image
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(bgImage, 0, 0, width, height);

    // 2. Draw lake water shimmering highlights at bottom
    drawWaterShimmer(ctx, t);

    // 3. Draw soft atmospheric warm breathing pulse
    drawAtmosphereGlow(ctx, t);

    // 4. Draw Rising Golden Stardust
    for (const s of sparks) {
      const prog = (s.startProgress + (s.speed * t) / s.travelDistance) % 1.0;
      // Rising upwards: from height + 20 to -20
      const y = (height + 20) - prog * s.travelDistance;
      const x = s.xBase + Math.sin(2 * Math.PI * s.swayFreq * t / duration) * s.swayAmp;

      // Twinkle opacity
      const tw = 0.4 + 0.6 * Math.sin(2 * Math.PI * s.twinkleFreq * t / duration + s.xBase);
      if (tw > 0.1 && y > -10 && y < height + 10) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, tw * 0.85);
        ctx.fillStyle = '#FFEAA7';
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Little halo
        ctx.fillStyle = 'rgba(255, 215, 0, 0.25)';
        ctx.beginPath();
        ctx.arc(x, y, s.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }



    // 6. Draw Star Glints on Golden Rococo Ornaments & Roses
    for (const g of starGlints) {
      // Sine twinkle curve with phase
      const cycleFreq = 2; // 2 twinkle peaks in 10s
      const rawSine = Math.sin((2 * Math.PI * cycleFreq * t / duration) + g.phase);
      // Sharp sparkle curve: power of sine
      const alpha = Math.max(0, Math.pow(Math.max(0, rawSine), 3));
      drawGlint(ctx, g.x, g.y, g.maxRadius, alpha);
    }

    // Get raw RGBA buffer and write directly to ffmpeg
    const imgData = ctx.getImageData(0, 0, width, height);
    return Buffer.from(imgData.data.buffer);
  };

  console.log(`Starting frame render (${totalFrames} frames)...`);
  for (let f = 0; f < totalFrames; f++) {
    const buffer = renderFrame(f);
    const canContinue = ffmpegProcess.stdin.write(buffer);
    if (!canContinue) {
      await new Promise(resolve => ffmpegProcess.stdin.once('drain', resolve));
    }
    if (f % 60 === 0 || f === totalFrames - 1) {
      process.stdout.write(`Rendered frame ${f + 1}/${totalFrames} (${Math.round(((f + 1) / totalFrames) * 100)}%)\r`);
    }
  }

  console.log('\nAll frames sent. Finalizing video encoding...');
  ffmpegProcess.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Video generated successfully at floral_background.mp4!');
        const archMp4 = path.join(__dirname, '..', 'public', 'videos', 'arch_background.mp4');
        fs.copyFileSync(outputMp4, archMp4);
        console.log('Updated public/videos/arch_background.mp4 with new animated video!');
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });
}

main().catch(err => {
  console.error('Error generating video:', err);
  process.exit(1);
});
