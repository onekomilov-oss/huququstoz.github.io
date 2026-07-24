// ===== STATE VARIABLES =====
let categories = {};
let currentData = {};

// ===== DOM ELEMENTS =====
const categorySelect = document.getElementById('category-select');
const newCategoryNameInput = document.getElementById('new-category-name');
const newQuestionTextInput = document.getElementById('new-question-text');
const questionTypeSelect = document.getElementById('question-type');
const variantsContainer = document.getElementById('variants-container');
const booleanContainer = document.getElementById('boolean-container');
const variantAnswerSelect = document.getElementById('variant-answer');
const booleanAnswerSelect = document.getElementById('boolean-answer');
const categoriesList = document.getElementById('categories-list');

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  questionTypeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'variant') {
      variantsContainer.style.display = 'block';
      booleanContainer.style.display = 'none';
      if (variantAnswerSelect) variantAnswerSelect.style.display = 'block';
    } else {
      variantsContainer.style.display = 'none';
      booleanContainer.style.display = 'block';
      if (variantAnswerSelect) variantAnswerSelect.style.display = 'none';
    }
  });

  // Dynamic variant inputs generator & listener (agar variantlar kiritilganda)
  const variantInputs = document.querySelectorAll('.variant-input');
  variantInputs.forEach((input, index) => {
    input.addEventListener('input', updateVariantAnswerOptions);
  });
}

function updateVariantAnswerOptions() {
  if (!variantAnswerSelect) return;
  const variantInputs = document.querySelectorAll('.variant-input');
  variantAnswerSelect.innerHTML = '';
  
  variantInputs.forEach((input, index) => {
    const val = input.value.trim() || `${index + 1}-variant`;
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${String.fromCharCode(65 + index)}) ${val}`;
    variantAnswerSelect.appendChild(option);
  });
}

// ===== LOAD DATA =====
async function loadData() {
  try {
    // Admin papkasi ichidan ildiz papkadagi savollar.json'ni chaqirish
    const response = await fetch('../savollar.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch data');
    categories = await response.json();
    currentData = JSON.parse(JSON.stringify(categories)); // Deep copy
    updateCategorySelect();
    renderCategoriesList();
  } catch (error) {
    console.error('Error loading data:', error);
    alert("Ma'lumotlarni yuklashda xatolik yuz berdi! savollar.json faylini tekshiring.");
  }
}

// ===== UPDATE UI =====
function updateCategorySelect() {
  categorySelect.innerHTML = '<option value="" disabled selected>Toifa tanlang</option>';
  Object.keys(categories).forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function renderCategoriesList() {
  categoriesList.innerHTML = '';
  Object.entries(categories).forEach(([categoryName, questions]) => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';

    const categoryHeader = document.createElement('h3');
    categoryHeader.style.display = 'flex';
    categoryHeader.style.justifyContent = 'space-between';
    categoryHeader.style.alignItems = 'center';
    
    categoryHeader.innerHTML = `
      <span>${escapeHtml(categoryName)} (${questions.length} ta savol)</span>
    `;

    const deleteCatBtn = document.createElement('button');
    deleteCatBtn.className = 'btn btn-danger';
    deleteCatBtn.textContent = "Toifani O'chirish";
    deleteCatBtn.onclick = () => deleteCategory(categoryName);
    categoryHeader.appendChild(deleteCatBtn);

    const questionsList = document.createElement('div');
    questionsList.className = 'questions-list';

    questions.forEach((question, index) => {
      const questionItem = document.createElement('div');
      questionItem.className = 'question-item';
      questionItem.style.display = 'flex';
      questionItem.style.justifyContent = 'space-between';
      questionItem.style.margin = '8px 0';

      const questionText = document.createElement('p');
      questionText.innerHTML = `<b>${index + 1}.</b> ${escapeHtml(question.savol)}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = "O'chirish";
      deleteButton.onclick = () => deleteQuestion(categoryName, index);

      questionItem.appendChild(questionText);
      questionItem.appendChild(deleteButton);
      questionsList.appendChild(questionItem);
    });

    categoryItem.appendChild(categoryHeader);
    categoryItem.appendChild(questionsList);
    categoriesList.appendChild(categoryItem);
  });
}

// ===== ADD NEW CATEGORY =====
function addNewCategory() {
  const categoryName = newCategoryNameInput.value.trim();
  if (!categoryName) {
    alert('Toifa nomini kiriting!');
    return;
  }

  if (categories[categoryName]) {
    alert('Bu toifa allaqachon mavjud!');
    return;
  }

  categories[categoryName] = [];
  currentData[categoryName] = [];
  newCategoryNameInput.value = '';
  updateCategorySelect();
  renderCategoriesList();
}

// ===== ADD NEW QUESTION =====
function addNewQuestion() {
  const categoryName = categorySelect.value;
  const questionText = newQuestionTextInput.value.trim();
  const questionType = questionTypeSelect.value;

  if (!categoryName) {
    alert('Toifa tanlang!');
    return;
  }

  if (!questionText) {
    alert('Savol matnini kiriting!');
    return;
  }

  const newQuestion = {
    savol: questionText,
    turi: questionType
  };

  if (questionType === 'variant') {
    const variantInputs = document.querySelectorAll('.variant-input');
    const variants = Array.from(variantInputs).map(input => input.value.trim());
    
    if (variants.some(v => !v)) {
      alert("Barcha variantlarni to'ldiring!");
      return;
    }
    
    newQuestion.variantlar = variants;
    const correctAnswerIndex = parseInt(variantAnswerSelect.value, 10) || 0;
    newQuestion.tugri = correctAnswerIndex;
  } else {
    newQuestion.tugri = booleanAnswerSelect.value === 'true';
  }

  categories[categoryName].push(newQuestion);
  currentData[categoryName].push(newQuestion);

  // Formani tozalash
  newQuestionTextInput.value = '';
  document.querySelectorAll('.variant-input').forEach(input => input.value = '');

  renderCategoriesList();
  alert("Savol muvaffaqiyatli qo'shildi! Ish yakunida 'Saqlash' tugmasini bosing.");
}

// ===== DELETE CATEGORY =====
function deleteCategory(categoryName) {
  if (confirm(`"${categoryName}" toifasini o'chirishni xohlaysizmi?`)) {
    delete categories[categoryName];
    delete currentData[categoryName];
    updateCategorySelect();
    renderCategoriesList();
  }
}

// ===== DELETE QUESTION =====
function deleteQuestion(categoryName, questionIndex) {
  if (confirm("Bu savolni o'chirishni xohlaysizmi?")) {
    categories[categoryName].splice(questionIndex, 1);
    currentData[categoryName].splice(questionIndex, 1);
    renderCategoriesList();
  }
}

// ===== SAVE DATA =====
async function saveData() {
  try {
    const data = JSON.stringify(categories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'savollar.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Yangi "savollar.json" fayli yuklandi! Uni loyihangizdagi asosiy "savollar.json" fayli o\'rniga joylashtiring.');
  } catch (error) {
    console.error('Error saving data:', error);
    alert("Ma'lumotlarni saqlashda xatolik yuz berdi!");
  }
}

// Helper: HTML escape
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
