document.getElementById('btnCadastrar').addEventListener('click', async () => {
    // Verificar se é CPF ou CNPJ
    const isCnpj = document.getElementById('toggleCheckbox').checked;

    // Captura os dados do formulário
    const dados = {
        nome_completo: document.getElementById('nome_completo').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        id_endereco: Number(document.getElementById('id_endereco').value),
        id_status: Number(document.getElementById('id_status').value),
        is_pcd: false // Pode ser alterado para checkbox se tiver
    };

    // CPF ou CNPJ
    if (isCnpj) {
        dados.cnpj = document.getElementById('cnpj').value;
    } else {
        dados.cpf = document.getElementById('cpf').value;
    }

    try {
        // Escolher a URL dependendo do tipo de cadastro
        let url = isCnpj ? '/tcc/add_empresa' : '/tcc/add_usuario';

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();
        alert(resultado.mensagem);

        // Limpar formulário
        if (response.ok) document.querySelector('form')?.reset();

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Veja o console para detalhes.');
    }
});
