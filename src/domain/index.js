import * as axios from "axios";

let URLs= ["https://swapi.dev/api/films/", "https://swapi.dev/api/people/", "https://swapi.dev/api/planets/", "https://swapi.dev/api/species/", "https://swapi.dev/api/starships/", "https://swapi.dev/api/vehicles/" ]

export const fetchData = async (input) => {
  try {
    const response = await Promise.all(
      URLs.map(url => axios.get(url + `?search=` + input).then(res => res.data))
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};


