document.getElementById("btnLogin").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipoSelecionado = document.getElementById("tipo").value;
    const msg = document.getElementById("msg");

    if (!email || !senha) {
        msg.innerText = "Preencha todos os campos!";
        return;
    }

    msg.innerText = "Conectando...";

    try {
        const resposta = await fetch("https://faithful-spirit-teste1.up.railway.app/tcc/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha, tipo: tipoSelecionado })
        });

        const data = await resposta.json();
        console.log("LOGIN RESPOSTA:", data);

        if (!data.sucesso) {
            msg.innerText = "❌ " + data.mensagem;
            return;
        }

        if (!data.token) {
            msg.innerText = "❌ Servidor não retornou token.";
            return;
        }

        // adiciona "tipo" manualmente
        const usuario = { ...data.dados, tipo: tipoSelecionado };

        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        msg.innerText = "Login realizado!";

        if (tipoSelecionado === "empresa") {
            window.location.href = "./paginainicialempresa.html";
        } else {
            window.location.href = "./paginainicialcandidato.html";
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        msg.innerText = "Erro ao conectar ao servidor.";
    }
});
