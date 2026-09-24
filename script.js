// Thangoo Surprise - all interaction is intentionally kept in this one beginner-friendly file.

const sentences = [
  "100% kuduthathuku romba thanks ❤️",
  "Unakku oru small surprise irukku 🥹",
  "Namma memories ellame romba special 💕",
  "Nee sirikkumbodhu romba cute ah irukka 😌❤️",
  "Innum konjam surprise irukku... 👀",
  "Ready ah? 😍",
  "Here we goooo ❤️"
];

const pages = document.querySelectorAll(".page");
const heartLayer = document.getElementById("heart-layer");
const photoPaths = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"];
let sentenceTimer;
let photoTimer;
let currentPhoto = 0;

function showPage(pageId) {
  pages.forEach((page) => {
    const isTarget = page.id === pageId;
    page.hidden = !isTarget;
    page.classList.toggle("active", isTarget);
    if (isTarget) {
      const panel = page.querySelector(".card, .content-panel");
      if (panel) {
        panel.classList.remove("reveal");
        void panel.offsetWidth;
        panel.classList.add("reveal");
      }
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createHeart() {
  const heart = document.createElement("span");
  const symbols = ["❤️", "💕", "💗", "💖", "💘", "💓", "💞"];
  heart.className = "floating-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 22}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
  heartLayer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function startHearts(interval = 850) {
  createHeart();
  return window.setInterval(createHeart, interval);
}

let heartInterval = startHearts();

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name-input").value.trim().toLowerCase();
  const password = document.getElementById("password-input").value.trim();

  if (name === "thangoo" && password === "332023") {
    loginMessage.textContent = "Login Successful ❤️";
    loginMessage.className = "feedback success";
    window.setTimeout(() => showPage("percentage-page"), 1000);
  } else {
    loginMessage.textContent = "Wrong Name or Password 😜";
    loginMessage.className = "feedback";
  }
});

const percentageForm = document.getElementById("percentage-form");
const percentageMessage = document.getElementById("percentage-message");
percentageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = Number(document.getElementById("percentage-input").value);
  if (value === 100) {
    percentageMessage.textContent = "Correct answer ❤️";
    percentageMessage.className = "feedback success";
    window.setTimeout(startSentenceSequence, 700);
  } else {
    percentageMessage.textContent = "Crt ah podu da venna 😂❤️";
    percentageMessage.className = "feedback";
  }
});

function startSentenceSequence() {
  clearTimeout(sentenceTimer);
  showPage("sentences-page");
  const sentenceText = document.getElementById("sentence-text");
  const progress = document.getElementById("sentence-progress");
  progress.innerHTML = sentences.map((_, index) => `<span${index === 0 ? ' class="active"' : ""}></span>`).join("");

  let index = 0;
  function showSentence() {
    sentenceText.classList.remove("show");
    void sentenceText.offsetWidth;
    sentenceText.textContent = sentences[index];
    sentenceText.classList.add("show");
    [...progress.children].forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
    index += 1;
    if (index < sentences.length) sentenceTimer = window.setTimeout(showSentence, 3000);
    else sentenceTimer = window.setTimeout(showVideoPage, 3000);
  }
  showSentence();
}

const surpriseVideo = document.getElementById("surprise-video");
const videoFallback = document.getElementById("video-fallback");
function showVideoPage() {
  showPage("video-page");
  surpriseVideo.load();
  surpriseVideo.play().catch(() => {
    videoFallback.textContent = "Tap the video play button to continue ❤️";
    videoFallback.hidden = false;
  });
}
surpriseVideo.addEventListener("playing", () => { videoFallback.hidden = true; });
surpriseVideo.addEventListener("error", () => {
  videoFallback.textContent = "The video could not be loaded. Check cute-video.mp4 in the project root.";
  videoFallback.hidden = false;
});
surpriseVideo.addEventListener("ended", showMemoriesPage);

const memoryImage = document.getElementById("memory-image");
const photoProgress = document.getElementById("photo-progress");
const photoFallback = document.getElementById("photo-fallback");
const loveSong = document.getElementById("love-song");
const audioFallback = document.getElementById("audio-fallback");
photoProgress.innerHTML = photoPaths.map((_, index) => `<span${index === 0 ? ' class="active"' : ""}></span>`).join("");

// Preload every photo so the slideshow swaps only after the next image is ready.
const photoCache = photoPaths.map((path, index) => {
  const image = new Image();
  image.addEventListener("load", () => {
    if (index === currentPhoto && document.getElementById("memories-page").hidden === false) renderPhoto(index);
  });
  image.addEventListener("error", () => {
    if (index === currentPhoto) showPhotoMessage(`Photo ${index + 1} could not be loaded.`);
  });
  image.src = path;
  return image;
});

function showPhotoMessage(message) {
  photoFallback.textContent = message;
  photoFallback.hidden = false;
}

function renderPhoto(index) {
  currentPhoto = (index + photoPaths.length) % photoPaths.length;
  const nextPhoto = photoCache[currentPhoto];
  if (!nextPhoto.complete || nextPhoto.naturalWidth === 0) {
    showPhotoMessage(`Loading photo ${currentPhoto + 1}...`);
    return;
  }

  photoFallback.hidden = true;
  memoryImage.classList.remove("memory-image");
  void memoryImage.offsetWidth;
  memoryImage.src = nextPhoto.src;
  memoryImage.dataset.index = currentPhoto;
  memoryImage.classList.add("memory-image");
  [...photoProgress.children].forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentPhoto));
}

memoryImage.addEventListener("error", () => showPhotoMessage(`Photo ${currentPhoto + 1} could not be displayed.`));

function showMemoriesPage() {
  showPage("memories-page");
  renderPhoto(0);
  clearInterval(photoTimer);
  photoTimer = window.setInterval(() => renderPhoto(currentPhoto + 1), 3500);
  loveSong.play().catch(() => {
    // Audio controls remain available when the browser requires a user gesture.
  });
}

document.getElementById("previous-photo").addEventListener("click", () => renderPhoto(currentPhoto - 1));
document.getElementById("next-photo").addEventListener("click", () => renderPhoto(currentPhoto + 1));
loveSong.addEventListener("error", () => { audioFallback.hidden = false; });

// Keep the page lively while the video and final memory section are visible.
window.setInterval(() => {
  if (!document.getElementById("video-page").hidden || !document.getElementById("memories-page").hidden) createHeart();
}, 1200);
