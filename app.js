/* ==========================================================================
   TECHFEST 2026 - CYBORG MATRIX APPLICATION CORE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Systems Audio Engine (Web Audio API Synthesizer) & Theme Engine
    let isAudioEnabled = true;
    const audioToggleBtn = document.getElementById('soundToggle');
    const soundIconOn = document.querySelector('.sound-icon-on');
    const soundIconOff = document.querySelector('.sound-icon-off');
    const soundTooltip = audioToggleBtn ? audioToggleBtn.querySelector('.btn-tooltip') : null;

    const themeToggleBtn = document.getElementById('themeToggle');
    const themeTooltip = themeToggleBtn ? themeToggleBtn.querySelector('.btn-tooltip') : null;

    // Web Audio Context initializer
    let audioCtx = null;
    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Synthesize simple high pitch beep (for hover)
    function playBeep(freq = 1200, duration = 0.04) {
        if (!isAudioEnabled) return;
        try {
            initAudioContext();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.warn("Audio Context blocked or unsupported:", e);
        }
    }

    // Synthesize sweep sound (for node clicks)
    function playSweep() {
        if (!isAudioEnabled) return;
        try {
            initAudioContext();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.15);
            
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        } catch (e) {
            console.warn(e);
        }
    }

    // Synthesize successful boot sequence (for form completion)
    function playBootSequence() {
        if (!isAudioEnabled) return;
        try {
            initAudioContext();
            const now = audioCtx.currentTime;
            
            const tones = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major arpeggio
            tones.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                
                gain.gain.setValueAtTime(0.06, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.25);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.25);
            });
        } catch (e) {
            console.warn(e);
        }
    }

    // Sound toggle event
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            isAudioEnabled = !isAudioEnabled;
            if (isAudioEnabled) {
                soundIconOn.classList.remove('hidden');
                soundIconOff.classList.add('hidden');
                if (soundTooltip) soundTooltip.textContent = "AUDIO ACTIVE";
                playBeep(800, 0.1);
            } else {
                soundIconOn.classList.add('hidden');
                soundIconOff.classList.remove('hidden');
                if (soundTooltip) soundTooltip.textContent = "AUDIO MUTED";
            }
        });
    }

    // Theme toggle event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCyber = document.body.classList.toggle('cyber-theme-active');
            if (isCyber) {
                if (themeTooltip) themeTooltip.textContent = "THEME: CYBER";
                playBeep(900, 0.08);
            } else {
                if (themeTooltip) themeTooltip.textContent = "THEME: DARK";
                playBeep(700, 0.08);
            }
        });
    }

    // Attach slight beep sound on all main interactive hover links/buttons
    function setupInteractions() {
        const interactiveElements = document.querySelectorAll('a, button, .blueprint-node, .tier-card, .partner-benefit-card');
        interactiveElements.forEach(el => {
            el.removeEventListener('mouseenter', playHoverBeep);
            el.addEventListener('mouseenter', playHoverBeep);
        });
    }
    
    function playHoverBeep() {
        playBeep(1400, 0.02);
    }

    setupInteractions();

    // 3. Countdown Timer (Targeting Techfest 2026 - Dec 18, 2026)
    const targetDate = new Date('December 18, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.getElementById('countdown').innerHTML = "<div class='time-num'>GRID ACTIVE</div>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately


    // 4. Mobile Drawer Navigation
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            const isVisible = mobileDrawer.style.display === 'flex';
            mobileDrawer.style.display = isVisible ? 'none' : 'flex';
            playBeep(isVisible ? 600 : 900, 0.05);
        });

        // Close drawer on navigating
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.style.display = 'none';
            });
        });
    }


    // 5. Cyborg Domains Diagnostics Terminal Manager (Mapped to Official CA Domains)
    const nodes = document.querySelectorAll('.blueprint-node');
    const terminalSubsys = document.getElementById('terminalSubsys');
    const terminalBody = document.getElementById('diagnosticLogText');

    // Database of sector configurations based on ca.techfest.org
    const sectorData = {
        creatives: {
            subsys: "SYS_LOG_SUB: OPTICAL_CREATIVES",
            highlight: ">>> VISUAL DESIGN MATRIX ONLINE",
            title: "CREATIVES & DESIGN DOMAIN",
            description: "Drive the digital aesthetics of Techfest. Conceptualize visual branding, graphic flyers, social media kits, and UI/UX layouts that capture the futuristic cyberpunk look.",
            list: [
                { title: "Graphic Assets", desc: "Design high-definition digital posters and promotional kits." },
                { title: "Video Production", desc: "Assist in editing promo videos, reels, and stories." },
                { title: "Brand Visuals", desc: "Align campus nodes under consistent Techfest styling guides." }
            ],
            skills: "PHOTOSHOP / ILLUSTRATOR / CANVA",
            priority: "HIGH"
        },
        web: {
            subsys: "SYS_LOG_SUB: NEURAL_WEB_CODE",
            highlight: ">>> DIGITIZING ACCESS LINKS",
            title: "WEB & DIGITAL INFRASTRUCTURE",
            description: "Develop and manage online systems, web portals, referral engines, and tracking networks for the ambassador program.",
            list: [
                { title: "Portal Maintenance", desc: "Optimize dashboard performance and referral link metrics." },
                { title: "Automation", desc: "Streamline email responses and leaderboard point aggregations." },
                { title: "Data Integrity", desc: "Secure ambassador registration pipelines and prevent query injections." }
            ],
            skills: "HTML5 / CSS3 / JAVASCRIPT / REACT",
            priority: "CRITICAL"
        },
        marketing: {
            subsys: "SYS_LOG_SUB: REACTOR_MARKETING",
            highlight: ">>> PUBLICITY SIGNAL STRENGTH OPTIMAL",
            title: "MARKETING & PUBLIC RELATIONS",
            description: "Initiate college campus campaigns, establish publicity partnerships, and manage online outreach strategies for regional nodes.",
            list: [
                { title: "Campaign Drives", desc: "Design word-of-mouth student engagement blueprints." },
                { title: "Public Relations", desc: "Pitch event brochures to college heads and academic directories." },
                { title: "Social Engineering", desc: "Boost social reach, WhatsApp group lists, and YouTube subscriptions." }
            ],
            skills: "PUBLIC RELATION / STRATEGY / COMMS",
            priority: "MAXIMUM"
        },
        events: {
            subsys: "SYS_LOG_SUB: SERVO_EVENTS_CORE",
            highlight: ">>> PHYSICAL NODE ENGAGEMENT COMMENCING",
            title: "EVENTS & WORKSHOP COORDINATION",
            description: "Coordinate physical workshops, manage regional tech fests, organize technical hackathons, and direct local student groups.",
            list: [
                { title: "Tech Workshops", desc: "Help coordinate training bootcamps and lectures in your area." },
                { title: "Event Directing", desc: "Set up zoning clusters for robotics competitions and coding challenges." },
                { title: "Direct Outreach", desc: "Conduct local presentations to onboard event participations." }
            ],
            skills: "LEADERSHIP / ORGANIZATION / EVENT OPS",
            priority: "URGENT"
        }
    };

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const targetSector = node.getAttribute('data-sector');
            const data = sectorData[targetSector];
            if (!data) return;

            // Trigger click audio
            playSweep();

            // Toggle active visual class
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            // Fade terminal screen out & back in with new text
            terminalBody.style.opacity = '0';
            
            setTimeout(() => {
                terminalSubsys.textContent = data.subsys;
                
                // Construct HTML content
                let listHTML = '';
                data.list.forEach(item => {
                    listHTML += `<li><span class="cyan-bullet">■</span> <strong>${item.title}:</strong> ${item.desc}</li>`;
                });

                terminalBody.innerHTML = `
                    <div class="terminal-block">
                        <p class="term-prompt">C:\\DIAGNOSTICS> read sector --${targetSector}</p>
                        <p class="term-log-highlight">${data.highlight}</p>
                        <h3 class="term-title">${data.title}</h3>
                        <p class="term-p text-glow">${data.description}</p>
                        <ul class="term-list">
                            ${listHTML}
                        </ul>
                        <div class="terminal-stats-strip">
                            <div>SKILLS: <span class="accent-text">${data.skills}</span></div>
                            <div>PRIORITY: <span class="success-text">${data.priority}</span></div>
                        </div>
                        <button class="cyber-btn-sm node-action-btn" onclick="scrollToRegister()">
                            <span>UPLOAD PARAMETERS</span>
                        </button>
                    </div>
                `;
                terminalBody.style.opacity = '1';
                
                // Apply hovers to newly generated button
                const btn = terminalBody.querySelector('.node-action-btn');
                if (btn) {
                    btn.addEventListener('mouseenter', () => playBeep(1400, 0.02));
                }
            }, 200);
        });
    });


    // 6. CA CLI Terminal Registration Form simulator
    const registerForm = document.getElementById('caRegisterForm');
    const consoleLog = document.getElementById('terminalConsoleLog');

    window.handleRegistration = function(event) {
        event.preventDefault();
        
        const nameVal = document.getElementById('agentName').value;
        const emailVal = document.getElementById('agentEmail').value;
        const collegeVal = document.getElementById('agentCollege').value;
        const phoneVal = document.getElementById('agentPhone').value;
        const referralVal = document.getElementById('agentReferral').value;

        // Hide form inputs
        registerForm.classList.add('hidden');
        
        // Show console log panel
        consoleLog.classList.remove('hidden');
        consoleLog.innerHTML = `<div class="log-line console-prompt-cursor">C:\\CA_PORTAL> executing data_uplink.exe</div>`;

        // Sequential delay logs simulating transmission
        const logSteps = [
            { txt: "UPLINK INITIALIZATION REQUESTED...", delay: 800, type: "normal" },
            { txt: `BOUND TERMINAL SOCKET TO AMBASSADOR: "${nameVal.toUpperCase()}"`, delay: 1500, type: "highlight" },
            { txt: "LOCATING MAIN DATABASE ROUTER...", delay: 2200, type: "normal" },
            { txt: `RESOLVED TARGET NODE: IIT BOMBAY SERVER PORT 8089 [SYS: CONNECTED]`, delay: 3000, type: "success" },
            { txt: `TRANSMITTING COMMS CHANNEL ENCRYPTION LINK: ${phoneVal}`, delay: 3800, type: "normal" },
            { txt: `TRANSMITTING EMAIL PROFILE: [${emailVal.toLowerCase()}]`, delay: 4500, type: "normal" },
            { txt: `REGISTERING CAMPUS SECTOR: "${collegeVal.toUpperCase()}"`, delay: 5200, type: "highlight" }
        ];

        if (referralVal.trim() !== '') {
            logSteps.push({ txt: `APPLYING INCOMING REFERRAL LINK: "${referralVal.toUpperCase()}"`, delay: 5700, type: "highlight" });
        }

        logSteps.push(
            { txt: "ALLOCATING LEVEL TIER STATUS: BRONZE BADGE ALLOCATED [INITIATED]", delay: 6200, type: "normal" },
            { txt: "DOWNLINKING CORE AMBASSADOR MANUAL... 100% COMPLETE", delay: 6800, type: "normal" },
            { txt: "--------------------------------------------------------", delay: 7200, type: "normal" },
            { txt: "DATA UPLINK STREAM SYNCHRONIZED!", delay: 7600, type: "success" },
            { txt: `WELCOME TO THE TECHFEST GRID, AMBASSADOR ${nameVal.toUpperCase()}.`, delay: 8200, type: "success" },
            { txt: "CHECK YOUR SECURE EMAIL COMMS FOR FURTHER DIRECTIONS.", delay: 8800, type: "highlight" }
        );

        logSteps.forEach(step => {
            setTimeout(() => {
                // Remove blink cursor from previous line
                const cursorLines = consoleLog.querySelectorAll('.console-prompt-cursor');
                cursorLines.forEach(cl => cl.classList.remove('console-prompt-cursor'));

                const logDiv = document.createElement('div');
                logDiv.className = `log-line console-prompt-cursor`;
                if (step.type === 'success') logDiv.classList.add('success');
                if (step.type === 'highlight') logDiv.classList.add('highlight');
                
                logDiv.textContent = `[SYS_LOG]: ${step.txt}`;
                consoleLog.appendChild(logDiv);
                
                // Auto scroll
                consoleLog.scrollTop = consoleLog.scrollHeight;
                
                // Play short click sounds for logs
                playBeep(900 + (step.delay / 10), 0.03);

                // Play arpeggio tone on completion
                if (step.txt.includes("WELCOME TO THE TECHFEST GRID")) {
                    playBootSequence();
                }
            }, step.delay);
        });

        // Add a terminal reboot button at the end
        setTimeout(() => {
            const cursorLines = consoleLog.querySelectorAll('.console-prompt-cursor');
            cursorLines.forEach(cl => cl.classList.remove('console-prompt-cursor'));

            const rebootBtn = document.createElement('button');
            rebootBtn.className = 'cyber-btn-sm';
            rebootBtn.style.marginTop = '20px';
            rebootBtn.innerHTML = '<span>REBOOT TERMINAL</span>';
            rebootBtn.addEventListener('click', () => {
                playSweep();
                // Clear inputs
                registerForm.reset();
                registerForm.classList.remove('hidden');
                consoleLog.classList.add('hidden');
                consoleLog.innerHTML = '';
            });
            consoleLog.appendChild(rebootBtn);
            consoleLog.scrollTop = consoleLog.scrollHeight;
            setupInteractions();
        }, 9500);
    };

    // Helper: Scroll to CA Registration panel
    window.scrollToRegister = function() {
        const target = document.getElementById('ca-registration');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Highlight name field
            setTimeout(() => {
                const nameInput = document.getElementById('agentName');
                if (nameInput) nameInput.focus();
            }, 800);
        }
    };
});
