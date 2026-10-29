const detalhes = document.querySelector(".detalhes");
const mensagem = document.querySelector(".mensagem");

// Lê o id da URL: detalhes.html?id=abc123
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// Mostra os dados de um GIF na página (já pronta)
function mostrarDetalhes(gif) {
  document.title = gif.title;

  detalhes.innerHTML = `
    <img src="${gif.images.original.url}" alt="${gif.title}">
    <h1>${gif.title || "Sem título"}</h1>
    <p class="info">
      Autor: ${gif.username || "desconhecido"}<br>
      Classificação: ${gif.rating}<br>
      Publicado em: ${gif.import_datetime}
    </p>
    <p><a href="${gif.url}" target="_blank">Ver na Giphy</a></p>
  `;
}

// TODO — carregarDetalhes()
// - se não houver id, mostrar "Nenhum GIF escolhido. Volte para a lista." e parar
// - transformar em async e montar a URL: API_URL + "/" + id + "?api_key=" + API_KEY
// - fetch dentro de try/catch
// - status 401 ou 403: "Chave de API inválida."
// - status 404: "GIF não encontrado."
// - status 429: "Limite de requisições atingido. Tente mais tarde."
// - qualquer outro status diferente de 200: "A Giphy não respondeu. Tente de novo."
// - ler o JSON; o GIF está em dados.data
// - chamar mostrarDetalhes(dados.data)
async function carregarDetalhes() {
  // 1) Sem id na URL: Para aqui
  if (!id) {
    mensagem.textContent = "Nenhum GIF escolhido. Volte para a lista.";
    return;
  }

  try {
    const url = `${API_URL}/${id}?api_key=${API_KEY}`;
    const resposta = await fetch(url);

    if (resposta.status === 401 || resposta.status === 403) {
      mensagem.textContent = "Chave de API inválida."
      return;
    }

    if (resposta.status === 404) {
      mensagem.textContent = "GIF não encontrado."
      return;
    }

    if (resposta.status === 429) {
      mensagem.textContent = "Limite de requisições atingido. Tente mais tarde."
      return;
    }

    if (resposta.status !== 200) {
      mensagem.textContent = "A Giphy não respondeu. Tente de novo."
      return;
    }

    const dados = await resposta.json();
    mostrarDetalhes(dados.data);

  } catch (erro) {
    mensagem.textContent = "Não foi possível conectar à API."
    console.erro(erro);
  }
}

carregarDetalhes();
