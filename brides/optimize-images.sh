#!/bin/bash

# Script para otimizar imagens para o site Perfect Wedding
# Requer: ImageMagick (convert, mogrify)

# Diretório das imagens
IMAGE_DIR="assets/images"

# Tamanhos para diferentes dispositivos
MOBILE_WIDTH=480
TABLET_WIDTH=768
DESKTOP_WIDTH=1200

# Qualidade de compressão (ajuste conforme necessário)
QUALITY=80

# Cores para feedback
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando otimização de imagens para o Perfect Wedding...${NC}"

# Verifica se o diretório existe
if [ ! -d "$IMAGE_DIR" ]; then
    echo "Diretório $IMAGE_DIR não encontrado!"
    exit 1
fi

# Cria diretório temporário para processamento
TEMP_DIR="$IMAGE_DIR/temp"
mkdir -p "$TEMP_DIR"

# Função para otimizar uma imagem
optimize_image() {
    local input_file=$1
    local base_name=$(basename "$input_file" | sed 's/\.[^.]*$//')
    local extension="${input_file##*.}"
    
    # Pula arquivos que já são versões otimizadas
    if [[ "$base_name" == *"-mobile"* ]] || [[ "$base_name" == *"-tablet"* ]] || [[ "$base_name" == *"-desktop"* ]]; then
        return
    fi
    
    echo -e "Otimizando ${YELLOW}$input_file${NC}..."
    
    # Versão mobile
    convert "$input_file" -resize "${MOBILE_WIDTH}x" -strip -quality $QUALITY "$IMAGE_DIR/${base_name}-mobile.${extension}"
    echo -e "  ${GREEN}✓${NC} Criada versão mobile: ${base_name}-mobile.${extension}"
    
    # Versão tablet
    convert "$input_file" -resize "${TABLET_WIDTH}x" -strip -quality $QUALITY "$IMAGE_DIR/${base_name}-tablet.${extension}"
    echo -e "  ${GREEN}✓${NC} Criada versão tablet: ${base_name}-tablet.${extension}"
    
    # Versão desktop
    convert "$input_file" -resize "${DESKTOP_WIDTH}x" -strip -quality $QUALITY "$IMAGE_DIR/${base_name}-desktop.${extension}"
    echo -e "  ${GREEN}✓${NC} Criada versão desktop: ${base_name}-desktop.${extension}"
}

# Processa todas as imagens webp e jpg
echo -e "${YELLOW}Processando imagens WEBP...${NC}"
for img in "$IMAGE_DIR"/*.webp; do
    if [ -f "$img" ]; then
        optimize_image "$img"
    fi
done

echo -e "${YELLOW}Processando imagens JPG...${NC}"
for img in "$IMAGE_DIR"/*.jpg; do
    if [ -f "$img" ]; then
        optimize_image "$img"
    fi
done

# Remove diretório temporário
rm -rf "$TEMP_DIR"

echo -e "${GREEN}Otimização de imagens concluída!${NC}"
echo -e "Imagens otimizadas para tamanhos: $MOBILE_WIDTH, $TABLET_WIDTH e $DESKTOP_WIDTH pixels."
echo -e "Qualidade de compressão: $QUALITY%" 