const btnNovaMensagem = document.getElementById('btnNovaMensagem');
const modalMensagem = document.getElementById('modalMensagem');
const btnEnviarMensagem = document.getElementById('btnEnviarMensagem');
const btnFecharModal = document.getElementById('btnFecharModal');
const inputNome = document.getElementById('nomeContato');
const inputTexto = document.getElementById('textoMensagem');

btnNovaMensagem.addEventListener('click', function () {
   modalMensagem.style.display = 'block';
});

btnFecharModal.addEventListener('click', function () {
   modalMensagem.style.display = 'none';
   inputNome.value = '';
   inputTexto.value = '';
});

btnEnviarMensagem.addEventListener('click', function () {
   if (inputNome.value.trim() !== '' && inputTexto.value.trim() !== '') {
      const novaMensagem = {
         nome: inputNome.value,
         mensagem: inputTexto.value
      };

      let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
      mensagens.push(novaMensagem);
      localStorage.setItem('mensagens', JSON.stringify(mensagens));

      // Redireciona para mensagem.html
      window.location.href = './mensagem.html';
   }
});