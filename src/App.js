import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layout";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/:roomid" component={Layout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
