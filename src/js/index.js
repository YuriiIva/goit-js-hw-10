import '../css/styles.css';
import lodash from 'lodash.debounce';
import notiflix from 'notiflix';
import fetchCountries from './services/api-services';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

// fetchCountries().then(users => createUsersMarkupLi(users));

const createUsersMarkupLi = obj => {
  const markup = obj.map(({ name }) => '<l><p>${name.official}</p></l>').jone('');
  console.log(markup);
  refs.list.innerHTML = markup;
};

const handleCountryInput = e => {
  const inputName = e.currentTarget.value;

  fetchCountries(inputName)
    .then(createUsersMarkupLi)
    .catch(err => {
      alert(`Oops, there is no country with that name`);
    });
};

refs.input.addEventListener('input', handleCountryInput);
