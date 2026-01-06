// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Accommodation Tab Switching
const accTabButtons = document.querySelectorAll('.acc-tab-btn');
const accCategories = document.querySelectorAll('.acc-category');

if (accTabButtons.length > 0 && accCategories.length > 0) {
    accTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            accTabButtons.forEach(btn => btn.classList.remove('active'));
            accCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show the corresponding category
            const categoryId = button.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
        });
    });
}

// Inquiry Form Submission
const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const interest = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !interest || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message
        const confirmationMessage = `
            Thank you, ${name}! Your inquiry has been received.
            
            Inquiry Details:
            • Subject: ${subject}
            • Interest: ${interest}
            
            We will respond to your message at ${email} within 1-2 business days.
            
            For urgent inquiries, please call the Eswatini Tourism Authority at +268 2404 2531.
        `;
        
        alert(confirmationMessage);
        
        // Reset form
        this.reset();
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert(`Thank you! You've been subscribed to our Eswatini travel newsletter with email: ${email}`);
        emailInput.value = '';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Currency Converter Tool (Optional Feature)
function createCurrencyConverter() {
    const converterHTML = `
        <div class="currency-converter">
            <h4><i class="fas fa-exchange-alt"></i> Currency Converter</h4>
            <div class="converter-inputs">
                <input type="number" id="amount" placeholder="Amount" value="100">
                <select id="fromCurrency">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="ZAR">ZAR (R)</option>
                </select>
                <span>to</span>
                <select id="toCurrency">
                    <option value="SZL">SZL (E)</option>
                    <option value="USD">USD ($)</option>
                    <option value="ZAR">ZAR (R)</option>
                </select>
                <button id="convertBtn">Convert</button>
            </div>
            <div class="converter-result">
                <p id="conversionResult">100 USD = 1,700 SZL (approx.)</p>
            </div>
        </div>
    `;
    
    // Add converter to the tips section or sidebar if needed
    // document.querySelector('.tips-section .container').insertAdjacentHTML('beforeend', converterHTML);
}

// Initialize currency converter if needed
// createCurrencyConverter();

// Fake exchange rates for demonstration
const exchangeRates = {
    USD: { SZL: 17.0, ZAR: 18.5, EUR: 0.85, GBP: 0.75 },
    EUR: { SZL: 20.0, USD: 1.18, ZAR: 21.8, GBP: 0.88 },
    GBP: { SZL: 22.7, USD: 1.33, EUR: 1.14, ZAR: 24.7 },
    ZAR: { SZL: 0.92, USD: 0.054, EUR: 0.046, GBP: 0.04 }
};

// Convert currency function
if (document.getElementById('convertBtn')) {
    document.getElementById('convertBtn').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        let result;
        if (fromCurrency === toCurrency) {
            result = amount;
        } else {
            const rate = exchangeRates[fromCurrency][toCurrency];
            result = amount * rate;
        }
        
        document.getElementById('conversionResult').textContent = 
            `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency} (approx.)`;
    });
}

// Add image lazy loading for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eswatini Explorer website loaded successfully!');
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});