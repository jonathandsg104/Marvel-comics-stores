import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { generateMockComics, markRandomRares, Comic } from "../utils/sample-data";

// Styled Components para a grid de HQs e paginação
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
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
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(230,36,41,0.15);
    transform: translateY(-2px);
  }
`;
const Img = styled.img`
  width: 100%;
  max-width: 180px;
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
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
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

// Página inicial: listagem paginada de HQs
// Comentários explicativos em cada parte do código
const ITEMS_PER_PAGE = 8;


const HomePage: React.FC = () => {
  // Gerar HQs mockadas e marcar 10% como raras
  const comics = useMemo(() => markRandomRares(generateMockComics(30)), []);
  // Estado para página atual
  const [page, setPage] = useState(1);
  // Calcular HQs da página atual
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageComics = comics.slice(start, end);
  const totalPages = Math.ceil(comics.length / ITEMS_PER_PAGE);

  // Hook do Next.js para navegação
  const router = useRouter();

  // Função para navegar para a página de detalhes ao clicar em uma HQ
  const handleCardClick = (id: number) => {
    router.push(`/hq/${id}`);
  };

  return (
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
  );
};

export default HomePage;
