document.getElementById("btnLogin").addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo = document.getElementById("tipo").value;
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
            body: JSON.stringify({ email, senha, tipo })
        });

        const data = await resposta.json();

        if (data.sucesso) {

            // 🔥 Salva as informações do usuário
            localStorage.setItem("jwtToken", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            // 🔥 Salva o CPF (candidato) ou CNPJ (empresa)
            localStorage.setItem("cpf_usuario_logado", data.usuario.id);

            msg.innerText = "Login realizado! Redirecionando...";

            // Redirecionamento correto
            if (data.usuario.tipo === "empresa") {
                window.location.href = "./paginainicialempresa.html";
            } else {
                window.location.href = "./paginainicialcandidato.html";
            }

        } else {
            msg.innerText = "❌ " + data.mensagem;
        }

    } catch (erro) {
        msg.innerText = "Erro ao conectar com o servidor.";
        console.error(erro);
    }
});
