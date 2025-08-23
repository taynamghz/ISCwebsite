// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.25)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Registration form
    const registerForm = document.querySelector('#register form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation for required fields
            if (!data.fullName || !data.phoneNumber || !data.studentId || !data.major || 
                !data.graduationYear || !data.role || !data.department || !data.roleSuitability || !data.previousExperience) {
                showNotification('Please fill in all required fields marked with *.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Send data to Google Sheets via Google Apps Script
            submitToGoogleSheets(data)
                .then(response => {
                    if (response.status === 'success') {
                        showNotification('Application submitted successfully! Check your email for confirmation.', 'success');
                        this.reset();
                    } else {
                        showNotification('Error submitting application. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showNotification('Error submitting application. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.contactName || !data.contactEmail || !data.subject || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send contact form data to Google Sheets
            submitContactForm(data)
                .then(response => {
                    if (response.status === 'success') {
                        showNotification('Thank you for your message! We will get back to you soon.', 'success');
                        this.reset();
                    } else {
                        showNotification('Error sending message. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showNotification('Error sending message. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#0ba89d' : type === 'error' ? '#ef4337' : '#2b2564'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.mission-card, .team-member, .project-card, .gallery-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Gallery lightbox functionality (placeholder)
function openGalleryModal(imageSrc, title) {
    // This would be implemented for actual images
    console.log('Opening gallery modal for:', title);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-graphic');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to images (for future use)
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add hover effects for team members
document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gallery modal functionality
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }
    
    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});

// Gallery data for different events
const galleryData = {
    'international-food': [
        'international-food/IMG_5864.HEIC',
        'international-food/WhatsApp Image 2025-08-22 at 16.45.31 (3).jpeg'
    ],
    'game-board': [
        'game-board/WhatsApp Image 2025-08-22 at 16.45.31 (2).jpeg',
        'game-board/WhatsApp Image 2025-08-22 at 16.45.31 (1).jpeg'
    ],
    'street-eats': [
        'street-eats/2a8bde15-1ca9-48b0-bfed-f7b6123ea8cf.JPG',
        'street-eats/WhatsApp Image 2025-08-22 at 16.51.07.jpeg',
        'street-eats/WhatsApp Image 2025-08-22 at 16.51.19.jpeg',
        'street-eats/IMG_1443.HEIC',
        'street-eats/IMG_1450.HEIC',
        'street-eats/IMG_1663.HEIC',
        'street-eats/IMG_2379.HEIC',
        'street-eats/IMG_6227.HEIC',
        'street-eats/IMG_6271.HEIC',
        'street-eats/IMG_6275.HEIC',
        'street-eats/IMG_6371.HEIC'
    ],
    'hakaya-ramadan': [
        'hakaya-ramadan/DSC_0242.JPG',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.45.30 (1).jpeg',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.45.31.jpeg',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.47.25.jpeg',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.48.16.jpeg',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.48.59.jpeg',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.49.20.jpeg',
        'hakaya-ramadan/WhatsApp Image 2025-08-22 at 16.50.33.jpeg'
    ]
};

function openGallery(eventType) {
    const modal = document.getElementById('galleryModal');
    const modalGallery = document.getElementById('modalGallery');
    
    if (modal && modalGallery && galleryData[eventType]) {
        modalGallery.innerHTML = '';
        
        galleryData[eventType].forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${eventType} event`;
            img.className = 'modal-image';
            modalGallery.appendChild(img);
        });
        
        modal.style.display = "block";
    }
}

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect (uncomment to enable)
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0ba89d, #ffba4a);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for navigation (optional)
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = currentSection.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section;
        }
    }
    
    return sections[0];
}

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Slideshow functionality
let slideIndex = 1;

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
    }
    if (dots[slideIndex-1]) {
        dots[slideIndex-1].className += " active";
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show first slide
    showSlides(slideIndex);
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// Function to submit data to Google Sheets
async function submitToGoogleSheets(data) {
    // Your deployed Google Apps Script web app URL
    const scriptUrl = 'https://script.google.com/a/macros/psu.edu.sa/s/AKfycbzLcNym5zGLu7at8OvmDOoZfFVSvwDhviqtZ7z9rqkk30ftsGBb1UZZ2-sil2HJkv4J/exec';
    
    try {
        console.log('Submitting form data:', data);
        
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'cors', // Try with CORS first
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Form submission response:', result);
            return result;
        } else {
            console.error('Form submission failed:', response.status, response.statusText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // If CORS fails, try with no-cors as fallback
        try {
            const fallbackResponse = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });
            
            console.log('Fallback submission completed');
            return { status: 'success', message: 'Application submitted successfully!' };
            
        } catch (fallbackError) {
            console.error('Fallback submission also failed:', fallbackError);
            throw new Error('Failed to submit application. Please check your internet connection and try again.');
        }
    }
}

// Function to submit contact form data
async function submitContactForm(data) {
    // Your deployed Google Apps Script web app URL
    const scriptUrl = 'https://script.google.com/a/macros/psu.edu.sa/s/AKfycbzLcNym5zGLu7at8OvmDOoZfFVSvwDhviqtZ7z9rqkk30ftsGBb1UZZ2-sil2HJkv4J/exec';
    
    try {
        console.log('Submitting contact form data:', data);
        
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'cors', // Try with CORS first
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Contact form submission response:', result);
            return result;
        } else {
            console.error('Contact form submission failed:', response.status, response.statusText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Contact form submission error:', error);
        
        // If CORS fails, try with no-cors as fallback
        try {
            const fallbackResponse = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });
            
            console.log('Contact form fallback submission completed');
            return { status: 'success', message: 'Message sent successfully!' };
            
            } catch (fallbackError) {
        console.error('Contact form fallback submission also failed:', fallbackError);
        throw new Error('Failed to send message. Please check your internet connection and try again.');
    }
}

// Test function to check if the Google Apps Script is working
async function testFormSubmission() {
    console.log('Testing form submission...');
    
    const testData = {
        fullName: 'Test User',
        phoneNumber: '1234567890',
        studentId: 'TEST123',
        major: 'Computer Science',
        graduationYear: '2025',
        role: 'member',
        department: 'PM',
        roleSuitability: 'Test suitability',
        previousExperience: 'Test experience'
    };
    
    try {
        const result = await submitToGoogleSheets(testData);
        console.log('Test submission result:', result);
        showNotification('Test submission completed. Check console for details.', 'success');
    } catch (error) {
        console.error('Test submission failed:', error);
        showNotification('Test submission failed. Check console for details.', 'error');
    }
}
} 