// Importando 'ThemeProvider' de 'styled-components'. Este componente fornece um tema para todos os componentes abaixo dele na árvore de componentes.
import { ThemeProvider } from "styled-components";

// Importando 'GlobalStyles' que provavelmente contém estilos globais para a aplicação.
import { GlobalStyles } from "../styles/globals";

// Importando o tipo 'AppProps' do pacote 'next/app'. Este tipo é usado para tipar as propriedades do componente App.
import type { AppProps } from "next/app";

// Importando o tema definido em '../styles/Theme'.
import { theme } from "../styles/Theme";

// Definindo o componente App que é o componente de nível superior em uma aplicação Next.js.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
