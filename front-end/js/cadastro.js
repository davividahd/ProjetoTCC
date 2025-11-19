// ./js/cadastro.js
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btnCadastrar');
    const msg = document.getElementById('msg');

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        msg.innerText = '';

        // coletar campos
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const nome_completo = document.getElementById('nome_completo').value.trim();
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '').trim(); // só números
        const telefone = document.getElementById('telefone').value.trim() || '11999999999';
        const id_status = Number(document.getElementById('id_status').value) || 1;
        const limite = Number(document.getElementById('limite').value) || 1.0;
        const is_pcd = document.getElementById('togglePCD').checked;

        const endereco = {
            logradouro: document.getElementById('logradouro').value.trim(),
            numero: Number(document.getElementById('numero').value) || 0,
            bairro: document.getElementById('bairro').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            cep: document.getElementById('cep').value.replace(/\D/g, '').trim()
        };

        // validações
        if (!email || !senha || !nome_completo) {
            return msg.innerText = 'Preencha email, senha e nome completo.';
        }
        if (!cpf || cpf.length !== 11) {
            return msg.innerText = 'CPF inválido. Informe 11 dígitos.';
        }
        if (!endereco.logradouro || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.cep) {
            return msg.innerText = 'Preencha todos os campos de endereço.';
        }

        const dados = {
            cpf,
            telefone,
            nome_completo,
            email,
            id_status,
            senha,
            limite,
            is_pcd,
            endereco
        };

        try {
            // ajusta URL automaticamente entre localhost e produção
            const API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
                ? 'https://faithful-spirit-teste1.up.railway.app/tcc/add_usuario'
                : 'https://faithful-spirit-teste1.up.railway.app/tcc/add_usuario';

            const resp = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const json = await resp.json();

            if (resp.ok && json.sucesso) {
                alert('Cadastro realizado com sucesso!');
                // redireciona para login
                window.location.href = './login.html';
            } else {
                msg.innerText = json.mensagem || json.erro || 'Falha no cadastro.';
            }

        } catch (err) {
            console.error('Erro:', err);
            msg.innerText = 'Erro ao conectar com o servidor.';
        }
    });
});
