/* 
 * Vivek Mishra Portfolio - Cybersecurity Command Center
 * script.js
 */

// --- Global: Copy to Clipboard with Toast ---
function copyToClipboard(el) {
    const copyText = el.getAttribute("data-copy");
    if (!copyText) return;
    
    navigator.clipboard.writeText(copyText).then(() => {
        const toast = document.getElementById("copy-toast");
        toast.classList.add("show");
        
        // Flash the item
        el.style.boxShadow = "0 0 30px rgba(0, 250, 154, 0.3), inset 0 0 20px rgba(0, 250, 154, 0.1)";
        el.style.borderColor = "var(--matrix-green)";
        
        setTimeout(() => {
            toast.classList.remove("show");
            el.style.boxShadow = "";
            el.style.borderColor = "";
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Boot Sequence (Immersive Cyber Dashboard) ---
    const bootScreen = document.getElementById("boot-screen");
    const terminalBox = document.querySelector(".terminal-box");
    const terminalContent = document.querySelector(".terminal-content");
    const bootLogo = document.querySelector(".boot-logo");
    
    const bootLines = [
        "Initializing VM_SYS v4.2.0...",
        "Establishing encrypted connection [OK]",
        "Loading core modules [OK]",
        "Scanning network perimeter [OK]",
        "Bypassing firewall [OK]",
        "Mounting user profile: VIVEK_MISHRA [OK]",
        "Loading cybersecurity dashboard...",
        "System ready. Access granted."
    ];
    
    let lineIdx = 0;
    
    function typeBootLine() {
        if (lineIdx < bootLines.length) {
            const p = document.createElement("p");
            p.textContent = "> " + bootLines[lineIdx];
            
            // Color the last line green
            if (lineIdx === bootLines.length - 1) {
                p.style.color = "#00fa9a";
                p.style.textShadow = "0 0 10px rgba(0, 250, 154, 0.5)";
            }
            
            terminalContent.appendChild(p);
            lineIdx++;
            setTimeout(typeBootLine, 80 + Math.random() * 150);
        } else {
            setTimeout(() => {
                terminalBox.style.opacity = "0";
                terminalBox.style.transform = "scale(0.95)";
                setTimeout(() => {
                    terminalBox.style.display = "none";
                    bootLogo.classList.add("reveal-logo");
                    
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
    checkReveal();
    
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

    // --- 5. Contact Form Handler (Optimized AJAX Submission) ---
    const contactForm = document.getElementById("contact-form");
    const transmissionOutput = document.getElementById("transmission-output");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector("button");
            const originalText = btn.innerHTML;
            
            // Gather data
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (!name || !email || !message) {
                if (transmissionOutput) {
                    transmissionOutput.textContent = "> ERROR: INCOMPLETE MODULE DATA.";
                    transmissionOutput.style.color = "var(--alert-orange)";
                }
                return;
            }
            
            // Phase 1: Interactive Feedback
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING...';
            btn.style.opacity = "0.7";
            btn.disabled = true;
            
            if (transmissionOutput) {
                transmissionOutput.textContent = "> Encrypting data packets...";
                transmissionOutput.style.color = "var(--neon-cyan)";
                transmissionOutput.classList.add("glitch-text");
            }

            // AJAX Submission to FormSubmit
            const formData = new FormData(contactForm);
            
            fetch("https://formsubmit.co/ajax/vivekmishra4554@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Network protocol failure");
                return response.json();
            })
            .then(data => {
                // Phase 2: Success
                btn.innerHTML = '<i class="fa-solid fa-check-double"></i> DELIVERED';
                btn.style.background = "var(--matrix-green)";
                btn.style.borderColor = "var(--matrix-green)";
                btn.style.color = "#000";
                btn.style.opacity = "1";
                
                if (transmissionOutput) {
                    transmissionOutput.textContent = "> [SUCCESS] Message acknowledged by node: vivekmishra4554@gmail.com";
                    transmissionOutput.style.color = "var(--matrix-green)";
                    transmissionOutput.classList.remove("glitch-text");
                }
                
                // Keep the success state for a while
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.borderColor = "";
                    btn.style.color = "";
                    btn.disabled = false;
                    if (transmissionOutput) transmissionOutput.textContent = "";
                }, 5000);
            })
            .catch(error => {
                // Phase 3: Error Fallback
                btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> FAILED';
                btn.style.background = "var(--alert-orange)";
                btn.style.borderColor = "var(--alert-orange)";
                
                if (transmissionOutput) {
                    transmissionOutput.textContent = "> [CRITICAL] Connection refused. Relaying via local client...";
                    transmissionOutput.style.color = "var(--alert-orange)";
                }
                
                // If AJAX fails (e.g. locally), fallback to native as a last resort or tell use
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.borderColor = "";
                    btn.disabled = false;
                    // Last resort redundancy: native submit
                    // contactForm.submit(); 
                }, 3000);
            });
        });
    }

    // --- 6. Animated Progress Bars on Scroll ---
    let barsAnimated = false;
    
    function animateProgressBars() {
        if (barsAnimated) return;
        
        const certSection = document.getElementById("certifications");
        if (!certSection) return;
        
        const rect = certSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 200) {
            barsAnimated = true;
            
            // Animate bar fills
            document.querySelectorAll(".bar-fill[data-width]").forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.getAttribute("data-width") + "%";
                }, i * 200);
            });
            
            // Animate percentage counters
            document.querySelectorAll(".pct-counter[data-target]").forEach((counter, i) => {
                const target = parseInt(counter.getAttribute("data-target"));
                let current = 0;
                const duration = 1500;
                const increment = target / (duration / 30);
                
                setTimeout(() => {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.round(current) + "%";
                    }, 30);
                }, i * 200);
            });
        }
    }
    
    window.addEventListener("scroll", animateProgressBars);
    animateProgressBars();

    // --- 7. System Status Bar Uptime Counter ---
    let uptimeSeconds = 0;
    const uptimeEl = document.getElementById("uptime-counter");
    
    if (uptimeEl) {
        setInterval(() => {
            uptimeSeconds++;
            const h = String(Math.floor(uptimeSeconds / 3600)).padStart(2, "0");
            const m = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(2, "0");
            const s = String(uptimeSeconds % 60).padStart(2, "0");
            uptimeEl.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    // --- 8. Node Status Random Flicker ---
    const nodeStatus = document.getElementById("node-status");
    if (nodeStatus) {
        setInterval(() => {
            const states = ["STABLE", "SYNCING", "STABLE", "STABLE", "ROUTING"];
            nodeStatus.textContent = states[Math.floor(Math.random() * states.length)];
        }, 5000);
    }

    // --- 9. Button Ripple Effect ---
    document.querySelectorAll(".cyber-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty("--ripple-x", x + "%");
            btn.style.setProperty("--ripple-y", y + "%");
        });
    });

});
