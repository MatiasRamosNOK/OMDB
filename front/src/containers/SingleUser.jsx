import React from "react";
import axios from "axios";
import MovieHomeUser from "../components/MovieHomeUser";
class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match,
      data: { movies: [] },
    };
  }

  componentDidMount() {
    var resp;
    axios
      .get(`/users/${this.state.id}`)
      .then(function (respuesta) {
        resp = respuesta;
      })
      .then(() => {
        console.log("RESP:", resp);
        this.setState({ data: resp.data });
      });
  }
  render() {
    {
      var obj = this.state.data;
    }
    return (
      <div>
        <h1>Bienvenido</h1>
        {obj ? (
          <div>
            <h2>{obj.email}</h2>
            <br />
            <p>Estas son las peliculas que te gustan: </p>
            {obj.movies.map((movie, index) => {
              console.log("INDEX:", index);
              if (index != 0) {
                return (
                  <div className="contPeliUser">
                    <MovieHomeUser
                      match={movie}
                      key={movie}
                      idUser={this.state.id}
                    />{" "}
                    <br />
                  </div>
                );
              }
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default SingleUser;
