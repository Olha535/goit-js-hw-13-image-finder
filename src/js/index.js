import cardsImages from '../templates/cards-img.hbs';
import getRefs from './get-refs';
import NewsApiService from './apiService';

const { searchForm, articlesContainer, loadMore } = getRefs();
const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  newsApiService.query = evt.currentTarget.element.query.value;
  console.log(newsApiService);

  newsApiService.resetPage();
  newsApiService.fetchArticles().then(articles => {
    clearArticlesContainer();
    appendArticlesMarkup(articles);
  });
}

function onLoadMore() {
  newsApiService.fetchArticles(searchQuery).then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
  articlesContainer.insertAdjacentHTML('beforeend', cardsImages(articles));
}

function clearArticlesContainer() {
  articlesContainer.innerHTML = '';
}
