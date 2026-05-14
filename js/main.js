const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drops = [];
let lightningActive = false;
let lightningFrames = 0;
let lightningPath = [];

for (let i = 0; i < 400; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20,
        speed: Math.random() * 4 + 4
    });
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(174,194,224,0.5)";
    ctx.lineWidth = 1;

    for (let i = 0; i < drops.length; i++) {
        let d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;

        if (d.y > canvas.height) {
            d.y = -20;
            d.x = Math.random() * canvas.width;
        }
    }
}

function drawLightning() {

   
    if (!lightningActive && Math.random() < 0.01) {
        lightningActive = true;
        lightningFrames = 8 + Math.random() * 6; // 👈 duration

        let x = Math.random() * canvas.width;
        let y = 0;

        lightningPath = [];
        lightningPath.push({x, y});

        let segments = 10 + Math.random() * 10;

        for (let i = 0; i < segments; i++) {
            x += (Math.random() - 0.5) * 30;
            y += canvas.height / segments;

            lightningPath.push({x, y});
        }
    }

    
    if (lightningActive) {
        ctx.beginPath();
        ctx.moveTo(lightningPath[0].x, lightningPath[0].y);

        for (let i = 1; i < lightningPath.length; i++) {
            ctx.lineTo(lightningPath[i].x, lightningPath[i].y);
        }

        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";

        ctx.stroke();

        
        ctx.fillStyle = "rgba(200,220,255,0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        lightningFrames--;

        if (lightningFrames <= 0) {
            lightningActive = false;
        }
    }

    ctx.shadowBlur = 0;
}


function animate() {
    drawRain();
    drawLightning();
    requestAnimationFrame(animate);
}

animate();

function lightning() {
    document.body.classList.add("flash");

    setTimeout(() => {
        document.body.classList.remove("flash");
    }, 100);
}


setInterval(() => {
    if (Math.random() < 0.2) {
        lightning();
    }
}, 3000);


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});