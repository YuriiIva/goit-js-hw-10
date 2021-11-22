import '../css/styles.css';
import debounce from 'lodash.debounce';

import notiflix from 'notiflix';
console.log(notiflix);
import fetchCountries from './services/api-services';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const createUsersMarkupLi = obj => {
  const markup = obj
    .map(({ name: { official } }) => `<li class="js-item"><p>${official}</p></li>`)
    .join('');
  refs.info.innerHTML = '';
  refs.list.innerHTML = markup;
};

const createMarkupList = dataList => {
  const markupList = dataList
    .map(({ name: { official }, capital, population, flags: { svg }, languages }) => {
      const languagesKey = Object.values(languages).join(',');
      return `<div class ="js-list">
        <div>
        <img src="${svg}" alt="flag" width="20" class ="js-img">
        </div>
        <h1>${official}</h1>
        </div>
<ul>
  <li class="js-item">Capital:<span class ="js-icon">${capital}</span></li>
  <li class="js-item">Population:<span class ="js-icon">${population}</span></li>
  <li class="js-item">Languages:<span class ="js-icon">${languagesKey}</span></li>
</ul>
`;
    })
    .join('');
  refs.list.innerHTML = '';
  refs.info.innerHTML = markupList;
};

const handleCountryInput = e => {
  const inputName = e.target.value.trim();

  fetchCountries(inputName)
    .then(data => {
      if (data.length > 10) {
        notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        return;
      }
      if (data.length < 10 && data.length > 1) {
        createUsersMarkupLi(data);
      }
      if (data.length === 1) {
        createMarkupList(data);
      } else {
        return false;
      }
    })
    .catch(err => {
      refs.info.innerHTML = '';
      refs.list.innerHTML = '';
      notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
};

refs.input.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));
