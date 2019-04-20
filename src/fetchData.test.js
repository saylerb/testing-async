import { fetchDataWithCatch, fetchData, somethingElse } from "./fetchData";
import { getById } from "./starWarsResource";
import data from "./data";

jest.mock("./starWarsResource");

describe("fetchDataWithCatch", () => {
  test("fetchData can dispatch success", async () => {
    getById.mockResolvedValue(data);
    const dispatch = jest.fn();

    const result = await fetchDataWithCatch(1)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: "SUCCESS", payload: data });
  });

  test("fetchData can dispatch error", async () => {
    getById.mockRejectedValue({ error: "Didn't work" });
    const dispatch = jest.fn();

    const result = await fetchDataWithCatch(1)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR",
      payload: { error: "Didn't work" }
    });
  });

  test("fetchData will dispatch error when dispatch throws error", async () => {
    getById.mockResolvedValue(data);
    const dispatch = jest
      .fn()
      .mockImplementationOnce(() => {
        throw { error: "Something bad happened during the render" };
      })
      .mockImplementationOnce(() => {});

    const result = await fetchDataWithCatch(1)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: "SUCCESS", payload: data });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR",
      payload: { error: "Something bad happened during the render" }
    });
  });
});

describe("fetchData", () => {
  test("fetchData will NOT a second dispatch error when first dispatch throws error", async () => {
    getById.mockResolvedValue(data);

    const dispatch = jest
      .fn()
      .mockImplementationOnce(() => {
        throw { error: "Something bad happened during the render" };
      })
      .mockImplementationOnce(() => {});

    // no catch block so we need to catch the error inside the test runner
    try {
      const result = await fetchData(1)(dispatch);
    } catch (e) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: "SUCCESS", payload: data });
      expect(dispatch).not.toHaveBeenCalledWith({
        type: "ERROR",
        payload: { error: "Something bad happened during the render" }
      });
    }
  });
});
