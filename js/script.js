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
  const humuhumuContainer = document.querySelector('.humuhumu-container');
  const historySection = document.getElementById('history');
  
  if (humuhumuContainer) {
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
    
    // Check if scroll position is within history section
    let scale = 1; // Normal size
    if (historySection) {
      const historyLeft = historySection.offsetLeft;
      const historyRight = historyLeft + historySection.offsetWidth;
      
      // Check if current scroll position is within history section
      if (scrollLeft >= historyLeft - viewportWidth && scrollLeft <= historyRight) {
        scale = 0.85; // Slightly smaller (85% of original size)
      }
    }
    
    // Apply transform to the container so hover area moves with the fish
    humuhumuContainer.style.transform = `translateX(${-fishPosition}px) translateY(${verticalMovement}px) scale(${scale})`;
    humuhumuContainer.style.transformOrigin = 'bottom right'; // Scale from bottom right corner
  }

  // Red coral + big seaweed move with the sand parallax
  const redCoral = document.querySelector('.red-coral-decoration');
  const bigSeaweed = document.querySelector('.big-seaweed-decoration');
  const deadCoral = document.querySelector('.dead-coral-issue-container');  // Changed to container
  const blueCoral = document.querySelector('.blue-coral-container');
  const redCoralHistory = document.querySelector('.red-coral-history-container');
  const deadCoralHistory = document.querySelector('.dead-coral-history-container');
  const hawaiiFlag = document.querySelector('.hawaii-flag-container');
  const smallSeaweed = document.querySelector('.importance-small-seaweed'); // NEW
  const importanceBigSeaweed = document.querySelector('.importance-big-seaweed'); // NEW
  const issueFish4 = document.querySelector('.issue-fish-4'); // NEW
  const takingActionFish3 = document.querySelector('.taking-action-fish-3'); // NEW
  const takingActionBigSeaweed = document.querySelector('.taking-action-big-seaweed'); // NEW
  const relianceFish1 = document.querySelector('.importance-reliance-fish-1'); // NEW
  const takingActionSmallSeaweed = document.querySelector('.taking-action-small-seaweed'); // NEW

  if (redCoral) {
    redCoral.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (bigSeaweed) {
    bigSeaweed.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (smallSeaweed) { // NEW
    smallSeaweed.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (deadCoral) {
    deadCoral.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  // Blue coral in history section moves with the same parallax
  if (blueCoral) {
    blueCoral.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  // Red coral in history section moves with the same parallax
  if (redCoralHistory) {
    redCoralHistory.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  // Hawaii flag moves with the same parallax
  if (hawaiiFlag) {
    hawaiiFlag.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (importanceBigSeaweed) {
    importanceBigSeaweed.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (issueFish4) {
    issueFish4.style.transform =
      `translate(-50%, -50%) scaleX(-1) translateX(${scrollLeft * -0.1}px)`;
  }

  if (takingActionFish3) {
    takingActionFish3.style.transform =
      `translate(-50%, -50%) scaleX(-1) translateX(${scrollLeft * -0.1}px)`;
  }

  if (takingActionBigSeaweed) {
    takingActionBigSeaweed.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  if (relianceFish1) {
    relianceFish1.style.transform =
      `translateX(calc(50% + ${scrollLeft * -0.1}px)) scaleX(-1)`;
  }

  if (takingActionSmallSeaweed) {
    takingActionSmallSeaweed.style.transform =
      `translate(-50%, -50%) translateX(${scrollLeft * -0.1}px)`;
  }

  // Trigger turtle glide-in when importance section comes into view
  const importanceSection = document.getElementById('importance');
  const turtle = document.querySelector('.importance-turtle');
  let turtleAnimated = false;

  if (!turtleAnimated && importanceSection && turtle) {
    const importanceLeft = importanceSection.offsetLeft;
    const importanceRight = importanceLeft + importanceSection.offsetWidth;

    const viewportLeft = scrollLeft;
    const viewportRight = scrollLeft + window.innerWidth;

    if (viewportRight > importanceLeft && viewportLeft < importanceRight) {
      turtle.classList.add('visible');  // runs turtleGlideIn animation
      turtleAnimated = true;            // only once
    }
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

  const quizCards = document.querySelectorAll('.quiz-card');

  quizCards.forEach(card => {
    const correct = card.getAttribute('data-correct'); // "healthy" or "bleached"
    const options = card.querySelectorAll('.quiz-option');
    const backHeading = card.querySelector('.quiz-result-heading');
    const backText = card.querySelector('.quiz-result-text');
    const resetBtn = card.querySelector('.quiz-reset');

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.getAttribute('data-answer');

        if (answer === correct) {
          backHeading.textContent = 'correct!';
          if (correct === 'healthy') {
            backText.textContent =
              'This reef has strong color and lots of life. Corals have a symbiotic relationship with microscopic algae called zooxanthellae that live in their tissues. These algae are the coral’s primary food source and give them their color.';
          } else if (correct === 'bleached') {
            backText.textContent =
              'This reef has lost most of its color. Coral is left bleached and vulnerable. Without the algae, the coral loses its major source of food, turns white or very pale, and is more susceptible to disease.';
          }
        } else {
          backHeading.textContent = 'not quite';
          backText.textContent =
            'Look closely at the colors and how much white you see, does it look healthy or bleached?';
        }

        card.classList.add('flipped');
      });
    });

    resetBtn.addEventListener('click', () => {
      card.classList.remove('flipped');
    });
  });

  // Turtle glide-in when importance section comes into view
  const turtle = document.querySelector('.importance-turtle');
  const scrollRoot = document.querySelector('.scroll-container');

  if (turtle && scrollRoot && 'IntersectionObserver' in window) {
    const turtleObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            turtle.classList.add('visible'); // triggers CSS animation
            obs.unobserve(turtle);           // run only once
          }
        });
      },
      {
        root: scrollRoot,   // horizontal scroll container
        threshold: 0.3
      }
    );

    turtleObserver.observe(turtle);
  }

  // Click to swap green sea turtle image and toggle hover text
  const turtleContainer = document.querySelector('.importance-turtle-container');
  const turtleImg = document.querySelector('.importance-turtle');

  if (turtleContainer && turtleImg) {
    const originalSrc = 'assets/green-sea-turtle.png';
    const realSrc = 'assets/green-sea-turtle-real.png';

    turtleContainer.addEventListener('click', () => {
      if (turtleImg.src.includes('green-sea-turtle-real.png')) {
        // Back to illustration, re‑enable hover label
        turtleImg.src = originalSrc;
        turtleContainer.classList.remove('turtle-clicked');
      } else {
        // Show real photo, disable hover label
        turtleImg.src = realSrc;
        turtleContainer.classList.add('turtle-clicked');
      }
    });
  }

  // Click to swap monk seal image and toggle hover text/caption
  const monkContainer = document.querySelector('.importance-monk-seal-container');
  const monkImg = document.querySelector('.importance-monk-seal');

  if (monkContainer && monkImg) {
    const monkOriginalSrc = 'assets/monk-seal.png';
    const monkRealSrc = 'assets/monk-seal-real.png'; // make sure this file exists in assets/

    monkContainer.addEventListener('click', () => {
      if (monkImg.src.includes('monk-seal-real.png')) {
        // Back to illustration, re-enable hover label, hide caption
        monkImg.src = monkOriginalSrc;
        monkContainer.classList.remove('monk-clicked');
      } else {
        // Show real photo, disable hover label, show caption
        monkImg.src = monkRealSrc;
        monkContainer.classList.add('monk-clicked');
      }
    });
  }

  // Click to swap hawksbill image and toggle hover text/caption
  const hawksbillContainer = document.querySelector('.importance-hawksbill-container');
  const hawksbillImg = document.querySelector('.importance-hawksbill');

  if (hawksbillContainer && hawksbillImg) {
    const hawksbillOriginalSrc = 'assets/hawksbill-sea-turtle.png';
    const hawksbillRealSrc = 'assets/hawksbill-sea-turtle-real.png'; // make sure this exists

    hawksbillContainer.addEventListener('click', () => {
      if (hawksbillImg.src.includes('hawksbill-sea-turtle-real.png')) {
        // Back to illustration, re-enable hover label, hide caption
        hawksbillImg.src = hawksbillOriginalSrc;
        hawksbillContainer.classList.remove('hawksbill-clicked');
      } else {
        // Show real photo, disable hover label, show caption
        hawksbillImg.src = hawksbillRealSrc;
        hawksbillContainer.classList.add('hawksbill-clicked');
  }
});
  }

  // Sun popup for environmental influences
  const sunContainer = document.querySelector('.influence-sun-container');
  if (sunContainer) {
    sunContainer.addEventListener('click', () => {
      sunContainer.classList.toggle('sun-open');
    });
  }

  // Diver popup for human influences
  const diverContainer = document.querySelector('.influence-diver-container');
  if (diverContainer) {
    diverContainer.addEventListener('click', () => {
      diverContainer.classList.toggle('diver-open');
    });
  }
});