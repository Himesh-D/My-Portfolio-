// Custom Cursor
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Add a slight delay for the outline for a smooth trailing effect
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: 'forwards' });
});

// Hover effect for links and buttons to expand the cursor
const hoverElements = document.querySelectorAll('a, button, input, textarea');
hoverElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.width = '70px';
    cursorOutline.style.height = '70px';
    cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
    cursorOutline.style.borderColor = 'rgba(56, 189, 248, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.backgroundColor = 'transparent';
    cursorOutline.style.borderColor = 'rgba(56, 189, 248, 0.5)';
  });
});

// Scroll Reveal with Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

revealElements.forEach((el) => observer.observe(el));

// Navbar Scroll Effect
const navWrap = document.querySelector('.nav-wrap');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navWrap.classList.add('scrolled');
  } else {
    navWrap.classList.remove('scrolled');
  }
});

// Dynamic background blobs tracking mouse slightly
const blobs = document.querySelectorAll('.blob');
window.addEventListener('mousemove', (e) => {
  // Only track subtly
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  blobs.forEach((blob, index) => {
    // Each blob moves at a slightly different speed
    const speed = (index + 1) * 30; 
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;
    
    // We add this transform to the element inline, overriding the keyframes slightly 
    // Wait, overriding CSS animation transform via JS can cause fighting.
    // We'll translate an additional wrapper or just rely on margins.
    // Instead, let's just adjust margin for subtle effect without breaking the keyframe transform.
    blob.style.marginLeft = `${xOffset}px`;
    blob.style.marginTop = `${yOffset}px`;
  });
});
