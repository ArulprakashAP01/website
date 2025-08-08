// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:,.<>?/~`';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Terminal-like Typing Effect
function typeWriter(element, text, speed = 50) {
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

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Add terminal-like sound effect
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    audio.volume = 0.1;
    audio.play().catch(() => {});
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Enhanced Form Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        // Add terminal-like sound effect
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        audio.volume = 0.1;
        audio.play().catch(() => {});
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Contact Form Bot
const formResponse = document.createElement('div');
formResponse.className = 'form-response';

const botResponses = {
    greeting: [
        "Thank you for reaching out! I'll get back to you shortly.",
        "Thanks for your message! I'll review it and respond as soon as possible.",
        "Message received! I'll be in touch with you soon."
    ],
    error: [
        "I apologize, but I couldn't process your message. Please try again.",
        "There seems to be an issue. Please check your input and try again.",
        "Something went wrong. Please ensure all fields are filled correctly."
    ],
    spam: [
        "I've received your message, but it appears to be spam. Please ensure you're human.",
        "Your message has been flagged as potential spam. Please try again with valid content.",
        "Unable to process your message due to spam detection. Please try again."
    ],
    project: [
        "I'd be happy to discuss your project! Let me analyze your requirements.",
        "Your project sounds interesting! I'll review the details and get back to you.",
        "Thanks for sharing your project idea. I'll evaluate it and respond with my thoughts."
    ],
    job: [
        "Thank you for your interest in working together! I'll review your proposal.",
        "I appreciate your job offer. Let me check the details and get back to you.",
        "Thanks for considering me for this position. I'll review the opportunity."
    ],
    question: [
        "That's a great question! Let me provide you with a detailed response.",
        "I'll research your question and get back to you with a comprehensive answer.",
        "Thanks for asking! I'll prepare a thorough response to your question."
    ],
    feedback: [
        "Thank you for your valuable feedback! I appreciate your input.",
        "Your feedback is important to me. I'll take it into consideration.",
        "Thanks for sharing your thoughts. Your feedback helps me improve."
    ]
};

function analyzeMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('collaborate')) {
        return 'project';
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('position') || lowerMessage.includes('hire')) {
        return 'job';
    }
    
    if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('why') || lowerMessage.includes('?')) {
        return 'question';
    }
    
    if (lowerMessage.includes('feedback') || lowerMessage.includes('suggestion') || lowerMessage.includes('improve')) {
        return 'feedback';
    }
    
    return 'greeting';
}

function getRandomResponse(type) {
    const responses = botResponses[type];
    return responses[Math.floor(Math.random() * responses.length)];
}

function isSpam(message) {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'prize', 'free money'];
    const lowerMessage = message.toLowerCase();
    return spamKeywords.some(keyword => lowerMessage.includes(keyword));
}

function validateEmail(email) {
    // Stricter regex for email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) return false;
    // Check for common domain typos
    const commonTypos = [
        /@gmal\.com$/i,
        /@gmial\.com$/i,
        /@gnail\.com$/i,
        /@gmaill\.com$/i,
        /@gmail\.co$/i,
        /@gmail\.con$/i
    ];
    for (const typo of commonTypos) {
        if (typo.test(email)) return false;
    }
    return true;
}

function showResponse(message, type = 'success') {
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
    formResponse.style.display = 'block';
    
    // Add typing effect
    formResponse.style.opacity = '0';
    setTimeout(() => {
        formResponse.style.opacity = '1';
    }, 100);

    // Add follow-up message after a delay
    if (type === 'success') {
        setTimeout(() => {
            const followUpMessage = "I'll process your request and get back to you within 24 hours.";
            formResponse.textContent += '\n\n' + followUpMessage;
        }, 2000);
    }
}

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js with optimized settings
    particlesJS('particles-js', {
        particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: '#00ff00' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
            },
            lineLinked: {
                enable: true,
                distance: 150,
                color: '#00ff00',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                outMode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onHover: { enable: true, mode: 'repulse' },
                onClick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Initialize mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Optimized smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimized parallax effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Optimized stats animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
            const duration = 1000; // Reduced from 2000 to 1000
            const step = target / (duration / 16);
            let current = 0;

            const updateStat = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };

            updateStat();
        });
    };

    // Optimized Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section, .project-card, .skill-card, .stats').forEach(el => {
        observer.observe(el);
    });

    // Optimized mouse move effect
    let mouseMoveTimeout;
    document.addEventListener('mousemove', (e) => {
        if (mouseMoveTimeout) {
            cancelAnimationFrame(mouseMoveTimeout);
        }

        mouseMoveTimeout = requestAnimationFrame(() => {
            const cards = document.querySelectorAll('.project-card');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;

                const angleX = (y - cardY / window.innerHeight) * 20;
                const angleY = (x - cardX / window.innerWidth) * -20;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
        });
    });

    // Optimized form handling
    const form = document.querySelector('form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced from 2000 to 1000
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                form.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message';
                }, 2000); // Reduced from 3000 to 2000
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Error!';
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message';
                }, 2000);
            }
        });
    }

    // Optimized project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Optimized typing effect
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = typewriter.textContent;
        typewriter.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                typewriter.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50); // Reduced from 100 to 50
            }
        };

        type();
    }

    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        cursorFollower.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        cursorFollower.classList.remove('click');
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    function animateCursor() {
        // Direct cursor movement
        cursorX = mouseX;
        cursorY = mouseY;
        
        // Smooth follower movement
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        // Update positions
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }

    // Start animation
    animateCursor();
});

// Function to validate form data
function validateFormData(data) {
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showFormResponse('Please fill in all fields.', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormResponse('Please enter a valid email address.', 'error');
        return false;
    }

    // Message length validation
    if (data.message.length < 10) {
        showFormResponse('Message must be at least 10 characters long.', 'error');
        return false;
    }

    return true;
}

// Function to show form response messages
function showFormResponse(message, type) {
    // Remove any existing response
    const existingResponse = document.querySelector('.form-response');
    if (existingResponse) {
        existingResponse.remove();
    }

    // Create new response element
    const response = document.createElement('div');
    response.className = `form-response ${type}`;
    response.textContent = message;

    // Insert response before the form
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(response, form);

    // Remove response after 5 seconds
    setTimeout(() => {
        response.style.opacity = '0';
        setTimeout(() => response.remove(), 300);
    }, 5000);
}

// Add CSS for enhanced form response
const style = document.createElement('style');
style.textContent = `
    .form-response {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 4px;
        display: none;
        transition: opacity 0.3s ease;
        white-space: pre-line;
        line-height: 1.6;
    }
    
    .form-response.success {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid var(--primary);
        color: var(--primary);
    }
    
    .form-response.error {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid var(--error);
        color: var(--error);
    }
    
    .contact-form button[type="submit"]:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .contact-form button[type="submit"] {
        position: relative;
        overflow: hidden;
    }
    
    .contact-form button[type="submit"]::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: 0.5s;
    }
    
    .contact-form button[type="submit"]:hover::after {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Enhanced Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const children = entry.target.querySelectorAll('.fade-in');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Enhanced Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Initialize Matrix Rain
createMatrixRain();

// Add CSS for Matrix Rain
const style = document.createElement('style');
style.textContent = `
    .matrix-rain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.1;
    }
    
    .success-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--terminal-bg);
        color: var(--primary);
        padding: 1rem 2rem;
        border: var(--terminal-border);
        box-shadow: var(--glow);
        font-family: 'Courier New', monospace;
        animation: slideIn 0.3s ease forwards;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .form-group.focused label {
        transform: translateY(-1.5rem) scale(0.8);
        color: var(--primary);
    }
    
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        transform: translateY(0);
        box-shadow: var(--glow);
    }
    
    .menu-btn {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    .menu-btn span {
        display: block;
        width: 25px;
        height: 2px;
        background: var(--primary);
        margin: 5px 0;
        transition: all 0.3s ease;
    }
    
    .menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .loading-message {
        color: var(--primary);
        font-size: 1.5rem;
        font-family: 'Courier New', monospace;
        text-shadow: var(--glow);
        animation: blink 1s infinite;
    }
    
    @media (max-width: 768px) {
        .menu-btn {
            display: block;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--terminal-bg);
            padding: 1rem;
            display: none;
            flex-direction: column;
            align-items: center;
            border-bottom: var(--terminal-border);
            box-shadow: var(--glow);
        }
        
        .nav-links.active {
            display: flex;
        }
        
        .nav-links a {
            margin: 1rem 0;
        }
    }
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };

            // Send email to you
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'Your Name' // Replace with your name
            });

            // Send auto-reply to the user
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_AUTO_REPLY_TEMPLATE_ID', {
                to_name: formData.name,
                to_email: formData.email,
                from_name: 'Your Name' // Replace with your name
            });

            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();

        } catch (error) {
            console.error('Error sending email:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
} 