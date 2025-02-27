/**
 * Perfect Wedding - Build Script
 * 
 * Este script automatiza a minificação do CSS.
 * Para executar: node build.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const cssDir = path.join(__dirname, 'assets', 'css');
const minDir = path.join(cssDir, 'min');

// Garantir que o diretório min existe
if (!fs.existsSync(minDir)) {
    fs.mkdirSync(minDir, { recursive: true });
    console.log('Diretório de CSS minificado criado.');
}

// Minificar CSS
try {
    console.log('Minificando CSS...');
    execSync(`cleancss -o ${path.join(minDir, 'styles.min.css')} ${path.join(cssDir, 'styles.css')}`);
    console.log('CSS minificado com sucesso!');
} catch (error) {
    console.error('Erro ao minificar CSS:', error.message);
    console.log('Certifique-se de que o clean-css-cli está instalado: npm install -g clean-css-cli');
}

console.log('Build concluído!'); 