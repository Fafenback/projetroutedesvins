
import React, { Component } from "react";
import { Provider } from "unstated";
import { NewRoute } from "../routes";
import { routes } from "../constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider>

        {routes.map((elt, i) => (<NewRoute
          key={i}
          subscribe={elt.container}
          component={elt.component}
          exact
          path={elt.path} />))}
      </Provider>

    );
  }
}

export default App;
