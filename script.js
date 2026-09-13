// EmailJS
emailjs.init('kVGma4HsmAdY25sd7');

// Smooth scroll for the hero arrow.
const scrollDown = document.getElementById('scroll-down');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Reveal sections as they enter the viewport.
function handleFadeInScroll() {
  const fadeEls = document.querySelectorAll('.fade-in-section');
  const triggerPoint = window.innerHeight + window.scrollY - 100;

  fadeEls.forEach((element) => {
    if (triggerPoint > element.offsetTop) {
      element.classList.add('visible');
    }
  });
}

// Highlight the navigation item for the section currently in view.
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const scrollPosition = window.scrollY + 140;

  let currentSection = 'hero';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}

window.addEventListener('load', () => {
  handleFadeInScroll();
  updateActiveNav();
});

window.addEventListener('scroll', () => {
  handleFadeInScroll();
  updateActiveNav();
});

// Close the mobile navigation after selecting a section.
document.querySelectorAll('.navbar .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar?.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navbar).hide();
    }
  });
});

// Contact form submission through EmailJS.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const alertBox = document.getElementById('formAlert');
    alertBox.textContent = '';
    alertBox.style.color = '';

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      alertBox.style.color = '#cf6679';
      alertBox.textContent = 'Please fill in all fields.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alertBox.style.color = '#cf6679';
      alertBox.textContent = 'Please enter a valid email address.';
      return;
    }

    alertBox.style.color = '#bb86fc';
    alertBox.textContent = 'Sending message...';

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    emailjs.send('service_ediljie', 'template_k6d6aho', templateParams)
      .then(() => {
        alertBox.style.color = '#03dac5';
        alertBox.textContent = 'Thank you! Your message has been sent.';
        this.reset();
      })
      .catch((error) => {
        alertBox.style.color = '#cf6679';
        alertBox.textContent = 'Failed to send message. Please try again later.';
        console.error('EmailJS error:', error);
      });
  });
}


// Light / dark mode toggle. Dark mode preserves the original portfolio appearance.
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function updateThemeToggle() {
  if (!themeToggle) return;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeToggle.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

updateThemeToggle();

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeToggle();
});
