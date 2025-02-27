// Carregador otimizado para Font Awesome
// Este script carrega apenas os ícones específicos que usamos no site
// em vez de carregar toda a biblioteca

window.FontAwesomeConfig = {
  searchPseudoElements: true,
  observeMutations: false,
  autoReplaceSvg: true,
  autoAddCss: false
};

// Importar apenas os ícones que usamos
(function() {
  const script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/custom-fa-kit.js';
  script.crossOrigin = 'anonymous';
  script.defer = true;
  document.head.appendChild(script);
})();

// Lista de ícones usados no site
// Isso permite que apenas esses ícones sejam carregados
window.FontAwesomeKitConfig = {
  asyncLoading: { enabled: true },
  autoA11y: { enabled: true },
  baseUrl: "https://ka-f.fontawesome.com",
  license: "free",
  method: "css",
  minify: { enabled: true },
  v4FontFaceShim: { enabled: false },
  v4shim: { enabled: false },
  version: "latest",
  iconUploads: {},
  icons: {
    solid: [
      "camera", 
      "tshirt", 
      "magic", 
      "heart", 
      "envelope", 
      "plus", 
      "chevron-left", 
      "chevron-right"
    ],
    brands: [
      "instagram", 
      "facebook", 
      "pinterest"
    ]
  }
}; 