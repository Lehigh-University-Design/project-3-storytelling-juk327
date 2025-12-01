// Start JS script code, feel free to not use this or remove it
// Get elements
const scrollContainer = document.querySelector('.scroll-container');
const backgroundLayer = document.querySelector('.background-layer');
const midgroundLayer = document.querySelector('.midground-layer');
const sandLayer = document.querySelector('.sand-layer');
const landingSection = document.getElementById('landing');
const humuhumuFish = document.getElementById('humuhumu-fish');

// Swimming animation for fish
let swimOffset = 0;
let lastTime = Date.now();

function updateSwimAnimation() {
  const now = Date.now();
  const deltaTime = (now - lastTime) / 1000; // Convert to seconds
  lastTime = now;
  
  swimOffset += deltaTime * 3; // Speed of swimming animation
  if (swimOffset > Math.PI * 2) swimOffset -= Math.PI * 2;
  
  requestAnimationFrame(updateSwimAnimation);
}

// Start swimming animation
updateSwimAnimation();

// Parallax effect on horizontal scroll - starts from landing section
scrollContainer.addEventListener('scroll', () => {
  const scrollLeft = scrollContainer.scrollLeft;
  
  // Apply parallax to repeating background from the beginning
  // Water background moves slower (0.7 speed)
  backgroundLayer.style.backgroundPosition = `${scrollLeft * 0.7}px 0`;
  // Midground moves at medium speed (0.8 speed) - between background and sand
  midgroundLayer.style.backgroundPosition = `${scrollLeft * 0.8}px center`;
  // Sand moves faster than water (0.9 speed)
  sandLayer.style.backgroundPosition = `${scrollLeft * 0.9}px bottom`;
  
  // Add parallax to landing section - match speeds with repeating background for smooth transition
  if (landingSection) {
    // Landing background matches repeating water (0.7 speed) for seamless transition
    landingSection.style.backgroundPosition = `${scrollLeft * 0.7}px center`;
    
    // Landing midground matches repeating midground (0.8 speed) for seamless transition
    landingSection.style.setProperty('--landing-midground-offset', `${scrollLeft * 0.8}px`);
    
    // Sand-coral matches repeating sand (0.9 speed) for seamless transition
    landingSection.style.setProperty('--parallax-offset', `${scrollLeft * 0.9}px`);
  }
  
  // Move humuhumu fish from right to left at same pace as scroll from the start
  if (humuhumuFish) {
    const viewportWidth = window.innerWidth;
    const fishWidth = 300; // Match CSS width (300px)
    const rightSpacing = 48; // 3em = 48px (assuming 16px base)
    const leftSpacing = 64; // 4em = 64px (assuming 16px base)
    
    // Calculate total distance to move: from right edge (3em) to left edge (4em)
    // Fish starts with right edge at 3em from right, so left edge is at: viewportWidth - 3em - fishWidth
    // Fish ends with left edge at 4em from left
    // Distance to move: (viewportWidth - 3em - fishWidth) - 4em = viewportWidth - 7em - fishWidth
    const totalDistance = viewportWidth - rightSpacing - leftSpacing - fishWidth;
    
    // Move fish proportionally to scroll (1:1 ratio with scroll)
    // Clamp the position so it doesn't go beyond the left edge
    const fishPosition = Math.min(scrollLeft, totalDistance);
    
    // Get current vertical movement from swimming animation
    const verticalMovement = Math.sin(swimOffset) * 10;
    // Apply both transforms - negative because we're moving left
    humuhumuFish.style.transform = `translateX(${-fishPosition}px) translateY(${verticalMovement}px)`;

    
  }

  // Red coral + big seaweed move with the sand parallax
  const redCoral = document.querySelector('.red-coral-decoration');
  const bigSeaweed = document.querySelector('.big-seaweed-decoration');

  if (redCoral) {
    redCoral.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (bigSeaweed) {
    bigSeaweed.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }
});

// Convert vertical scroll (2-finger scroll) to horizontal scroll
scrollContainer.addEventListener('wheel', (e) => {
  // Prevent default vertical scrolling
  e.preventDefault();
  
  // Scroll horizontally instead with faster, instant scrolling
  // deltaY is the vertical scroll amount, multiply by 3-4 for faster, free-flowing scroll
  scrollContainer.scrollBy({
    left: e.deltaY * 2,
    behavior: 'auto'  // Instant scroll, no smooth animation
  });
}, { passive: false });  // passive: false allows preventDefault to work

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Use scrollIntoView for more reliable scrolling
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    });
  });
});