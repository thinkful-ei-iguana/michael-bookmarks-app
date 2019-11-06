import $ from 'jquery';
import api from './api';
import store from './store';
import cuid from 'cuid';


//read filter setting
const filterSetting = function(){
  $('.filterRating').on('submit', function(event){
    event.preventDefault;
    let newRating = $('#filter').val();
    console.log(newRating);
  });
};

//inserts form html when form button is pressed.
const addNewBookmark = function(){
  $('#newBookmark').on('click', function(event){
    event.preventDefault();
    console.log('I heard the new bookmark button get pressed');
    renderNewBookmarkForm();
    //need to add button disable functionality
  });
};

//new bookmark form html
const renderNewBookmarkForm = function(){
  $('.newBookmarkFormArea').html(`
    <form name="newBookmarkForm" id="newBookmarkForm">
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
// $.fn.extend({
//   serializeJson: function(){
//     const formData = new FormData(this[0]);
//     const obj = {};
//     formData.forEach((val, name) => obj[name] = val);
//     return JSON.stringify(obj);
//   }
// });

const serializeJson = function() {
  // const formData = new FormData(form);
  // console.log(formData);
  // const o = {};
  // formData.forEach((val, name) => o[name] = val);
  // return JSON.stringify(o);
  return {
    "title": $('#newBookmarkTitle').val(),
    "desc": $('#urlDescription').val(),
    "url": $('#newBookmarkURL').val(),
    "id": cuid(),
    "rating": $('#newBookmarkRating').val(),
  };
};

// $('#newBookmarkForm').submit(event =>{
//   event.preventDefault();
//   console.log('h');
//   let formElement = $('newBookmarkForm')[0];
//   console.log(serializeJson(formElement));
// });

// const handleNewBookmarkSubmit = function(event){
//   $(event.target).serializeJson();
// };
  
//handles confirm of bookmark by removing form html
const confirmAdd = function(){
  $('.newBookmarkFormArea').on('click', '#confirmAdd', function(event){
    event.preventDefault();
    const newSubmit = serializeJson();
    api.createBookmark(newSubmit);
  });
};

//add a bookmark to the api from t 
const addBookmark = function(newDataObject){
  // take form input object that was created and send
  //JSONified version via POST method.
  api.createBookmark(newDataObject);
};


//handles the feature rating reads value

//event listeners
const bindEventListeners = function () {
  addNewBookmark();
  confirmAdd();
  deletePress();
  filterSetting();
};

//generate bookmark element
const generateBookmark = function(){

};

//generic render function
const render = function(){
  store.storeObj.bookmarks.forEach(function(item){
    $('.listArea').append(`
      <div class="currentBookmark" id="${item.id}">
        <h3>${item.title}</h3>
        <a href="${item.url}" target="_blank">Visit Site</a>
        <div>${item.rating}</div>
        <p>${item.desc}</p>
        <button id="delete">Delete</button>
      </div>
    `);  
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.currentBookmark')
    .attr('id');
};

const deletePress = function(){
  $('.listArea').on('click','#delete', function(event){
    let id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    api.deleteBookmark(id);
    // storeUpdate();    
  });
};


export default {
  bindEventListeners,
  render,
  addBookmark,
  renderNewBookmarkForm,
};