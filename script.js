// SHIVAM POST portfolio — update the project URLs and social links below.
const PROJECTS = {
  documentary: { title: "Documentary Editing", description: "A story-led documentary edit. Add your final video URL in script.js when ready.", url: "" },
  retention: { title: "Retention-Based Editing", description: "A high-retention edit built around hooks, rhythm and visual pacing. Add your final video URL in script.js when ready.", url: "" },
  podcast: { title: "Podcast Editing", description: "A polished conversation edit with clean pacing and audio. Add your final video URL in script.js when ready.", url: "" },
  talkinghead: { title: "Talking-Head Editing", description: "Creator-focused editing with clear structure and supporting motion. Add your final video URL in script.js when ready.", url: "" }
};
const SOCIALS = { Instagram: "", YouTube: "", GitHub: "" };

document.getElementById("year").textContent = new Date().getFullYear();

// Add subtle staggered reveal to repeating rows that should enter one after another.
const staggerSelectors = [
  '.project-info > *',
  '.skill-cloud > span',
  '.service-list > div',
  '.stats-row > div',
  '.contact-links > a',
  '.contact-bottom > *',
  '.manifesto-copy > *',
  '.footer > *'
];
staggerSelectors.forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (!element.classList.contains('reveal')) element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index * 72, 360)}ms`);
  });
});

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

// Ambient blue light follows an elliptical path as the page scrolls.
(() => {
  const orbits = [...document.querySelectorAll('.ambient-orbit')];
  if (!orbits.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let frame = 0;
  const render = () => {
    frame = 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    const angle = progress * Math.PI * 5.5;
    const width = window.innerWidth;
    const height = window.innerHeight;
    orbits.forEach((orb, index) => {
      const phase = angle + index * Math.PI * .92;
      const radiusX = width * (index === 0 ? .39 : .34);
      const radiusY = height * (index === 0 ? .33 : .39);
      const x = width * .5 + Math.cos(phase) * radiusX;
      const y = height * .5 + Math.sin(phase) * radiusY;
      const size = orb.getBoundingClientRect().width || 320;
      orb.style.transform = `translate3d(${(x - size / 2).toFixed(1)}px,${(y - size / 2).toFixed(1)}px,0)`;
    });
  };
  const requestRender = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender, { passive: true });
  render();
})();

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


// Apple-style pointer movement: tiny, smooth tilt and a soft light that follows the cursor.
// Applied to the hero video, all four portfolio visuals, and each package card.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const pointerCards = document.querySelectorAll('.hero-video-frame, .project-visual, .package-card');
  pointerCards.forEach((card) => {
    const tiltLimit = card.classList.contains('hero-video-frame') ? 1.75 : card.classList.contains('project-visual') ? 2.35 : 2.15;
    const onPointerMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const rotateX = (0.5 - y) * tiltLimit * 2;
      const rotateY = (x - 0.5) * tiltLimit * 2;
      card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
      card.classList.add('is-pointer-active');
    };
    const resetPointer = () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
      card.classList.remove('is-pointer-active');
    };
    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', resetPointer);
    card.addEventListener('pointercancel', resetPointer);
  });
}


// Brand-free, self-hosted HTML5 showreel player. Add assets/showreel.mp4 to enable playback.
(() => {
  const player = document.querySelector('[data-custom-player]');
  if (!player) return;
  const video = player.querySelector('video');
  const playButtons = player.querySelectorAll('[data-player-play]');
  const seek = player.querySelector('[data-player-seek]');
  const volume = player.querySelector('[data-player-volume]');
  const muteButton = player.querySelector('[data-player-mute]');
  const fullscreenButton = player.querySelector('[data-player-fullscreen]');
  const currentTimeLabel = player.querySelector('[data-player-current]');
  const durationLabel = player.querySelector('[data-player-duration]');
  const playIcon = player.querySelector('[data-play-icon]');

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const showMissingVideo = () => player.classList.add('needs-video');
  const updatePlayState = () => {
    const playing = !video.paused && !video.ended;
    player.classList.toggle('is-playing', playing);
    playButtons.forEach(button => {
      button.setAttribute('aria-label', playing ? 'Pause showreel' : 'Play showreel');
      button.title = playing ? 'Pause' : 'Play';
    });
    if (playIcon) {
      playIcon.innerHTML = playing
        ? '<path d="M7 5h4v14H7zM15 5h4v14h-4z" fill="currentColor"/>'
        : '<path d="M8 5.8c0-.8.9-1.3 1.6-.9l10 6.1a1.2 1.2 0 0 1 0 2L9.6 19a1.1 1.1 0 0 1-1.6-.9V5.8Z" fill="currentColor"/>';
    }
  };
  const togglePlay = () => {
    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      showMissingVideo();
      return;
    }
    if (video.paused) {
      video.play().then(() => player.classList.remove('needs-video')).catch(showMissingVideo);
    } else {
      video.pause();
    }
  };

  playButtons.forEach(button => button.addEventListener('click', togglePlay));
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updatePlayState);
  video.addEventListener('pause', updatePlayState);
  video.addEventListener('ended', updatePlayState);
  video.addEventListener('loadedmetadata', () => {
    durationLabel.textContent = formatTime(video.duration);
    seek.disabled = false;
    player.classList.remove('needs-video');
  });
  video.addEventListener('timeupdate', () => {
    currentTimeLabel.textContent = formatTime(video.currentTime);
    if (Number.isFinite(video.duration) && video.duration > 0) {
      seek.value = String(Math.round((video.currentTime / video.duration) * 1000));
      seek.style.setProperty('--seek-progress', `${(video.currentTime / video.duration) * 100}%`);
    }
  });
  video.addEventListener('error', showMissingVideo);
  seek.addEventListener('input', () => {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = (Number(seek.value) / 1000) * video.duration;
    }
  });
  volume.addEventListener('input', () => {
    video.volume = Number(volume.value);
    video.muted = video.volume === 0;
    muteButton.setAttribute('aria-label', video.muted ? 'Unmute audio' : 'Mute audio');
  });
  muteButton.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) { video.volume = 1; volume.value = '1'; }
    muteButton.setAttribute('aria-label', video.muted ? 'Unmute audio' : 'Mute audio');
    muteButton.title = video.muted ? 'Unmute audio' : 'Mute audio';
  });
  fullscreenButton.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await player.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) { /* Fullscreen may be unavailable in some embedded browsers. */ }
  });
  updatePlayState();
})();
