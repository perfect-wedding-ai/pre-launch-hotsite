// Carregador otimizado para Font Awesome
// Este script carrega apenas os ícones específicos que usamos no site
// em vez de carregar toda a biblioteca

window.FontAwesomeConfig = {
  searchPseudoElements: true,
  observeMutations: false,
  autoReplaceSvg: true,
  autoAddCss: false
};

// Importar Font Awesome do CDN público
(function() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js';
  script.integrity = "sha512-Tn2m0TIpgVyTzzvmxLNuqbSJH3JP8jm+Cy3hvHrW7ndTDcJ1w5mBiksqDBb8GpE2ksktFvDB/ykZ0mDpsZj20w==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";
  script.defer = true;
  document.head.appendChild(script);
})();

// Lista de ícones usados no site
// Isso permite que apenas esses ícones sejam carregados
window.FontAwesomeConfig = {
  autoReplaceSvg: 'nest',
  observeMutations: false,
  showMissingIcons: false,
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