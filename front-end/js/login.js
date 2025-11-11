document.getElementById("btnLogin").addEventListener("click", async () => {
		const email = document.getElementById("email").value.trim();
		const senha = document.getElementById("senha").value;
		const tipo = document.getElementById("tipo").value;
		const msg = document.getElementById("msg");

		if (!email || !senha) {
			msg.innerText = "Preencha todos os campos!";
			return;
		}

		try {
			const resposta = await fetch("http://localhost:3000/tcc/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, senha, tipo })
			});

			const data = await resposta.json();

			if (data.sucesso) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("tipo", data.usuario.tipo);
				localStorage.setItem("nome", data.usuario.nome);

				msg.innerText = "✅ Login realizado! Redirecionando...";

				if (tipo === "empresa") {
					window.location.href = "./paginainicialcandidato.html";
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