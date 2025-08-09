
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
  // Capas reais de HQs Marvel do Wikimedia Commons (domínio público ou fair use)
  "https://upload.wikimedia.org/wikipedia/en/0/0c/Avengers1.jpg", // Avengers #1
  "https://upload.wikimedia.org/wikipedia/en/0/0e/Amazing_Fantasy_15.jpg", // Amazing Fantasy #15 (Spider-Man)
  "https://upload.wikimedia.org/wikipedia/en/2/2c/Fantastic_Four_1_%281961%29.jpg", // Fantastic Four #1
  "https://upload.wikimedia.org/wikipedia/en/9/9e/X-Men_%281963%29_1st_issue.jpg", // X-Men #1
  "https://upload.wikimedia.org/wikipedia/en/5/5a/Black_Panther_Vol_1_1.png", // Black Panther #1
  "https://upload.wikimedia.org/wikipedia/en/8/8c/Thor-1.png", // Thor #1
  "https://upload.wikimedia.org/wikipedia/en/9/91/CaptainAmerica1.jpg", // Captain America #1
  "https://upload.wikimedia.org/wikipedia/en/9/9d/Iron_Man_Vol_1_1.png", // Iron Man #1
  "https://upload.wikimedia.org/wikipedia/en/5/59/Hulk1.jpg", // Hulk #1
  "https://upload.wikimedia.org/wikipedia/en/7/7c/Daredevil_1.png", // Daredevil #1
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
