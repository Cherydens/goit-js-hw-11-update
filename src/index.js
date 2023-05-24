import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchParams, pixabayApiService } from './js/pixabayApiService';
import { renderGallery, clearGallery } from './js/markup';
import './css/styles.css';

export { refs };

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

refs.searchForm.addEventListener('submit', onSubmit);

let totalPages = 0;

let options = {
  root: null,
  rootMargin: '1200px',
  threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);

async function onSubmit(evt) {
  evt.preventDefault();
  clearGallery();
  observer.unobserve(refs.guard);
  const formData = new FormData(evt.currentTarget);
  formData.forEach((value, key) => {
    searchParams[key] = value;
  });

  if (!searchParams.q) {
    Notify.warning(
      "Sorry, your search query can't be empty. Please try again."
    );
    return;
  }
  searchParams.page = 1;

  try {
    const data = await pixabayApiService(searchParams);

    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    totalPages = calculateTotalPages(data.totalHits, searchParams.per_page);
    renderGallery(data.hits);
    if (totalPages > searchParams.page) {
      observer.observe(refs.guard);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function handlerPagination(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      searchParams.page += 1;
      try {
        const data = await pixabayApiService(searchParams);
        renderGallery(data.hits);

        if (totalPages <= searchParams.page) {
          observer.unobserve(refs.guard);
          Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  });
}

function calculateTotalPages(totalHits, perPage) {
  return Math.ceil(totalHits / perPage);
}
