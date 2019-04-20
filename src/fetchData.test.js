import { fetchDataWithCatch } from "./fetchData";
import { getById } from "./starWarsResource";
import data from "./data";

jest.mock("./starWarsResource");

test("fetchData can dispatch success", async () => {
  getById.mockResolvedValue(data);
  const dispatch = jest.fn();

  const result = await fetchDataWithCatch(1)(dispatch);

  //console.log(dispatch.mock.calls[0][0])

  expect(dispatch).toHaveBeenCalledWith({ type: "SUCCESS", payload: data });
});

test("fetchData can dispatch error", async () => {
  getById.mockRejectedValue({ error: "Didn't work" });
  const dispatch = jest.fn();

  const result = await fetchDataWithCatch(1)(dispatch);

  //console.log(dispatch.mock.calls[0][0])

  expect(dispatch).toHaveBeenCalledWith({
    type: "ERROR",
    payload: { error: "Didn't work" }
  });
});

test("fetchData will dispatch error", async () => {
  getById.mockResolvedValue(data);
  //const dispatch = jest.fn(() => Promise.reject("Something bad happened during the render"))
  const dispatch = jest.fn(() => {
    throw { error: "Something bad happened during the render" };
  });

  try {
    const result = await fetchDataWithCatch(1)(dispatch);
  } catch (e) {
    console.log(e);
  }

  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenCalledWith({ type: "SUCCESS", payload: data });
  expect(dispatch).toHaveBeenCalledWith({
    type: "ERROR",
    payload: { error: "Something bad happened during the render" }
  });
});
