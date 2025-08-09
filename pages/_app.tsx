
import { Provider } from "react-redux";
import { store } from "../store";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/global";
import Cart from "../components/Cart";


// Componente global do app: Provider Redux, estilos globais e carrinho fixo
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      {/* Carrinho fixo à direita em todas as páginas */}
      <Cart />
      <Component {...pageProps} />
    </Provider>
  );
}