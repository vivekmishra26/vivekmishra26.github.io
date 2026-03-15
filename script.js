/* 
 * Vivek Mishra Portfolio - Super Premium Cyber Theme
 * script.js
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Boot Sequence (Luxury Cyber Aesthetic) ---
    const bootScreen = document.getElementById("boot-screen");
    const terminalBox = document.querySelector(".terminal-box");
    const terminalContent = document.querySelector(".terminal-content");
    const bootLogo = document.querySelector(".boot-logo");
    
    const bootLines = [
        "Initializing SECURE_NET v4.2...",
        "Establishing encrypted connection [OK]",
        "Loading core modules [OK]",
        "Bypassing firewall [OK]",
        "Mounting user profile: VIVEK_MISHRA [OK]",
        "System ready. Welcome back, Admin."
    ];
    
    let lineIdx = 0;
    
    function typeBootLine() {
        if (lineIdx < bootLines.length) {
            const p = document.createElement("p");
            p.textContent = "> " + bootLines[lineIdx];
            terminalContent.appendChild(p);
            lineIdx++;
            setTimeout(typeBootLine, 100 + Math.random() * 200); // Faster typing
        } else {
            // Fade out terminal, fade in sleek logo
            setTimeout(() => {
                terminalBox.style.opacity = "0";
                terminalBox.style.transform = "scale(0.95)";
                setTimeout(() => {
                    terminalBox.style.display = "none";
                    bootLogo.classList.add("reveal-logo");
                    
                    // Fade out entire boot screen after logo display
                    setTimeout(() => {
                        bootScreen.style.opacity = "0";
                        bootScreen.style.backdropFilter = "blur(0px)";
                        setTimeout(() => {
                            bootScreen.remove();
                            initCanvas();
                            setTimeout(typeHeroIntro, 500);
                        }, 1200);
                    }, 2000);
                }, 500);
            }, 600);
        }
    }
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        bootScreen.remove();
        initCanvas();
    } else {
        setTimeout(typeBootLine, 400);
    }
    
    // --- 2. Advanced Interactive Background Canvas ---
    const canvas = document.getElementById("cyber-canvas");
    let ctx, w, h;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    function initCanvas() {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        
        for (let i = 0; i < (window.innerWidth < 768 ? 40 : 100); i++) {
            particles.push(new Particle());
        }
        animateCanvas();
    }
    
    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.color = Math.random() > 0.5 ? "rgba(0, 240, 255, 0.5)" : "rgba(188, 19, 254, 0.5)";
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            
            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 20;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 20;
                }
            }
            this.draw();
        }
    }
    
    function animateCanvas() {
        ctx.clearRect(0, 0, w, h);
        
        // Connect particles
        for(let a = 0; a < particles.length; a++){
            for(let b = a; b < particles.length; b++){
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist/100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
            particles[a].update();
        }
        requestAnimationFrame(animateCanvas);
    }
    
    // --- 3. Hero Typing Animation ---
    const heroTypingText = document.getElementById("hero-typing-text");
    const heroTextToType = "./fetch_operator_profile.sh";
    let heroCharIdx = 0;

    function typeHeroIntro() {
        if (heroTypingText && heroCharIdx < heroTextToType.length) {
            heroTypingText.textContent += heroTextToType.charAt(heroCharIdx);
            heroCharIdx++;
            setTimeout(typeHeroIntro, 100);
        }
    }

    // --- 4. Scroll Reveal & Navigation ---
    const reveals = document.querySelectorAll(".reveal");
    
    function checkReveal() {
        const winHeight = window.innerHeight;
        const revealPoint = 100;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if(revealTop < winHeight - revealPoint) {
                reveal.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", checkReveal);
    checkReveal(); // initial check
    
    // Progress Bar
    const progressBar = document.getElementById("cyber-progress");
    window.addEventListener("scroll", () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
    
    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navItems = document.querySelectorAll(".mobile-menu a");
    
    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        // Animate hamburger transform if needed via separate class
    });
    
    navItems.forEach(item => {
        item.addEventListener("click", () => {
             mobileMenu.classList.remove("active");
        });
    });

    // Nav Link Active State (Scroll Spy)
    const sections = document.querySelectorAll("section");
    const desktopLinks = document.querySelectorAll(".nav-links .nav-item");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = sec.getAttribute("id");
            }
        });

        desktopLinks.forEach(li => {
            li.classList.remove("active");
            if (li.getAttribute("href") === "#" + current) {
                li.classList.add("active");
            }
        });
    });
    // --- 5. Contact Form Handler (Terminal Style) ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector("button");
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING...';
            btn.style.opacity = "0.7";
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> MESSAGE_DEPLOYED_SUCCESS';
                btn.style.background = "var(--matrix-green)";
                btn.style.borderColor = "var(--matrix-green)";
                btn.style.color = "#000";
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.borderColor = "";
                    btn.style.color = "";
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }, 3000);
            }, 1500);
        });
    }

});
