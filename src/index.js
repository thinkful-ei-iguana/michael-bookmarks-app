import $ from 'jquery';
import './index.css';
import handleFeatures from './handleFeatures';
import api from './api';
import store from './store';

const main = function(){
  api.getBookmarks()
    .then(bookmarks => {
      console.log(bookmarks);
      console.log(store.storeObj.bookmarks);
      store.storeObj.bookmarks = bookmarks;
      console.log(store.storeObj.bookmarks);
      handleFeatures.render();
    });
  handleFeatures.bindEventListeners();
  // handleFeatures.render();
};

$(main);