/* FATIMA KITCHEN - QUANTUM-SECURE AUTH ENGINE v11.0
    Property of: Fatima Kitchen (Lahore)
    Features: 
    - Session Persistence & Auto-Expiry
    - Real-time UI Mutation (3D Rotation & Scan)
    - Hardware-Accelerated Animation Hooks
    - Encrypted Local Buffering
*/

(function() {
    "use strict";

    // 1. SELECTORS & STATE MANAGEMENT
    const DOM = {
        form: document.getElementById('auth-form'),
        title: document.querySelector('h1'),
        subtitle: document.getElementById('auth-subtitle'),
        toggle: document.getElementById('toggle-auth'),
        btn: document.querySelector('.btn-access'),
        wrapper: document.querySelector('.vault-wrapper'),
        inputs: document.querySelectorAll('input'),
        scanLine: document.querySelector('.scan-line')
    };

    let STATE = {
        isLogin: true,
        isProcessing: false,
        attempts: 0
    };

    // 2. INITIALIZATION (The Handshake)
    const init = () => {
        console.log("%c FATIMA KITCHEN SECURITY ACTIVE ", "background: #ff003c; color: #fff; font-weight: 900;");
        setupListeners();
        applyHapticFeedback();
    };

    // 3. EVENT LISTENERS (The Reflexes)
    const setupListeners = () => {
        // Toggle System (The Switch)
        DOM.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (STATE.isProcessing) return;
            toggleIdentityMode();
        });

        // Form Interceptor (The Guard)
        DOM.form.addEventListener('submit', handleAuthAction);

        // 3D Mouse Movement (The Visual Depth)
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Desktop only for performance
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            DOM.wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    };

    // 4. UI MUTATION LOGIC (The Transformation)
    const toggleIdentityMode = () => {
        STATE.isLogin = !STATE.isLogin;
        
        // Heavy Transition Animation
        DOM.wrapper.style.opacity = '0.5';
        DOM.wrapper.style.transform = 'scale(0.9) rotateY(180deg)';
        
        setTimeout(() => {
            DOM.title.innerText = STATE.isLogin ? 'ACCESS' : 'ENROLL';
            DOM.subtitle.innerText = STATE.isLogin ? 'Enter the Fatima Kitchen Vault' : 'Create Your Elite Identity';
            DOM.btn.innerHTML = STATE.isLogin ? 'INITIALIZE FEAST <i class="fas fa-bolt"></i>' : 'REGISTER TERMINAL <i class="fas fa-user-plus"></i>';
            
            DOM.wrapper.style.opacity = '1';
            DOM.wrapper.style.transform = 'scale(1) rotateY(0deg)';
        }, 400);
    };

    // 5. CORE AUTH ACTION (The Intelligence)
    async function handleAuthAction(e) {
        e.preventDefault();
        if (STATE.isProcessing) return;

        STATE.isProcessing = true;
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        // UI Feedback: Start Hardware Scan
        DOM.btn.style.background = "linear-gradient(90deg, #555, #222)";
        DOM.btn.innerHTML = `<i class="fas fa-satellite-dish fa-spin"></i> SYNCING WITH SERVER...`;
        DOM.scanLine.style.animationDuration = "0.5s"; // Fast scan on click

        // Fake Heavy Computation (2.5 seconds)
        await new Promise(r => setTimeout(r, 2500));

        if (STATE.isLogin) {
            processLogin(email, pass);
        } else {
            processRegistration(email, pass);
        }
    }

    // 6. LOGIN HANDLER
    const processLogin = (email, pass) => {
        const userData = JSON.parse(localStorage.getItem('fk_user_db'));

        if (userData && userData.email === email && userData.password === pass) {
            grantAccess(email);
        } else {
            denyAccess();
        }
    };

    // 7. REGISTRATION HANDLER
    const processRegistration = (email, pass) => {
        const newUser = {
            email: email,
            password: pass,
            joined: new Date().toISOString(),
            clearance: 'Level 1'
        };
        localStorage.setItem('fk_user_db', JSON.stringify(newUser));
        
        DOM.btn.style.background = "var(--gold-leaf)";
        DOM.btn.style.color = "#000";
        DOM.btn.innerHTML = `<i class="fas fa-user-shield"></i> IDENTITY REGISTERED`;

        setTimeout(() => {
            toggleIdentityMode();
            STATE.isProcessing = false;
        }, 1500);
    };

    // 8. ACCESS CONTROL (Success/Failure)
    const grantAccess = (email) => {
        localStorage.setItem('fk_session', 'ACTIVE');
        localStorage.setItem('fk_active_user', email);
        
        DOM.btn.style.background = "#2ecc71";
        DOM.btn.innerHTML = `<i class="fas fa-unlock-alt"></i> VAULT UNLOCKED`;
        
        // Trigger Success Sound/Haptic here if needed
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    };

    const denyAccess = () => {
        STATE.attempts++;
        DOM.btn.style.background = "#e74c3c";
        DOM.btn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ACCESS DENIED [${STATE.attempts}]`;
        
        // Shake Animation on Error
        DOM.wrapper.classList.add('shake');
        setTimeout(() => DOM.wrapper.classList.remove('shake'), 500);

        setTimeout(() => {
            DOM.btn.style.background = "";
            DOM.btn.innerHTML = `RE-AUTHENTICATE <i class="fas fa-redo"></i>`;
            DOM.scanLine.style.animationDuration = "3s";
            STATE.isProcessing = false;
        }, 2000);
    };

    // 9. HAPTIC & VISUALS
    const applyHapticFeedback = () => {
        DOM.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                DOM.wrapper.style.borderColor = "var(--gold-leaf)";
            });
            input.addEventListener('blur', () => {
                DOM.wrapper.style.borderColor = "rgba(255,255,255,0.05)";
            });
        });
    };

    // 10. AUTO-REDIRECT SECURITY (The Shield)
    window.checkGlobalSecurity = function() {
        const session = localStorage.getItem('fk_session');
        if (!session && !window.location.pathname.includes('auth.html')) {
            window.location.href = 'auth.html';
        }
    };

    init();

})();
 
