// Toggle menu (buka/tutup)
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Scroll halus dengan offset (biar tidak ketutup navbar)
const headerHeight = document.querySelector(".header").offsetHeight;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 2; // offset akurat
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }

    if (window.innerWidth <= 768) {
      nav.classList.remove("show");
    }
  });
});

// Tips harian
const tips = [
  "Minum air putih minimal 8 gelas sehari.",
  "Jangan lewatkan sarapan pagi.",
  "Lakukan peregangan setiap 2 jam.",
  "Tidur cukup 7–8 jam setiap malam.",
  "Kurangi konsumsi gula berlebih."
];
document.getElementById("tips-text").textContent =
  tips[Math.floor(Math.random() * tips.length)];

//  Modal Function 
const modal = document.getElementById("custom-modal");
const modalTitle = document.getElementById("modal-title");
const modalMsg = document.getElementById("modal-message");
const closeBtn = document.querySelector(".close");

function showModal(title, message) {
  modalTitle.textContent = title;
  modalMsg.textContent = message;
  modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

//  Kalkulator BMI 
document.getElementById("open-bmi").addEventListener("click", () => {
  const berat = parseFloat(prompt("Masukkan berat badan Anda (kg):"));
  const tinggi = parseFloat(prompt("Masukkan tinggi badan Anda (cm):")) / 100;
  if (berat && tinggi) {
    const bmi = berat / (tinggi * tinggi);
    let kategori = "";
    if (bmi < 18.5) kategori = "Kurus";
    else if (bmi < 24.9) kategori = "Normal";
    else if (bmi < 29.9) kategori = "Berlebih";
    else kategori = "Obesitas";
    showModal("Hasil BMI Anda", `BMI: ${bmi.toFixed(1)} (${kategori})`);
  } else {
    showModal("Input Tidak Valid", "Masukkan angka yang valid!");
  }
});

//  Pengingat Minum Air 
document.getElementById("start-water").addEventListener("click", () => {
  showModal("Pengingat Aktif 💧", "Anda akan diingatkan setiap 2 jam (simulasi).");
});

document.getElementById("start-water").addEventListener("click", () => {
  alert("Pengingat minum aktif! Anda akan diingatkan setiap 2 jam (simulasi).");
});

//  Form Pesan 
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("form-msg").textContent =
    "Terima kasih! Pesan Anda sudah terkirim (simulasi).";
  e.target.reset();
});

//  Efek Animasi saat muncul di layar 
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section, .card, .article-card").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ===== Dark Mode =====
const darkToggle = document.getElementById("dark-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ===== Mood Tracker =====
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    document.getElementById("mood-result").textContent =
      `Terima kasih! Mood kamu hari ini: ${mood}`;
    showModal("Mood Tersimpan", `Mood kamu hari ini: ${mood}.`);
  });
});

// ===== Efek gelembung / bubble background =====
const canvas = document.getElementById("bubble-bg");
const ctx = canvas.getContext("2d");

// Ukuran canvas disesuaikan dengan viewport sebenarnya (tanpa overflow)
canvas.width = document.documentElement.clientWidth;
canvas.height = window.innerHeight;

// Atur gaya agar tidak menyebabkan scroll horizontal
canvas.style.display = "block";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.overflow = "hidden";
canvas.style.zIndex = "0";

let bubbles = [];
for (let i = 0; i < 25; i++) {
  bubbles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 8 + 2,
    d: Math.random() + 0.5
  });
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });
  moveBubbles();
}

function moveBubbles() {
  bubbles.forEach(b => {
    b.y -= b.d;
    if (b.y < -10) {
      b.y = canvas.height + 10;
      b.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawBubbles, 50);

// Pastikan canvas tetap pas saat resize
window.addEventListener("resize", () => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = window.innerHeight;
});

// ===== Toast Notification =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Contoh penerapan Toast di Form
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  showToast("Pesan berhasil dikirim!");
  e.target.reset();
});
// ===== Scroll halus untuk semua tautan anchor yang mengarah ke id di halaman =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Animasi tambahan =====
document.querySelectorAll(".animate-fade, .animate-slide").forEach(el => observer.observe(el));
