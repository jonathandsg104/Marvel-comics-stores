import { Provider } from "react-redux";
import { store } from "../store";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/global";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}