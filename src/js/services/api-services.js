const BASE_URL = 'https://restcountries.com';

const fetchCountries = name => {
  return fetch(`${BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        return Promise.reject(new Error(error));
        // throw new Error(error);
      }
      return response.json();
    },
  );
};

export default fetchCountries;
