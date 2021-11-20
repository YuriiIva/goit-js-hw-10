import './css/styles.css';
import lodash from 'lodash.debounce';
import notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com';
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};
const getCountry = () => {
  fetch('${BASE_URL}/v3.1/name').then(response => response.json());
};

// const handleCountryInput = () => {
//   const createList = () => '<li><a href=""></a></li>';
// };
// refs.input.addEventListener('input', handleCountryInput);
