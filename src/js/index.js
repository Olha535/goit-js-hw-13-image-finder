import cardsImages from '../templates/cards-img.hbs';
import NewsApiService from './apiService';
//import LoadMoreBtn from './load-more-btn';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import { pnotifyInfo, pnotifyError, pnotifyNotice } from './pnotify';
//import bigModalImage from './basicLightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  articlesContainer: document.querySelector('.gallery'),
  //loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  sentinel: document.querySelector('#sentinel'),
};

const newsApiService = new NewsApiService();
//const loadMoreBtn = new LoadMoreBtn({
// selector: '[data-action="load-more"]',
//  hidden: true,
//});

refs.searchForm.addEventListener('submit', onSearch);
//loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
//refs.articlesContainer.addEventListener('click', onModal);

function onSearch(evt) {
  evt.preventDefault();

  newsApiService.query = evt.currentTarget.elements.query.value;
  if (evt.currentTarget.elements.query.value.trim() === '') {
    pnotifyNotice();
    return;
  }

  evt.currentTarget.elements.query.value = '';
  //loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    pnotifyInfo();
    newsApiService.incrementPage();
  });
}

//function fetchArticles() {
//loadMoreBtn.disable();
//newsApiService.fetchArticles().then(articles => {
//  appendArticlesMarkup(articles);
//loadMoreBtn.enable();
// refs.loadMoreBtn.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
//  });

//function onLoadMore() {
//fetchArticles();

//}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', cardsImages(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newsApiService.query !== '') {
      newsApiService
        .fetchArticles()
        .then(articles => {
          appendArticlesMarkup(articles);
          newsApiService.incrementPage();
        })
        .catch(pnotifyError);
    }
  });
};

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);
