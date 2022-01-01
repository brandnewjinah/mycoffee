import { createGlobalStyle } from "styled-components";
import { black } from "./Colors";

const GlobalStyle = createGlobalStyle`


 * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html {
        width: 100%;
        height: 100%;
    }
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: white;
        font-size: 1rem;
        line-height: 1.875rem;
        font-weight: 400;
        color: ${black.dark}
    }
    a {
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: inherit;
        cursor: pointer;
        transition: opacity 0.2s ease-in-out;
 
        &:hover,
        &:focus {
          outline: 0;
          opacity: 0.75;
        }
    }
    code {
        font-size: 1.125rem;
        background-color: #edf2f7;
        padding: 0 .5rem;
    }
  
`;

export default GlobalStyle;
