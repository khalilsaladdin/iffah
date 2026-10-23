import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  typeBuf.copy(buf, 4);
  data.copy(buf, 8);
  const crcTarget = Buffer.concat([typeBuf, data]);
  buf.writeUInt32BE(crc32(crcTarget), 8 + len);
  return buf;
}

function generateIconPNG(size, outputPath) {
  const width = size;
  const height = size;

  // Generate RGBA raw scanlines
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const rOuter = size * 0.44;
  const rInner = size * 0.38;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rounded background (#022c22 to #064e3b)
      if (Math.abs(dx) < cx * 0.92 && Math.abs(dy) < cy * 0.92) {
        if (dist <= rInner) {
          // Inner emerald core (#044e39 with gold touch)
          if (dist <= size * 0.12) {
            // Center gold emblem (#f59e0b)
            rawData[pxOffset] = 245;     // R
            rawData[pxOffset + 1] = 158; // G
            rawData[pxOffset + 2] = 11;  // B
            rawData[pxOffset + 3] = 255; // A
          } else if (dist <= size * 0.22 && dy > 0 && Math.abs(dx) < size * 0.14) {
            // Gold crescent
            rawData[pxOffset] = 254;
            rawData[pxOffset + 1] = 240;
            rawData[pxOffset + 2] = 138;
            rawData[pxOffset + 3] = 255;
          } else {
            // Emerald shield gradient
            rawData[pxOffset] = 4;
            rawData[pxOffset + 1] = 78;
            rawData[pxOffset + 2] = 57;
            rawData[pxOffset + 3] = 255;
          }
        } else if (dist <= rOuter) {
          // Gold / emerald border
          rawData[pxOffset] = 16;
          rawData[pxOffset + 1] = 185;
          rawData[pxOffset + 2] = 129;
          rawData[pxOffset + 3] = 255;
        } else {
          // Dark background #030712
          rawData[pxOffset] = 3;
          rawData[pxOffset + 1] = 7;
          rawData[pxOffset + 2] = 18;
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // Outer dark corners
        rawData[pxOffset] = 3;
        rawData[pxOffset + 1] = 7;
        rawData[pxOffset + 2] = 18;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Non-interlaced
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const pngBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`Generated ${outputPath} (${size}x${size})`);
}

const publicDir = path.resolve('public');
generateIconPNG(192, path.join(publicDir, 'pwa-192x192.png'));
generateIconPNG(512, path.join(publicDir, 'pwa-512x512.png'));
generateIconPNG(180, path.join(publicDir, 'apple-touch-icon.png'));
