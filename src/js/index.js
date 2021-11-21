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

// fetchCountries().then(users => createUsersMarkupLi(users));

const createUsersMarkupLi = obj => {
  const markup = obj.map(({ name: { official } }) => `<li><p>${official}</p></li>`).join('');
  console.log(markup);
  refs.list.innerHTML = markup;
};

const handleCountryInput = e => {
  const inputName = e.target.value.trim();
  // console.log(inputName);

  fetchCountries(inputName)
    .then(data => {
      if (data.length > 10) {
        alert(`Oops,more 10`);
        return;
      }
      createUsersMarkupLi(data);
    })
    .catch(err => {
      notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
};
// const debounce_fun = _.debounce(function () {
//   console.log('Function debounced after 1000ms!');
// }, 1000);

refs.input.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));
