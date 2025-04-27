
// عناصر الموقع
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginSection = document.getElementById('loginSection');
const gameMenu = document.getElementById('gameMenu');
const loginError = document.getElementById('loginError');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const clickSound = document.getElementById('clickSound');
const langMenu = document.getElementById('langMenu');
const themeMenu = document.getElementById('themeMenu');

// لو فيه يوزر مسجل
if(localStorage.getItem('currentUser')) {
    loginSection.classList.add('hidden');
    gameMenu.classList.remove('hidden');
}

// تسجيل الدخولث
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if(username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if(users[username]) {
            loginError.innerText = "Username already exists!";
        } else {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', username);
            loginSection.classList.add('hidden');
            gameMenu.classList.remove('hidden');
        }
    } else {
        loginError.innerText = "Please enter both username and password.";
    }
});

// تغيير اللغة
langMenu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

function changeLanguage(lang) {
    const translations = {
        en: { login: "Login", chooseGame: "Choose Your Game" },
        ar: { login: "تسجيل الدخول", chooseGame: "اختر لعبتك" },
        es: { login: "Iniciar sesión", chooseGame: "Elige tu juego" },
        de: { login: "Anmelden", chooseGame: "Wähle dein Spiel" }
    };
    document.getElementById('loginTitle').innerText = translations[lang].login;
    document.getElementById('chooseGame').innerText = translations[lang].chooseGame;
}

// زرار الموسيقى
musicBtn.addEventListener('click', () => {
    if(bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});

// أصوات الضغط
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!btn.closest('.dropdown-content')) {
            clickSound.play();
        }
    });
});

// زرار اختيار الثيم
themeMenu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        document.body.className = '';
        document.body.classList.add(theme + '-mode');
        localStorage.setItem('theme', theme);
    });
});

// تحميل الثيم المحفوظ
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) {
        document.body.classList.add(savedTheme + '-mode');
    }
});

