const btnDeletar = document.getElementById('btnDeletar');
const contatosDiv = document.querySelector('.contatos');
const inputPesquisar = document.querySelector('input[type="text"]');

function mostrarMensagensSalvas() {
   contatosDiv.innerHTML = '';
   let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];

   if (mensagens.length === 0) {
      contatosDiv.innerHTML = "<p>Nenhuma mensagem encontrada.</p>";
   } else {
      mensagens.forEach(msg => {
         const novoContato = document.createElement('div');
         novoContato.className = 'testecontato';
         novoContato.innerHTML = `<strong>${msg.nome}:</strong> ${msg.mensagem}`;
         contatosDiv.appendChild(novoContato);
      });
   }
}

mostrarMensagensSalvas();

btnDeletar.addEventListener('click', function () {
   localStorage.removeItem('mensagens');
   mostrarMensagensSalvas();
});

window.addEventListener('storage', function(event) {
   if (event.key === 'mensagens') {
      mostrarMensagensSalvas();
   }
});

inputPesquisar.addEventListener('input', function() {
   const filtro = inputPesquisar.value.toLowerCase();
   let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
   
   let mensagensFiltradas = mensagens.filter(msg => 
      msg.nome.toLowerCase().includes(filtro) || msg.mensagem.toLowerCase().includes(filtro)
   );

   contatosDiv.innerHTML = '';
   mensagensFiltradas.forEach(msg => {
      const novoContato = document.createElement('div');
      novoContato.className = 'testecontato';
      novoContato.innerHTML = `<strong>${msg.nome}:</strong> ${msg.mensagem}`;
      contatosDiv.appendChild(novoContato);
   });
});
