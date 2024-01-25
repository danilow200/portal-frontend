import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/globals";
import type { AppProps } from "next/app";
import { theme } from "../styles/Theme";

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
