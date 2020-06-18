import React from "react";
import axios from "axios";
import store from "../redux/store";
import { addFavorite } from "../redux/actions/addFavorite";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  addToFavorite() {
    var idUser = this.state.user.user.id;
    var idMovie = this.state.movie.movie.imdbID;
    store.dispatch(addFavorite(idUser, idMovie));
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
      <div>
        {this.state.user.user != "" ? (
          <div>
            {this.state.user.user.moviesID.includes(
              this.state.movie.movie.imdbID
            ) ? (
              <button type="button" class="btn btn-success">
                Success
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-outline-warning"
                onClick={() => {
                  this.addToFavorite(this.props.id);
                }}
              >
                Agregar a favoritos
              </button>
            )}
          </div>
        ) : (
          <a href="/users/login">
            <button type="button" className="btn btn-danger">
              No te logeaste
            </button>
          </a>
        )}
      </div>
    );
  }
}

export default Favorites;
