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
      <label for="newBookmarkTitle">New Bookmark:</label>
      <input name="title" id="newBookmarkTitle">
      <label for="newBookmarkURL">URL:</label>
      <input name="url" id="newBookmarkURL">
      <select id="newBookmarkRating" name="rating">
        <option value="">Rating</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <label for="urlDescription">Description:</label>
      <input name="desc" id="urlDescription">
      <div class="formButtons">
        <button type="submit">Cancel</button>
        <button id="confirmAdd" type="submit">Add</button>
      </div>
    </form>
  `);
};

//serialize form data function
$.fn.extend({
  serializeJson: function(){
    const formData = new FormData(this[0]);
    const obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return JSON.stringify(obj);
  }
});

const handleNewBookmarkSubmit = function(e){
  $(e.target).serializeJson();
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

//generate bookmark element
const generateBookmark = function(){

};

//generic render function
const render = function(){
  
};


export default {
  bindEventListeners,
  render,
  renderNewBookmarkForm
};