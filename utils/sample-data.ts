
// Dados mockados de HQs para a listagem inicial
// Cada HQ tem id, título, descrição, imagem, preço e se é rara
export type Comic = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rare: boolean;
};

// Função utilitária para gerar HQs mockadas
// Lista de imagens reais de HQs Marvel (mock)
const marvelCovers = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519121782439-2c5f2c2a3c8b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519121782439-2c5f2c2a3c8b?auto=format&fit=crop&w=400&q=80",
];

export function generateMockComics(count: number = 30): Comic[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `HQ Marvel #${i + 1}`,
    description: `Descrição da HQ Marvel número ${i + 1}.`,
    // Usa uma imagem real mockada, alternando entre as disponíveis
    thumbnail: marvelCovers[i % marvelCovers.length],
    price: Math.floor(Math.random() * 30) + 10, // Preço entre 10 e 39
    rare: false, // Inicialmente todas comuns, depois sorteamos as raras
  }));
}

// Função para marcar 10% das HQs como raras aleatoriamente
export function markRandomRares(comics: Comic[]): Comic[] {
  const totalRares = Math.max(1, Math.floor(comics.length * 0.1));
  const rareIndexes = new Set<number>();
  while (rareIndexes.size < totalRares) {
    rareIndexes.add(Math.floor(Math.random() * comics.length));
  }
  return comics.map((comic, idx) => ({ ...comic, rare: rareIndexes.has(idx) }));
}
