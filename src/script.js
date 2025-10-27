// Import de la fonction createApp depuis Vue
const { createApp } = Vue;

// Création de l'application Vue
createApp({
  // Déclaration des données réactives de l'application
  data() {
    return {
      isDarkMode: false, // pour activer et désactiver le mode sombre
      projects: [],   // Tableau pour stocker les projets récupérés depuis le JSON
      modalActif: null,  // iD du modal actuellement ouvert
      projetActif: null  // projet actuellement ouvert dans le modal
    };
  },

  mounted() {
    // Vérifie si le mode sombre est activer
    if (sessionStorage.getItem("darkMode") === "true") {
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    }
    // Fetch des projets
    fetch("src/projects.json") // Récupère le fichier JSON qui contient les projets
      .then(response => {
        // Vérifie si la réponse est correcte
        if (!response.ok) throw new Error("Erreur de chargement du JSON");
        return response.json();
      })
      .then(data => {
        // Stocke les projets récupérer dans la variable "projects" de l'app
        this.projects = data; 
        this.message = "";
        console.log("Projets chargés :", this.projects);
      })
       // Gestion des erreurs 
      .catch(erreur => {
        console.error("Erreur :", erreur);
        // Affiche un message d'erreur 
        this.message = "Erreur de chargement des projets";
      });

    // Les animations GSAP
    // Animation des liens de nav
    const navliens = document.querySelectorAll(".nav"); // selectionne dans Html le mot nsv
    gsap.from(navliens, {
      x: -20, // Animation qui vient de la gauche
      opacity: 0, // transparent
      duration: 0.6, // Durée de l'animation
      ease: "power3.out", // animation doux
      stagger: 0.15 // secondes entre chaque nav
    });

    // Animation du header principal nom et portfolio
    const nom = document.querySelector(".nom"); // selectionne dans Html le mot nom 
    const portfolio = document.querySelector(".portfolio");  // selectionne dans Html le mot portfolio 
    gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } }) // cree une timeline GSAP avec des valeurs pour la durée et l'animation
      .from(nom, 
        { opacity: 0, // debut complètement transparent
           scale: 0.8  // Commence légèrement réduit 
        })  
      .from(portfolio, 
        { opacity: 0, 
          scale: 0.8 
        }, "-=0.5"); // le mot Portfolio apparaît apres le nom 0.5s

    // Plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animation de la section À propos
    const aPropos = document.querySelector(".a-propos-content"); // selectionne dans html le mot a-propos-content 
      // Animation du texte "À propos" avec le scroll
      gsap.from(aPropos.querySelector(".texte"), {
        // Utilisation de ScrollTrigger pour déclencher l'animation au scroll
        scrollTrigger: {
           trigger: aPropos, // élément qui déclenche l'animation
           start: "top 80%",  // l'animation quand le haut de 'aPropos' atteint 80% de la fenêtre
           toggleActions: "play none none none" // 
          },
           x: -50, // il vient de la gauche 
           opacity: 0,
           duration: 1,  // l'animation dure 1 seconde
           ease: "power3.out" 
      });
      // Image de moi
      gsap.from(aPropos.querySelector(".image-container"), { // selectionne dans html le mot image-container 
         scrollTrigger: { 
          trigger: aPropos, 
          start: "top 80%", 
          toggleActions: "play none none none" 
        },
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2 // attends 0.2 avant commencer l'animation
      });

      // Animation des compétences
    const skills = document.querySelectorAll(".skill-tag"); // selectionne dans html le mot skill-tag
      gsap.from(skills, {
       scrollTrigger: { 
        trigger: ".skills-tags", 
        start: "top 80%", 
        toggleActions: "play none none none" 
      },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1 //  décale de chaque élément de 0.1s
      });

    // Animation des projets à l'apparition dans la grille
    const cartecontainer = document.querySelector(".projets"); // selectionne dans html le mot projets
      gsap.from(cartecontainer, {
       scrollTrigger: { 
        trigger: ".grille-projets", 
        start: "top 80%", 
        toggleActions: "play none none none" 
      },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
      });
   
   // Animation du bouton accueil flottant
   const btnAccueil = document.querySelector(".btn-accueil"); // selectionne dans html le mot btn-accueil
     // léger mouvement flottant infini
     gsap.to(btnAccueil, {
       y: "-=10", // bouge le bouton vers le haut de sa position placer
       duration: 2,
       repeat: -1, // répète l'animation indéfiniment
       yoyo: true, // animation inverse chaque répétition 
       ease: "sine.inOut"  // effet de courbe de mouvement douce, type sinusoidal
    });
},

  // Méthodes
 methods: {
  // Active ou désactive le mode sombre
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle("dark-mode", this.isDarkMode);
    sessionStorage.setItem("darkMode", this.isDarkMode);  // Stocke l'état du mode sombre dans sessionStorage pour pas il revient light mode
  },

  // Redirection vers un lien
  goTo(link) {
    window.location.href = link;  // Change url de la page pour naviguer vers le lien cliquer
  },

  // Ouvre un modal pour un projet donné
  openModal(modalId) {
    const projet = this.projects.find(p => p.modal === modalId); // cherche le projet avec l'id du modal
    if (projet) {
      this.projetActif = projet;  // met le projet actif dans l'app
      this.modalActif = projet.modal;  // met le projet actif dans l'app

       // Bloque le scroll de la page
       document.body.style.overflow = "hidden";

      // Attendre que le DOM ait créé le modal avant l’animation
      this.$nextTick(() => {
        gsap.from(".modal-content", {
          scale: 0.7,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)" // efet de courbe animation pour un rebond
        });
      });
    }
  },

  closeModal() {
      this.modalActif = null;
      this.projetActif = null;
      document.body.style.overflow = ""; // restaure le scroll
    }
}
}).mount("#app"); 
