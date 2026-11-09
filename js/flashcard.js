/* ==========================================================================
   SIRLI SAHIFA (FLASHCARD) INTERAKTIV MANTIG'I
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const goldColors = ["#fbbf24", "#f59e0b", "#38bdf8", "#34d399", "#a78bfa"];
  let currentIndex = 0;

  const flashcardModal = document.getElementById("flashcardModal");
  const openSirliBtn = document.getElementById("openSirliBtn");
  const closeSirliBtn = document.getElementById("closeSirliBtn");
  const flashcard = document.getElementById("flashcard");
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const cardCounter = document.getElementById("cardCounter");
  const tutorialOverlay = document.getElementById("tutorialOverlay");
  const gotItTutorialBtn = document.getElementById("gotItTutorialBtn");
  const skipTutorialBtn = document.getElementById("skipTutorialBtn");

  // Tutorial ko'rsatilganligini tekshirish
  function checkTutorial() {
    if (localStorage.getItem("huquqUstozTutorialShown")) {
      tutorialOverlay.classList.add("hidden");
    } else {
      tutorialOverlay.classList.remove("hidden");
    }
  }

  gotItTutorialBtn.addEventListener("click", () => {
    localStorage.setItem("huquqUstozTutorialShown", "true");
    tutorialOverlay.classList.add("hidden");
  });

  skipTutorialBtn.addEventListener("click", () => {
    localStorage.setItem("huquqUstozTutorialShown", "true");
    tutorialOverlay.classList.add("hidden");
  });

  if (openSirliBtn) {
    openSirliBtn.addEventListener("click", () => {
      checkTutorial();
      flashcardModal.classList.add("active");
      updateCard();
    });
  }

  if (closeSirliBtn) {
    closeSirliBtn.addEventListener("click", () => {
      flashcardModal.classList.remove("active");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === flashcardModal) {
      flashcardModal.classList.remove("active");
    }
  });

  function updateCard() {
    if (typeof quotes === "undefined" || quotes.length === 0) return;

    const q = quotes[currentIndex];
    quoteText.textContent = `"${q.text}"`;
    quoteAuthor.textContent = `— ${q.author}`;
    cardCounter.textContent = `${currentIndex + 1} / ${quotes.length} (Chap: Oldinga | O'ng: Orqaga)`;

    const colorIndex = currentIndex % goldColors.length;
    quoteText.style.color = goldColors[colorIndex];
  }

  if (flashcard) {
    flashcard.addEventListener("click", (e) => {
      const rect = flashcard.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      if (clickX < width / 2) {
        currentIndex = (currentIndex + 1) % quotes.length;
      } else {
        currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
      }
      updateCard();
    });
  }
});
