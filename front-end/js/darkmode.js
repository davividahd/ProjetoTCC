// =========================
// MODO ESCURO (SEM ERROS)
// =========================

// Botão do modo escuro
const darkModeBtn = document.getElementById('toggle-dark-mode');

// Função principal do modo escuro
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");

    // Troca o ícone
    darkModeBtn.textContent = isDark ? "☀️" : "🌙";

    // Salva preferência
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

// Carrega preferência salva
function applyDarkModePreference() {
    const darkModeStatus = localStorage.getItem("darkMode");

    if (darkModeStatus === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        darkModeBtn.textContent = "🌙";
    }
}

// Aplica quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    applyDarkModePreference();
});

// Evento do botão
darkModeBtn.addEventListener("click", toggleDarkMode);
