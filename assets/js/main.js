/* 
  Lingua - Main JavaScript
  Author: Antigravity AI
*/

document.addEventListener('DOMContentLoaded', () => {
    const dirToggles = document.querySelectorAll('[data-rtl-toggle]');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    dirToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', nextDir);
            localStorage.setItem('dir', nextDir);
        });
    });

    // --- Theme Toggle Logic ---
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply theme on load
    if (currentTheme === 'dark') {
        root.classList.add('dark');
        document.body.classList.add('dark'); // Backwards compatibility if needed
    }
    updateThemeIcons(currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            root.classList.toggle('dark');
            document.body.classList.toggle('dark');
            const isDark = root.classList.contains('dark');
            const theme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateThemeIcons(theme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(btn => {
            // Target specific icon span if it exists, otherwise fall back to first span
            const iconSpan = btn.querySelector('[id*="theme-toggle-icon"]') || btn.querySelector('span');
            if (!iconSpan) return;

            if (theme === 'dark') {
                iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>`; // Sun fallback
            } else {
                iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>`; // Moon fallback
            }
        });
    }

    // --- IntersectionObserver for Animations ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing once animated
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => animationObserver.observe(el));

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.remove('hidden');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.add('hidden');
        });

        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.add('hidden');
        });
    }

    // --- Back to Top Button ---
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Counter Animation ---
    const stats = document.querySelectorAll('.stat-counter');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50;
                const ticker = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        entry.target.innerText = target;
                        clearInterval(ticker);
                    } else {
                        entry.target.innerText = Math.ceil(count);
                    }
                }, 30);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statObserver.observe(stat));

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // --- Anti-Gravity Particle System ---
    class ParticleSystem {
        constructor() {
            this.particles = [];
            this.container = document.getElementById("particles");
            this.mouseX = 0;
            this.mouseY = 0;
            if (this.container) this.init();
        }

        init() {
            const count = window.innerWidth < 768 ? 30 : 60;
            for (let i = 0; i < count; i++) {
                this.createParticle();
            }

            document.addEventListener("mousemove", (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            this.animate();
        }

        createParticle() {
            const particle = document.createElement("div");
            particle.className = "particle";

            const size = Math.random() * 4 + 1;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // Initial velocity
            const vx = (Math.random() - 0.5) * 1.5;
            const vy = (Math.random() - 0.5) * 1.5;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            this.container.appendChild(particle);

            this.particles.push({
                el: particle,
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                size: size,
                baseX: x,
                baseY: y
            });
        }

        animate() {
            this.particles.forEach((p) => {
                // Free motion
                p.x += p.vx;
                p.y += p.vy;

                // Mouse Repulsion
                const dx = this.mouseX - p.x;
                const dy = this.mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    const angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 5;
                    p.y -= Math.sin(angle) * force * 5;
                }

                // Damping for friction-like feel
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Keep moving
                if (Math.abs(p.vx) < 0.1) p.vx = (Math.random() - 0.5) * 1.5;
                if (Math.abs(p.vy) < 0.1) p.vy = (Math.random() - 0.5) * 1.5;

                // Boundary Collision
                if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

                p.x = Math.max(0, Math.min(window.innerWidth, p.x));
                p.y = Math.max(0, Math.min(window.innerHeight, p.y));

                p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    class OrbController {
        constructor() {
            this.orb = document.getElementById("centralOrb");
            if (this.orb) this.init();
        }

        init() {
            this.orb.addEventListener("mouseenter", () => {
                this.orb.style.transform = "scale(1.1)";
            });

            this.orb.addEventListener("mouseleave", () => {
                this.orb.style.transform = "scale(1)";
            });

            this.orb.addEventListener("click", (e) => {
                this.createRipple(e);
            });
        }

        createRipple(e) {
            const ripple = document.createElement("div");
            ripple.className = "absolute rounded-full pointer-events-none bg-white/30";
            ripple.style.width = "10px";
            ripple.style.height = "10px";

            const rect = this.orb.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.orb.appendChild(ripple);

            ripple.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(40)', opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        }
    }

    // Initialize New Hero Effects
    if (document.getElementById("particles")) {
        new ParticleSystem();
        new OrbController();

        // Scroll Indicator
        const scrollInd = document.querySelector(".scroll-indicator");
        if (scrollInd) {
            scrollInd.addEventListener("click", () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth"
                });
            });
        }
    }

    // --- Home-2 Three.js Font Grid Displacement Animation ---
    function loadHeroAnimation() {
        const canvasContainer = document.getElementById('hero-canvas');
        if (!canvasContainer || !window.THREE) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);

        camera.position.set(0, 0, 50);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);

        // Language Symbols
        const symbols = ["EN", "ZH", "JP", "ES", "文", "Ω", "DE", "FR", "AR", "RU"];
        const loader = new THREE.FontLoader();

        // Load font from CDN
        loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
            initGrid(font);
        }, undefined, (err) => {
            // Fallback to cubes if font fails
            console.warn("Font loading failed, falling back to basic shapes.");
            initGrid(null);
        });

        const meshes = [];
        const cols = 12;
        const rows = 6;
        const spacing = 6;
        const group = new THREE.Group();

        function initGrid(font) {
            const material = new THREE.MeshStandardMaterial({
                color: 0x666666,
                metalness: 0.9,
                roughness: 0.1,
                emissive: 0x111111,
                flatShading: true
            });

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    let geo;
                    if (font) {
                        const char = symbols[Math.floor(Math.random() * symbols.length)];
                        geo = new THREE.TextGeometry(char, {
                            font: font,
                            size: 1.5,
                            height: 0.5,
                            curveSegments: 4,
                            bevelEnabled: true,
                            bevelThickness: 0.1,
                            bevelSize: 0.1,
                            bevelOffset: 0,
                            bevelSegments: 3
                        });
                        geo.center();
                    } else {
                        geo = new THREE.BoxGeometry(2, 2, 2);
                    }

                    const mesh = new THREE.Mesh(geo, material.clone());

                    mesh.position.x = (c - cols / 2) * spacing;
                    mesh.position.y = (r - rows / 2) * spacing;
                    mesh.position.z = -10;

                    mesh.userData = {
                        baseZ: -10,
                        rotSpeed: (Math.random() - 0.5) * 0.01
                    };

                    group.add(mesh);
                    meshes.push(mesh);
                }
            }
            scene.add(group);
            animate();
        }

        // Interactive Logic
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            mouseY = -(e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

            targetX = mouseX * 40;
            targetY = mouseY * 25;

            if (window.gsap) {
                gsap.to(pointLight.position, { duration: 1, x: targetX, y: targetY });
            }
        });

        function animate() {
            requestAnimationFrame(animate);

            meshes.forEach(mesh => {
                const dx = targetX - mesh.position.x;
                const dy = targetY - mesh.position.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let activeZ = mesh.userData.baseZ;
                if (dist < 15) {
                    const force = (1 - dist / 15);
                    activeZ = mesh.userData.baseZ + force * 15;
                    mesh.material.emissive.setHSL(0.5, 0.5, force * 0.3);
                } else {
                    mesh.material.emissive.set(0x111111);
                }

                mesh.position.z += (activeZ - mesh.position.z) * 0.1;
                mesh.rotation.x += mesh.userData.rotSpeed;
                mesh.rotation.y += mesh.userData.rotSpeed;
            });

            camera.position.x += (targetX * 0.05 - camera.position.x) * 0.05;
            camera.position.y += (targetY * 0.05 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }

    // Call Home-2 Animation
    if (window.location.pathname.includes('home-2.html') || document.getElementById('hero-canvas')) {
        loadHeroAnimation();
    }

});


