// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

// Ensure menuToggle and navList exist before adding event listeners
if (menuToggle && navList) {
  // Toggle menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navList.classList.toggle('visible');
    
    // Toggle aria attributes for accessibility
    const isExpanded = navList.classList.contains('visible');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
      navList.classList.remove('visible');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('visible');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Rest of the code...

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      navList.classList.remove('visible');
    }
  }, 250);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Get the navbar height for offset
      const navbarHeight = document.querySelector('#navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - navbarHeight,
        behavior: "smooth"
      });
    }
  });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Visitor counter functionality
async function updateVisitorCount() {
  const proxyUrl = "__AZURE_FUNCTION_URL__&code=__AZURE_FUNCTION_KEY__";

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const visitorElement = document.getElementById("visitor-count");
      if (visitorElement) {
        visitorElement.innerText = `👁 Views: ${data.visitor_count}`;
      }
    } else {
      console.error("Error fetching visitor count:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initialize visitor counter
updateVisitorCount();

// Add touch event handling for mobile devices
if ('ontouchstart' in window) {
  const touchItems = document.querySelectorAll('.experience-item, .education-item');
  
  touchItems.forEach(item => {
    item.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-2px)';
    }, { passive: true });
    
    item.addEventListener('touchend', function() {
      this.style.transform = 'translateY(0)';
    }, { passive: true });
  });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add scroll-based animations
const scrollHandler = debounce(() => {
  const elements = document.querySelectorAll('.experience-item, .education-item');
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}, 100);

// Initialize scroll handler
window.addEventListener('scroll', scrollHandler, { passive: true });
