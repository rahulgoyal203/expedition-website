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
    
    // Get all "Stay in the loop" buttons
    const stayInLoopButtons = document.querySelectorAll('.stay-in-loop-button');
    
    // Add click event listener to each button
    stayInLoopButtons.forEach(button => {
        button.addEventListener('click', openTypeform);
    });
    
    // Function to open Typeform
    function openTypeform() {
        // You'll need to replace this with your actual Typeform embed code or URL
        const typeformUrl = 'https://form.typeform.com/to/YOUR_TYPEFORM_ID';
        
        // Create a modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'typeform-overlay';
        document.body.appendChild(overlay);
        
        // Create a modal container
        const modal = document.createElement('div');
        modal.className = 'typeform-modal';
        modal.innerHTML = `
            <div class="typeform-header">
                <h3>Stay in the loop</h3>
                <button class="close-button">&times;</button>
            </div>
            <div class="typeform-content">
                <p>Enter your email to get updates on Expedition's launch and early access opportunities.</p>
                <form id="email-form">
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit" class="submit-button">Subscribe</button>
                </form>
                <p class="privacy-note">We respect your privacy and will never share your information.</p>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', closeTypeform);
        
        overlay.addEventListener('click', closeTypeform);
        
        // Prevent clicks inside the modal from closing it
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Handle form submission
        const form = document.getElementById('email-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend or Typeform API
            console.log('Email submitted:', email);
            
            // Show success message
            modal.innerHTML = `
                <div class="typeform-header">
                    <h3>Thank you!</h3>
                    <button class="close-button">&times;</button>
                </div>
                <div class="typeform-content success">
                    <p>You're on the list! We'll keep you updated on Expedition's launch.</p>
                </div>
            `;
            
            // Re-add close functionality
            const newCloseButton = modal.querySelector('.close-button');
            newCloseButton.addEventListener('click', closeTypeform);
        });
        
        // Add styles for the modal
        const style = document.createElement('style');
        style.textContent = `
            .typeform-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .typeform-modal {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                transform: translateY(20px);
                opacity: 0;
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
            
            .typeform-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .typeform-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .close-button {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                transition: color 0.2s ease;
            }
            
            .close-button:hover {
                color: #333;
            }
            
            .typeform-content {
                padding: 30px 25px;
            }
            
            .typeform-content.success {
                text-align: center;
                padding: 50px 25px;
            }
            
            #email-form {
                margin: 25px 0;
                display: flex;
                flex-direction: column;
            }
            
            #email-form input {
                padding: 15px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                font-size: 16px;
                margin-bottom: 15px;
            }
            
            .submit-button {
                background-color: #000;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 15px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            
            .submit-button:hover {
                background-color: #333;
            }
            
            .privacy-note {
                font-size: 0.8rem;
                color: #999;
                text-align: center;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
            modal.style.opacity = '1';
        }, 10);
    }
    
    function closeTypeform() {
        const overlay = document.querySelector('.typeform-overlay');
        const modal = document.querySelector('.typeform-modal');
        
        // Animate out
        overlay.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        modal.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            if (overlay) overlay.remove();
            if (modal) modal.remove();
        }, 500);
    }
    
    // Video player functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        playButton.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
        
        playButton.addEventListener('click', function() {
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = `
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                    picture-in-picture" allowfullscreen></iframe>
                `;
                
                // Add styles for the video
                const style = document.createElement('style');
                style.textContent = `
                    .video-container iframe {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 12px;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
    
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
    
    // Meditation card interaction
    const playPauseButton = document.querySelector('.play-pause-button');
    if (playPauseButton) {
        let isPlaying = true;
        
        playPauseButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        playPauseButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        playPauseButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            const pauseIcon = this.querySelector('.pause-icon');
            
            if (isPlaying) {
                pauseIcon.textContent = '⏸';
                // Add any play functionality here
                console.log('Meditation resumed');
            } else {
                pauseIcon.textContent = '▶️';
                // Add any pause functionality here
                console.log('Meditation paused');
            }
        });
    }
});
