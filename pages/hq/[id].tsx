import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/slices/cartSlice";
import { generateMockComics, markRandomRares, Comic } from "../../utils/sample-data";
import Cart from "../../components/Cart";
import { fetchMarvelComicById } from "../../utils/fetch-marvel-comic-by-id";

// Styled Components para a página de detalhes
const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: fadeIn 0.7s ease forwards;
  @media (max-width: 600px) {
    max-width: 100vw;
    margin: 0.5rem 0;
    padding: 1rem 0.2rem;
    border-radius: 0;
    box-shadow: none;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;
const Img = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 6px;
  object-fit: cover;
  aspect-ratio: 2/3;
  background: #eee;
  @media (max-width: 600px) {
    max-width: 160px;
  }
`;
const RareBadge = styled.span`
  background: #e62429;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-top: 0.5rem;
`;
const AddButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  margin-top: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
  &:hover {
    background: #e62429;
  }
`;
const BackButton = styled.button`
  margin-top: 2rem;
  background: #e62429;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
`;

// Página de detalhes da HQ (personagem)
// Comentários explicativos em cada parte do código
const ComicDetail: React.FC = () => {
  const router = useRouter();

  // Pega o id da HQ pela URL
  const { id } = router.query;


  // Estado para HQ
  const [comic, setComic] = useState<Comic|null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMarvelComicById(Number(id))
      .then(setComic)
      .catch(() => {
        // fallback para mock se falhar
        const numId = Number(id);
        let fallback = markRandomRares(generateMockComics(30)).find(c => c.id === numId) || null;
        // Se não existir na lista, gera um mock dinâmico para esse ID
        if (!fallback && !isNaN(numId)) {
          const covers = [
            "https://upload.wikimedia.org/wikipedia/en/0/0c/Avengers1.jpg",
            "https://upload.wikimedia.org/wikipedia/en/0/0e/Amazing_Fantasy_15.jpg",
            "https://upload.wikimedia.org/wikipedia/en/2/2c/Fantastic_Four_1_%281961%29.jpg",
            "https://upload.wikimedia.org/wikipedia/en/9/9e/X-Men_%281963%29_1st_issue.jpg",
            "https://upload.wikimedia.org/wikipedia/en/5/5a/Black_Panther_Vol_1_1.png",
            "https://upload.wikimedia.org/wikipedia/en/8/8c/Thor-1.png",
            "https://upload.wikimedia.org/wikipedia/en/9/91/CaptainAmerica1.jpg",
            "https://upload.wikimedia.org/wikipedia/en/9/9d/Iron_Man_Vol_1_1.png",
            "https://upload.wikimedia.org/wikipedia/en/5/59/Hulk1.jpg",
            "https://upload.wikimedia.org/wikipedia/en/7/7c/Daredevil_1.png",
          ];
          fallback = {
            id: numId,
            title: `HQ Marvel #${numId}`,
            description: `Descrição da HQ Marvel número ${numId}.`,
            thumbnail: covers[((numId - 1) % covers.length + covers.length) % covers.length],
            price: 10 + ((numId * 7) % 30),
            rare: numId % 10 === 0,
          };
        }
        setComic(fallback);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Hook do Redux para disparar ações
  const dispatch = useDispatch();

  // Estado para abrir o carrinho ao adicionar
  const [cartOpen, setCartOpen] = useState(false);
  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (comic) {
      dispatch(addToCart(comic));
      setCartOpen(true);
    }
  };

  if (loading) return <Container>Carregando...</Container>;
  if (!comic) return <Container>HQ não encontrada ou não disponível para compra.</Container>;

  return (
    <>
      <Container>
        {/* Imagem da HQ */}
        <Img src={comic.thumbnail} alt={comic.title} />
        {/* Título */}
        <h1>{comic.title}</h1>
        {/* Descrição */}
        <p>{comic.description}</p>
        {/* Preço */}
        <strong>R$ {comic.price}</strong>
        {/* Badge de raro */}
        {comic.rare && <RareBadge>Raro</RareBadge>}
        {/* Botão para adicionar ao carrinho */}
        <AddButton onClick={handleAddToCart} disabled={!comic}>Adicionar ao Carrinho</AddButton>
        {/* Botão para voltar */}
        <BackButton onClick={() => router.back()}>Voltar</BackButton>
      </Container>
      {/* Carrinho: só aparece se aberto */}
      {cartOpen && (
        <div style={{position:'fixed',bottom:32,right:32,zIndex:10000}}>
          <Cart />
        </div>
      )}
    </>
  );
};

export default ComicDetail;
