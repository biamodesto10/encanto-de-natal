document.addEventListener("DOMContentLoaded", function () {

    // RECURSO 1: Efeito Parallax
    const header = document.querySelector('header');
    const bannerParallax = document.querySelector('.banner');
    let ticking = false;

    function updateParallax() {
        const value = window.scrollY;
        if (header) {
            header.style.transform = `translateY(${value * 0.3}px)`;
        }
        if (bannerParallax) {
            bannerParallax.style.transform = `translateY(${value * 0.15}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // RECURSO 2: Slideshow / Carrossel
    const banner = document.querySelector(".banner-principal.banner");
    if (banner) {
        const imagens = [
            "https://http2.mlstatic.com/D_NQ_NP_667726-MLM98454381128_112025-O-talla-grande-pantalon-navideno-negro-de-talla-grande-para-m.webp",
            "https://i.pinimg.com/736x/17/52/81/17528160f7bb921b518e09f0bf62aa97.jpg",
            "https://i.pinimg.com/1200x/ed/10/06/ed1006554d58a80b38ba46d44388449c.jpg"
        ];
        let i = 0;

        banner.style.position = "relative";
        banner.innerHTML = `
            <img id="img-slide" src="${imagens[0]}" style="width:100%; height:350px; object-fit:cover; border-radius:10px;">
            <button id="prev" style="position:absolute; left:10px; top:50%;">❮</button>
            <button id="next" style="position:absolute; right:10px; top:50%;">❯</button>
            <div id="dots" style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%);"></div>
        `;

        const img = document.getElementById("img-slide");
        const dotsContainer = document.getElementById("dots");

        imagens.forEach((_, idx) => {
            dotsContainer.innerHTML += `<span class="dot" style="display:inline-block; width:10px; height:10px; background:${idx === 0 ? '#FFD700' : '#fff'}; border-radius:50%; margin:3px; cursor:pointer;"></span>`;
        });

        function mostrarSlide(index) {
            i = (index + imagens.length) % imagens.length;
            img.src = imagens[i];
            document.querySelectorAll(".dot").forEach((dot, idx) => {
                dot.style.background = idx === i ? '#FFD700' : '#fff';
            });
        }

        document.getElementById("prev").onclick = () => mostrarSlide(i - 1);
        document.getElementById("next").onclick = () => mostrarSlide(i + 1);

        setInterval(() => mostrarSlide(i + 1), 3000);
    }

    // RECURSO 3: Música de Fundo e Efeitos Sonoros
    const musica = new Audio("audio/musica-natalina.mp3");
    musica.loop = true;

    const somClique = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=click-button-140881.mp3");

    function tocarSom() {
        somClique.currentTime = 0;
        somClique.play().catch(() => {});
    }

    document.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
            tocarSom();
        }
    });

    const nav = document.querySelector("nav");
    if (nav) {
        const btnMusica = document.createElement("button");
        btnMusica.innerText = "🎵 Música: OFF";
        btnMusica.style.marginLeft = "10px";
        btnMusica.style.cursor = "pointer";
        nav.appendChild(btnMusica);

        btnMusica.onclick = function () {
            if (musica.paused) {
                musica.play().then(() => {
                    btnMusica.innerText = "🔔 Música: ON";
                }).catch((erro) => {
                    console.log("Erro ao tocar áudio:", erro);
                    alert("Por favor, dê um clique em qualquer ponto da página antes de ativar o som.");
                });
            } else {
                musica.pause();
                btnMusica.innerText = "🎵 Música: OFF";
            }
        };
    }

    // RECURSO 4: Cards Dinâmicos
    // RECURSO 5: Filtro e Pesquisa
    const introCatalogo = document.querySelector(".introducao-catalogo");
    if (introCatalogo && typeof produtos !== "undefined") {
        document.querySelectorAll("#moletom, #pijamas, #infantil, #acessorios, #festas").forEach(s => s.style.display = "none");

        introCatalogo.innerHTML += `
            <div style="text-align:center; margin: 20px 0;">
                <input type="text" id="busca" placeholder="Buscar produto..." style="padding:8px; width:200px;">
                <select id="filtro" style="padding:8px;">
                    <option value="todos">Todas as categorias</option>
                    <option value="moletom">Moletons</option>
                    <option value="pijamas">Pijamas</option>
                    <option value="infantil">Infantil</option>
                    <option value="acessorios">Acessórios</option>
                    <option value="festas">Festas</option>
                </select>
            </div>
            <div id="container-produtos" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:20px;"></div>
        `;

        const container = document.getElementById("container-produtos");
        const busca = document.getElementById("busca");
        const filtro = document.getElementById("filtro");

        function renderizar() {
            const txt = busca.value.toLowerCase();
            const cat = filtro.value;

            container.innerHTML = "";

            produtos.forEach(p => {
                const bateNome = p.nome.toLowerCase().includes(txt);
                const bateCat = cat === "todos" || p.categoria === cat;

                if (bateNome && bateCat) {
                    container.innerHTML += `
                        <article class="produto">
                            <img src="${p.imagem}" alt="${p.nome}">
                            <h3>${p.nome}</h3>
                            <p>${p.descricao}</p>
                            <p>R$ ${p.preco.toFixed(2)}</p>
                            <a href="contato.html">Tenho interesse</a>
                        </article>
                    `;
                }
            });
        }

        busca.oninput = renderizar;
        filtro.onchange = renderizar;
        renderizar();
    }

    // RECURSO 6: Efeito de Neve Caindo
    function criarNeve() {
        const floco = document.createElement("div");
        floco.innerText = "❄";
        floco.style.position = "fixed";
        floco.style.top = "-20px";
        floco.style.left = Math.random() * 100 + "vw";
        floco.style.fontSize = (Math.random() * 12 + 10) + "px";
        floco.style.color = "#FFF";
        floco.style.opacity = Math.random();
        floco.style.pointerEvents = "none";
        floco.style.zIndex = "9999";
        floco.style.transition = "transform 6s linear, opacity 6s linear";

        document.body.appendChild(floco);

        setTimeout(() => {
            floco.style.transform = `translateY(105vh)`;
            floco.style.opacity = "0";
        }, 100);

        setTimeout(() => {
            floco.remove();
        }, 6000);
    }
    setInterval(criarNeve, 400);

    // RECURSO 7: Contagem Regressiva para o Natal
    if (header) {
        const divContagem = document.createElement("div");
        divContagem.style.fontSize = "1rem";
        divContagem.style.marginTop = "8px";
        divContagem.style.color = "#FFD700";
        divContagem.style.fontWeight = "bold";
        header.appendChild(divContagem);

        function atualizarContagem() {
            const agora = new Date();
            let natal = new Date(agora.getFullYear(), 11, 25);
            if (agora > natal) {
                natal = new Date(agora.getFullYear() + 1, 11, 25);
            }

            const diff = natal - agora;
            const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutos = Math.floor((diff / (1000 * 60)) % 60);
            const segundos = Math.floor((diff / 1000) % 60);

            divContagem.innerText = `🎄 Faltam ${dias}d ${horas}h ${minutos}m ${segundos}s para o Natal!`;
        }

        setInterval(atualizarContagem, 1000);
        atualizarContagem();
    }

    // RECURSO 8: Validação do Formulário de Contato
    const form = document.querySelector("form");
    if (form) {
        form.onsubmit = function (e) {
            const inputs = form.querySelectorAll("input, textarea");
            let valido = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valido = false;
                }
            });

            if (!valido) {
                e.preventDefault();
                alert("Por favor, preencha todos os campos do formulário antes de enviar!");
            } else {
                alert("Mensagem enviada com sucesso! Feliz Natal!");
            }
        };
    }

});