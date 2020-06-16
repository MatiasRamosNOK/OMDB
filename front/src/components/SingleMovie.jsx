import React from "react";
import { Link } from "react-router-dom";
import store from "../redux/store";
import { fetchMovie } from "../redux/actions/movie";
import axios from "axios";
import Favorites from "../components/Favorites";
var obj;
class SingleMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(fetchMovie(this.props.match));
  }
  componentWillUnmount() {
    this.unsubscribe();
    store.dispatch(fetchMovie(""));
  }

  render() {
    {
      obj = this.state.movie.movie;
    }
    return (
      <div>
        {obj.Response == "True" ? (
          <div>
            <h2>{obj.Title}</h2>{" "}
            {obj.Poster != "N/A" ? (
              <img src={obj.Poster} alt="Image" />
            ) : (
              <p>Image not found</p>
            )}
            <Favorites id={obj.imdbID} />
            <br />
            <p>Year: {obj.Year}</p>
            <p>Release: {obj.Release}</p>
            <p>Runtime: {obj.Runtime}</p>
            <p>Genre: {obj.Genre}</p>
            <p>Director: {obj.Director}</p>
            <p>Writer: {obj.Writer}</p>
            <p>Actors: {obj.Actors}</p>
            <p>Country: {obj.Country}</p>
            <p>Awards: {obj.Awards}</p>
            <p>imdbRating: {obj.imdbRating}</p>
            <p>imdbVotes: {obj.imdbVotes}</p>
          </div>
        ) : (
          <p>Cargando contenido...</p>
        )}
      </div>
    );
  }
}
export default SingleMovie;
