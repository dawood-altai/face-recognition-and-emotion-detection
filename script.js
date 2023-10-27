// Taking the required elements from HTML
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let isRecognitionActive = false;
let recognitionInterval;

// Adding the libraries for face recognition
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

// Allowing the camera to show our face
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => {
      video.srcObject = stream;
      startButton.disabled = false;
    },
    (err) => console.error(err)
  );
}

// Update your startRecognition function to include eye detection
async function startRecognition() {
  isRecognitionActive = true;
  recognitionInterval = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const displaySize = { width: video.width, height: video.height };
    canvas.width = video.width;
    canvas.height = video.height;
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
}



// Prevent the recognition when the browser is loaded
function stopRecognition() {
  isRecognitionActive = false;
  clearInterval(recognitionInterval);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

// Starting recognition when I click
startButton.addEventListener('click', () => {
  if (!isRecognitionActive) {
    startRecognition();
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
  }
});

// Stop the recognition when clicked
stopButton.addEventListener('click', () => {
  if (isRecognitionActive) {
    stopRecognition();
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
  }
});

// Function to handle responsive behavior

function handleResponsiveDesign() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight; // Get the screen height as well

  if (screenWidth <= 768) {
    // Adjust elements for smaller screens (e.g., mobile or tablet)
    video.width = 412; // Set the video width to 412 for mobile
    video.height = 300; // Set the video height to 300 for mobile
    canvas.width = 412; // Set the canvas width to 412 for mobile
    canvas.height = 300; // Set the canvas height to 300 for mobile
  } else {
    // Reset elements for larger screens (e.g., desktop)
    video.width = 720; // Adjust this as needed for desktop
    video.height = 560; // Adjust this as needed for desktop
    canvas.width = 720; // Adjust this as needed for desktop
    canvas.height = 560; // Adjust this as needed for desktop
  }
}

// Event listener to handle window resize for responsive design
window.addEventListener('resize', handleResponsiveDesign);

