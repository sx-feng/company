// fix-assets.js
const fs = require('fs');
const path = 'src/assets';
if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

// 红、绿、灰三张 128×128 PNG（Base64）
const imgs = {
  'avatar2.png': 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
  'avatar3.png': 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADggJfAYdG4QAAAABJRU5ErkJggg==',
  'search.png' : 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYPhfDwABhAB9aYK3yQAAAABJRU5ErkJggg=='
};

Object.entries(imgs).forEach(([name, b64]) =>
  fs.writeFileSync(`${path}/${name}`, Buffer.from(b64, 'base64'))
);
console.log('✅ 占位图已生成');