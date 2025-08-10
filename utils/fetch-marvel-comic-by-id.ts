import { getMarvelAuthParams } from "./marvel-auth";

export async function fetchMarvelComicById(id: number) {
  const { ts, apikey, hash } = getMarvelAuthParams();
  const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar HQ da Marvel");
  const data = await res.json();
  const comic = data.data.results[0];
  return {
    id: comic.id,
    title: comic.title,
    description: comic.description || "Sem descrição.",
    price: comic.prices?.[0]?.price || 9.9,
    thumbnail: `${comic.thumbnail.path.replace('http://','https://')}.${comic.thumbnail.extension}`,
    rare: false // pode ajustar lógica de raridade se quiser
  };
}
