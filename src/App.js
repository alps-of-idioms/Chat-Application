import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

/**
 * Задаём глобальные стили
 */
const GlobalStyle = createGlobalStyle`
#root {
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  color: aliceblue;
  box-sizing: border-box;
  }
  *,  *::before, *::after {
  box-sizing: inherit;
}
`;

const AppLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    151.09deg,
    #00b0de 0.36%,
    #01aedc 4.04%,
    #02abdb 7.77%,
    #02abdb 11.48%,
    #02abdb 11.7%,
    #196ebd 100%
  );
`;

function App() {
  return (
    <AppLayout>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/:roomid" component={Layout} />
        </Switch>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
