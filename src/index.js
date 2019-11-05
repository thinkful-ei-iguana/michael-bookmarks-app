import $ from 'jquery';
import './index.css';
import handleFeatures from './handleFeatures';
import api from './api';

const main = function(){
  api.getBookmarks()
    .then(bookmarks => {
      console.log(bookmarks);
    });
  handleFeatures.bindEventListeners();
};

$(main);