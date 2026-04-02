
    const btnSortear = document.querySelector('.btn-sucess');
     const btnLimpar = document.querySelector('.btn-danger');
       const resultado = document.querySelector('.resultado');
     
    let numeros = [1,2,3,4,5,6,7,8,9,10];

    function sortear() {
      if (numeros.length === 0) {
        alert("Todos os números já foram sorteados!");
        return;
      }

      let indice = Math.floor(Math.random() * numeros.length);
      let numeroSorteado = numeros[indice];

      document.getElementById("numero").textContent = numeroSorteado;

     
    }
    function limparResultado() {
    limparResultado.innertext = '?'
    
    }

    btnSortear.addEventListiner('click', sortear);
    btnLimpar.addEventListener('click', limparResultado);



