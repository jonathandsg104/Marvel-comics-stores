import { getMarvelAuthParams } from "./marvel-auth";

/**
 * Busca HQs reais da Marvel usando a API oficial
 * @param {number} limit - Quantidade de HQs
 * @param {number} offset - Offset para paginação
 * @returns Lista de HQs (comics)
 */
export async function fetchMarvelComics(limit = 8, offset = 0) {
  const { ts, apikey, hash } = getMarvelAuthParams();
  const url = `https://gateway.marvel.com/v1/public/comics?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${apikey}&hash=${hash}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar HQs da Marvel");
  const data = await res.json();
  // Normaliza os dados para o formato usado no app
  return data.data.results.map((comic: any) => ({
    id: comic.id,
    title: comic.title,
    description: comic.description || "Sem descrição.",
    price: comic.prices?.[0]?.price || 9.9,
    thumbnail: `${comic.thumbnail.path.replace('http://','https://')}.${comic.thumbnail.extension}`,
    rare: false // Pode adicionar lógica para marcar raros
  }));
}
