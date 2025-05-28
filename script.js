// Include emailjs.init with your user (public) ID (replace below)
emailjs.init('kVGma4HsmAdY25sd7');

// Scroll down arrow: scrolls to About section
document.getElementById('scroll-down').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Toggle visibility of Education, Tech Stack, Certifications sections
function showSection(sectionId) {
  const sections = ['education', 'tech-stack', 'certifications'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    el.style.display = (id === sectionId) ? 'block' : 'none';
  });
}

// Initialize showing Education by default on page load and manage animations
window.addEventListener('load', () => {
  showSection('education');
  handleFadeInScroll();
});

// Fade in animation when elements come into viewport
function handleFadeInScroll() {
  const fadeEls = document.querySelectorAll('.fade-in-section');
  const windowBottom = window.innerHeight + window.scrollY;
  fadeEls.forEach(el => {
    if (windowBottom > el.offsetTop + 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeInScroll);

// Contact form submission handling with EmailJS
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const alertBox = document.getElementById('formAlert');
  alertBox.textContent = '';
  alertBox.style.color = '';

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    alertBox.style.color = '#cf6679'; // red-like error color
    alertBox.textContent = 'Please fill in all fields.';
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alertBox.style.color = '#cf6679';
    alertBox.textContent = 'Please enter a valid email address.';
    return;
  }

  alertBox.style.color = '#bb86fc'; // purple info
  alertBox.textContent = 'Sending message...';

  // Prepare parameters for your EmailJS template
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

   emailjs.send('service_ediljie', 'template_k6d6aho', templateParams)
    .then(() => {
      alertBox.style.color = '#03dac5'; // teal success
      alertBox.textContent = 'Thank you! Your message has been sent.';
      this.reset();
    }).catch(error => {
      alertBox.style.color = '#cf6679';
      alertBox.textContent = 'Failed to send message. Please try again later.';
      console.error('EmailJS error:', error);
    });
});


//service_ediljie, template_k6d6aho, kVGma4HsmAdY25sd7
