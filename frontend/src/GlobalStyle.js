import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    body {
        margin: 0;
        font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        color: #e7e7e7;
        overflow: hidden;
        min-height: 100vh;
    }

`

export default GlobalStyle