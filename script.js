document.addEventListener('DOMContentLoaded', function() {
    // Navbar transparency and scroll handling
    const navbar = document.getElementById('navbar');
    const siteMenu = document.getElementById('site-menu');
    const menuButton = document.getElementById('menu-button');
    
    // Initial navbar state (transparent at top)
    updateNavbarState();
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        updateNavbarState();
    });

window.addEventListener('message', (event) => {
  const heroContent = document.querySelector('.hero-content');
  if (event.data == 'open') {
    heroContent.classList.add('fade-out');
  } else {
    heroContent.classList.remove('fade-out');
  }
});
    
    function updateNavbarState() {
        if (window.scrollY > 50) {
            navbar.classList.remove('transparent');
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('transparent');
            navbar.classList.remove('scrolled');
        }
    }
    
    // Fix for Three.js iframe loading issue - increased delays
    const heroIframe = document.querySelector('.hero-iframe');
    if (heroIframe) {
        // Method 1: Force a resize event after iframe loads with increased delays
        heroIframe.addEventListener('load', function() {
            // First resize attempt
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 500); // Increased from 100ms
            
            // Second resize attempt
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 1500); // Increased from 1000ms
            
            // Third attempt for extra safety
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 3000);
        });
        
        // Method 2: Alternative approach - periodically trigger resize during load
        let resizeAttempts = 0;
        const maxAttempts = 8; // Increased from 5
        const resizeInterval = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
            resizeAttempts++;
            
            if (resizeAttempts >= maxAttempts) {
                clearInterval(resizeInterval);
            }
        }, 500);
        
        // Method 3: If iframe is already loaded, trigger resize now
        if (heroIframe.complete) {
            window.dispatchEvent(new Event('resize'));
        }
    }
    
    // Menu toggle - simplified for top-bar only menu
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            siteMenu.classList.toggle('open');
        });
    }
    
    // Close menu when clicking on menu links
    const navLinks = document.querySelectorAll('#site-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            siteMenu.classList.remove('open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is outside the menu and button
        if (!siteMenu.contains(e.target) && 
            e.target !== menuButton && 
            !menuButton.contains(e.target) &&
            siteMenu.classList.contains('open')) {
            siteMenu.classList.remove('open');
        }
    });
    
    // Smooth scroll for gallery buttons
    const galleryLinks = document.querySelectorAll('a[href="#gallery"]');
    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Carousel functionality
    const carouselContainer = document.getElementById('carousel-view-container');
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('[id^="slide-"]');
        const dots = carouselContainer.querySelectorAll('.carousel-dot');
        const prevButton = carouselContainer.querySelector('.carousel-prev');
        const nextButton = carouselContainer.querySelector('.carousel-next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Initialize carousel
        function showSlide(index) {
            // Hide all slides first
            slides.forEach(slide => {
                slide.classList.add('opacity-0');
                slide.classList.remove('opacity-100');
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('bg-gray-500');
                    dot.classList.remove('bg-gray-300');
                } else {
                    dot.classList.remove('bg-gray-500');
                    dot.classList.add('bg-gray-300');
                }
            });
            
            // Show the active slide
            slides[index].classList.remove('opacity-0');
            slides[index].classList.add('opacity-100');
            
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            const newIndex = (currentSlide + 1) % totalSlides;
            showSlide(newIndex);
        }
        
        // Previous slide function
        function prevSlide() {
            const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(newIndex);
        }
        
        // Add event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Add event listeners to prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        // Auto rotate slides every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Initialize the first slide
        showSlide(0);
    }
});
