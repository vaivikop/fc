
// INDOACSPORTS Website JavaScript
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
    });
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  });
  // Sticky header
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  window.addEventListener('scroll', () => {
  if (window.scrollY > headerHeight) {
  header.classList.add('bg-blue-900', 'shadow-md');
  } else {
  header.classList.remove('bg-blue-900', 'shadow-md');
  }
  });
  
  // Lottie animation for hero background
  lottie.loadAnimation({
      container: document.getElementById('lottie-background'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json' // Replace with an appropriate football-themed animation
  });
  
  // Intersection Observer for reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
          }
      });
  }, {
      threshold: 0.1
  });
  
  revealElements.forEach(element => {
      revealObserver.observe(element);
  });
  
  // Gallery lightbox
  const galleryImages = document.querySelectorAll('#gallery img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);
  
  galleryImages.forEach(image => {
      image.addEventListener('click', e => {
          lightbox.classList.add('active');
          const img = document.createElement('img');
          img.src = image.src;
          while (lightbox.firstChild) {
              lightbox.removeChild(lightbox.firstChild);
          }
          lightbox.appendChild(img);
      });
  });
  
  lightbox.addEventListener('click', e => {
      if (e.target !== e.currentTarget) return;
      lightbox.classList.remove('active');
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(contactForm);
      const response = await fetch('/submit-form', {
          method: 'POST',
          body: formData
      });
  
      if (response.ok) {
          alert('Message sent successfully!');
          contactForm.reset();
      } else {
          alert('There was an error sending your message. Please try again.');
      }
  });
  
  // Newsletter subscription
  const newsletterForm = document.getElementById('newsletter-form');
  
  newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = newsletterForm.querySelector('input[type="email"]').value;
      const response = await fetch('/subscribe', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
      });
  
      if (response.ok) {
          alert('Thank you for subscribing to our newsletter!');
          newsletterForm.reset();
      } else {
          alert('There was an error subscribing. Please try again.');
      }
  });
  
  // Animated counters for statistics
  function animateCounter(element, target, duration) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
          start += increment;
          element.textContent = Math.floor(start);
          if (start >= target) {
              clearInterval(timer);
              element.textContent = target;
          }
      }, 16);
  }
  
  const counterElements = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = parseInt(entry.target.getAttribute('data-target'));
              animateCounter(entry.target, target, 2000);
              counterObserver.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.5
  });
  
  counterElements.forEach(counter => {
      counterObserver.observe(counter);
  });
  
  // Testimonial carousel
  const testimonialContainer = document.querySelector('.testimonial-container');
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
          testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
      });
  }
  
  function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  }
  
  setInterval(nextTestimonial, 5000);
  showTestimonial(currentTestimonial);
  
  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const heroSection = document.querySelector('#home');
      heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  });
  
  // Floating animation for CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
          button.classList.add('animate-float');
      });
      button.addEventListener('mouseleave', () => {
          button.classList.remove('animate-float');
      });
  });
  
  // Lazy loading for images
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              lazyImageObserver.unobserve(img);
          }
      });
  }, {
      rootMargin: '0px 0px 200px 0px'
  });
  
  lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
  });
  
  // Add 'active' class to current navigation link
  function setActiveNavLink() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
  
      let currentSection = '';
  
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.pageYOffset >= sectionTop - 60) {
              currentSection = section.getAttribute('id');
          }
      });
  
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.add('active');
          }
      });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  window.addEventListener('load', setActiveNavLink);
  
  // Initialize AOS (Animate on Scroll) library
  AOS.init({
      duration: 1000,
      once: true,
      offset: 100
  });
  