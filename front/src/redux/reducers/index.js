import { combineReducers } from "redux";
import moviesReducer from "../reducers/movies-reducer";
import movieReducer from "../reducers/movie-reducer";
import userReducer from "../reducers/user-reducer";
export default combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  user: userReducer,
});
