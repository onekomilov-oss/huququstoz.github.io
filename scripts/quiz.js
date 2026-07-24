// ===== CONSTANTS =====
const DATA_URL = '../savollar.json';
const state = {
  view: 'loading', // loading | categories | quiz | results | certificate
  categories: {},
  category: null,
  questions: [],
  index: 0,
  answers: [], // {savol, chosenText, correctText, isCorrect}
  name: ''
};

// ===== DOM ELEMENTS =====
const appElement = document.getElementById('app');

// ===== UTILITY FUNCTIONS =====
/**
 * Shuffles an array (Fisher-Yates algorithm).
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} - A new shuffled array.
 */
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} text - The text to escape.
 * @returns {string} - The escaped text.
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Creates a DOM element with the given tag, classes, and content.
 * @param {string} tag - The HTML tag name.
 * @param {string|Array<string>} classes - Class or array of classes.
 * @param {string|HTMLElement} content - Text or HTML content.
 * @returns {HTMLElement} - The created element.
 */
function createElement(tag, classes = '', content = '') {
  const element = document.createElement(tag);
  if (Array.isArray(classes)) {
    element.classList.add(...classes);
  } else if (typeof classes === 'string') {
    element.classList.add(classes);
  }
  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  }
  return element;
}

// ===== DATA LOADING =====
/**
 * Loads quiz data from the JSON file.
 */
async function loadData() {
  try {
    const response = await fetch(DATA_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    state.categories = data;
    state.view = 'categories';
    renderApp();
  } catch (error) {
    console.error('Error loading data:', error);
    state.view = 'error';
    renderApp();
  }
}

// ===== QUIZ LOGIC =====
/**
 * Starts a quiz for the selected category.
 * @param {string} categoryName - The name of the category.
 */
function startQuiz(categoryName) {
  state.category = categoryName;
  state.questions = shuffleArray(state.categories[categoryName] || []);
  state.index = 0;
  state.answers = [];
  state.view = 'quiz';
  renderApp();
}

/**
 * Handles the user's answer.
 * @param {number|boolean} chosen - The chosen answer index or boolean.
 */
function handleAnswer(chosen) {
  const question = state.questions[state.index];
  let isCorrect, chosenText, correctText;

  if (question.turi === 'variant') {
    isCorrect = chosen === question.tugri;
    chosenText = question.variantlar[chosen];
    correctText = question.variantlar[question.tugri];
  } else {
    isCorrect = chosen === question.tugri;
    chosenText = chosen ? "Ha" : "Yo'q";
    correctText = question.tugri ? "Ha" : "Yo'q";
  }

  state.answers.push({
    savol: question.savol,
    chosenText,
    correctText,
    isCorrect
  });

  if (state.index < state.questions.length - 1) {
    state.index++;
  } else {
    state.view = 'results';
  }
  renderApp();
}

/**
 * Restarts the quiz.
 */
function restartQuiz() {
  state.view = 'categories';
  state.category = null;
  state.questions = [];
  state.index = 0;
  state.answers = [];
  state.name = '';
  renderApp();
}

/**
 * Navigates to the certificate view.
 */
function goToCertificate() {
  const nameInput = document.getElementById('cert-name-input');
  const name = nameInput?.value.trim();
  if (!name) {
    nameInput?.focus();
    return;
  }
  state.name = name;
  state.view = 'certificate';
  renderApp();
}

/**
 * Downloads the certificate as a PNG image.
 */
async function downloadCertificate() {
  const certificateElement = document.getElementById('certificate-capture');
  if (!certificateElement || !window.html2canvas) return;

  const canvas = await html2canvas(certificateElement, {
    backgroundColor: '#16233D',
    scale: 2
  });

  const link = document.createElement('a');
  link.download = `sertifikat-${state.name.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ===== RENDERING FUNCTIONS =====
/**
 * Renders the loading view.
 * @returns {HTMLElement} - The loading view element.
 */
function renderLoadingView() {
  return createElement('div', 'empty-state', 'Savollar yuklanmoqda…');
}

/**
 * Renders the error view.
 * @returns {HTMLElement} - The error view element.
 */
function renderErrorView() {
  return createElement(
    'div',
    'empty-state',
    'savollar.json faylini yuklab bo\'lmadi. Fayl shu sahifa bilan bir papkada, veb-server orqali ochilganiga ishonch hosil qiling.'
  );
}

/**
 * Renders the categories view.
 * @returns {HTMLElement} - The categories view element.
 */
function renderCategoriesView() {
  const categoriesContainer = createElement('div', 'categories');
  const categoryNames = Object.keys(state.categories || {});

  if (categoryNames.length === 0) {
    return createElement('div', 'empty-state', 'Hozircha hech qanday toifa qo\'shilmagan.');
  }

  categoryNames.forEach(name => {
    const categoryCount = state.categories[name].length;
    const categoryCard = createElement('button', 'cat-card');
    categoryCard.onclick = () => startQuiz(name);

    const categoryTitle = createElement('h3', null, name);
    const categoryCountElement = createElement('span', 'cat-count', `${categoryCount} ta savol`);

    categoryCard.appendChild(categoryTitle);
    categoryCard.appendChild(categoryCountElement);
    categoriesContainer.appendChild(categoryCard);
  });

  return categoriesContainer;
}

/**
 * Renders the quiz view.
 * @returns {HTMLElement} - The quiz view element.
 */
function renderQuizView() {
  const question = state.questions[state.index];
  const totalQuestions = state.questions.length;
  const progressPercentage = Math.round((state.index / totalQuestions) * 100);

  const card = createElement('div', 'card');

  // Progress row
  const progressRow = createElement('div', 'progress-row');
  const progressLabel = createElement(
    'span',
    'progress-label',
    `Savol ${state.index + 1} / ${totalQuestions}`
  );
  const categoryLabel = createElement('span', 'progress-label', state.category);
  progressRow.appendChild(progressLabel);
  progressRow.appendChild(categoryLabel);
  card.appendChild(progressRow);

  // Progress bar
  const progressTrack = createElement('div', 'progress-track');
  const progressFill = createElement('div', 'progress-fill');
  progressFill.style.width = `${progressPercentage}%`;
  progressTrack.appendChild(progressFill);
  card.appendChild(progressTrack);

  // Question text
  const questionText = createElement('div', 'question-text', question.savol);
  card.appendChild(questionText);

  // Options
  if (question.turi === 'variant') {
    const optionsContainer = createElement('div', 'options');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    question.variantlar.forEach((option, index) => {
      const optionButton = createElement('button', 'opt-btn');
      optionButton.onclick = () => handleAnswer(index);

      const optionLetter = createElement('span', 'opt-letter', letters[index]);
      const optionText = document.createTextNode(option);

      optionButton.appendChild(optionLetter);
      optionButton.appendChild(optionText);
      optionsContainer.appendChild(optionButton);
    });

    card.appendChild(optionsContainer);
  } else {
    const booleanRow = createElement('div', 'boolean-row');

    const yesButton = createElement('button', 'opt-btn', 'Ha');
    yesButton.onclick = () => handleAnswer(true);

    const noButton = createElement('button', 'opt-btn', 'Yo\'q');
    noButton.onclick = () => handleAnswer(false);

    booleanRow.appendChild(yesButton);
    booleanRow.appendChild(noButton);
    card.appendChild(booleanRow);
  }

  // Back link
  const backLink = createElement('a', 'back-link', '← Toifalarga qaytish');
  backLink.onclick = restartQuiz;

  const container = createElement('div');
  container.appendChild(backLink);
  container.appendChild(card);

  return container;
}

/**
 * Renders the results view.
 * @returns {HTMLElement} - The results view element.
 */
function renderResultsView() {
  const correctCount = state.answers.filter(answer => answer.isCorrect).length;
  const totalAnswers = state.answers.length;

  const card = createElement('div', 'card');

  // Score banner
  const scoreBanner = createElement('div', 'score-banner');
  const scoreNumber = createElement('span', 'score-num', correctCount);
  const scoreOf = createElement('span', 'score-of', `/ ${totalAnswers} to'g'ri javob`);
  scoreBanner.appendChild(scoreNumber);
  scoreBanner.appendChild(scoreOf);
  card.appendChild(scoreBanner);

  // Category label
  const categoryLabel = createElement(
    'div',
    'score-cat',
    `${state.category} bo'yicha sinov natijasi`
  );
  card.appendChild(categoryLabel);

  // Review items
  state.answers.forEach(answer => {
    const reviewItem = createElement('div', 'review-item');

    const questionText = createElement('div', 'review-q', answer.savol);
    reviewItem.appendChild(questionText);

    const userAnswer = createElement(
      'span',
      `review-ans ${answer.isCorrect ? 'correct' : 'wrong'}`,
      `Sizning javobingiz: ${answer.chosenText}`
    );
    reviewItem.appendChild(userAnswer);

    if (!answer.isCorrect) {
      const correctAnswer = createElement(
        'span',
        'review-ans correct',
        `To'g'ri javob: ${answer.correctText}`
      );
      reviewItem.appendChild(correctAnswer);
    }

    card.appendChild(reviewItem);
  });

  // Name input for certificate
  const nameGateLabel = createElement('label', null, 'Sertifikat uchun ismingizni kiriting');
  nameGateLabel.style.fontWeight = '600';
  nameGateLabel.style.marginTop = '28px';
  nameGateLabel.style.display = 'block';

  const nameGate = createElement('div', 'name-gate');
  const nameInput = createElement('input', null, null);
  nameInput.id = 'cert-name-input';
  nameInput.type = 'text';
  nameInput.placeholder = 'Ism Familiya';

  const certificateButton = createElement('button', 'btn btn-primary', 'Sertifikat olish');
  certificateButton.onclick = goToCertificate;

  nameGate.appendChild(nameInput);
  nameGate.appendChild(certificateButton);

  // Back to categories button
  const backButton = createElement('button', 'btn btn-secondary', 'Toifalarga qaytish');
  backButton.onclick = restartQuiz;
  const buttonRow = createElement('div', 'btn-row');
  buttonRow.appendChild(backButton);

  card.appendChild(nameGateLabel);
  card.appendChild(nameGate);
  card.appendChild(buttonRow);

  return card;
}

/**
 * Renders the certificate view.
 * @returns {HTMLElement} - The certificate view element.
 */
function renderCertificateView() {
  const correctCount = state.answers.filter(answer => answer.isCorrect).length;
  const totalAnswers = state.answers.length;
  const dateString = new Date().toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const backLink = createElement('a', 'back-link', '← Natijaga qaytish');
  backLink.onclick = () => {
    state.view = 'results';
    renderApp();
  };

  const certificateWrap = createElement('div', null, null);
  certificateWrap.id = 'certificate-wrap';

  const certificate = createElement('div', 'certificate');
  certificate.id = 'certificate-capture';

  // Certificate content
  const certKicker = createElement('div', 'cert-kicker', 'Huquq Ustoz');
  const certTitle = createElement('div', 'cert-title', 'Muvaffaqiyat sertifikati');
  const certSub = createElement(
    'div',
    'cert-sub',
    'ushbu sertifikat quyidagi shaxsga topshiriladi'
  );
  const certName = createElement('div', 'cert-name', state.name);
  const certCat = createElement(
    'div',
    'cert-cat',
    `"${state.category}" bo'yicha bilim sinovini muvaffaqiyatli topshirgani uchun`
  );

  const certMeta = createElement('div', 'cert-meta');
  const certDate = createElement('span', null, dateString);
  const certScore = createElement('span', 'cert-score', `${correctCount} / ${totalAnswers}`);

  const certSeal = createElement('svg', 'seal-cert');
  certSeal.setAttribute('viewBox', '0 0 48 48');
  certSeal.setAttribute('fill', 'none');
  certSeal.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  certSeal.innerHTML = `
    <circle cx="24" cy="24" r="22" stroke="#B08D3E" stroke-width="2"/>
    <path d="M24 12 L27 21 L36 21 L29 27 L31.5 36 L24 30.5 L16.5 36 L19 27 L12 21 L21 21 Z" fill="#B08D3E"/>
  `;

  certMeta.appendChild(certDate);
  certMeta.appendChild(certScore);
  certMeta.appendChild(certSeal);

  certificate.appendChild(certKicker);
  certificate.appendChild(certTitle);
  certificate.appendChild(certSub);
  certificate.appendChild(certName);
  certificate.appendChild(certCat);
  certificate.appendChild(certMeta);

  certificateWrap.appendChild(certificate);

  // Buttons
  const downloadButton = createElement('button', 'btn btn-primary', 'PNG sifatida yuklab olish');
  downloadButton.onclick = downloadCertificate;

  const restartButton = createElement('button', 'btn btn-secondary', 'Yangi sinov boshlash');
  restartButton.onclick = restartQuiz;

  const buttonRow = createElement('div', 'btn-row');
  buttonRow.appendChild(downloadButton);
  buttonRow.appendChild(restartButton);

  const container = createElement('div');
  container.appendChild(backLink);
  container.appendChild(certificateWrap);
  container.appendChild(buttonRow);

  return container;
}

// ===== MAIN RENDER FUNCTION =====
/**
 * Renders the app based on the current state.
 */
function renderApp() {
  while (appElement.firstChild) {
    appElement.removeChild(appElement.firstChild);
  }

  let viewElement;
  switch (state.view) {
    case 'loading':
      viewElement = renderLoadingView();
      break;
    case 'error':
      viewElement = renderErrorView();
      break;
    case 'categories':
      viewElement = renderCategoriesView();
      break;
    case 'quiz':
      viewElement = renderQuizView();
      break;
    case 'results':
      viewElement = renderResultsView();
      break;
    case 'certificate':
      viewElement = renderCertificateView();
      break;
    default:
      viewElement = renderLoadingView();
  }

  appElement.appendChild(viewElement);
}

// ===== INITIALIZE APP =====
loadData();
