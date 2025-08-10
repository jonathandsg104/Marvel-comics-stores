export { default } from "./home";
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

  // Hook do Next.js para navegação
  // const router = useRouter(); // Removido duplicado

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
        export { default } from "./home";
          Próxima
