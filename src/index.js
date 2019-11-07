import $ from 'jquery';
import './index.css';
import handleFeatures from './handlefeatures';
import api from './api';
import store from './store';

const main = function(){
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      handleFeatures.render();
    });
  handleFeatures.bindEventListeners();
  handleFeatures.render();
};


$(main);