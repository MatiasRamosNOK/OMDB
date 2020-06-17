import axios from "axios";
import { USER_DATA_ONE } from "../constants";
const fetch = require("node-fetch");
const receiveUserOne = function (userOne) {
  return {
    type: USER_DATA_ONE,
    userOne: userOne,
  };
};

export const fetchUserOne = function (id) {
  return function (dispatch, getState) {
    var dataUser = new Object();
    dataUser.moviesData = [];
    var arrayPeliculas = [];
    axios.get(`/users/getOne/${id}`).then((res) => {
      dataUser = res.data;
      arrayPeliculas = res.data.moviesID;
      let peliculas = await Promise.all(
        arrayPeliculas.map(async movie =>{
          let movieResponse = await fetch(`http://omdbapi.com/?apikey=20dac387&i=${movie}`)
          return movieResponse.json()
        })
      );

      console.log("Las peliculas son:",peliculas);
      arrayPeliculas.map((movie, index) => {
        axios
          .get(`http://omdbapi.com/?apikey=20dac387&i=${movie}`)
          .then((res) => {
            arrayPeliculas[index] = res.data;
          });
      });
      setTimeout(function () {
        dataUser.moviesData = arrayPeliculas;
        dispatch(receiveUserOne(dataUser));
      }, 3000);
    });
  };
};
