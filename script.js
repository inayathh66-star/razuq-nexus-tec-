// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change icon
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real scenario, you would send this to a server
        // For Netlify, you can use their forms service
        console.log('Form data:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Service cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Current year for footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
// RazuQ Nexus Logo Animation
const razuqLogo = document.getElementById('razuqLogo');
const logoPetals = document.querySelectorAll('.logo-petal');
let isLogoBlooming = false;

// Set rotation values for petals
logoPetals.forEach((petal, index) => {
    const rotation = index * 45;
    petal.style.setProperty('--rotate', `${rotation}deg`);
});

// Flower blooming animation on hover
razuqLogo.addEventListener('mouseenter', function() {
    if (!isLogoBlooming) {
        this.classList.add('logo-bloom');
        isLogoBlooming = true;
        
        // Animate petals sequentially
        logoPetals.forEach((petal, index) => {
            setTimeout(() => {
                petal.style.opacity = '1';
                petal.style.transform = `rotate(${index * 45}deg) translateY(-25px) scale(1)`;
            }, index * 100);
        });
    }
});

razuqLogo.addEventListener('mouseleave', function() {
    // Close flower petals with delay
    logoPetals.forEach((petal, index) => {
        setTimeout(() => {
            petal.style.opacity = '0';
            petal.style.transform = `rotate(${index * 45}deg) translateY(-25px) scale(${0.8 - index * 0.05})`;
        }, index * 50);
    });
    
    setTimeout(() => {
        isLogoBlooming = false;
        this.classList.remove('logo-bloom');
    }, 800);
});

// Animate logo on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        razuqLogo.classList.add('logo-bloom');
        isLogoBlooming = true;
        
        // Bloom animation on load
        logoPetals.forEach((petal, index) => {
            setTimeout(() => {
                petal.style.opacity = '1';
                petal.style.transform = `rotate(${index * 45}deg) translateY(-25px) scale(1)`;
                
                // Then close after showing
                setTimeout(() => {
                    petal.style.opacity = '0';
                    petal.style.transform = `rotate(${index * 45}deg) translateY(-25px) scale(${0.8 - index * 0.05})`;
                }, 2000 + (index * 100));
            }, 500 + (index * 150));
        });
        
        // Reset bloom state
        setTimeout(() => {
            isLogoBlooming = false;
            razuqLogo.classList.remove('logo-bloom');
        }, 3500);
    }, 800);
});