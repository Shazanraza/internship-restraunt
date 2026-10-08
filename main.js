document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. DARK / LIGHT MODE TOGGLE =================
    const themeToggle = document.getElementById('themeToggle');
    
    // System ya pehle se saved theme check karein
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            if (isDark) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        document.body.style.setProperty('--body-bg', '#121212');
        document.body.style.setProperty('--section-bg', '#1e1e1e');
        document.body.style.setProperty('--card-bg', '#292929');
        document.body.style.setProperty('--text', '#f1f1f1');
        document.body.style.setProperty('--text-light', '#b0b0b0');
        
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'bi bi-sun';
        }
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        document.body.style.setProperty('--body-bg', '#ffffff');
        document.body.style.setProperty('--section-bg', '#f7f5f1');
        document.body.style.setProperty('--card-bg', '#ffffff');
        document.body.style.setProperty('--text', '#1b1b1b');
        document.body.style.setProperty('--text-light', '#666666');
        
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'bi bi-moon';
        }
        localStorage.setItem('theme', 'light');
    }


    // ================= 2. FORM SUBMISSION & VALIDATION =================
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        // Date input par aaj ki minimum date set karein taaki past dates select na hon
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Default submit ko rokta hai

            // Inputs se value lena
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Simple JS Validation
            if (!name || !email || !date || !time) {
                alert('Kripya saari zaroori fields ko bharein.');
                return;
            }

            // Success Confirmation
            alert(`Dhanyawad, ${name}! Aapka table reservation ${date} ko ${time} baje (${guests} guests) ke liye confirm ho gaya hai.`);

            // Form Reset
            reservationForm.reset();
        });
    }


    // ================= 3. GALLERY LIGHTBOX MODAL =================
    const galleryModal = document.getElementById('galleryModal');
    const lightboxImg = document.getElementById('lightboxImage');
    
    if (galleryModal && lightboxImg) {
        galleryModal.addEventListener('show.bs.modal', (e) => {
            const button = e.relatedTarget;
            const imageSrc = button.getAttribute('data-image') || button.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imageSrc);
        });
    }


    // ================= 4. NAVBAR SCROLL EFFECT =================
    const nav = document.getElementById('mainNav');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Page load hone par check karein


    // ================= 5. SMOOTH SCROLLING FOR NAV LINKS =================
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Mobile menu ko close karne ke liye (agar open ho)
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse?.classList.contains('show')) {
                    navbarToggler?.click();
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});