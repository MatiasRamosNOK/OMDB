import axios from "axios";
import { USER_DATA_ONE } from "../constants";

const receiveUserOne = function (userOne) {
  return {
    type: USER_DATA_ONE,
    userOne: userOne,
  };
};

export const fetchUserOne = function (id) {
  return function (dispatch, getState) {
    axios.get(`/users/getOne/${id}`).then((res) => {
      dispatch(receiveUserOne(res.data));
    });
  };
};
