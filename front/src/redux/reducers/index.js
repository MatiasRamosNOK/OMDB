import { combineReducers } from "redux";
import moviesReducer from "../reducers/movies-reducer";
import movieReducer from "../reducers/movie-reducer";
export default combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
});
