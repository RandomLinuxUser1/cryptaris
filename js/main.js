const DISCORD_INVITE = 'https://discord.gg/DFejy6BdFt';

document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById('view-features');
    const closeBtn = document.getElementById('close-features');
    const features = document.getElementById('features-section');
    const downloadFree = document.getElementById('download-free');
    const purchasePaid = document.getElementById('purchase-paid');

    viewBtn && viewBtn.addEventListener('click', (e) => {
        features.classList.remove('hidden');
        features.scrollIntoView({ behavior: 'smooth' });
    });

    closeBtn && closeBtn.addEventListener('click', () => {
        features.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    downloadFree && downloadFree.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(DISCORD_INVITE, '_blank');
    });

    purchasePaid && purchasePaid.addEventListener('click', (e) => {
    });
});

(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const EMOJIS = ['🍬', '🌽', '🎃', '👻', '🍫', '🦇'];
    const LAYERS = 4;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function initParticles() {
        particles = [];
        const count = Math.floor((W * H) / 45000);
        for (let i = 0; i < count; i++) {
            const layer = Math.floor(rand(0, LAYERS));
            particles.push({
                x: rand(0, W),
                y: rand(-H, H),
                size: rand(18, 36) * (1 - layer * 0.14),
                speed: rand(0.2, 1.2) + layer * 0.4,
                rotate: rand(0, Math.PI * 2),
                rotSpeed: rand(-0.01, 0.01),
                emoji: EMOJIS[Math.floor(rand(0, EMOJIS.length))],
                layer
            });
        }
    }
    initParticles();

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) {
            ctx.save();
            ctx.globalAlpha = 0.9 - p.layer * 0.13;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotate);
            ctx.font = `${p.size}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(107,43,216,0.25)';
            ctx.shadowBlur = 8 - p.layer * 2;
            ctx.fillText(p.emoji, 0, 0);
            ctx.restore();

            p.y += p.speed + Math.sin((p.x + p.y) / 200) * 0.3;
            p.rotate += p.rotSpeed;
            p.x += Math.sin(p.y / 120 + p.layer) * 0.4;

            if (p.y > H + 60) {
                p.y = -80;
                p.x = rand(0, W);
            }
            if (p.x > W + 60) p.x = -60;
            if (p.x < -60) p.x = W + 60;
        }
        requestAnimationFrame(draw);
    }
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => initParticles(), 200);
    });
})();

