
let cardContainer = document.querySelector(".card-container");
let dados = [];
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const paginationContainer = document.getElementById('pagination-container');
const sortFilter = document.getElementById('sort-filter');
const searchInput = document.getElementById('campo-busca');
const resultsCountContainer = document.getElementById('results-count');
const searchButton = document.getElementById('botao-busca');

let paginaAtual = 1;
const itensPorPagina = 10;

// Carrega os dados do JSON uma vez quando a página é carregada
window.addEventListener('DOMContentLoaded', async () => {
    // Verifica o tema salvo no localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggleButton.textContent = '🌙';
    }

    let resposta = await fetch("data.json");
    dados = await resposta.json();
    aplicarFiltros();
});

let debounceTimeout;
// Adiciona listener para o campo de busca (live search com debounce)
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        aplicarFiltros();
    }, 300); // Atraso de 300ms
});

// Mantém o botão funcional
searchButton.addEventListener('click', () => {
    aplicarFiltros();
});

// Adiciona listener para o filtro de ordenação
sortFilter.addEventListener('change', () => {
    aplicarFiltros();
});

// Lógica para trocar o tema
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggleButton.textContent = isLight ? '🌙' : '☀️';
});


function aplicarFiltros() {
    const termoBusca = document.getElementById("campo-busca").value.toLowerCase();
    const sortValue = sortFilter.value;

    let resultadosFiltrados = dados.filter(jogo => 
        jogo.nome.toLowerCase().includes(termoBusca) || 
        jogo.descricao.toLowerCase().includes(termoBusca)
    );

    // Aplica a ordenação
    if (sortValue === 'recentes') {
        resultadosFiltrados.sort((a, b) => b.ano - a.ano);
    } else if (sortValue === 'antigos') {
        resultadosFiltrados.sort((a, b) => a.ano - b.ano);
    }

    // Atualiza a contagem de resultados
    resultsCountContainer.textContent = `${resultadosFiltrados.length} jogo(s) encontrado(s)`;

    paginaAtual = 1;
    exibirPagina(resultadosFiltrados, paginaAtual);
}

function exibirPagina(dadosParaPaginar, pagina) {
    cardContainer.innerHTML = "";
    paginaAtual = pagina;

    const dadosOrdenados = aplicarOrdenacaoAtual(dadosParaPaginar);
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPaginados = dadosOrdenados.slice(inicio, fim);

    renderizarCards(itensPaginados);
    setupPaginacao(dadosParaPaginar);
}

function renderizarCards(dadosDaPagina){
    cardContainer.innerHTML = ""; // Limpa os cards existentes

    // A verificação de "nenhum resultado" agora é implícita pela contagem
    if (dadosDaPagina.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum jogo encontrado.</p>";
        return;
    }

    dadosDaPagina.forEach((dado, index) => {
        let article = document.createElement("article");
        article.classList.add("card");
        article.style.animationDelay = `${index * 50}ms`; // Adiciona um atraso em cascata
        article.innerHTML = `
            <img src="${dado.imagem}" alt="Imagem do jogo ${dado.nome}" class="card-image" onerror="this.style.display='none'">
            <div class="card-content">
                <h2>${dado.nome}</h2>
                <p>${dado.ano}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    });
}

function setupPaginacao(dadosParaPaginar) {
    paginationContainer.innerHTML = "";
    const totalPaginas = Math.ceil(dadosParaPaginar.length / itensPorPagina);

    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('pagination-button');
        if (i === paginaAtual) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            exibirPagina(dadosParaPaginar, i);
            window.scrollTo(0, 0);
        });
        paginationContainer.appendChild(btn);
    }
}

function aplicarOrdenacaoAtual(dadosParaOrdenar) {
    const sortValue = sortFilter.value;
    if (sortValue === 'recentes') {
        return [...dadosParaOrdenar].sort((a, b) => b.ano - a.ano);
    } else if (sortValue === 'antigos') {
        return [...dadosParaOrdenar].sort((a, b) => a.ano - b.ano);
    }
    return dadosParaOrdenar;
}
