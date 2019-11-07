import $ from 'jquery';
import './index.css';
import handleFeatures from './handlefeatures';
import api from './api';
import store from './store';

const main = function(){
  api.getBookmarks()
    .then((bookmarks) => {
      // console.log(bookmarks);
      // store.storeObj.bookmarks = bookmarks;
      //.then((bookmarks)) =>{
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      console.log(store.storeObj);
      handleFeatures.render();
    });
  //   console.log(store.storeObj);
  //   handleFeatures.render();
  // };
  handleFeatures.bindEventListeners();
  handleFeatures.render();
};


$(main);