// C'est pour quand on clique sur une image elle s'affiche en grand

const images = document.querySelectorAll('.thumbnail'); 

images.forEach(image => {
  image.addEventListener('click', () => {
    // Crée un fond sombre 
    const fond = document.createElement('div');
    fond.className = 'overlay';

    // Crée une grande version de image cliquer
    const bigImage = document.createElement('img');
    bigImage.src = image.src;

    // Ajoute l'image dans le fond sombre
    fond.appendChild(bigImage);
    document.body.appendChild(fond);

    // Ferme l'image quand on clique sur le fond
    fond.addEventListener('click', () => {
      fond.remove();
    });
  });
});
