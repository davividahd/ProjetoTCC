// Pegar elementos do DOM
const campoNome = document.querySelector('input[placeholder="Nome e Sobrenome"]');
const campoTelefone = document.querySelector('input[placeholder="Telefone"]');
const campoEmail = document.querySelector('input[placeholder="Email"]');
const campoSenha = document.querySelector('input[placeholder="Senha"]');
const campoData = document.querySelector('input[name="dataNascimento"]');
const btnSalvar = document.getElementById('btnSalvar');

// Pegar token do localStorage (ou de onde você armazena)
const token = localStorage.getItem('token'); 

if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "./login.html"; // redireciona para login
}

// Função para carregar o perfil
async function carregarPerfil() {
    try {
        const resposta = await fetch("http://localhost:3000/tcc/perfil", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (resposta.status === 403) {
            alert("Acesso negado! Faça login novamente.");
            window.location.href = "./login.html";
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao carregar perfil.");
        }

        const data = await resposta.json();
        if (!data.sucesso) {
            alert(data.mensagem);
            return;
        }

        const u = data.usuario;
        campoNome.value = u.nome_completo || u.nome || "";
        campoTelefone.value = u.telefone || "";
        campoEmail.value = u.email || "";
        campoSenha.value = ""; // senha não vem do backend
        campoData.value = u.data_nascimento ? u.data_nascimento.split('T')[0] : "";
    } catch (err) {
        console.error("Fetch falha ao carregar:", err);
        alert("Erro ao carregar perfil.");
    }
}

// Função para salvar alterações
async function salvarPerfil() {
    try {
        const body = {
            nome_completo: campoNome.value,
            telefone: campoTelefone.value,
            email: campoEmail.value,
            senha: campoSenha.value,
            data_nascimento: campoData.value
        };

        const resposta = await fetch("http://localhost:3000/tcc/editar-perfil", {
            method: "PUT",
            headers: { 
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (resposta.status === 403) {
            alert("Acesso negado! Faça login novamente.");
            window.location.href = "./login.html";
            return;
        }

        if (resposta.status === 400) {
            const data = await resposta.json();
            alert("Erro: " + data.mensagem);
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar perfil.");
        }

        const data = await resposta.json();
        if (data.sucesso) {
            alert("Perfil atualizado com sucesso!");
            campoSenha.value = ""; // limpa campo de senha
        } else {
            alert("Erro: " + data.mensagem);
        }

    } catch (err) {
        console.error("Fetch falha ao atualizar:", err);
        alert("Erro ao atualizar perfil.");
    }
}

// Evento do botão
btnSalvar.addEventListener("click", salvarPerfil);

// Carregar perfil ao abrir página
window.onload = carregarPerfil;
