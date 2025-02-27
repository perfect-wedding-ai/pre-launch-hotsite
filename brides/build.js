/**
 * Perfect Wedding - Build Script
 * 
 * Este script automatiza a minificação do CSS e JavaScript.
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
const jsDir = path.join(__dirname, 'assets', 'js');
const cssMinDir = path.join(cssDir, 'min');
const jsMinDir = path.join(jsDir, 'min');

// Garantir que os diretórios min existem
if (!fs.existsSync(cssMinDir)) {
    fs.mkdirSync(cssMinDir, { recursive: true });
    console.log('Diretório de CSS minificado criado.');
}

if (!fs.existsSync(jsMinDir)) {
    fs.mkdirSync(jsMinDir, { recursive: true });
    console.log('Diretório de JavaScript minificado criado.');
}

// Minificar CSS
function minifyCSS() {
    try {
        console.log('Minificando CSS...');
        execSync(`cleancss -o ${path.join(cssMinDir, 'styles.min.css')} ${path.join(cssDir, 'styles.css')}`);
        console.log('CSS minificado com sucesso!');
    } catch (error) {
        console.error('Erro ao minificar CSS:', error.message);
        console.log('Certifique-se de que o clean-css-cli está instalado: npm install -g clean-css-cli');
    }
}

// Minificar JavaScript
function minifyJS() {
    try {
        console.log('Minificando JavaScript...');
        
        // Lista de arquivos JS para minificar
        const jsFiles = ['main.js', 'image-optimizer.js', 'lazy-loading.js'];
        
        jsFiles.forEach(file => {
            const inputFile = path.join(jsDir, file);
            const outputFile = path.join(jsMinDir, file.replace('.js', '.min.js'));
            
            if (fs.existsSync(inputFile)) {
                execSync(`npx terser ${inputFile} -o ${outputFile} --compress --mangle`);
                console.log(`${file} minificado com sucesso!`);
            } else {
                console.warn(`Arquivo ${file} não encontrado.`);
            }
        });
        
        console.log('JavaScript minificado com sucesso!');
    } catch (error) {
        console.error('Erro ao minificar JavaScript:', error.message);
    }
}

// Executar build
try {
    minifyCSS();
    minifyJS();
    console.log('Build concluído!');
} catch (error) {
    console.error('Erro durante o build:', error.message);
} 