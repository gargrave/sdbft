/* eslint-disable no-console */
import {MOCK_API_DELAY} from '../../constants/env';


let id = 0;
const ENTRIES = [
  {
  }
];

class ArticlesApi {
  static fetchArticles() {
    console.log('LOG: using mock articles API -> fetchFriends().');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({articles: Object.assign([], ENTRIES)});
      }, MOCK_API_DELAY);
    });
  }

  static createArticles(data) {
    console.log('LOG: using mock articles API -> createFriend().');
    let article = data.article;
    return new Promise((resolve) => {
      setTimeout(() => {
        article.id = id++;
        ENTRIES.push(article);
        resolve({article: Object.assign([], article)});
      }, MOCK_API_DELAY);
    });
  }
}

export default ArticlesApi;
