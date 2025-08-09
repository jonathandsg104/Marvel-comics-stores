import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background: #fafafa;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;