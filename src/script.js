// DOM içeriği yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Burger menü tıklama eventi
    burger.addEventListener('click', () => {
        // Menüyü aç/kapa
        nav.classList.toggle('nav-active');
        
        // Burger animasyonu
        burger.classList.toggle('toggle');
        
        // Link animasyonları
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Sayfa yüklendiğinde banner animasyonu
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        heroImg.style.opacity = '0';
        setTimeout(() => {
            heroImg.style.transition = 'opacity 1s ease-in-out';
            heroImg.style.opacity = '1';
        }, 500);
    }

    // Smooth scroll için tüm iç linkleri seç
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Mobil menüyü kapat (eğer açıksa)
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll olayında header stilini değiştir
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Animasyonlu sayfa içi kaydırma
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.section-title, .feature-card, .gallery-item, .about-content');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Sayfa yüklendiğinde animasyonları çalıştır
    animateOnScroll();

    // Galeri görüntü önizlemesi
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            
            // Basit bir lightbox oluştur
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const img = document.createElement('img');
            img.setAttribute('src', imgSrc);
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-lightbox');
            closeBtn.innerHTML = '&times;';
            
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            // Lightbox'ı kapatma işlevi
            closeBtn.addEventListener('click', () => {
                lightbox.remove();
            });
            
            // Dışarıya tıklandığında da kapat
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.remove();
                }
            });
        });
    });

    // CSS'te olmayan stilleri ekleyelim
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .section-title, .feature-card, .gallery-item, .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .section-title.animate, .feature-card.animate, .gallery-item.animate, .about-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .close-lightbox {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-lightbox:hover {
            color: var(--main-color);
        }
    `;
    
    document.head.appendChild(style);
}); 