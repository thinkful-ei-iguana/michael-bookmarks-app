import $ from 'jquery';
import api from './api';

//inserts form html when form button is pressed.
const addNewBookmark = function(){
  $('#newBookmark').on('click', function(event){
    event.preventDefault();
    console.log('I heard the new bookmark button get pressed');
    renderNewBookmarkForm();
  });
};

//new bookmark form html
const renderNewBookmarkForm = function(){
  $('.newBookmarkFormArea').html(`
    <form class="newBookmarkForm">
      <label for="newBookmarkURL">Add a New Bookmark</label>
      <input name="newBookmarkURL" id="newBookmarkURL">
      <button type="submit">Cancel</button>
      <button id="confirmAdd" type="submit">Add</button>
    </form>
  `);
};

//handles confirm of bookmark by removing form html
const confirmAdd = function(){
  $('#confirmAdd').on('click', function(event){
    event.preventDefault();
    console.log('Heard you want to add this bookmark');
  });
};

//handles the feature rating reads value

//event listeners
const bindEventListeners = function () {
  addNewBookmark();
  confirmAdd();
};

//generic render function
const render = function(){
  
};


export default {
  bindEventListeners,
  render
};