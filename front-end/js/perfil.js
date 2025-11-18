async function carregarPerfil() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "./login.html";
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/tcc/perfil", {
            headers: { "Authorization": "Bearer " + token }
        });

        const data = await resposta.json();

        if (!data.sucesso) {
            alert(data.mensagem || "Token inválido ou expirado.");
            logout();
            return;
        }

        const u = data.usuario;

        document.getElementById("nome").innerText = u.nome_completo || u.nome || "—";
        document.getElementById("telefone").innerText = u.telefone || "—";
        document.getElementById("email").innerText = u.email || "—";

        // senha sempre começa oculta
        document.getElementById("senha").innerText = "********";
        document.getElementById("data").innerText = u.data_criacao || u.created_at || "—";

    } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
        alert("Erro ao carregar perfil.");
        logout();
    }
}

// Botão mostrar/ocultar senha
const btnMostrarSenha = document.getElementById("mostrarSenha");
const campoSenha = document.getElementById("senha");
let senhaVisivel = false;

btnMostrarSenha.addEventListener("click", () => {
    senhaVisivel = !senhaVisivel;
    const senhaReal = localStorage.getItem("senha_real") || "********";

    if (senhaVisivel) {
        campoSenha.innerText = senhaReal; 
        btnMostrarSenha.innerText = "🙈";
    } else {
        campoSenha.innerText = "********";
        btnMostrarSenha.innerText = "👁️";
    }
});



window.onload = carregarPerfil;

