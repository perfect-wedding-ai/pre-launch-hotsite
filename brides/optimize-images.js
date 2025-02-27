/**
 * Script para otimizar imagens para o site Perfect Wedding
 * 
 * Requer: Node.js e os pacotes sharp e glob
 * Instalação: npm install sharp glob
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configurações
const IMAGE_DIR = 'assets/images';
const SIZES = {
  mobile: 480,
  tablet: 768,
  desktop: 1200
};
const QUALITY = 80;

// Cores para console
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

console.log(`${YELLOW}Iniciando otimização de imagens para o Perfect Wedding...${RESET}`);

// Verifica se o diretório existe
const fullImagePath = path.join(__dirname, IMAGE_DIR);
console.log(`${YELLOW}Verificando diretório: ${fullImagePath}${RESET}`);

if (!fs.existsSync(fullImagePath)) {
  console.error(`${RED}Diretório ${fullImagePath} não encontrado!${RESET}`);
  process.exit(1);
}

// Função para otimizar uma imagem
async function optimizeImage(inputFile) {
  console.log(`${YELLOW}Processando arquivo: ${inputFile}${RESET}`);
  
  const parsedPath = path.parse(inputFile);
  const baseName = parsedPath.name;
  const extension = parsedPath.ext.substring(1);
  
  // Pula arquivos que já são versões otimizadas
  if (baseName.includes('-mobile') || baseName.includes('-tablet') || baseName.includes('-desktop')) {
    console.log(`${YELLOW}Pulando arquivo já otimizado: ${baseName}${RESET}`);
    return;
  }
  
  // Pula arquivos webp que já foram otimizados
  if (parsedPath.ext.toLowerCase() === '.webp') {
    console.log(`${YELLOW}Pulando arquivo webp já otimizado: ${baseName}${RESET}`);
    return;
  }
  
  console.log(`${YELLOW}Otimizando ${inputFile}${RESET}...`);
  
  try {
    // Carrega a imagem
    const image = sharp(inputFile);
    
    // Obtém metadados da imagem
    const metadata = await image.metadata();
    console.log(`${YELLOW}Metadados: ${JSON.stringify(metadata)}${RESET}`);
    
    // Verifica se a imagem é widescreen (hero-bride ou signup-bride)
    const isWidescreen = baseName === 'hero-bride' || baseName === 'signup-bride';
    
    // Processa para cada tamanho
    for (const [size, width] of Object.entries(SIZES)) {
      const outputFile = path.join(
        path.dirname(inputFile),
        `${baseName}-${size}${parsedPath.ext}`
      );
      
      console.log(`${YELLOW}Gerando versão ${size} em: ${outputFile}${RESET}`);
      
      // Redimensiona e otimiza
      try {
        // Configuração de redimensionamento
        const resizeOptions = {
          width,
          withoutEnlargement: true,
          // Preserva a proporção da imagem (aspect ratio)
          fit: 'inside'
        };
        
        // Para imagens widescreen, usamos configurações específicas
        if (isWidescreen) {
          // Mantém a proporção original da imagem
          resizeOptions.fit = 'contain';
          // Não corta a imagem
          resizeOptions.position = 'center';
        }
        
        await image
          .clone()
          .resize(resizeOptions)
          .webp({ quality: QUALITY })
          .toFile(outputFile.replace(extension, 'webp'));
        
        console.log(`${GREEN}✓${RESET} Criada versão ${size}: ${path.basename(outputFile).replace(extension, 'webp')}`);
      } catch (resizeError) {
        console.error(`${RED}Erro ao redimensionar para ${size}: ${resizeError.message}${RESET}`);
      }
    }
  } catch (error) {
    console.error(`${RED}Erro ao processar ${inputFile}: ${error.message}${RESET}`);
  }
}

// Função para verificar se um arquivo é uma imagem suportada
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
}

// Função principal
async function main() {
  try {
    console.log(`${YELLOW}Lendo diretório: ${fullImagePath}${RESET}`);
    
    // Lê todos os arquivos no diretório
    const files = fs.readdirSync(fullImagePath);
    
    // Filtra apenas os arquivos de imagem
    const imageFiles = files.filter(file => isImageFile(file));
    
    console.log(`${YELLOW}Encontradas ${imageFiles.length} imagens: ${JSON.stringify(imageFiles)}${RESET}`);
    
    // Processa cada imagem
    for (const imageFile of imageFiles) {
      const fullPath = path.join(fullImagePath, imageFile);
      await optimizeImage(fullPath);
    }
    
    console.log(`${GREEN}Otimização de imagens concluída!${RESET}`);
    console.log(`Imagens otimizadas para tamanhos: ${Object.values(SIZES).join(', ')} pixels.`);
    console.log(`Qualidade de compressão: ${QUALITY}%`);
  } catch (error) {
    console.error(`${RED}Erro: ${error.message}${RESET}`);
    process.exit(1);
  }
}

main(); 