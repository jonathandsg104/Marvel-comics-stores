import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, setQuantity, clearCart } from "../stores/slices/cartSlice";
// Tipos de cupom
type CouponType = 'comum' | 'raro';

// Mock de cupons válidos
const COUPONS = [
  { code: 'DESCONTO10', type: 'comum', discount: 0.1 }, // 10% para comuns
  { code: 'RARO20', type: 'raro', discount: 0.2 },      // 20% para raros
];

// Styled Components para o carrinho
const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0,0,0,0.08);
  padding: 2rem 1rem 1rem 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateX(40px);
  animation: cartFadeIn 0.7s cubic-bezier(.4,1.3,.6,1) forwards;
  @media (max-width: 900px) {
    width: 100vw;
    left: 0;
    right: 0;
    height: 60vh;
    bottom: 0;
    top: auto;
    border-radius: 16px 16px 0 0;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    font-size: 0.97rem;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.10);
    transform: translateY(40px);
    animation: cartFadeInMobile 0.7s cubic-bezier(.4,1.3,.6,1) forwards;
  }
  @keyframes cartFadeIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes cartFadeInMobile {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const CartTitle = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;
const CartList = styled.ul`
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  @media (max-width: 600px) {
    max-height: 30vh;
  }
`;
const CartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 0.97rem;
    padding-bottom: 0.7rem;
  }
`;
const Img = styled.img`
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
  @media (max-width: 600px) {
    width: 40px;
    height: 60px;
    margin-right: 0.5rem;
  }
`;
const RemoveBtn = styled.button`
  background: #e62429;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  margin-left: auto;
  cursor: pointer;
`;
const QuantityInput = styled.input`
  width: 40px;
  margin: 0 0.5rem;
  text-align: center;
`;
const Total = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 1rem 0;
  text-align: right;
`;
const ClearBtn = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
`;

// Componente visual do carrinho
// Comentários explicativos em cada parte do código
const Cart: React.FC = () => {
  // Estado do cupom digitado e cupom aplicado
  const [couponInput, setCouponInput] = React.useState('');
  const [appliedCoupon, setAppliedCoupon] = React.useState<null | typeof COUPONS[0]>(null);
  // Seleciona os itens do carrinho do estado global
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Calcula o valor total do carrinho
  const total = items.reduce((sum, item) => sum + item.comic.price * item.quantity, 0);

  // Calcula desconto conforme cupom aplicado
  let discount = 0;
  if (appliedCoupon) {
    // Se cupom comum, aplica só em HQs comuns; se raro, só em raras
    discount = items.reduce((sum, item) => {
      const isRaro = item.comic.rare;
      if (
        (appliedCoupon.type === 'comum' && !isRaro) ||
        (appliedCoupon.type === 'raro' && isRaro)
      ) {
        return sum + item.comic.price * item.quantity * appliedCoupon.discount;
      }
      return sum;
    }, 0);
  }
  const totalWithDiscount = total - discount;

  return (
    <CartContainer>
      <CartTitle>Carrinho</CartTitle>
      {/* Campo para inserir cupom */}
      <form
        onSubmit={e => {
          e.preventDefault();
          // Busca cupom válido
          const found = COUPONS.find(c => c.code === couponInput.trim().toUpperCase());
          if (found) {
            setAppliedCoupon(found);
          } else {
            setAppliedCoupon(null);
            alert('Cupom inválido!');
          }
        }}
        style={{ marginBottom: 16 }}
      >
        <input
          type="text"
          placeholder="Cupom de desconto"
          value={couponInput}
          onChange={e => setCouponInput(e.target.value)}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 }}
        />
        <button type="submit" style={{ padding: '6px 16px', borderRadius: 4, background: '#e62429', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Aplicar
        </button>
        {appliedCoupon && (
          <button type="button" onClick={() => setAppliedCoupon(null)} style={{ marginLeft: 8, background: '#222', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}>
            Remover Cupom
          </button>
        )}
      </form>
      <CartList>
        {items.length === 0 && <li>Seu carrinho está vazio.</li>}
        {items.map((item) => (
          <CartItem key={item.comic.id}>
            <Img src={item.comic.thumbnail} alt={item.comic.title} />
            <div>
              <div>{item.comic.title}</div>
              <div>R$ {item.comic.price}</div>
              <div>
                {/* Input para alterar quantidade */}
                <label>Qtd:</label>
                <QuantityInput
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => dispatch(setQuantity({ id: item.comic.id, quantity: Number(e.target.value) }))}
                />
              </div>
              {/* Badge de raro/comum para facilitar visualização do cupom */}
              <div style={{ fontSize: 12, marginTop: 2 }}>
                {item.comic.rare ? 'Raro' : 'Comum'}
              </div>
            </div>
            {/* Botão para remover item */}
            <RemoveBtn onClick={() => dispatch(removeFromCart(item.comic.id))}>Remover</RemoveBtn>
          </CartItem>
        ))}
      </CartList>
      {/* Exibe desconto se houver cupom */}
      {appliedCoupon && (
        <div style={{ color: '#e62429', fontWeight: 'bold', textAlign: 'right', marginTop: 8 }}>
          Cupom aplicado: {appliedCoupon.code} (-{Math.round(appliedCoupon.discount * 100)}% {appliedCoupon.type === 'comum' ? 'comum' : 'raro'})<br />
          Desconto: -R$ {discount.toFixed(2)}
        </div>
      )}
      <Total>Total: R$ {totalWithDiscount.toFixed(2)}</Total>
      {/* Botão para limpar carrinho */}
      <ClearBtn onClick={() => dispatch(clearCart())}>Limpar Carrinho</ClearBtn>
    </CartContainer>
  );
};

export default Cart;
