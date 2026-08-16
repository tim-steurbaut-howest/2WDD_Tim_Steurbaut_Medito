const slides = [
  {
    eyebrow: "01 — Kom tot rust",
    title: "Je hoofd staat<br>nooit stil.",
    description:
      "Gedachten komen en gaan. Medito helpt je om even afstand te nemen.",
    button: "Maak ruimte",
    background: "#090b0d",
    foreground: "#f5f1e8",
    muted: "rgba(245, 241, 232, 0.76)",
    inverseBackground: "#f5f1e8",
    inverseForeground: "#090b0d",
    dots: "rgba(245, 241, 232, 0.34)",
    lottie: "assets/lottie/01_NOISE_TO_FOCUS.json",
  },
  {
    eyebrow: "02 — Een klein moment",
    title: "Een klein moment<br>is genoeg.",
    description:
      "Je hoeft niet alles tegelijk op te lossen. Begin met één rustig moment.",
    button: "Probeer het",
    background: "#c9efdd",
    foreground: "#090b0d",
    muted: "rgba(9, 11, 13, 0.72)",
    inverseBackground: "#090b0d",
    inverseForeground: "#c9efdd",
    dots: "rgba(9, 11, 13, 0.27)",
    lottie: "assets/lottie/02_CREATE_SPACE.json",
  },
  {
    eyebrow: "03 — Adem mee",
    title: "Volg het<br>ritme.",
    description: "Tik op de cirkel en adem rustig mee.",
    button: "Probeer het",
    background: "#d8d0fa",
    foreground: "#090b0d",
    muted: "rgba(9, 11, 13, 0.72)",
    inverseBackground: "#090b0d",
    inverseForeground: "#d8d0fa",
    dots: "rgba(9, 11, 13, 0.27)",
    lottie: "assets/lottie/03_BREATHING.json",
    interactive: true,
  },
  {
    eyebrow: "04 — Jouw ritme",
    title: "Bouw je eigen<br>ritme.",
    description: "Een paar minuten per dag kunnen al een verschil maken.",
    button: "Bekijk je week",
    background: "#f07869",
    foreground: "#090b0d",
    muted: "rgba(9, 11, 13, 0.72)",
    inverseBackground: "#f5f1e8",
    inverseForeground: "#090b0d",
    dots: "rgba(9, 11, 13, 0.27)",
    lottie: "assets/lottie/04_BUILD_RHYTHM.json",
    showWeekdays: true,
  },
  {
    eyebrow: "05 — Klaar om te beginnen",
    title: "Rust zonder<br>drempels.",
    description:
      "Geen advertenties. Geen betaalmuur. Gewoon een plek om te beginnen.",
    button: "Start met Medito",
    background: "#f5f1e8",
    foreground: "#090b0d",
    muted: "rgba(9, 11, 13, 0.72)",
    inverseBackground: "#090b0d",
    inverseForeground: "#f5f1e8",
    dots: "rgba(9, 11, 13, 0.27)",
    lottie: "assets/lottie/05_READY_TO_BEGIN.json",
  },
];

const onboarding = document.querySelector("#onboarding");
const story = document.querySelector("#story");
const stepCount = document.querySelector("#step-count");
const eyebrow = document.querySelector("#eyebrow");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const backButton = document.querySelector("#back-button");
const nextButton = document.querySelector("#next-button");
const nextLabel = document.querySelector("#next-label");
const pagination = document.querySelector("#pagination");
const player = document.querySelector("#lottie-player");
const animationControl = document.querySelector("#animation-control");
const animationInstruction = document.querySelector("#animation-instruction");
const weekdays = document.querySelector("#weekdays");
const completionMessage = document.querySelector("#completion-message");
const themeColor = document.querySelector('meta[name="theme-color"]');

let currentSlide = 0;
let animationIsPlaying = true;
let transitionTimer;
let toastTimer;
let touchStartX = 0;
let touchStartY = 0;

function createPagination() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "pagination__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ga naar scherm ${index + 1}: ${slide.eyebrow.slice(5)}`);
    dot.addEventListener("click", () => showSlide(index));
    pagination.append(dot);
  });
}

function loadAnimation(slide) {
  animationIsPlaying = true;
  animationControl.disabled = !slide.interactive;
  animationControl.setAttribute(
    "aria-label",
    slide.interactive ? "Pauzeer ademhalingsanimatie" : "Decoratieve animatie",
  );
  animationInstruction.hidden = !slide.interactive;
  animationInstruction.textContent = "Tik om te pauzeren";
  weekdays.hidden = !slide.showWeekdays;

  const startPlayer = () => {
    player.load(slide.lottie);
    player.setLooping(true);
    player.play();
  };

  if (customElements.get("lottie-player")) {
    startPlayer();
  } else {
    customElements.whenDefined("lottie-player").then(startPlayer);
  }
}

function updateContent(index) {
  const slide = slides[index];

  onboarding.dataset.step = String(index);
  onboarding.style.setProperty("--screen-bg", slide.background);
  onboarding.style.setProperty("--screen-fg", slide.foreground);
  onboarding.style.setProperty("--muted-fg", slide.muted);
  onboarding.style.setProperty("--inverse-bg", slide.inverseBackground);
  onboarding.style.setProperty("--inverse-fg", slide.inverseForeground);
  onboarding.style.setProperty("--dot-inactive", slide.dots);
  themeColor.setAttribute("content", slide.background);

  stepCount.textContent = `${String(index + 1).padStart(2, "0")}/${String(slides.length).padStart(2, "0")}`;
  stepCount.setAttribute("aria-label", `Scherm ${index + 1} van ${slides.length}`);
  eyebrow.textContent = slide.eyebrow;
  title.innerHTML = slide.title;
  description.textContent = slide.description;
  nextLabel.textContent = slide.button;
  backButton.disabled = index === 0;

  document.querySelectorAll(".pagination__dot").forEach((dot, dotIndex) => {
    if (dotIndex === index) {
      dot.setAttribute("aria-current", "step");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  loadAnimation(slide);
}

function showSlide(index) {
  const safeIndex = Math.max(0, Math.min(slides.length - 1, index));

  if (safeIndex === currentSlide) return;

  window.clearTimeout(transitionTimer);
  story.classList.remove("content-in");
  story.classList.add("content-out");

  transitionTimer = window.setTimeout(() => {
    currentSlide = safeIndex;
    updateContent(currentSlide);
    story.classList.remove("content-out");
    void story.offsetWidth;
    story.classList.add("content-in");
  }, 150);
}

function showCompletion() {
  window.clearTimeout(toastTimer);
  completionMessage.hidden = false;
  nextLabel.textContent = "Je bent klaar ✓";
  toastTimer = window.setTimeout(() => {
    completionMessage.hidden = true;
    nextLabel.textContent = slides[currentSlide].button;
  }, 2600);
}

function handleNext() {
  if (currentSlide === slides.length - 1) {
    showCompletion();
    return;
  }

  showSlide(currentSlide + 1);
}

function toggleBreathingAnimation() {
  if (!slides[currentSlide].interactive) return;

  if (animationIsPlaying) {
    player.pause();
    animationControl.setAttribute("aria-label", "Speel ademhalingsanimatie verder");
    animationInstruction.textContent = "Tik om verder te gaan";
  } else {
    player.play();
    animationControl.setAttribute("aria-label", "Pauzeer ademhalingsanimatie");
    animationInstruction.textContent = "Tik om te pauzeren";
  }

  animationIsPlaying = !animationIsPlaying;
}

function handleKeydown(event) {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    handleNext();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showSlide(currentSlide - 1);
  }
}

function handleTouchStart(event) {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleTouchEnd(event) {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;

  if (deltaX < 0) {
    handleNext();
  } else {
    showSlide(currentSlide - 1);
  }
}

createPagination();
updateContent(currentSlide);

backButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", handleNext);
animationControl.addEventListener("click", toggleBreathingAnimation);
document.addEventListener("keydown", handleKeydown);
onboarding.addEventListener("touchstart", handleTouchStart, { passive: true });
onboarding.addEventListener("touchend", handleTouchEnd, { passive: true });
