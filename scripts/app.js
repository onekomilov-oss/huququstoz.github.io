let quizData = {};

// Tablarni almashish
function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btnEl.classList.add('active');
}

// ===== DOM ISHLASHINI ANIQLASH =====
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  loadBioToHomepage();

  // ADMIN PANELGA KIRISHNI TEKSHIRISH
  const isAdminPage = window.location.pathname.toLowerCase().includes('admin');
  
  if (isAdminPage) {
    if (localStorage.getItem('isAdmin') !== 'true') {
      window.location.href = 'login.html';
      return;
    }

    // Chiqish tugmasi
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('isAdmin');
      window.location.href = 'login.html';
    });
  }
});

// ===== MA'LUMOTLARNI YUKLASH =====
async function fetchData() {
  try {
    const res = await fetch('./savollar.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('JSON topilmadi');
    quizData = await res.json();

    const path = window.location.pathname.toLowerCase();
    if (path.includes('quiz')) {
      initQuiz();
    } else if (path.includes('admin')) {
      initAdmin();
    }
  } catch (err) {
    console.error('Xatolik:', err);
  }
}

// ==========================================
// QUIZ MANTIQI
// ==========================================
let currentQuestions = [];
let currentQIndex = 0;
let userScore = 0;
let selectedOption = null;

function initQuiz() {
  const catSelect = document.getElementById('quiz-category');
  const startBtn = document.getElementById('start-btn');
  if(!catSelect) return;

  catSelect.innerHTML = '<option value="" disabled selected>Toifani tanlang...</option>';
  Object.keys(quizData).forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = `${cat} (${quizData[cat].length} ta savol)`;
    catSelect.appendChild(opt);
  });

  startBtn.addEventListener('click', () => {
    const chosenCat = catSelect.value;
    if (!chosenCat) return alert('Iltimos toifani tanlang!');
    
    currentQuestions = quizData[chosenCat];
    currentQIndex = 0;
    userScore = 0;

    document.getElementById('category-picker').style.display = 'none';
    document.getElementById('quiz-body').style.display = 'block';
    renderQuestion();
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    if (selectedOption === null) return alert('Javobni tanlang!');
    
    const q = currentQuestions[currentQIndex];
    if (q.turi === 'variant' && selectedOption === q.tugri) userScore++;
    if (q.turi === 'boolean' && selectedOption === q.tugri) userScore++;

    currentQIndex++;
    selectedOption = null;

    if (currentQIndex < currentQuestions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  });
}

function renderQuestion() {
  const q = currentQuestions[currentQIndex];
  const wrapper = document.getElementById('questions-wrapper');
  document.getElementById('progress-text').textContent = `${currentQIndex + 1} / ${currentQuestions.length}`;

  let optionsHTML = '';
  if (q.turi === 'variant') {
    q.variantlar.forEach((v, idx) => {
      optionsHTML += `<button class="option-btn" onclick="selectAns(${idx}, this)">${v}</button>`;
    });
  } else {
    optionsHTML = `
      <button class="option-btn" onclick="selectAns(true, this)">Ha (To'g'ri)</button>
      <button class="option-btn" onclick="selectAns(false, this)">Yo'q (Noto'g'ri)</button>
    `;
  }

  wrapper.innerHTML = `
    <div class="question-box">
      <div class="question-title"><b>${currentQIndex + 1}.</b> ${q.savol}</div>
      <div class="options">${optionsHTML}</div>
    </div>
  `;
}

function selectAns(val, btnEl) {
  selectedOption = val;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
}

function showResults() {
  document.getElementById('quiz-body').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';
  document.getElementById('score-text').textContent = `Siz ${currentQuestions.length} ta savoldan ${userScore} tasiga to'g'ri javob berdingiz!`;
}

// ==========================================
// ADMIN MANTIQI
// ==========================================
function initAdmin() {
  renderAdminCategories();
  initBioForm();

  document.getElementById('q-type-select')?.addEventListener('change', (e) => {
    if (e.target.value === 'variant') {
      document.getElementById('variant-inputs').style.display = 'block';
      document.getElementById('boolean-inputs').style.display = 'none';
    } else {
      document.getElementById('variant-inputs').style.display = 'none';
      document.getElementById('boolean-inputs').style.display = 'block';
    }
  });

  // Toifa Qo'shish
  document.getElementById('add-cat-btn')?.addEventListener('click', () => {
    const input = document.getElementById('cat-name-input');
    const name = input.value.trim();
    if (!name) return alert('Toifa nomini kiriting');
    if (quizData[name]) return alert('Bu toifa mavjud');

    quizData[name] = [];
    input.value = '';
    renderAdminCategories();
  });

  // Savol Qo'shish (TO'G'RILANGAN MANTEQ)
  document.getElementById('add-q-btn')?.addEventListener('click', () => {
    const cat = document.getElementById('admin-cat-select').value;
    const qText = document.getElementById('q-text-input').value.trim();
    const type = document.getElementById('q-type-select').value;

    if (!cat || !qText) return alert('Toifa va Savol matnini to\'ldiring!');

    let newQ = { savol: qText, turi: type };

    if (type === 'variant') {
      const vInputs = document.querySelectorAll('.v-inp');
      const vars = Array.from(vInputs).map(i => i.value.trim());
      if (vars.some(v => !v)) return alert('Barcha 4 ta variantni yozing!');
      
      // Radio tugmadan belgilangan to'g'ri javob indeksini olish (0, 1, 2, 3)
      const selectedRadio = document.querySelector('input[name="correctVariant"]:checked');
      const correctIdx = selectedRadio ? parseInt(selectedRadio.value) : 0;

      newQ.variantlar = vars;
      newQ.tugri = correctIdx; // Tanlangan radio indeksi saqlanadi
    } else {
      newQ.tugri = document.getElementById('bool-ans').value === 'true';
    }

    quizData[cat].push(newQ);
    
    // Formalarni tozalash va standart holatga keltirish
    document.getElementById('q-text-input').value = '';
    document.querySelectorAll('.v-inp').forEach(i => i.value = '');
    
    // Birinchi radio tugmani qayta tanlab qo'yish
    const defaultRadio = document.querySelector('input[name="correctVariant"][value="0"]');
    if (defaultRadio) {
      defaultRadio.checked = true;
      if (typeof window.markCorrect === 'function') {
        window.markCorrect(0);
      }
    }

    renderAdminCategories();
    alert('Savol muvaffaqiyatli qo\'shildi!');
  });

  // JSON Yuklab olish
  document.getElementById('download-json-btn')?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quizData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "savollar.json");
    dlAnchorElem.click();
  });
}

function renderAdminCategories() {
  const catSelect = document.getElementById('admin-cat-select');
  const catList = document.getElementById('categories-list');
  if(!catSelect || !catList) return;

  catSelect.innerHTML = '<option value="">Tanlang...</option>';
  catList.innerHTML = '';

  Object.keys(quizData).forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);

    const box = document.createElement('div');
    box.style.marginBottom = '15px';
    box.innerHTML = `<h3 style="color:#a855f7; margin-bottom:8px;">${cat} (${quizData[cat].length} ta savol)</h3>`;

    quizData[cat].forEach((q, idx) => {
      const item = document.createElement('div');
      item.className = 'q-item';
      item.innerHTML = `
        <span>${idx + 1}. ${q.savol}</span>
        <button class="btn btn-danger" onclick="deleteQ('${cat}', ${idx})">O'chirish</button>
      `;
      box.appendChild(item);
    });

    catList.appendChild(box);
  });
}

function deleteQ(cat, idx) {
  if (confirm('Ushbu savolni o\'chirmoqchimisiz?')) {
    quizData[cat].splice(idx, 1);
    renderAdminCategories();
  }
}

// ==========================================
// BIO VA MATNLARNI BOSHQARISH
// ==========================================
function initBioForm() {
  const bioData = JSON.parse(localStorage.getItem('siteBio') || '{}');
  
  if (bioData.heroTitle) document.getElementById('hero-title-input').value = bioData.heroTitle;
  if (bioData.heroDesc) document.getElementById('hero-desc-input').value = bioData.heroDesc;
  if (bioData.aboutTitle) document.getElementById('about-title-input').value = bioData.aboutTitle;
  if (bioData.aboutDesc) document.getElementById('about-desc-input').value = bioData.aboutDesc;
  if (bioData.tgLink) document.getElementById('tg-link-input').value = bioData.tgLink;
  if (bioData.instaLink) document.getElementById('insta-link-input').value = bioData.instaLink;

  document.getElementById('save-bio-btn')?.addEventListener('click', () => {
    const newBio = {
      heroTitle: document.getElementById('hero-title-input').value,
      heroDesc: document.getElementById('hero-desc-input').value,
      aboutTitle: document.getElementById('about-title-input').value,
      aboutDesc: document.getElementById('about-desc-input').value,
      tgLink: document.getElementById('tg-link-input').value,
      instaLink: document.getElementById('insta-link-input').value
    };

    localStorage.setItem('siteBio', JSON.stringify(newBio));
    alert('Bosh sahifa ma\'lumotlari saqlandi!');
  });
}

function loadBioToHomepage() {
  const bioData = JSON.parse(localStorage.getItem('siteBio') || '{}');
  const path = window.location.pathname.toLowerCase();
  
  if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
    if (bioData.heroTitle) {
      const el = document.querySelector('.hero h1');
      if (el) el.textContent = bioData.heroTitle;
    }
    if (bioData.heroDesc) {
      const el = document.querySelector('.hero p');
      if (el) el.textContent = bioData.heroDesc;
    }
    if (bioData.aboutTitle) {
      const el = document.querySelector('.about h2');
      if (el) el.textContent = bioData.aboutTitle;
    }
    if (bioData.aboutDesc) {
      const el = document.querySelector('.about p');
      if (el) el.textContent = bioData.aboutDesc;
    }
    if (bioData.tgLink) {
      const el = document.querySelector('a[href*="t.me"]');
      if (el) el.href = bioData.tgLink;
    }
    if (bioData.instaLink) {
      const el = document.querySelector('a[href*="instagram.com"]');
      if (el) el.href = bioData.instaLink;
    }
  }
}
