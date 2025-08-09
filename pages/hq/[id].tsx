import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/slices/cartSlice";
import { generateMockComics, markRandomRares, Comic } from "../../utils/sample-data";

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
`;
const Img = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 6px;
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

  // Gera os dados mockados (igual à listagem)
  const comics: Comic[] = React.useMemo(() => markRandomRares(generateMockComics(30)), []);
  // Busca a HQ pelo id
  const comic = comics.find((c) => c.id === Number(id));

  // Hook do Redux para disparar ações
  const dispatch = useDispatch();

  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (comic) dispatch(addToCart(comic));
  };

  // Se não encontrar, mostra mensagem
  if (!comic) {
    return <Container>HQ não encontrada.</Container>;
  }

  return (
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
      <AddButton onClick={handleAddToCart}>Adicionar ao Carrinho</AddButton>
      {/* Botão para voltar */}
      <BackButton onClick={() => router.back()}>Voltar</BackButton>
    </Container>
  );
};

export default ComicDetail;
