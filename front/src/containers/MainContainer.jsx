import React from "react";
import Main from "../components/Main";
import store from "../redux/store";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { fetchMovies } from "../redux/actions/movies";

import SingleMovie from "../components/SingleMovie";
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Main data={this.state.data} />}
        ></Route>

        <Route
          path="/movie/:id"
          render={({ match }) => (
            <SingleMovie data={this.state.data} match={match.params.id} />
          )}
        ></Route>
      </Switch>
    );
  }
}

export default MainContainer;
