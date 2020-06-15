import React from "react";
import store from "../redux/store";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions/movies";
import SingleMovie from "../components/SingleMovie";
import User from "../components/User";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  changeHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
    store.dispatch(fetchMovies(e.target.value));
  }

  componentDidUpdate(prevState) {}

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
        <User />
        <h1>Hola!, ¿Que deseas buscar?</h1>
        <form>
          <input
            type="text"
            onChange={(e) => {
              this.changeHandler(e);
            }}
          />
        </form>
        <div>
          <ul>
            {this.state.movies.Search.Response == "True"
              ? this.state.movies.Search.Search.map((movie) => {
                  return (
                    <li key={movie.imdbID}>
                      <Link to={`/movie/${movie.imdbID}`}>
                        <div className="contenedorMovie">
                          <div className="infoMovie">
                            <h2>{movie.Title}</h2>
                            {console.log(movie)}
                            {movie.Poster != "N/A" ? (
                              <img src={movie.Poster} alt="image" />
                            ) : (
                              <p>Image not found</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })
              : console.log(
                  "Entro al null con:",
                  this.state.movies.Search.Search
                )}
          </ul>
        </div>
      </div>
    );
  }
}
export default Main;
