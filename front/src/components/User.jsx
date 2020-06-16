import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { autenticated: false, userId: null };
  }

  componentDidMount() {
    var respuesta;
    axios
      .get(`/users/isAutenticated`)
      .then(function (response) {
        // handle success
        console.log("La data del front es:", response);
        respuesta = response;
      })
      .then(() => {
        if (respuesta.status == 200) {
          this.setState({
            autenticated: true,
            userId: respuesta.data.data.user,
          });
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.autenticated ? (
          <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
            <a className="navbar-brand">OMDB</a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>

                <Link
                  className="nav-item nav-link"
                  to={`/user/${this.state.userId}`}
                >
                  My profile
                </Link>
              </div>
            </div>
          </nav>
        ) : (
          <div>
            <a href="/users/login">
              <p>Login</p>
            </a>
            <a href="/users/register">
              <p>Register</p>
            </a>
          </div>
        )}
      </div>
    );
  }
}
export default NavBar;
