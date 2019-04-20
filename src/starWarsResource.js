export const getById = async () => {
  try {
    await fetch(`https://swapi.co/api/people/${id}`, {
      method: "GET"
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Something went wrong!", e);
  }
};
