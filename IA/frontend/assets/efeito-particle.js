// Configurações do efeito
const config = {
    particleCount: 100,
    particleColor: ['#8A2BE2', '#9932CC', '#DA70D6'],
    defaultRadius: 2,
    variantRadius: 2,
    defaultSpeed: 1,
    variantSpeed: 0.5
};

// Inicialização
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cria partículas
const particles = [];
for (let i = 0; i < config.particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: config.defaultRadius + Math.random() * config.variantRadius,
        color: config.particleColor[Math.floor(Math.random() * config.particleColor.length)],
        speedX: (Math.random() - 0.5) * (config.defaultSpeed + Math.random() * config.variantSpeed),
        speedY: (Math.random() - 0.5) * (config.defaultSpeed + Math.random() * config.variantSpeed)
    });
}

// Animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        // Atualiza posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebate nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Desenha
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
    
    requestAnimationFrame(animate);
}

// Inicia
animate();

// Redimensionamento
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});