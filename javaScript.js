const canvas = document.getElementById('bolhas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// Criar bolhas
const bolhas = [];
const quantidade = 20;

for (let i=0; i<quantidade; i++) {
    bolhas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 10 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        cor: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`
    });
}

// Função para desenhar as bolhas
function desenhar() {
    ctx.clearRect(0, 0, width, height);
    bolhas.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.cor;
        ctx.fill();
    });
}

// Função para atualizar posição das bolhas
function atualizar() {
    bolhas.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        // Rebotar nas paredes
        if (b.x + b.r > width || b.x - b.r < 0) b.vx *= -1;
        if (b.y + b.r > height || b.y - b.r < 0) b.vy *= -1;
    });
}

// Loop de animação
function loop() {
    atualizar();
    desenhar();
    requestAnimationFrame(loop);
}

loop();

// Tocando som ao clicar na bolha (opcional)
canvas.addEventListener('click', (e) => {
    bolhas.forEach(b => {
        const dx = e.clientX - b.x;
        const dy = e.clientY - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < b.r) {
            // Tocando som
            const audio = new Audio('https://www.soundjay.com/misc/sounds/coin-1.mp3');
            audio.play();
        }
    });
});
