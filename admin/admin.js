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
      variantAnswerSelect.style.display = 'block';
    } else {
      variantsContainer.style.display = 'none';
      booleanContainer.style.display = 'block';
      variantAnswerSelect.style.display = 'none';
    }
  });
}

// ===== LOAD DATA =====
async function loadData() {
  try {
    const response = await fetch('../savollar.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch data');
    categories = await response.json();
    currentData = JSON.parse(JSON.stringify(categories)); // Deep copy
    updateCategorySelect();
    renderCategoriesList();
  } catch (error) {
    console.error('Error loading data:', error);
    alert('Ma\'lumotlarni yuklashda xatolik yuz berdi!');
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
    categoryHeader.innerHTML = `
      ${categoryName}
      <button onclick="deleteCategory('${categoryName}')">Toifani O'chirish</button>
    `;

    const questionsList = document.createElement('div');
    questionsList.className = 'questions-list';

    questions.forEach((question, index) => {
      const questionItem = document.createElement('div');
      questionItem.className = 'question-item';

      const questionText = document.createElement('p');
      questionText.textContent = question.savol;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'O\'chirish';
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
      alert('Barcha variantlarni to\'ldiring!');
      return;
    }
    newQuestion.variantlar = variants;
    const correctAnswerIndex = parseInt(variantAnswerSelect.value);
    newQuestion.tugri = correctAnswerIndex;
  } else {
    newQuestion.tugri = booleanAnswerSelect.value === 'true';
  }

  categories[categoryName].push(newQuestion);
  currentData[categoryName].push(newQuestion);

  // Clear inputs
  newQuestionTextInput.value = '';
  document.querySelectorAll('.variant-input').forEach(input => input.value = '');

  renderCategoriesList();
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
  if (confirm('Bu savolni o\'chirishni xohlaysizmi?')) {
    categories[categoryName].splice(questionIndex, 1);
    currentData[categoryName].splice(questionIndex, 1);
    renderCategoriesList();
  }
}

// ===== SAVE DATA =====
async function saveData() {
  try {
    // Create a Blob with the JSON data
    const data = JSON.stringify(categories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'savollar.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Ma\'lumotlar muvaffaqiyatli saqlandi! Faylni "savollar.json" nomli fayl sifatida yuklab oling.');
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Ma\'lumotlarni saqlashda xatolik yuz berdi!');
  }
}
