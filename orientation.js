// orientation.js

window.addEventListener('load', function() {
  const element = document.getElementById('rotating-element');

  // Check if the browser supports the DeviceOrientation event
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
      // Extract orientation values (alpha, beta, gamma)
      const alpha = event.alpha || 0;  // Z-axis rotation (compass direction)
      const beta = event.beta || 0;    // X-axis rotation (front-to-back tilt)
      const gamma = event.gamma || 0;  // Y-axis rotation (left-to-right tilt)

      // Apply the rotation to the element
      element.style.transform = `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`;
    });
  } else {
    element.innerText = "Device orientation not supported!";
  }
});
