const btnNovaMensagem = document.getElementById('btnNovaMensagem');
const modalMensagem = document.getElementById('modalMensagem');
const btnEnviarMensagem = document.getElementById('btnEnviarMensagem');
const btnFecharModal = document.getElementById('btnFecharModal');
const inputNome = document.getElementById('nomeContato');
const inputTexto = document.getElementById('textoMensagem');
const contatosDiv = document.querySelector('.contatos');

function mostrarMensagensSalvas() {
   contatosDiv.innerHTML = '';
   let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
   mensagens.forEach(msg => {
      const novoContato = document.createElement('div');
      novoContato.className = 'testecontato';
      novoContato.innerHTML = `<strong>${msg.nome}:</strong> ${msg.mensagem}`;
      contatosDiv.appendChild(novoContato);
   });
}



btnNovaMensagem.addEventListener('click', function () {
   modalMensagem.style.display = 'block';
});

btnFecharModal.addEventListener('click', function () {
   modalMensagem.style.display = 'none';
   inputNome.value = '';
   inputTexto.value = '';
});

btnEnviarMensagem.addEventListener('click', function () {
   if (inputNome.value.trim() === '' || inputTexto.value.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
   }

   const novaMensagem = {
      nome: inputNome.value,
      mensagem: inputTexto.value
   };

   let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
   mensagens.push(novaMensagem);
   localStorage.setItem('mensagens', JSON.stringify(mensagens));

   modalMensagem.style.display = 'none';
   inputNome.value = '';
   inputTexto.value = '';

});


