import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyle } from "./styled/global.styled";
import { App } from "./App";
export function Index() {
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App setIsDark={setIsDark} isDark={isDark} />
    </ThemeProvider>
  );
}
