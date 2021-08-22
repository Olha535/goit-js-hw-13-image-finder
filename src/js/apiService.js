const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22909225-4bd408e854a1416d853656515';
const options = {
  header: {
    Authorization: KEY,
  },
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
    return fetch(url, options)
      .then(response => response.json())
      .then(({ hits }) => {
        console.log('hits', hits);
        this.incrementPage();

        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
