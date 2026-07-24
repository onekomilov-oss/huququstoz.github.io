// Admin ma'lumotlari (bu yerda saqlash xavfsiz emas, lekin oddiy namuna uchun)
const ADMIN_CREDENTIALS = {
  username: "honorx7b",
  password: "lucky777"
};

// Login formini tekshirish
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  // Ma'lumotlarni tekshirish
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Muvaffaqiyatli kirish
    errorMessage.textContent = "";
    // Admin panelga o'tkazish
    window.location.href = "admin.html";
  } else {
    // Xato xabarini ko'rsatish
    errorMessage.textContent = "Foydalanuvchi nomi yoki parol xato!";
  }
});
