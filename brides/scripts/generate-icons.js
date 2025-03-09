const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../public/assets/icons');

// Certifique-se que o diretório existe
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Configurações dos ícones
const icons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateIcons() {
  const source = path.join(ICONS_DIR, 'favicon.ico');

  for (const icon of icons) {
    await sharp(source)
      .resize(icon.size, icon.size)
      .toFormat('png')
      .toFile(path.join(ICONS_DIR, icon.name));
    
    console.log(`Generated ${icon.name} (${icon.size}x${icon.size})`);
  }
}

generateIcons().catch(console.error); 