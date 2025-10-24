const { createApp } = Vue;

createApp({
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;

      // Ajoute ou retire la classe sur le body
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }
}).mount('#app');

// Ouvrir le modal quand on clique sur une carte de projet
const cartesprojet = document.querySelectorAll('.carte-projet');

cartesprojet.forEach(carte => {
  carte.addEventListener('click', () => {
    const idmodal = carte.getAttribute('data-modal'); // récupère id du modal 
    const modal = document.getElementById(idmodal); // trouve le modal
    modal.style.display = 'block'; // affiche le modal
    document.body.style.overflow = 'hidden';
  });
});

// Fermer le modal quand on clique sur le bouton (×)
const btnFermer = document.querySelectorAll('.close');

btnFermer.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const modal = bouton.closest('.modal'); // trouve le modal parent
    modal.style.display = 'none'; // le cache
    document.body.style.overflow = '';
  });
});

// Fermeture et pause automatique vidéo
document.querySelectorAll('.modal').forEach(modal => {

const video = modal.querySelector('video');
const closeBtn = modal.querySelector('.close');

  closeBtn.addEventListener('click', () => {
    // on ferme le modal
    modal.style.display = 'none';
    // si une vidéo est présent il faut la mettre pause
    if (video) {
      video.pause();
      video.currentTime = 0; // il remet la vidéo du début
    }
     // Stop vidéo YouTube iframe présente
    const iframe = modal.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src; // réinitialise le src pour arreter la vidéo
    }
  });
});






