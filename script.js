document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.getElementById('navbar');
    // Using a simple scroll check for stickiness
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Sticky after 50px of scroll
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });


    // 2. Hero Section Carousel
    const carouselContainer = document.querySelector('.carousel-container'); // Need this to get the size
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let counter = 0;
    let size; 
    const numImages = carouselImages.length;
    let slideInterval; // Variable for auto-slide interval

    // Function to set the size of a single slide (must be called after DOM is ready)
    function setSlideSize() {
        // Use the width of the container, or the image itself if necessary
        size = carouselContainer.clientWidth; 
        // Initial positioning to show the first image
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    // Recalculate size on window resize
    window.addEventListener('resize', () => {
        setSlideSize();
        // Recalculate current slide position
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });
    
    // Initial size calculation
    setSlideSize(); 


    // Create dots
    for (let i = 0; i < numImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');


    // Function to update the active dot indicator
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[counter].classList.add('active');
    }

    // Function to go to a specific slide
    function goToSlide(index) {
        counter = index;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        // COMPLETE THE LINE HERE:
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        updateDots();
    }
    
    // Next button logic
    nextBtn.addEventListener('click', () => {
        if (counter >= numImages - 1) {
            goToSlide(0); // Loop back to the first slide
        } else {
            goToSlide(counter + 1);
        }
        resetInterval();
    });

    // Previous button logic
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            goToSlide(numImages - 1); // Loop back to the last slide
        } else {
            goToSlide(counter - 1);
        }
        resetInterval();
    });
    
    // Auto-slide functionality
    function startInterval() {
        slideInterval = setInterval(() => {
            // Check if it's the last slide, if so, go to the first
            if (counter >= numImages - 1) {
                goToSlide(0);
            } else {
                goToSlide(counter + 1);
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    // Reset interval on manual interaction
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Start the automatic carousel on load
    startInterval();

});

// ...existing code...

const scrapTypes = ["Iron", "Plastic", "Steel", "Paper"];
const scrapColors = ["#e74c3c", "#27ae60", "#2980b9", "#f1c40f"]; // Red, Green, Blue, Yellow
let scrapIndex = 0;
const scrapSpan = document.getElementById("scrap-type");

function changeScrapType() {
    scrapIndex = (scrapIndex + 1) % scrapTypes.length;
    scrapSpan.textContent = scrapTypes[scrapIndex];
    scrapSpan.style.color = scrapColors[scrapIndex];
    scrapSpan.classList.remove("animate");
    void scrapSpan.offsetWidth; // Trigger reflow for animation
    scrapSpan.classList.add("animate");
}

// Set initial color
scrapSpan.style.color = scrapColors[0];

setInterval(changeScrapType, 2000); // Change every 2 seconds 

