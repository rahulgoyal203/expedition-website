document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Handle ConvertKit form submission
    const convertkitForm = document.querySelector('.convertkit-form');
    if (convertkitForm) {
        convertkitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // This is a placeholder for the actual ConvertKit form submission
            // When you get your ConvertKit embed code, you won't need this code
            // as ConvertKit's JavaScript will handle the submission
            
            const emailInput = this.querySelector('.convertkit-email-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                const formContainer = this.closest('.convertkit-form-container');
                formContainer.innerHTML = '<div class="success-message">Thanks! We\'ll keep you updated.</div>';
                
                // In a real implementation, you'd submit to ConvertKit's API here
                console.log('Email submitted:', email);
            }
        });
    }
    
    // For the "Get Early Access" button, we'll scroll to the form
    const getEarlyAccessBtn = document.getElementById('getEarlyAccess');
    if (getEarlyAccessBtn) {
        getEarlyAccessBtn.addEventListener('click', function() {
            const convertkitFormContainer = document.querySelector('.convertkit-form-container');
            if (convertkitFormContainer) {
                convertkitFormContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Book carousel functionality
    const bookCarousel = document.querySelector('.book-carousel');
    if (bookCarousel) {
        // Clone the books to create a seamless infinite scroll effect
        const bookItems = bookCarousel.querySelectorAll('.book-item');
        bookItems.forEach(item => {
            const clone = item.cloneNode(true);
            bookCarousel.appendChild(clone);
        });
        
        // Adjust animation duration based on number of books
        const totalBooks = bookCarousel.querySelectorAll('.book-item').length;
        bookCarousel.style.animationDuration = `${totalBooks * 5}s`;
    }
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const visualizationSection = document.querySelector('.visualization');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        if (visualizationSection) {
            visualizationSection.style.backgroundPositionY = (scrollPosition - visualizationSection.offsetTop) * 0.3 + 'px';
        }
    });
    

    
    // Add subtle parallax effect to sections on scroll
    function addParallaxToSections() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            
            sections.forEach((section, index) => {
                // Different speeds for different sections
                const speed = 0.03 * (index % 3 + 1);
                const yPos = scrollPosition * speed;
                
                // Apply the transform
                section.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Initialize animations
    // Disabled for now as it can cause performance issues
    // addParallaxToSections();
    

});
