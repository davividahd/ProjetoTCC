// Modo Escuro
const darkModeBtn = document.getElementById('toggle-dark-mode');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = '☀️';
    } else {
        darkModeBtn.textContent = '🌙';
    }
});



function applyDarkModePreference() {
    const darkModeStatus = localStorage.getItem("darkMode");
    if (darkModeStatus === "enabled") {
        document.body.classList.add("dark-mode");
    }
    else (darkModeStatus === "disable")
    document.body.classList.remove("dark-mode")
}

window.onload = () => {
    applyDarkModePreference();
    criarCards(vagas);
}

document.getElementById("toggle-dark-mode").addEventListener("click", toggleDarkMode);
