// Taking the required elements from HTMLm html
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

// Allowing camera to show our face
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

// Calling libraries to detection from face-api js and drawing lanmarks 

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

    // Additional code to detect eye state
    resizedDetections.forEach((detection) => {
      const landmarks = detection.landmarks;

      // Get eye landmarks
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();

      // You can set a threshold value for the eye aspect ratio (EAR) to determine open or closed eyes
      const eyeThreshold = 0.2; // Adjust as needed

      // Detect open or closed eyes
      const isLeftEyeOpen = isEyeOpen(leftEye, eyeThreshold);
      const isRightEyeOpen = isEyeOpen(rightEye, eyeThreshold);

      // You can now use isLeftEyeOpen and isRightEyeOpen as indicators of open or closed eyes
      // You can log or perform actions based on the eye state
      console.log('Left Eye Open:', isLeftEyeOpen);
      console.log('Right Eye Open:', isRightEyeOpen);
    });
  }, 100);
}

// Function to detect if an eye is open or closed based on the EAR threshold
function isEyeOpen(eyeLandmarks, threshold) {
  const topEyelid = (eyeLandmarks[1].y + eyeLandmarks[2].y) / 2;
  const bottomEyelid = (eyeLandmarks[4].y + eyeLandmarks[5].y) / 2;
  const eyeHeight = bottomEyelid - topEyelid;
  const ear = eyeHeight / (eyeLandmarks[3].x - eyeLandmarks[0].x);
  return ear > threshold;
}


// Function to handle responsive behavior
function handleResponsiveDesign() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    // Adjust elements or behavior for smaller screens (e.g., mobile or tablet)
    video.width = 320; // Adjust the video width for smaller screens
    video.height = 240; // Adjust the video height for smaller screens
  } else {
    // Reset elements or behavior for larger screens (e.g., desktop)
    video.width = 720; // Restore the video width for larger screens
    video.height = 560; // Restore the video height for larger screens
  }
}

// Event listener to handle window resize for responsive design
window.addEventListener('resize', handleResponsiveDesign);

// Event listener to start recognition
startButton.addEventListener('click', () => {
  if (!isRecognitionActive) {
    startRecognition();
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
  }
});

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

//Stop the recognition when click

stopButton.addEventListener('click', () => {
  if (isRecognitionActive) {
    stopRecognition();
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
  }
});