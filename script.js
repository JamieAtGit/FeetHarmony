// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '1px solid rgba(226, 232, 240, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid #e2e8f0';
    }
    
    lastScrollTop = scrollTop;
});

// Form handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        showSuccessMessage();
        this.reset();
    });
}

// Success message function
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            margin: 1rem 0;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            animation: slideInFromTop 0.5s ease-out;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>
            Thank you for your message! We'll get back to you soon.
        </div>
    `;
    
    const form = document.querySelector('.form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animatedElements = document.querySelectorAll('.service-card, .location-item, .contact-method');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            // Only add loading effect for anchor links
            return;
        }
        
        // Add loading effect
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
        }, 2000);
    });
});

// Add hover effect to cards
document.querySelectorAll('.service-card, .hero-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInFromTop {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .success-message {
        animation: slideInFromTop 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Add typing effect to hero title (optional enhancement)
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus indicators for keyboard navigation
document.querySelectorAll('.nav-link, .btn').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #2563eb';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize any additional components here
    console.log('Foot Harmony website loaded successfully!');
});
// Enhanced Website Features

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (\!progressBar) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<div class="scroll-progress"></div>';
        document.body.appendChild(indicator);
        progressBar = indicator.querySelector('.scroll-progress');
    }
    
    progressBar.style.width = scrollPercent + '%';
}

// Enhanced Fade-in Animation on Scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .benefit-card, .review-card, .location-item, .contact-method');
    
    elements.forEach(element => {
        if (\!element.classList.contains('fade-in')) {
            element.classList.add('fade-in');
        }
        
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize enhancements on page load
document.addEventListener('DOMContentLoaded', function() {
    updateScrollProgress();
    handleScrollAnimations();
});

// Enhanced scroll event handler
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        updateScrollProgress();
        handleScrollAnimations();
    });
});
