 let numeroSecreto;
    let tentativas;
    const maxTentativas = 3;
    let jogoAtivo;

    const imagem = document.getElementById("imagemResultado");
    const container = document.querySelector(".container");

    function iniciarJogo() {
      numeroSecreto = Math.floor(Math.random() * 10) + 1;
      tentativas = 0;
      jogoAtivo = true;

      document.getElementById("mensagem").textContent = "";
      document.getElementById("tentativas").textContent = "Tentativas: 0 / " + maxTentativas;
      document.getElementById("palpite").value = "";

      imagem.style.display = "none";
      imagem.style.opacity = 0;
      imagem.style.transform = "translateY(-50px)";
      container.classList.remove("shake");
    }

    function verificarPalpite() {
      if (!jogoAtivo) return;

      const palpite = Number(document.getElementById("palpite").value);
      const mensagem = document.getElementById("mensagem");

      if (!palpite) {
        mensagem.textContent = "Digite um número válido!";
        return;
      }

      tentativas++;
      document.getElementById("tentativas").textContent =
        "Tentativas: " + tentativas + " / " + maxTentativas;

      if (palpite === numeroSecreto) {
        mensagem.textContent = "🎉 Você acertou!";
        mensagem.style.color = "green";

        imagem.src = "https://preview.redd.it/is-it-just-me-or-is-sgt-doakes-one-of-the-coolest-characters-v0-r9ry9wjiybqf1.jpeg?auto=webp&s=eca0d958c2324ede41f6f1b7c8fdf8774d214a02"; // vitória
        mostrarImagem();

        soltarConfete();
        jogoAtivo = false;

      } else if (tentativas >= maxTentativas) {
        mensagem.textContent = "❌ Você perdeu! Número: " + numeroSecreto;
        mensagem.style.color = "red";

        imagem.src = "https://static.wikia.nocookie.net/villains-versos-galeria/images/8/89/Sergeant_James_Doakes.webp/revision/latest?cb=20231015183306&path-prefix=pt-br"; // derrota
        mostrarImagem();

        container.classList.add("shake");
        jogoAtivo = false;

      } else if (palpite < numeroSecreto) {
        mensagem.textContent = "🔼 Maior!";
      } else {
        mensagem.textContent = "🔽 Menor!";
      }

      document.getElementById("palpite").value = "";
    }

    function mostrarImagem() {
      imagem.style.display = "block";
      setTimeout(() => {
        imagem.style.opacity = 1;
        imagem.style.transform = "translateY(0)";
      }, 50);
    }

    // ===== Confete =====
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let confetes = [];

    function soltarConfete() {
      confetes = [];
      for (let i = 0; i < 120; i++) {
        confetes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 2,
          d: Math.random() * 4 + 2,
          color: `hsl(${Math.random() * 360},100%,50%)`
        });
      }
      animarConfete();
    }

    function animarConfete() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetes.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.y += c.d;
      });
      requestAnimationFrame(animarConfete);
    }

    function reiniciarJogo() { iniciarJogo(); }
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    // partículas suaves contínuas
    let particulas = [];
    for (let i = 0; i < 80; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        d: Math.random() * 1 + 0.5,
        color: `hsla(${Math.random() * 360},100%,70%,0.3)`
      });
    }

    function animarParticulas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // confete existentes
      confetes.forEach(c => { ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fillStyle = c.color; ctx.fill(); c.y += c.d; });
      // partículas contínuas
      particulas.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += p.d;
        if (p.y > canvas.height) p.y = 0;
      });
      requestAnimationFrame(animarParticulas);
    }
    animarParticulas();
    iniciarJogo();