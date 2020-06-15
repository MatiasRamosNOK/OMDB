import axios from "axios";
import { RECEIVE_MOVIES } from "../constants";

const receiveMovies = function (movies) {
  return {
    type: RECEIVE_MOVIES,
    movies: movies,
  };
};

export const fetchMovies = function (name) {
  console.log("AXIOS NAME: ", name);
  return function (dispatch, getState) {
    axios
      .get(`https://www.omdbapi.com/?apikey=20dac387&s=${name}`)
      .then((res) => {
        console.log("AXIOS:", res.data);
        dispatch(receiveMovies(res.data));
      });
  };
};
