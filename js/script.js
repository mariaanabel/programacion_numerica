// Saludo según la hora del día
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    let greetingMessage = '';
    
    if (hour >= 0 && hour < 6) {
        // Madrugada
        greetingMessage = '🌙 ¡Buenas noches! Descansa pronto, María Anabel 💤';
    } else if (hour >= 6 && hour < 12) {
        // Mañana
        greetingMessage = '🌅 ¡Buenos días! Que tengas un hermoso día, María Anabel ☀️';
    } else if (hour >= 12 && hour < 18) {
        // Tarde
        greetingMessage = '☀️ ¡Buenas tardes! Sigue brillando, María Anabel ✨';
    } else {
        // Noche
        greetingMessage = '🌙 ¡Buenas noches! Hora de estudiar tranquila, María Anabel 💖';
    }
    
    greetingElement.textContent = greetingMessage;
    
    // Animación del saludo
    greetingElement.style.opacity = '0';
    setTimeout(() => {
        greetingElement.style.transition = 'opacity 1s ease-in-out';
        greetingElement.style.opacity = '1';
    }, 100);
}

// Actualizar saludo al cargar la página
updateGreeting();

// Actualizar saludo cada minuto por si cambia la hora
setInterval(updateGreeting, 60000);

// Crear partículas flotantes aleatorias
function createParticle(x, y) {
    const particles = ['✨', '💖', '🌸', '⭐', '💫', '🦋'];
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    particle.style.animation = 'particle-float 2s ease-out forwards';
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Efecto ripple en las tarjetas
document.querySelectorAll('.unit-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    // Crear partículas al pasar el mouse
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createParticle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    });
});

// Animación de entrada para las tarjetas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.unit-card, .info-card').forEach(card => {
    observer.observe(card);
});

// Efecto de escritura en el título
const title = document.querySelector('header h1');
const originalText = title.textContent;
title.textContent = '';

let index = 0;
function typeWriter() {
    if (index < originalText.length) {
        title.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 500);

// Cambiar color de fondo dinámicamente según la hora
function updateBackground() {
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 6 && hour < 12) {
        // Mañana - tonos más claros
        body.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffd6d9 100%)';
    } else if (hour >= 12 && hour < 18) {
        // Tarde - tonos cálidos
        body.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)';
    } else {
        // Noche - tonos más profundos
        body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffd6e7 100%)';
    }
}

updateBackground();

// Crear partículas automáticas cada cierto tiempo
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createParticle(x, y);
}, 3000);

// Efecto parallax suave en las decoraciones
document.addEventListener('mousemove', (e) => {
    const decorations = document.querySelectorAll('.decoration');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        decoration.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Mensajes motivacionales al hacer clic en las info-cards
const motivationalMessages = [
    "¡Sigue adelante! 💪✨",
    "¡Tú puedes lograrlo! 🌟",
    "¡Eres increíble! 💖",
    "¡Excelente trabajo! 🎉",
    "¡Continúa así! 🌸"
];

document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', function() {
        const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 1.5em;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(255, 154, 158, 0.5);
            z-index: 1000;
            animation: bounce 0.5s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translate(-50%, -50%) scale(0.8)';
            messageEl.style.transition = 'all 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 2000);
    });
});

console.log('💖 ¡Bienvenida al repositorio de Programación Numérica! ✨');