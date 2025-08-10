import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
// Botão flutuante para abrir o carrinho
const CartButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 10000;
  background: #e62429;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 2px 12px #0005;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  &:hover {
    background: #b71c1c;
    transform: scale(1.08);
  }
`;
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/slices/cartSlice";
import styled from "styled-components";
import { generateMockComics, markRandomRares, Comic } from "../utils/sample-data";
import { fetchMarvelComics } from "../utils/fetch-marvel-comics";

// Styled Components para a grid de HQs e paginação
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  @media (max-width: 600px) {
    padding: 1rem 0.2rem;
  }
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.2rem;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 0.7s ease forwards;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(230,36,41,0.15);
    transform: translateY(-4px) scale(1.03);
  }
  @media (max-width: 600px) {
    padding: 0.7rem 0.3rem;
    min-width: 0;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;
const Img = styled.img`
  width: 100%;
  max-width: 180px;
  border-radius: 6px;
  object-fit: cover;
  aspect-ratio: 2/3;
  background: #eee;
  @media (max-width: 600px) {
    max-width: 120px;
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
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;
const AddButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  margin-top: 0.7rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s, transform 0.15s;
  &:hover {
    background: #e62429;
    transform: scale(1.07);
  }
  &:active {
    transform: scale(0.97);
  }
`;
const PageButton = styled.button`
  background: #e62429;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ITEMS_PER_PAGE = 8;

const StorePage: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  // Estado para HQs mockadas
  const [comics, setComics] = useState<Comic[]>([]);
  // Estado para página atual
  const [page, setPage] = useState(1);
  // Gerar HQs mockadas apenas no client para evitar erro de hidratação
  useEffect(() => {
    // Busca HQs reais da Marvel, com fallback para mock se der erro
    fetchMarvelComics(30, 0)
      .then(setComics)
      .catch(() => setComics(markRandomRares(generateMockComics(30))));
  }, []);
  // Calcular HQs da página atual
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageComics = comics.slice(start, end);
  const totalPages = Math.ceil(comics.length / ITEMS_PER_PAGE);

  // Função para navegar para a página de detalhes ao clicar em uma HQ
  const handleCardClick = (id: number) => {
    router.push(`/hq/${id}`);
  };

  // Hook do Redux para disparar ações
  const dispatch = useDispatch();

  // Função para adicionar ao carrinho
  const handleAddToCart = (comic: Comic, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita navegação ao clicar no botão
    dispatch(addToCart(comic));
  };

  return (
    <>
      <Container>
        {/* Título da página */}
        <Title>Loja Marvel HQs</Title>
        {/* Grid de HQs */}
        <Grid>
          {pageComics.map((comic) => (
            <Card key={comic.id} onClick={() => handleCardClick(comic.id)}>
              <Img src={comic.thumbnail} alt={comic.title} />
              <h2>{comic.title}</h2>
              <p>{comic.description}</p>
              <strong>R$ {comic.price}</strong>
              {/* Badge de raro */}
              {comic.rare && <RareBadge>Raro</RareBadge>}
              {/* Botão para adicionar ao carrinho */}
              <AddButton onClick={e => handleAddToCart(comic, e)}>Adicionar ao Carrinho</AddButton>
            </Card>
          ))}
        </Grid>
        {/* Paginação */}
        <Pagination>
          <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
            Anterior
          </PageButton>
          <span>Página {page} de {totalPages}</span>
          <PageButton onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Próxima
          </PageButton>
        </Pagination>
      </Container>
      {/* Botão flutuante para abrir o carrinho, só aparece se houver itens */}
      {cartItems.length > 0 && !cartOpen && (
        <CartButton onClick={() => setCartOpen(true)} title="Abrir carrinho">
          🛒
        </CartButton>
      )}
      {/* Carrinho: só aparece se aberto OU se acabou de adicionar algo */}
      {(cartOpen || cartItems.length > 0) && (
        <Cart />
      )}
      {/* Botão para fechar o carrinho, só aparece se aberto */}
      {cartOpen && (
        <CartButton onClick={() => setCartOpen(false)} title="Fechar carrinho" style={{right: 100}}>
          ✖
        </CartButton>
      )}
    </>
  );
};

export default StorePage;
