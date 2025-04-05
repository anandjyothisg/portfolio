// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
  
    // Hide loader after page loads
    window.addEventListener('load', function() {
      const loader = document.querySelector('.loader');
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500);
    });
  
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links li a').forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Active navigation link based on scroll position
    function setActiveNavLink() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links li a');
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
  
    // Typing animation for hero section
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Machine Learning Engineer','Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) {
          cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
      }
    }
    
    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) {
          cursorSpan.classList.add('typing');
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
          textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100);
      }
    }
    
    if (textArray.length) {
      setTimeout(type, newTextDelay + 250);
    }
  
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-in');
    
    animateElements.forEach(element => {
      gsap.fromTo(
        element, 
        { 
          y: 50, 
          opacity: 0 
        }, 
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  
    // Animate skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress span');
    
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      
      gsap.to(bar, {
        width: progress,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    });
  
    // Back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.querySelector('.form-success');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Clear form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
        // Show success message
        formSuccess.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });
      });
    }
  
    // Initialize mouse parallax effect
    document.addEventListener('mousemove', parallax);
    
    function parallax(e) {
      document.querySelectorAll('.hero h1').forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 5;
        
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  
    // Portfolio filtering
    if (document.querySelector('.portfolio-filter')) {
      const filterBtns = document.querySelectorAll('.portfolio-filter button');
      const portfolioItems = document.querySelectorAll('.project-card');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterBtns.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          btn.classList.add('active');
          
          // Get filter value
          const filterValue = btn.getAttribute('data-filter');
          
          // Filter portfolio items
          portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
              gsap.to(item, { 
                duration: 0.5, 
                opacity: 1, 
                scale: 1, 
                ease: "power2.out",
                clearProps: "all" 
              });
              item.style.display = 'block';
            } else {
              gsap.to(item, { 
                duration: 0.5, 
                opacity: 0, 
                scale: 0.8, 
                ease: "power2.out",
                onComplete: () => {
                  item.style.display = 'none';
                }
              });
            }
          });
        });
      });
    }
  
    // Image lightbox
    const projectImages = document.querySelectorAll('.project-card img');
    projectImages.forEach(img => {
      img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Add lightbox styles
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.background = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '1000';
        
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.objectFit = 'contain';
        lightboxImg.style.borderRadius = '8px';
        
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        
        // Close lightbox on click
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(lightbox);
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
            document.body.removeChild(lightbox);
          }
        });
      });
    });
  
    // Add year to copyright
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // Scroll reveal animation for sections
    gsap.utils.toArray('section').forEach(section => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  
    // Initialize counter animation
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2; // Duration in seconds
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => animateCounter(counter, target, duration)
      });
    });
    
    function animateCounter(counter, target, duration) {
      let startTime;
      const startValue = 0;
      
      function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentValue = Math.floor(progress * (target - startValue) + startValue);
        
        counter.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      
      requestAnimationFrame(updateCounter);
    }
  
    // Theme toggle functionality (if needed)
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save theme preference to localStorage
        if (document.body.classList.contains('light-mode')) {
          localStorage.setItem('theme', 'light');
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
          localStorage.setItem('theme', 'dark');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
      });
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    }
  });


        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.querySelector('.form-success');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For example using fetch API or XMLHttpRequest
            
            // For demonstration, we'll just show the success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Optional: Reset form after submission
            contactForm.reset();
            
            // Optional: Hide success message and show form again after a delay
            setTimeout(() => {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'block';
            }, 5000);
        });
