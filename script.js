/**
 * CV & Portfolio Interattivo - Script JavaScript
 * Studente 5° Anno Informatica (C++, Java, HTML, CSS, JS)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. GESTIONE TEMA CHIARO / SCURO (LOCALSTORAGE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Recupera tema salvato o usa lo scuro di default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('title', 'Passa al tema scuro');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('title', 'Passa al tema chiaro');
        }
    }

    /* ==========================================================================
       2. EFFETTO DI DIGITAZIONE DINAMICA (TYPING EFFECT HERO)
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Sviluppatore Software",
        "Programmatore C++ & Java",
        "Frontend & Web Developer",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1800;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    /* ==========================================================================
       3. NAVBAR MOBILE & HEADER STICKY AL ROLL
       ========================================================================== */
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scroll-progress');

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Chiudi il menu quando si clicca su una voce
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // Evento Scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header con sfondo sfocato allo scroll
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Barra di avanzamento lettura in alto
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Evidenziazione voce attiva nella navbar
        highlightActiveSection();
    });

    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 180;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    /* ==========================================================================
       4. FILTRO PROGETTI (TUTTI, C++, JAVA, WEB)
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Rimuovi classe active dagli altri bottoni
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                }
            });
        });
    });

    /* ==========================================================================
       5. DETTAGLI MODALE PROGETTI
       ========================================================================== */
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-content');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');

    // Dati di approfondimento per ogni progetto
    const projectDetails = {
        "1": {
            badge: "C++ / Applicazione Desktop",
            title: "Sistema Gestionale Scolastico in C++",
            description: "Progetto completo ad oggetti focalizzato sulla gestione di anagrafiche studenti, voti scolastici per materia e calcolo automatico dei crediti e delle medie aritmetiche/ponderate.",
            features: [
                "Programmazione a Oggetti avanzata con classi 'Studente', 'Materia' e 'Registro'",
                "Archiviazione e lettura permanente dei dati su file tramite flussi fstream (file TXT / CSV)",
                "Algoritmi di ricerca binaria per matricola e ordinamento per cognome e media voti",
                "Gestione dinamica degli array tramite la libreria standard std::vector"
            ]
        },
        "2": {
            badge: "Java / Core & OOP",
            title: "Simulatore Negozio & Magazzino",
            description: "Software per la simulazione delle operazioni di cassa, inventario magazzino e fidelizzazione clienti realizzato nel rispetto dei principi fondamentali di incapsulamento e modularità.",
            features: [
                "Gerarchia di ereditarietà con classe base 'Prodotto' e classi figlie (Alimentare, Elettronica)",
                "Uso di interfacce Java e polimorfismo per il calcolo sconti differenziato",
                "Gestione robusta degli errori con eccezioni personalizzate (es. ProdottoEsauritoException)",
                "Gestione elenchi dinamici tramite Java Collections Framework (ArrayList, HashMap)"
            ]
        },
        "3": {
            badge: "Web Frontend / Portfolio",
            title: "Portfolio CV Personale Interattivo",
            description: "Questo stesso sito web, progettato da zero per presentare il proprio profilo professionale a recruiter e aziende in modo moderno, intuitivo e accattivante.",
            features: [
                "Codice semantico puro in HTML5 strutturato per l'accessibilità",
                "CSS3 moderno con Variabili Personalizzate (CSS Custom Properties) e layout Flexbox/Grid",
                "Supporto completo per Tema Scuro e Tema Chiaro con memoria persistente in LocalStorage",
                "Design 100% responsive testato su smartphone, tablet e monitor widescreen",
                "Funzionalità di stampa ottimizzata (@media print) per esportazione rapida in PDF"
            ]
        },
        "4": {
            badge: "JavaScript ES6 / Web App",
            title: "Task Manager con LocalStorage",
            description: "Applicazione web da studente per gestire le scadenze dei compiti in classe, interrogazioni e progetti, senza necessità di server di backend.",
            features: [
                "Manipolazione in tempo reale del Document Object Model (DOM) tramite JavaScript puro",
                "Salvataggio permanente dei dati nel browser tramite API Web Storage (LocalStorage)",
                "Filtri dinamici per stato (Completati, In corso, Scaduti) e priorità (Alta, Media, Bassa)",
                "Validazione dell'input utente per evitare inserimenti vuoti o date non valide"
            ]
        },
        "5": {
            badge: "C++ / Algoritmi & Benchmark",
            title: "Benchmark Comparativo di Algoritmi di Ordinamento",
            description: "Laboratorio sperimentale mirato all'analisi delle prestazioni computazionali dei principali algoritmi di sorting su dataset numerici generati casualmente.",
            features: [
                "Implementazione degli algoritmi: Bubble Sort, Selection Sort, Insertion Sort e QuickSort ricorsivo",
                "Misurazione precisa al microsecondo dei tempi di calcolo con la libreria std::chrono",
                "Test su dataset da 1.000 a 100.000 elementi con array ordinati, invertiti e casuali",
                "Analisi e confronto pratico della complessità temporale asintotica O(n²) vs O(n log n)"
            ]
        },
        "6": {
            badge: "Java / Game Logic",
            title: "Gioco Trivia Quiz Multilingua",
            description: "Gioco a quiz educativo a risposta multipla su argomenti di cultura generale e informatica con calcolo dinamico del punteggio e gestione timer.",
            features: [
                "Lettura e parsing delle domande e risposte da file di testo esterno configurabile",
                "Gestione round con timer e penalità per risposte errate consecutive",
                "Salvataggio del punteggio record e classifica locale dei migliori giocatori",
                "Architettura pulita e scalabile per aggiungere nuove categorie con facilità"
            ]
        }
    };

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projId = btn.getAttribute('data-project');
            const data = projectDetails[projId];

            if (data) {
                modalContent.innerHTML = `
                    <span class="modal-header-badge">${data.badge}</span>
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Caratteristiche Principali:</h4>
                    <ul class="modal-details-list">
                        ${data.features.map(f => `<li><i class="fa-solid fa-check-circle"></i><span>${f}</span></li>`).join('')}
                    </ul>
                    <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;">
                        <button class="btn btn-sm btn-outline" id="modal-close-inner">Chiudi</button>
                    </div>
                `;

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';

                document.getElementById('modal-close-inner').addEventListener('click', closeModal);
            }
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    // Chiudi cliccando sullo sfondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Chiudi con il tasto ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    /* ==========================================================================
       6. FORM CONTATTO CON INVIO REALE Email (VIA FORMSUBMIT)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    // MODIFICA QUI: Inserisci la tua email se desideri ricevere i messaggi
    const userEmail = "tuaemail@esempio.com";

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('sender-name').value.trim();
            const email = document.getElementById('sender-email').value.trim();
            const subject = document.getElementById('sender-subject').value.trim();
            const message = document.getElementById('sender-message').value.trim();

            const originalBtnHTML = formSubmitBtn.innerHTML;
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Invio in corso...`;

            try {
                // Invio automatico del messaggio alla casella Gmail
                const response = await fetch(`https://formsubmit.co/ajax/${userEmail}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        Nome: name,
                        Email: email,
                        Oggetto: subject,
                        Messaggio: message,
                        _subject: `[Portfolio CV] Nuovo messaggio da: ${name} (${subject})`,
                        _template: "table"
                    })
                });

                if (response.ok) {
                    formAlert.className = 'form-alert success';
                    formAlert.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i>
                        <strong>Grazie ${name}!</strong> Il tuo messaggio è stato inviato con successo.
                    `;
                    formAlert.classList.remove('d-none');
                    contactForm.reset();
                } else {
                    throw new Error("Errore nell'invio del modulo");
                }
            } catch (error) {
                // Fallback: se siamo in locale (file://) o fetch bloccato da CORS, invia tramite form standard
                if (window.location.protocol === 'file:' || !window.fetch) {
                    contactForm.submit();
                    return;
                }

                // Fallback con apertura diretta client di posta
                formAlert.className = 'form-alert';
                formAlert.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                formAlert.style.border = '1px solid #ef4444';
                formAlert.style.color = '#ef4444';
                formAlert.innerHTML = `
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <strong>Nota:</strong> Si è verificato un problema di rete. Puoi scrivermi direttamente tramite email cliccando qui: 
                    <a href="mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" style="text-decoration: underline; font-weight: 700; color: inherit;">Invia con Gmail / Client Email</a>.
                `;
                formAlert.classList.remove('d-none');
            } finally {
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnHTML;

                setTimeout(() => {
                    formAlert.classList.add('d-none');
                    formAlert.removeAttribute('style');
                }, 10000);
            }
        });
    }

    /* ==========================================================================
       7. PULSANTE STAMPA / SALVA CV
       ========================================================================== */
    const printCvBtn = document.getElementById('print-cv-btn');
    if (printCvBtn) {
        printCvBtn.addEventListener('click', () => {
            window.print();
        });
    }

    /* ==========================================================================
       8. AGGIORNAMENTO AUTOMATICO ANNO NEL FOOTER
       ========================================================================== */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
