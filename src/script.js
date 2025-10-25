const { createApp } = Vue;

createApp({
  data() {
    return {
      isDarkMode: false
    };
  },

  mounted() {
    // Vérifie si dark mode est actif dans la session
    if (sessionStorage.getItem('darkMode') === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }

    // Animation nav au chargement 
    const navliens = document.querySelectorAll('.nav');
    gsap.from(navliens, {
      x: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out', // animation doux
      stagger: 0.15
    });

    // Animation header principal
    const nom = document.querySelector('.nom');
    const portfolio = document.querySelector('.portfolio');
    gsap.timeline({ 
      defaults: { 
        duration: 1, // Durée des animations 
        ease: 'power3.out' 
      } 
    })
      .from(nom, { 
        opacity: 0,  // apparait invisible
        scale: 0.8   // apparait cm un saut
      })
      .from(portfolio, { 
        opacity: 0, 
        scale: 0.8 
      }, '-=0.5'); // cmc 0,5 seconde avant fin d'animation 

    // ScrollTrigger pour À propos
    gsap.registerPlugin(ScrollTrigger);
    const aPropos = document.querySelector('.a-propos-content');
      gsap.from(aPropos.querySelector('.texte'), {
        scrollTrigger: {
          trigger: aPropos,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.from(aPropos.querySelector('.image-container'), {
        scrollTrigger: {
          trigger: aPropos,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

    // ScrollTrigger Compétences un tag après un
    const skills = document.querySelectorAll('.skill-tag');
      gsap.from(skills, {
        scrollTrigger: {
          trigger: '.skills-tags',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    
    // Animation Projets au scroll une carte après une
    const projetsSection = document.querySelector(".grille-projets");
      gsap.from(".carte-container", {
        scrollTrigger: {
          trigger: projetsSection,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
      });

    // Animation modals 
    const cartes = document.querySelectorAll('.carte-projet[data-modal]');
    cartes.forEach(carte => {
      const modalId = carte.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      const modalContent = modal.querySelector('.modal-content');

      carte.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        gsap.fromTo(modalContent,
          { opacity: 0, 
            scale: 0.8 
          },
          { opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            ease: 'power3.out' }
        );
      });
    });
  },

  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      sessionStorage.setItem('darkMode', this.isDarkMode);
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






