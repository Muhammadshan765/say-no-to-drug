// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    once: true,
    mirror: true,
    offset: 100
});

// Enhanced Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Scroll to top button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Pledge form handling with animations
const pledgeForm = document.getElementById('pledgeForm');
const pledgeCount = 0; // This would be replaced with actual count from backend

pledgeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // Add success animation
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add('pulse');
    
    // Show success message with animation
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <strong>Thank you, ${name}!</strong> Your pledge has been recorded.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    // Animate the alert
    setTimeout(() => {
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
    
    // Reset form with animation
    setTimeout(() => {
        submitBtn.classList.remove('pulse');
        pledgeForm.reset();
    }, 1000);
});

// Enhanced Smooth scroll for navigation links
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

// Enhanced Typed.js effect
const typed = new Typed('.hero h1', {
    strings: [
        'Your Future is Worth More Than a Temporary High',
        'Choose Life Over Drugs',
        'Say No to Drugs'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (target > 0) {
            animateCounter(counter);
        }
    });
};

// Initialize counter when stats section is in view
const statsSection = document.querySelector('#stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Quiz Functionality
const quizQuestions = [
    {
        question: "What is the first sign of drug addiction?",
        options: [
            { text: "Withdrawal from social activities", correct: true },
            { text: "Regular exercise", correct: false },
            { text: "Healthy eating habits", correct: false }
        ]
    },
    {
        question: "What is the most effective way to prevent drug abuse?",
        options: [
            { text: "Education and awareness", correct: true },
            { text: "Ignoring the problem", correct: false },
            { text: "Trying drugs once", correct: false }
        ]
    },
    {
        question: "Which of these is a healthy coping mechanism?",
        options: [
            { text: "Exercise and meditation", correct: true },
            { text: "Using drugs to relax", correct: false },
            { text: "Isolating yourself", correct: false }
        ]
    },
    {
        question: "What is the best way to help someone with addiction?",
        options: [
            { text: "Encourage them to seek professional help", correct: true },
            { text: "Ignore their behavior", correct: false },
            { text: "Join them in using drugs", correct: false }
        ]
    },
    {
        question: "What is the main reason people start using drugs?",
        options: [
            { text: "To escape problems or stress", correct: true },
            { text: "To improve health", correct: false },
            { text: "To become more productive", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function showQuestion(index) {
    const question = quizQuestions[index];
    const quizContent = document.querySelector('.quiz-content');
    const progressBar = document.querySelector('.progress-bar');
    const questionCount = document.getElementById('current-question');
    const scoreElement = document.getElementById('score');
    const nextButton = document.getElementById('next-question');

    // Update progress
    progressBar.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;
    questionCount.textContent = index + 1;
    scoreElement.textContent = score;

    // Create question HTML
    const questionHTML = `
        <div class="question active">
            <h3 class="question-text">${question.question}</h3>
            <div class="options">
                ${question.options.map((option, i) => `
                    <div class="option" data-correct="${option.correct}">
                        <div class="option-content">
                            <div class="option-icon">
                                <i class="fas fa-circle"></i>
                            </div>
                            <span class="option-text">${option.text}</span>
                        </div>
                        <div class="option-feedback">
                            <i class="fas fa-${option.correct ? 'check' : 'times'}"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    quizContent.innerHTML = questionHTML;

    // Reset state
    selectedOption = null;
    nextButton.disabled = true;

    // Add click event to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            if (selectedOption) return; // Prevent multiple selections

            const isCorrect = this.dataset.correct === 'true';
            selectedOption = this;
            
            // Disable all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });

            // Show result
            if (isCorrect) {
                this.classList.add('correct');
                score++;
                scoreElement.textContent = score;
            } else {
                this.classList.add('incorrect');
                // Show correct answer
                document.querySelector('.option[data-correct="true"]').classList.add('correct');
            }

            // Enable next button
            nextButton.disabled = false;
        });
    });
}

document.getElementById('next-question').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        showQuestion(currentQuestion);
    } else {
        // Show results
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-results text-center">
                <h3>Quiz Complete!</h3>
                <div class="score-display">
                    <i class="fas fa-star"></i>
                    <span class="final-score">${score}</span>
                    <span class="total-questions">/ ${quizQuestions.length}</span>
                </div>
                <p class="result-message">${score === quizQuestions.length ? 'Perfect! You know your stuff!' : 'Good effort! Keep learning!'}</p>
                <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
            </div>
        `;
    }
});

// Initialize quiz
showQuestion(0);

// Theme Switcher
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Preloader
window.addEventListener('load', () => {
    document.querySelector('.preloader').style.display = 'none';
});

// Social Share
document.querySelectorAll('.social-share button').forEach(button => {
    button.addEventListener('click', function() {
        const platform = this.classList.contains('btn-facebook') ? 'facebook' :
                        this.classList.contains('btn-twitter') ? 'twitter' : 'whatsapp';
        
        let url = '';
        const shareUrl = window.location.href;
        const shareText = 'Join me in saying NO to drugs!';

        switch(platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                break;
        }

        window.open(url, '_blank', 'width=600,height=400');
    });
});

// Initialize Tilt Effect
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Enhanced Hero Carousel
const heroCarousel = document.querySelector('#heroCarousel');
const carousel = new bootstrap.Carousel(heroCarousel, {
    interval: 5000,
    pause: 'hover'
});

// Add animation to carousel slides
heroCarousel.addEventListener('slide.bs.carousel', function () {
    const activeSlide = this.querySelector('.carousel-item.active');
    const nextSlide = this.querySelector('.carousel-item-next');
    
    // Reset animations
    activeSlide.querySelectorAll('.animate-text, .animate-buttons').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
    
    // Add entrance animations to next slide
    if (nextSlide) {
        nextSlide.querySelectorAll('.animate-text').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });
        nextSlide.querySelector('.animate-buttons').style.animationDelay = '0.6s';
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add scroll animations
const animateOnScroll = function() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Enhanced Myth vs Fact cards
document.querySelectorAll('.myth-fact-card').forEach(card => {
    // Add hover effect with delay
    let hoverTimeout;
    
    card.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            card.classList.add('hover-flip');
        }, 300);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        card.classList.remove('hover-flip');
    });

    // Add tilt effect
    VanillaTilt.init(card, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        scale: 1.02
    });

    // Add hover animation for icon
    const icon = card.querySelector('.icon');
    if (icon) {
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Resource cards
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Language Switch
const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'en';

languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ml' : 'en';
    languageToggle.innerHTML = `<i class="fas fa-globe"></i> ${currentLanguage.toUpperCase()}`;
    // Add language switching logic here
});

// Decision Path
const pathOptions = document.querySelectorAll('.path-option');
const pathResult = document.querySelector('.path-result');
const resultAnimation = pathResult.querySelector('.result-animation');
const resultText = pathResult.querySelector('.result-text');

pathOptions.forEach(option => {
    option.addEventListener('click', () => {
        const choice = option.dataset.choice;
        pathOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        if (choice === 'say-no') {
            resultAnimation.setAttribute('src', 'https://assets5.lottiefiles.com/packages/lf20_4aahfj2k.json');
            resultText.textContent = 'Great choice! You\'ve made the right decision.';
        } else {
            resultAnimation.setAttribute('src', 'https://assets5.lottiefiles.com/packages/lf20_4aahfj2k.json');
            resultText.textContent = 'This path leads to danger. Let\'s try again.';
        }
        
        pathResult.style.display = 'block';
    });
});

// Share Button
const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', async () => {
    try {
        await navigator.share({
            title: 'Say No to Drugs',
            text: 'Join the campaign against drug abuse',
            url: window.location.href
        });
    } catch (err) {
        console.log('Share failed:', err);
    }
});

// Scroll to Top
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.style.display = 'block';
    } else {
        scrollTop.style.display = 'none';
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Story Modal
const storyModal = new bootstrap.Modal(document.getElementById('storyModal'));
const storyCards = document.querySelectorAll('.story-card');

storyCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const text = card.querySelector('p').textContent;
        const image = card.querySelector('img').src;
        const quote = card.querySelector('blockquote').textContent;
        
        const modal = document.getElementById('storyModal');
        modal.querySelector('.story-title').textContent = title;
        modal.querySelector('.story-text').textContent = text;
        modal.querySelector('.story-image').src = image;
        modal.querySelector('.story-quote').textContent = quote;
        
        storyModal.show();
    });
});

// Image Trial Section Functionality
document.querySelectorAll('.image-trial-card').forEach(card => {
    // Add click event to open image in modal
    card.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const title = this.querySelector('h4').textContent;
        const description = this.querySelector('p').textContent;
        
        // Create modal HTML
        const modalHTML = `
            <div class="modal fade" id="imageModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-body p-0">
                            <img src="${imgSrc}" class="img-fluid w-100" alt="${title}">
                            <div class="modal-caption p-3">
                                <h4>${title}</h4>
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Show modal
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
        
        // Remove modal from DOM after it's hidden
        document.getElementById('imageModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 