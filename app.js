// app.js
const images = [
    { src: 'casa.jpg', word: 'casa' },
    { src: 'pui.jpg', word: 'pui' },
    { src: 'nor.jpg', word: 'nor' },
    { src: 'creion.jpg', word: 'creion' },
    { src: 'cana.jpg', word: 'cana' },
  ];
  
  let currentImageIndex = 0;
  
  const imageElement = document.getElementById('image');
  const feedbackElement = document.getElementById('feedback');
  const microphoneButton = document.getElementById('microphone');
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = 'ro-RO';
  recognition.interimResults = false;
  
  function loadImage() {
    const image = images[currentImageIndex];
    imageElement.src = image.src;
  }
  
  microphoneButton.addEventListener('click', () => {
    feedbackElement.textContent = 'Ascult... Spune cuvântul!';
    recognition.start();
  });
  
  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    const expectedWord = images[currentImageIndex].word;
  
    if (speechResult === expectedWord) {
      feedbackElement.textContent = 'Bravo! Ai spus corect!';
    } else {
      feedbackElement.textContent = `Mai încearcă! Ai spus: ${speechResult}`;
    }
  
    currentImageIndex = (currentImageIndex + 1) % images.length;
    setTimeout(() => {
      feedbackElement.textContent = '';
      loadImage();
    }, 2000);
  };
  
  recognition.onerror = () => {
    feedbackElement.textContent = 'Eroare la recunoaștere. Mai încearcă!';
  };
  
  window.onload = loadImage;
  