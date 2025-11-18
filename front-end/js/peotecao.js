(function(){
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        alert("Você precisa fazer login para acessar esta página.");
        window.location.href = "./login.html";
    }
})();
