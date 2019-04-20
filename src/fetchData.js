import fetch from "node-fetch";
import { getById } from "./starWarsResource";

export function fetchDataWithCatch(id) {
  return function(dispatch) {
    return getById(id)
      .then(data => {
        return dispatch({ type: "SUCCESS", payload: data });
      })
      .catch(error => {
        return dispatch({ type: "ERROR", payload: error });
      });
  };
}
