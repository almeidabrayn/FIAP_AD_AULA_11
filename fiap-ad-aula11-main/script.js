const galeria = document.querySelector(".galeria");
const mensagem = document.querySelector(".mensagem");

// TODO — carregarGifs()
// - transformar em async e montar a URL:
//   API_URL + "/trending?api_key=" + API_KEY + "&limit=24"
// - fazer o fetch dentro de try/catch (erro de rede: "Não foi possível conectar à API.")
// - status 401 ou 403: mostrar "Chave de API inválida."
// - status 429: mostrar "Limite de requisições atingido. Tente mais tarde."
// - qualquer outro status diferente de 200: mostrar "A Giphy não respondeu. Tente de novo."
// - ler o JSON com await resposta.json()
// - para cada gif de dados.data, colocar na galeria:
//   <a href="detalhes.html?id=${gif.id}">
//     <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
//   </a>

async function carregarGifs() {
    try {
        const url = `${API_URL}/trending?api_key=${API_KEY}&limit=24`;
        const resposta = await fetch(url);

        // Tratamento de status erros
        if (resposta.status === 401 || resposta.status === 403) {
            mensagem.textContent = "Chave de API inválida.";
            return;
        }

        if (resposta.status === 429) {
            mensagem.textContent = "Limite de requisições atingido. Tente mais tarde.";
            return;
        }

        if (resposta.status !== 200) {
            mensagem.textContent = "A Giphy não responde. Tente de novo.";
            return;
        }

        const dados = await resposta.json();

        // Monta os cards na galeria
        galeria.innerHTML = "";
        dados.data.forEach((gif) => {
            const link = document.createElement("a");
            link.href = `detalhes.html?id=${gif.id}`;

            const img = document.createElement("img");
            img.src = gif.images.fixed_height.url;
            img.alt = gif.title;

            link.appendChild(img);
            galeria.appendChild(link);
        });

    } catch (erro) {
        // Erro de rede (fetch falou, sem conexão, etc...)
        mensagem.textContent = "Não foi possível conectar à API.";
        console.error(erro);
    }
}

carregarGifs();
