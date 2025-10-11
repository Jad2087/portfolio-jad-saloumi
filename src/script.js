// Ouvrir le modal quand on clique sur une carte de projet
const cartesprojet = document.querySelectorAll('.carte-projet');

cartesprojet.forEach(carte => {
  carte.addEventListener('click', () => {
    const idmodal = carte.getAttribute('data-modal'); // récupère id du modal 
    const modal = document.getElementById(idmodal); // trouve le modal
    modal.style.display = 'block'; // affiche le modal
  });
});

// Fermer le modal quand on clique sur le bouton (×)
const btnFermer = document.querySelectorAll('.close');

btnFermer.forEach(bouton => {
  bouton.addEventListener('click', () => {
    const modal = bouton.closest('.modal'); // trouve le modal parent
    modal.style.display = 'none'; // le cache
  });
});
