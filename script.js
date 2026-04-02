const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const terminal = document.getElementById("terminal");
const bar = document.getElementById("bar");

let progress = 0;
let dots = 0;
let interval;

function startSimulation() {
    interval = setInterval(() => {
        progress++;

        // прогресс бар
        bar.style.width = progress + "%";

        // анимация точек
        dots = (dots + 1) % 4;
        let dotsText = ".".repeat(dots);

        terminal.innerHTML = "Downloading" + dotsText;

        if (progress >= 100) {
            clearInterval(interval);
            finish();
        }
    }, 80);
}

function finish() {
    terminal.innerHTML = "Downloading...\n\n> Downloaded successful";

    setTimeout(() => {
        terminal.innerHTML += "<img src='downloaded.svg' style='width:18px; height:18px'>";
        terminal.classList.add("blink");
        resetBtn.style.display = "inline-block";
    }, 800);
}

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    startSimulation();
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);

    terminal.innerHTML = "";
    bar.style.width = "0%";
    progress = 0;
    dots = 0;

    startBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
    terminal.classList.remove("blink");
});

const canvas = document.getElementById("j");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);
function drawMatrix() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0,0,canvas.width, canvas.height);
      ctx.fillStyle = fontSize + "px monospace";
      ctx.fillStyle = "#00ff00";
      ctx.font = fontSize + "px monocpace";
      for (let i=0; i<drops.length; i++){
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text,i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975){
            drops[i] = 0;
        }
      }
}
setInterval(drawMatrix, 50);