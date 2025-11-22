# 🎮 Catálogo de Jogos Online

Este é um projeto de uma página web interativa que exibe um catálogo de jogos online. Os usuários podem visualizar, pesquisar, filtrar e ordenar uma lista de jogos carregada a partir de um arquivo de dados local.

## ✨ Funcionalidades

- **Listagem de Jogos**: Exibe os jogos em formato de cards, com imagem, nome, descrição e tags.
- **Busca Dinâmica**: Permite que o usuário pesquise jogos pelo nome em tempo real.
- **Ordenação**: Classifica os jogos por data de lançamento (mais recentes ou mais antigos).
- **Paginação**: Navega entre as páginas de resultados para uma melhor visualização.
- **Contagem de Resultados**: Mostra o número de jogos encontrados após uma busca ou filtro.
- **Tema Claro/Escuro**: Botão para alternar entre um tema visual claro e escuro.
- **Links Externos**: Cada card de jogo possui um link que direciona para a página oficial do jogo.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Para a estrutura semântica da página.
- **CSS3**: Para a estilização e responsividade (através do arquivo `style.css`).
- **JavaScript**: Para a manipulação do DOM, lógica de busca, filtro, paginação e consumo de dados.

## 📂 Estrutura de Arquivos

```
├── 📁 images/
│   ├── fortnite.jpg
│   └── ... (outras imagens de jogos)
├── 📄 data.json
├── 📄 index.html
├── 📄 README.MD
├── 📄 script.js
└── 📄 style.css
```

- **`index.html`**: O arquivo principal que estrutura todo o conteúdo da página.
- **`style.css`**: Contém todas as regras de estilo para a aparência do catálogo.
- **`script.js`**: Responsável por toda a interatividade, como carregar os dados do `data.json`, renderizar os cards, implementar a busca, a ordenação e a paginação.
- **`data.json`**: Um arquivo JSON que atua como um "banco de dados" local, contendo a lista de jogos com seus respectivos detalhes (nome, descrição, ano, imagem, etc.).
- **`images/`**: Diretório que armazena as imagens de capa de cada jogo listado.

## 🚀 Como Executar o Projeto

1.  **Clone o repositório** para a sua máquina local:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Navegue até o diretório** do projeto:
    ```bash
    cd <NOME_DO_DIRETORIO>
    ```

3.  **Abra o arquivo `index.html`** no seu navegador de preferência.
    - **Recomendação**: Para garantir que a funcionalidade de carregar o `data.json` funcione corretamente sem problemas de CORS (Cross-Origin Resource Sharing), é recomendado usar um servidor local. Se você usa o Visual Studio Code, pode instalar a extensão **Live Server** e clicar em "Go Live" no canto inferior direito da janela.

---
*Projeto desenvolvido como parte da Imersão Alura.*
