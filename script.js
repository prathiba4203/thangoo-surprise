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
const photoPaths = [
  "photos/photo5.jpg",
  "photos/photo6.jpg",
  "photos/photo7.jpg",
  "photos/photo8.jpg",
  "photos/photo9.jpg",
  "photos/photo10.jpg",
  "photos/photo11.jpg",
  "photos/photo12.jpg",
  "photos/photo13.jpg",
  "photos/photo14.jpg",
  "photos/photo15.jpg",
  "photos/photo16.jpg"
];
let sentenceTimer;
let photoTimer;
let currentPhoto = -1;
let slideshowStarted = false;

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
  const value = document.getElementById("percentage-input").value;
  if (value === "100") {
    percentageMessage.textContent = "நம்ம love strong ஆகுறதே உங்க care தான் mama ❤️🥹 😊";
    percentageMessage.className = "feedback success romantic-message";
    window.setTimeout(startSentenceSequence, 2500);
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
const audioPlayButton = document.getElementById("audio-play-button");
function showVideoPage() {
  showPage("video-page");
  surpriseVideo.load();
  surpriseVideo.play().catch(() => {
    videoFallback.textContent = "Tap the video play button to continue ❤️";
    videoFallback.hidden = false;
  });
}
function startLoveSong() {
  loveSong.play().then(() => {
    audioPlayButton.hidden = true;
  }).catch(() => {
    audioPlayButton.hidden = false;
  });
}
surpriseVideo.addEventListener("play", startLoveSong);
surpriseVideo.addEventListener("playing", () => { videoFallback.hidden = true; });
surpriseVideo.addEventListener("error", () => {
  videoFallback.textContent = "The video could not be loaded. Check cute-video.mp4 in the project root.";
  videoFallback.hidden = false;
});
surpriseVideo.addEventListener("ended", showMemoriesPage);

const memoryImage = document.getElementById("memory-image");
const photoProgress = document.getElementById("photo-progress");
const photoFallback = document.getElementById("photo-fallback");
const previousPhotoButton = document.getElementById("previous-photo");
const nextPhotoButton = document.getElementById("next-photo");
const loveSong = document.getElementById("love-song");
const audioFallback = document.getElementById("audio-fallback");
audioPlayButton.addEventListener("click", startLoveSong);
photoProgress.innerHTML = photoPaths.map((_, index) => `<span${index === 0 ? ' class="active"' : ""}></span>`).join("");

// Preload every photo so the slideshow swaps only after the next image is ready.
const photoCache = photoPaths.map((path) => {
  const image = new Image();
  image.src = path;
  return image;
});

function waitForPhoto(index) {
  const image = photoCache[index];
  if (image.complete) {
    return image.naturalWidth > 0
      ? Promise.resolve(image)
      : Promise.reject(new Error(`Photo could not be loaded: ${photoPaths[index]}`));
  }

  return new Promise((resolve, reject) => {
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", () => reject(new Error(`Photo could not be loaded: ${photoPaths[index]}`)), { once: true });
  });
}

function showPhotoMessage(message) {
  photoFallback.textContent = message;
  photoFallback.hidden = false;
}

async function renderPhoto(index) {
  const photoIndex = Math.min(Math.max(index, 0), photoPaths.length - 1);
  const nextPhoto = photoCache[photoIndex];
  showPhotoMessage(`Loading photo ${photoIndex + 1}...`);
  try {
    await waitForPhoto(photoIndex);
  } catch {
    showPhotoMessage(`Photo ${photoIndex + 1} could not be loaded: ${photoPaths[photoIndex]}`);
    return false;
  }

  currentPhoto = photoIndex;
  photoFallback.hidden = true;
  memoryImage.classList.remove("memory-image");
  void memoryImage.offsetWidth;
  memoryImage.src = nextPhoto.src;
  memoryImage.dataset.index = currentPhoto;
  memoryImage.classList.add("memory-image");
  [...photoProgress.children].forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentPhoto));
  return true;
}

memoryImage.addEventListener("error", () => showPhotoMessage(`Photo ${currentPhoto + 1} could not be displayed.`));

function showMemoriesPage() {
  if (slideshowStarted) return;
  slideshowStarted = true;
  previousPhotoButton.disabled = true;
  nextPhotoButton.disabled = true;
  showPage("memories-page");
  clearTimeout(photoTimer);
  photoTimer = undefined;
  renderPhoto(0).then((displayed) => {
    if (displayed) scheduleNextPhoto();
  });
}

function scheduleNextPhoto() {
  clearTimeout(photoTimer);
  photoTimer = window.setTimeout(async () => {
    photoTimer = undefined;
    if (currentPhoto >= photoPaths.length - 1) {
      clearTimeout(photoTimer);
      loveSong.pause();
      loveSong.currentTime = 0;
      return;
    }
    const displayed = await renderPhoto(currentPhoto + 1);
    if (displayed) scheduleNextPhoto();
  }, 3500);
}

document.getElementById("previous-photo").addEventListener("click", () => renderPhoto(currentPhoto - 1));
document.getElementById("next-photo").addEventListener("click", () => renderPhoto(currentPhoto + 1));
loveSong.addEventListener("error", () => { audioFallback.hidden = false; });

// Keep the page lively while the video and final memory section are visible.
window.setInterval(() => {
  if (!document.getElementById("video-page").hidden || !document.getElementById("memories-page").hidden) createHeart();
}, 1200);
