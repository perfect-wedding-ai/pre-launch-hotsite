// Usando importações ESM
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import handler from 'serve-handler';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

// Obter o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Porta para o servidor local
const PORT = 3000;

async function runLighthouse() {
  console.log('Iniciando teste de desempenho com Lighthouse...');
  
  // Criar servidor HTTP local
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: __dirname,
    });
  });
  
  // Iniciar servidor
  await new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Servidor iniciado em http://localhost:${PORT}`);
      resolve();
    });
  });
  
  try {
    // Lançar Chrome
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
    });
    
    // Configurar opções do Lighthouse
    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance'],
      port: chrome.port,
    };
    
    // URL do servidor local
    const url = `http://localhost:${PORT}/index.html`;
    console.log(`Testando página: ${url}`);
    
    // Executar Lighthouse
    const runnerResult = await lighthouse(url, options);
    
    // Salvar relatório HTML
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lighthouse-report.html', reportHtml);
    
    // Exibir pontuações
    console.log('Pontuações de desempenho:');
    console.log('Performance:', Math.round(runnerResult.lhr.categories.performance.score * 100));
    
    // Exibir métricas principais
    console.log('\nMétricas principais:');
    console.log('First Contentful Paint:', runnerResult.lhr.audits['first-contentful-paint'].displayValue);
    console.log('Largest Contentful Paint:', runnerResult.lhr.audits['largest-contentful-paint'].displayValue);
    console.log('Cumulative Layout Shift:', runnerResult.lhr.audits['cumulative-layout-shift'].displayValue);
    console.log('Total Blocking Time:', runnerResult.lhr.audits['total-blocking-time'].displayValue);
    
    console.log('\nRelatório salvo como lighthouse-report.html');
    
    // Fechar Chrome
    await chrome.kill();
  } catch (error) {
    console.error('Erro ao executar o Lighthouse:', error);
  } finally {
    // Encerrar servidor
    server.close(() => {
      console.log('Servidor encerrado');
    });
  }
}

runLighthouse(); 