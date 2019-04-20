import fetch from "node-fetch";
import { getById } from "./starWarsResource";

export function fetchDataWithCatch(id) {
  return function(dispatch) {
    return getById(id)
      .then(data => {
        dispatch({ type: "SUCCESS", payload: data });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
}

export function fetchData(id) {
  return function(dispatch) {
    return getById(id).then(
      data => {
        dispatch({ type: "SUCCESS", payload: data });
      },
      error => {
        dispatch({ type: "ERROR", payload: error });
      }
    );
  };
}
