// Negativity Shooting Game (JavaScript Part)
//Program by Dark Mephilus
// Global Variables
const gameCanvas = document.getElementById('gameCanvas');
const canvasContext = gameCanvas.getContext('2d');
const quitBtn = document.getElementById('quitBtn');
// Info Modal Setup
const infoButton = document.getElementById('infoButton');
const infoModal = document.getElementById('infoModal');
// Show Info Modal
infoButton.addEventListener('click', () => {
    infoModal.style.display = 'block';
    setTimeout(() => { infoModal.classList.add('active'); }, 10);
});
window.closeInfoModal = function() {
    infoModal.classList.remove('active');
    setTimeout(() => { infoModal.style.display = 'none'; }, 300);
};
// Game Configuration
const screenWidth = 800;
const screenHeight = 600;
// Dynamic Difficulty Multiplier
let speedMultiplier = 1.0;
// Player Details
const playerSize = 40;
let playerX = (screenWidth - playerSize) / 2;
let playerY = screenHeight - playerSize - 20;
const playerBaseSpeed = 6; 
// Bullet Details
const bulletSize = 8;
const bulletBaseSpeed = 10;
let activeBullets = [];
// Enemies (Negativities) Details
const enemySize = 30;
const enemyBaseSpeed = 1.0; // SUPER RELAXED START SPEED
let activeEnemies = [];
let gameScore = 0;
// Boss Attack Details
const bossSize = 60;
const bossBaseSpeed = 2.5; // Starts slow
let isBossActive = false;
let bossX = 0;
let bossY = 0;
let lastBossTime = Date.now();
const bossInterval = 12000; // Drops every 12 seconds
// Eye-Candy Systems
let backgroundStars = [];
let explosionParticles = [];
let screenShakeTimer = 0;
// Game State
let isPlaying = true;
let showGameOver = false;
let isMovingLeft = false;
let isMovingRight = false;
// Generate Parallax Stars
for(let i=0; i<100; i++) {
    backgroundStars.push({
        x: Math.random() * screenWidth,
        y: Math.random() * screenHeight,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
    });
}
// Vibrant Colors for enemies
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 60%)`;
}
// Particle Explosion logic
function spawnExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
        explosionParticles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 8, // Burst speed X
            vy: (Math.random() - 0.5) * 8, // Burst speed Y
            life: 1.0, 
            color: color
        });
    }
}
// Audio System
const AudioSystem = {
    play(freq, type, duration) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    },
    shoot() { this.play(400, 'square', 0.1); },
    hit() { this.play(150, 'sawtooth', 0.2); },
    bossWarn() { this.play(100, 'square', 0.5); }
};
// Fire Bullet Logic
function shootBullet() {
    if (!isPlaying) return;
    if (activeBullets.length > 5) return; // Max 5 bullets at a time prevents spam & makes it skill-based
    let bulletX = playerX + playerSize / 2 - bulletSize / 2;
    let bulletY = playerY;
    activeBullets.push({ x: bulletX, y: bulletY });
    AudioSystem.shoot();
}
// Input Handling (PC)
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') isMovingLeft = true;
    if (e.key === 'ArrowRight') isMovingRight = true;
    if (e.code === 'Space' && !e.repeat) shootBullet();
});
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') isMovingLeft = false;
    if (e.key === 'ArrowRight') isMovingRight = false;
});
// Input Handling (Mobile)
document.getElementById('btnLeft').addEventListener('pointerdown', () => isMovingLeft = true);
document.getElementById('btnLeft').addEventListener('pointerup', () => isMovingLeft = false);
document.getElementById('btnLeft').addEventListener('pointerleave', () => isMovingLeft = false);
document.getElementById('btnRight').addEventListener('pointerdown', () => isMovingRight = true);
document.getElementById('btnRight').addEventListener('pointerup', () => isMovingRight = false);
document.getElementById('btnRight').addEventListener('pointerleave', () => isMovingRight = false);
document.getElementById('btnShoot').addEventListener('pointerdown', () => shootBullet());
// End Game
quitBtn.addEventListener('click', () => {
    isPlaying = false;
    showGameOver = true;
    quitBtn.style.display = 'none'; 
});
// Update Logic
function updateGameLogic() {
    if (!isPlaying) return;
    // Difficulty increases slightly every 10 points
    speedMultiplier = 1.0 + (Math.floor(gameScore / 10) * 0.2);
    // Player Movement
    if (isMovingLeft && playerX > 0) playerX -= playerBaseSpeed;
    if (isMovingRight && playerX < screenWidth - playerSize) playerX += playerBaseSpeed;
    // Background Stars
    for (let star of backgroundStars) {
        star.y += star.speed * speedMultiplier;
        if (star.y > screenHeight) star.y = 0;
    }
    // Bullets movement
    for (let b of activeBullets) b.y -= bulletBaseSpeed;
    // Enemies movement
    for (let e of activeEnemies) e.y += (enemyBaseSpeed * speedMultiplier);
    // Boss Logic
    if (isBossActive) {
        bossY += (bossBaseSpeed * speedMultiplier);
        // Player vs Boss Collision
        if (playerX < bossX + bossSize && playerX + playerSize > bossX &&
            playerY < bossY + bossSize && playerY + playerSize > bossY) {
            isPlaying = false;
            showGameOver = true;
            quitBtn.style.display = 'none';
        }
        if (bossY > screenHeight) isBossActive = false;
    }
    // Bullet vs Enemy Collision
    for (let i = activeBullets.length - 1; i >= 0; i--) {
        let b = activeBullets[i];
        let hit = false;
        for (let j = activeEnemies.length - 1; j >= 0; j--) {
            let e = activeEnemies[j];
            if (e.x <= b.x + bulletSize && b.x <= e.x + enemySize &&
                e.y <= b.y + bulletSize && b.y <= e.y + enemySize) {
                spawnExplosion(e.x + enemySize/2, e.y + enemySize/2, e.color);
                activeEnemies.splice(j, 1);
                hit = true;
                gameScore++;
                AudioSystem.hit();
                screenShakeTimer = 5; // Mini shake on kill
                break;
            }
        }
        if (hit) activeBullets.splice(i, 1);
    }
    // Update Particles
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
        let p = explosionParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) explosionParticles.splice(i, 1);
    }
    // Cleanup offscreen
    activeBullets = activeBullets.filter(b => b.y > 0);
    activeEnemies = activeEnemies.filter(e => e.y < screenHeight);
    // Spawn Enemies
    if (activeEnemies.length < 5) {
        activeEnemies.push({
            x: Math.floor(Math.random() * (screenWidth - enemySize)),
            y: -enemySize,
            color: getRandomColor()
        });
    }
    // Spawn Boss
    let currentTime = Date.now();
    if (currentTime - lastBossTime >= bossInterval && !isBossActive) {
        bossX = Math.floor(Math.random() * (screenWidth - bossSize));
        bossY = -bossSize;
        isBossActive = true;
        lastBossTime = currentTime;
        AudioSystem.bossWarn();
        screenShakeTimer = 20; // Big shake on spawn
    }
}
// Rendering Logic
function drawFrame() {
    canvasContext.fillStyle = "#050510"; // Space background
    canvasContext.fillRect(0, 0, screenWidth, screenHeight);
    // Screen Shake effect
    canvasContext.save();
    if (screenShakeTimer > 0) {
        let dx = (Math.random() - 0.5) * screenShakeTimer;
        let dy = (Math.random() - 0.5) * screenShakeTimer;
        canvasContext.translate(dx, dy);
        screenShakeTimer--;
    }
    // Draw Stars
    canvasContext.fillStyle = "#ffffff";
    for (let star of backgroundStars) {
        canvasContext.globalAlpha = star.speed; // Parallax dimming
        canvasContext.beginPath();
        canvasContext.arc(star.x, star.y, star.radius, 0, Math.PI*2);
        canvasContext.fill();
    }
    canvasContext.globalAlpha = 1.0;
    if (isPlaying) {
        // Draw Player (Glowing Triangle)
        canvasContext.shadowBlur = 15;
        canvasContext.shadowColor = "#0ef";
        canvasContext.fillStyle = "#ffffff";
        canvasContext.beginPath();
        canvasContext.moveTo(playerX + playerSize / 2, playerY);
        canvasContext.lineTo(playerX, playerY + playerSize);
        canvasContext.lineTo(playerX + playerSize, playerY + playerSize);
        canvasContext.closePath();
        canvasContext.fill();
        canvasContext.shadowBlur = 0; // Reset
        // Draw Bullets (Yellow Glow)
        canvasContext.shadowBlur = 10;
        canvasContext.shadowColor = "#ffff00";
        canvasContext.fillStyle = "#ffff00";
        for (let b of activeBullets) {
            canvasContext.fillRect(b.x, b.y, bulletSize, bulletSize);
        }
        canvasContext.shadowBlur = 0;
        // Draw Enemies
        for (let e of activeEnemies) {
            canvasContext.shadowBlur = 10;
            canvasContext.shadowColor = e.color;
            canvasContext.fillStyle = e.color;
            canvasContext.beginPath();
            canvasContext.arc(e.x + enemySize / 2, e.y + enemySize / 2, enemySize / 2, 0, Math.PI * 2);
            canvasContext.fill();
        }
        canvasContext.shadowBlur = 0;
        // Draw Particles
        for (let p of explosionParticles) {
            canvasContext.globalAlpha = p.life;
            canvasContext.fillStyle = p.color;
            canvasContext.beginPath();
            canvasContext.arc(p.x, p.y, 3, 0, Math.PI*2);
            canvasContext.fill();
        }
        canvasContext.globalAlpha = 1.0;
        // Draw Boss Attack
        if (isBossActive) {
            canvasContext.shadowBlur = 20;
            canvasContext.shadowColor = "#ff0000";
            canvasContext.fillStyle = "#ff0000";
            canvasContext.fillRect(bossX, bossY, bossSize, bossSize);
            canvasContext.shadowBlur = 0;
            // Warning Text
            canvasContext.fillStyle = "#ff0000";
            canvasContext.font = "bold 24px Arial";
            canvasContext.textAlign = "center";
            canvasContext.fillText("INCOMING BOSS !!!", screenWidth / 2, 30);
            canvasContext.fillText("DODGE OR LOSE !!!", screenWidth / 2, 60);
        }
        // Texts
        let centerX = screenWidth / 2;
        let centerY = screenHeight / 2 - 40;
        canvasContext.fillStyle = "#ffffff";
        canvasContext.textAlign = "center";
        canvasContext.font = "bold 36px Arial"; 
        canvasContext.fillText("Score: " + gameScore, centerX, 50);
        // Subdued background instructions
        canvasContext.globalAlpha = 0.5;
        canvasContext.font = "36px Arial"; 
        canvasContext.fillText("Negativity Shooter", centerX, centerY);
        canvasContext.fillText("Shoot the Negativity!", centerX, centerY + 40);
        canvasContext.fillText("PC: Arrows & Space | Phone: Buttons", centerX, centerY + 80);   
        canvasContext.fillStyle = "#0ef"; 
        canvasContext.font = "bold 28px Arial"; 
        canvasContext.fillText("A Game by Dark Mephilus", centerX, centerY + 130); 
        canvasContext.globalAlpha = 1.0;
    } else if (showGameOver) {
        canvasContext.fillStyle = "#ffffff";
        canvasContext.font = "36px Arial";
        canvasContext.textAlign = "center";    
        let centerX = screenWidth / 2;
        let centerY = screenHeight / 2;
        canvasContext.fillText("Game Over !!! Your Score: " + gameScore, centerX, centerY);
        canvasContext.fillText("I Hope You Enjoyed This Game", centerX, centerY + 50);       
        canvasContext.fillStyle = "#0ef";
        canvasContext.fillText("A Game Developed by Dark Mephilus", centerX, centerY + 100);
    }    
    canvasContext.restore(); // Restore from Screen Shake
}
// Game Loop
function runGame() {
    updateGameLogic();
    drawFrame();
    requestAnimationFrame(runGame);
}
// Start
requestAnimationFrame(runGame);
// Service worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker Registered!', reg.scope))
            .catch(err => console.error('Service Worker Registration Failed!', err));
    });
}
// Security features with taunts
// Funny taunt on F12 and other DevTools keys
document.addEventListener('keydown', function (e) {
  if (e.key === "F12" || e.keyCode === 123) {
    e.preventDefault();
    alert("😈 F12? Trying to act clever? Nope!");
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
    alert("😜 Inspect shortcut? Busted!");
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
    alert("😂 Console peek? Dream on!");
  }
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    alert("😅 View source? Not happening, buddy!");
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    alert("😏 Element inspector? You wish!");
  }
});
// End of Program
