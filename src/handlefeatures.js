import $ from 'jquery';
import api from './api';
import store from './store';
import cuid from 'cuid';

//////// HTML ELEMENTS ///////

//new bookmark form html
const renderNewBookmarkForm = function(){
  return `
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
  `;
};

const renderAddButton = function(){
  return `
    <button type="button" id="newBookmark">Add New Bookmark</button>
  `;
};

const renderAddForm = function(){
  console.log(store.storeObj.adding);
  if (store.storeObj.adding === false){
    $('.headerNav').html(renderAddButton());
  } else if(store.storeObj.adding === true){
    $('.newBookmarkFormArea').html(renderNewBookmarkForm());
  }
};

//generic render function
const renderBookmark = function(bookmark){
  if(!store.storeObj.expanded){
    return `
        <div class="currentBookmark">
          <div class="condensed" id="${bookmark.id}">
            <div>${bookmark.title}</div>
            <div>${bookmark.rating}</div>
          </div>
        </div>
      `;
  }
  else {
    return `
        <div class="currentBookmark">
          <div class="expanded" id="${bookmark.id}">
            <h3>${bookmark.title}</h3>
            <a href="${bookmark.url}" target="_blank">Visit Site</a>
            <div>${bookmark.rating}</div>
            <p>${bookmark.desc}</p>
            <button id="delete">Delete</button>
          </div>
        </div>
      `;
  }  
};



const renderBookmarks = function(){
  const bookmarks = [...store.storeObj.bookmarks];
  console.log(bookmarks);
  const stringedBookmarks = bookmarkString(bookmarks);
  $('.listArea').html(stringedBookmarks);
};

const bookmarkString = function(array){
  const newBookmarks = array.map(bookmark => {
    if(bookmark.rating >= store.filter){
      return renderBookmark(bookmark);
    }
    console.log(newBookmarks);
  });
  return newBookmarks.join('');
};


const render = function(){
  renderAddForm();
  renderAddButton();
  renderBookmarks();
};



//read filter setting
const filterSetting = function(){
  $('.filterRating').on('submit', function(event){
    event.preventDefault;
    let newRating = $('#filter').val();
    console.log(newRating);
  });
};

///////// FORM INPUT HANDLING //////////


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
  

//add a bookmark to the api from t 
const addBookmark = function(newDataObject){
  // take form input object that was created and send
  //JSONified version via POST method.
  api.createBookmark(newDataObject);
};

//handles confirm of bookmark by removing form html



//handles the feature rating reads value

//event listeners
const bindEventListeners = function () {
  addNewBookmark();
  confirmAdd();
  deletePress();
  filterSetting();
  changeExpandedState();
};


//inserts form html when form button is pressed.
const addNewBookmark = function(){
  $('.headerNav').on('click', function(event){
    if(!store.storeObj.adding){
      event.preventDefault();
      console.log('I heard the new bookmark button get pressed');
      store.toggleAdding();
      render();
    }
  });
};

const confirmAdd = function(){
  $('.newBookmarkFormArea').submit('#newBookmarkForm', function(event){
    event.preventDefault();
    const formData = serializeJson();
    store.toggleAdding();
  
  });
  // $('.newBookmarkFormArea').on('click', '#confirmAdd', function(event){
  //   event.preventDefault();
  //   console.log('I hear you');
  //   const newSubmit = serializeJson();
  //   console.log(newSubmit);
  //   api.createBookmark(newSubmit);
  //   store.toggleAdding();
  //   render();
  // });
};

const changeExpandedState = function(){
  $('.listArea').on('click', function(event){
    event.preventDefault();
    console.log('clicking on a div!');
    this.store.storeObj.bookmarks.expanded = !this.store.storeObj.bookmarks.expanded;
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
  renderBookmark,
  addBookmark,
  renderNewBookmarkForm
};