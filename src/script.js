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
        if (!response.ok) throw new Error("Erreur de chargement du JSON");
        return response.json();
      })
      .then(data => {
        this.projects = data; // stock les projets dans la variable
        this.message = "";
        console.log("Projets chargés :", this.projects);
      })
      .catch(erreur => {
        console.error("Erreur :", erreur);
        this.message = "Erreur de chargement des projets";
      });

    // Les animations GSAP
    // Animation des liens de nav
    const navliens = document.querySelectorAll(".nav");
    gsap.from(navliens, {
      x: -20, // Animation qui vient de la gauche
      opacity: 0, // transparent
      duration: 0.6, // Durée de l'animation
      ease: "power3.out", // animation doux
      stagger: 0.15 // secondes entre chaque nav
    });

    // Animation du header principal nom et portfolio
    const nom = document.querySelector(".nom");
    const portfolio = document.querySelector(".portfolio");
    gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } })
      .from(nom, 
        { opacity: 0,
           scale: 0.8 // nom apparaît avec un effet scale
        })  
      .from(portfolio, 
        { opacity: 0, 
          scale: 0.8 
        }, "-=0.5"); // le mot Portfolio apparaît apres le nom 0.5s

    // Plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animation de la section À propos
    const aPropos = document.querySelector(".a-propos-content");
      // Texte
      gsap.from(aPropos.querySelector(".texte"), {
        scrollTrigger: { trigger: aPropos, start: "top 80%", toggleActions: "play none none none" },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      // Image de moi
      gsap.from(aPropos.querySelector(".image-container"), {
         scrollTrigger: { 
          trigger: aPropos, 
          start: "top 80%", 
          toggleActions: "play none none none" 
        },
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2
      });

      // Animation des compétences
    const skills = document.querySelectorAll(".skill-tag");
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
        stagger: 0.1
      });

    // Animation des projets à l'apparition dans la grille
    const cartecontainer = document.querySelector(".projets");
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
   const btnAccueil = document.querySelector(".btn-accueil");
     // léger mouvement flottant infini
     gsap.to(btnAccueil, {
       y: "-=10",
       duration: 2,
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut"
    });
},

  // Méthodes
 methods: {
  // Active ou désactive le mode sombre
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle("dark-mode", this.isDarkMode);
    sessionStorage.setItem("darkMode", this.isDarkMode);
  },

  // Redirection vers un lien
  goTo(link) {
    window.location.href = link;
  },

  // Ouvre un modal pour un projet donné
  openModal(modalId) {
    const projet = this.projects.find(p => p.modal === modalId);
    if (projet) {
      this.projetActif = projet;
      this.modalActif = projet.modal;

       // Bloque le scroll de la page
       document.body.style.overflow = "hidden";

      // Attendre que le DOM ait créé le modal avant l’animation
      this.$nextTick(() => {
        gsap.from(".modal-content", {
          scale: 0.7,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
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
