// SHIVAM POST portfolio — update the project URLs and social links below.
const PROJECTS = {
  documentary: { title: "Documentary Editing", description: "A story-led documentary edit. Add your final video URL in script.js when ready.", url: "" },
  retention: { title: "Retention-Based Editing", description: "A high-retention edit built around hooks, rhythm and visual pacing. Add your final video URL in script.js when ready.", url: "" },
  podcast: { title: "Podcast Editing", description: "A polished conversation edit with clean pacing and audio. Add your final video URL in script.js when ready.", url: "" },
  talkinghead: { title: "Talking-Head Editing", description: "Creator-focused editing with clear structure and supporting motion. Add your final video URL in script.js when ready.", url: "" }
};
const SOCIALS = { Instagram: "", YouTube: "", GitHub: "" };

document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Gentle mouse-follow light
let pointerX = innerWidth / 2, pointerY = innerHeight / 2;
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let ringX = pointerX, ringY = pointerY;
if (matchMedia("(pointer:fine)").matches) {
  document.addEventListener("mousemove", e => {
    pointerX = e.clientX; pointerY = e.clientY;
    cursorDot.style.opacity = "1"; cursorRing.style.opacity = "1";
    cursorDot.style.left = pointerX + "px"; cursorDot.style.top = pointerY + "px";
    document.documentElement.style.setProperty("--mx", pointerX + "px");
    document.documentElement.style.setProperty("--my", pointerY + "px");
  });
  function moveRing() {
    ringX += (pointerX - ringX) * .16; ringY += (pointerY - ringY) * .16;
    cursorRing.style.left = ringX + "px"; cursorRing.style.top = ringY + "px";
    requestAnimationFrame(moveRing);
  }
  moveRing();
  document.querySelectorAll("a,button,.project-visual").forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("hover"));
  });
}

// Subtle tilt on large cards (desktop only)
if (matchMedia("(pointer:fine) and (min-width: 801px)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      const target = card.querySelector(".project-visual") || card.querySelector(".hero-video-frame");
      if (target) target.style.transform = `rotateY(${x * 2.6}deg) rotateX(${-y * 2.2}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      const target = card.querySelector(".project-visual") || card.querySelector(".hero-video-frame");
      if (target) target.style.transform = "";
    });
  });
}

// Project modal: if URL exists, open it; otherwise show a clear placeholder message.
const dialog = document.querySelector(".project-dialog");
const dialogTitle = dialog.querySelector(".dialog-title");
const dialogCopy = dialog.querySelector(".dialog-copy");
const dialogAction = dialog.querySelector(".dialog-action");
document.querySelectorAll("[data-project]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const p = PROJECTS[link.dataset.project];
    dialogTitle.textContent = p.title;
    dialogCopy.textContent = p.url ? "Your project is ready to view." : p.description;
    dialogAction.href = p.url || "#";
    dialogAction.style.display = p.url ? "inline-block" : "none";
    dialog.showModal();
  });
});
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

// Social URLs are intentionally left blank for later editing.
document.querySelectorAll("[data-social]").forEach(link => {
  link.addEventListener("click", e => {
    const url = SOCIALS[link.dataset.social];
    if (!url) {
      e.preventDefault();
      dialogTitle.textContent = link.dataset.social + " link";
      dialogCopy.textContent = "Add your " + link.dataset.social + " URL in the SOCIALS object inside script.js.";
      dialogAction.style.display = "none";
      dialog.showModal();
    } else {
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  });
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".topbar nav");
menuToggle.addEventListener("click", () => {
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  nav.style.flexDirection = "column";
  nav.style.alignItems = "flex-start";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  if (innerWidth <= 800) nav.style.display = "none";
}));

// Optional soft interaction tick. Browsers require a user gesture; no sound plays until first interaction.
let audioCtx;
function softTick() {
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = "sine"; osc.frequency.value = 620;
    gain.gain.setValueAtTime(.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.018, audioCtx.currentTime + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + .055);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + .06);
  } catch (_) {}
}
document.querySelectorAll("a,button").forEach(el => el.addEventListener("click", softTick));
