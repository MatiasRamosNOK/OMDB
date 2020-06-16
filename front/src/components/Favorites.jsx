import React from "react";
import axios from "axios";
class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { autenticated: false, favourite: false };
  }

  addToFavorite(id) {
    var respuesta;
    axios
      .get(`/users/addMovie/${id}`)
      .then(function (response) {
        // handle success
        respuesta = response;
      })
      .then(() => {
        if (respuesta.status == 201) {
          this.setState({ favourite: true });
        }
      });
  }

  componentDidMount() {
    var respuesta;
    axios
      .get(`/users/isAutenticated`)
      .then(function (response) {
        // handle success
        respuesta = response;
      })
      .then(() => {
        if (respuesta.status == 200) {
          this.setState({ autenticated: true });
        }
      });
  }

  render() {
    return (
      <div>
        <br />

        {this.state.favourite ? (
          <button type="button" class="btn btn-success">
            Success
          </button>
        ) : this.state.autenticated ? (
          <button
            type="button"
            class="btn btn-outline-warning"
            onClick={() => {
              this.addToFavorite(this.props.id);
            }}
          >
            Agregar a favoritos
          </button>
        ) : (
          <a href="/users/login">
            <button type="button" className="btn btn-danger">
              No te logeaste
            </button>
          </a>
        )}

        <br />
      </div>
    );
  }
}

export default Favorites;
