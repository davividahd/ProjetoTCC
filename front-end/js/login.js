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
        console.log("Resposta do servidor:", data);

        // ----------- ERRO DE LOGIN -----------
        if (!data.sucesso) {
            msg.innerText = "❌ " + data.mensagem;
            return;
        }

        // ---------- FORMATO ATUAL DO BACKEND ----------
        // data.dados = { cpf, nome_completo, telefone, ... }

        // salva o token
        localStorage.setItem("jwtToken", data.token);

        // salva as infos do usuário (objeto completo)
        localStorage.setItem("usuario", JSON.stringify(data.dados));

        // salva o identificador único (CPF)
        localStorage.setItem("cpf_usuario_logado", data.dados.cpf);

        msg.innerText = "Login realizado! Redirecionando...";

        // tipo vem da tela, não do backend
        if (tipo === "empresa") {
            window.location.href = "./paginainicialempresa.html";
        } else {
            window.location.href = "./paginainicialcandidato.html";
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        msg.innerText = "Erro ao conectar com o servidor.";
    }
});
