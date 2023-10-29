import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 99.1vw;
    max-height: 100vh;
    background-color: #white;
    font-family: Arial, Helvetica, sans-serif
  }
`;

export default GlobalStyle;
