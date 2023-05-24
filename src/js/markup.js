import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from '../index';

export { renderGallery, clearGallery };

function markupGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                  <a class="gallery__link" href="${largeImageURL}">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                  </a>

                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>
                      ${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b>
                      ${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b>
                      ${comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b>
                      ${downloads}
                    </p>
                  </div>
                </div>`;
      }
    )
    .join('');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function renderGallery(images) {
  refs.gallery.insertAdjacentHTML('beforeend', markupGallery(images));
  new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  }).refresh();
}
