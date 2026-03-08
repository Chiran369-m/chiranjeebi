// ========== MOBILE NAVIGATION ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== STICKY NAVBAR ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== TYPING ANIMATION ==========
const typeWriterElements = [
    "Machine Learning",
    "Reinforcement Learning",
    "Computer Vision",
    "Deep Learning"
];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let isDeleting = false;
let typeSpeed = 100;

const typewriterElement = document.getElementById('typewriter');

function type() {
    if (count === typeWriterElements.length) {
        count = 0;
    }
    currentText = typeWriterElements[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    typewriterElement.textContent = letter;

    let timeout = isDeleting ? 50 : 100;

    if (!isDeleting && letter.length === currentText.length) {
        timeout = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        timeout = 500; // Pause before new word
    }

    setTimeout(type, timeout);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Check if it's a staggered element
            if (entry.target.classList.contains('reveal-stagger')) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // add a slight delay based on internal batch 
            } else {
                entry.target.classList.add('active');
            }
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// ========== SKILL BARS ANIMATION ==========
const skillBars = document.querySelectorAll('.progress-line span');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.parentElement.getAttribute('data-progress');
            bar.style.width = progress;
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ========== MODALS LOGIC ==========
const modalBtns = document.querySelectorAll('.modal-btn');
const closeBtns = document.querySelectorAll('.close-modal');
const modalOverlays = document.querySelectorAll('.modal-overlay');

modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// ========== PARTICLE BACKGROUND ANIMATION (NEURAL NETWORK EFFECT) ==========
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

// Resize event
window.addEventListener('resize', () => {
    setCanvasSize();
    initParticles();
});

// Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Check bounds and move
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize particles array
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;

    // Limits
    if (numberOfParticles > 100) numberOfParticles = 100;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * 1.5) - 0.75;
        let directionY = (Math.random() * 1.5) - 0.75;

        let color = '#4facfe';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect points to look like a neural network
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                if (opacityValue < 0) opacityValue = 0;

                ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connectParticles();
}

initParticles();
animateParticles();

// ========== ACTIVE NAVBAR LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// ========== CONTACT FORM SUBMISSION (WEB3FORMS) ==========
const contactForm = document.querySelector('.contact-form');
const formResult = document.querySelector('.form-result');
const submitBtn = document.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Save original button text and change to loading state
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        formResult.style.display = 'block';
        formResult.style.color = '#94a3b8'; // muted text
        formResult.textContent = "Please wait...";

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    formResult.style.color = '#00f2fe'; // Primary cyan
                    formResult.textContent = "Message sent successfully! I'll get back to you soon.";
                    contactForm.reset();
                } else {
                    formResult.style.color = '#e74c3c'; // Error red
                    formResult.textContent = json.message || "Something went wrong!";
                }
            })
            .catch(error => {
                formResult.style.color = '#e74c3c';
                formResult.textContent = "Something went wrong! Please try again.";
            })
            .finally(() => {
                // Restore button
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;

                // Hide the success/error message after 5 seconds
                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 5000);
            });
    });
}
