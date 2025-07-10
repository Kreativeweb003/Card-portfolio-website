
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Set the first section as active by default
    sections[0].classList.add('active');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the corresponding section
            const sectionId = this.getAttribute('data-section');
            const activeSection = document.getElementById(sectionId);
            
            // Add active class to section with animation
            activeSection.classList.add('active');
            
            // Determine animation direction based on section order
            const currentIndex = Array.from(navLinks).findIndex(link => link.classList.contains('active'));
            const prevIndex = Array.from(navLinks).findIndex(link => link.classList.contains('active'));
            
            if (currentIndex > prevIndex) {
                activeSection.classList.add('slide-right');
            } else if (currentIndex < prevIndex) {
                activeSection.classList.add('slide-left');
            }
            
            // Remove animation classes after animation completes
            setTimeout(() => {
                activeSection.classList.remove('slide-left', 'slide-right');
            }, 500);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-left, .slide-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    };

    // Initialize animation state
    const animatedElements = document.querySelectorAll('.slide-left, .slide-right');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('slide-left')) {
            element.style.transform = 'translateX(-20px)';
        } else {
            element.style.transform = 'translateX(20px)';
        }
    });

    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
