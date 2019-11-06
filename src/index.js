import $ from 'jquery';
import './index.css';
import handleFeatures from './handleFeatures';
import api from './api';
import store from './store';

const main = function(){
  api.getBookmarks()
    .then((bookmarks) => {
      console.log(bookmarks);
      // console.log(bookmarks);
      // store.storeObj.bookmarks = bookmarks;
      //.then((bookmarks)) =>{
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      handleFeatures.render();
    });
  //   console.log(store.storeObj);
  //   handleFeatures.render();
  // };
  handleFeatures.bindEventListeners();
  handleFeatures.render();
};


$(main);