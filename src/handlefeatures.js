import $ from 'jquery';
import api from './api';
import store from './store';
import cuid from 'cuid';

//////// HTML ELEMENTS ///////

//new bookmark form html
const renderNewBookmarkForm = function(){
  return `
    <form class="newBookmarkForm" id="newBookmarkForm">
      <label for="newBookmarkTitle">New Bookmark:</label>
      <input name="title" id="newBookmarkTitle" required>
      <label for="newBookmarkURL">URL:</label>
      <input name="url" id="newBookmarkURL" required>
      <select id="newBookmarkRating" name="rating" required>
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
  if (store.adding === false){
    $('.buttonField').html(renderAddButton());
  } else {
    $('.buttonField').empty();
    $('.newBookmarkFormArea').html(renderNewBookmarkForm());
  }
};

//bookmarks html
const renderBookmarkElement = function(bookmark){
  if(!bookmark.expanded){
    return `
        <section class="currentBookmark" id="${bookmark.id}">
          <div class="condensed" id="${bookmark.id}">
            <div>${bookmark.title}</div>
            <div>${bookmark.rating}</div>
          </div>
        </section>
      `;
  }
  else {
    return `
        <section class="currentBookmark" id="${bookmark.id}">
          <div class="expanded" id="${bookmark.id}">
            <h3>${bookmark.title}</h3>
            <a href="${bookmark.url}" target="_blank">Visit Site</a>
            <div>${bookmark.rating}</div>
            <p>${bookmark.desc}</p>
            <div><button id="delete">Delete</button></div>
          </div>
        </section>
      `;
  }  
};

const errorHtml = function(message){
  return `
    <section class="errorContent">
      <p>${message}</p>
      <button id="cancelError">Cancel</button>
    </section>
  `;
};

//////// RENDERING ///////

const bookmarkString = function(bookmarks){
  const newBookmarks = bookmarks.map(bookmark => {
    if(bookmark.rating >= store.filter){
      return renderBookmarkElement(bookmark);
    }
  });
  return newBookmarks.join('');
};

// error rendering
const renderError = function(){
  if (store.error){
    const el = errorHtml(store.error);
    $('.errorContainer').html(el);
  }else{
    $('.errorContainer').empty();
  }
};


const render = function(){
  renderError();
  renderAddForm();
  const bookmarks = [...store.bookmarks];
  const newString = bookmarkString(bookmarks);
  $('.listArea').html(newString);  
};





///////// FORM INPUT HANDLING //////////



const serializeJson = function() {
  return {
    'title': $('#newBookmarkTitle').val(),
    'desc': $('#urlDescription').val(),
    'url': $('#newBookmarkURL').val(),
    'id': cuid(),
    'rating': $('#newBookmarkRating').val(),
  };
};


//////// EVENT LISTENERS /////////

const bindEventListeners = function () {
  addNewBookmark();
  confirmAdd();
  deletePress();
  filterSetting();
  changeExpandedState();
  getBookmarkId();
  handleCloseError();
};

const handleCloseError = function(){
  $('.errorContainer').on('click', '#cancelError', ()=>{
    store.setError(null);
    store.adding = false;
    render();
  });
};

const getBookmarkId = function (bookmark) {
  return $(bookmark)
    .closest('section')
    .attr('id');
};

//read filter setting
const filterSetting = function(){
  $('.filterField').change( function(event){
    event.preventDefault();
    let newRating = $('#filter').val();
    store.filterSelect(newRating);
    render();
  });
};


//inserts form html when form button is pressed.
const addNewBookmark = function(){
  $('.buttonField').on('click', function(){
    if(!store.adding){
      store.toggleAdding();
      render();
    }
  });
};

//on button press, adds the new bookmark
const confirmAdd = function(){
  $('.newBookmarkFormArea').on('click','#confirmAdd', function(event){
    event.preventDefault();
    const formData = serializeJson();
    api.createBookmark(formData)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.toggleAdding();
        render();
      })
      .catch((err) =>{
        store.setError(err.message);
        renderError();
      });
    $('.newBookmarkFormArea').empty();
  });
};

const changeExpandedState = function(){
  $('.listArea').on('click','.condensed', function(event){
    event.preventDefault();
    const id = getBookmarkId(event.currentTarget);
    store.toggleExpanded(id);
    render();
  });
  $('.listArea').on('click', '.expanded', function(event){
    event.preventDefault();
    const id = getBookmarkId(event.currentTarget);
    store.toggleExpanded(id);
    render();
  });
};

const deletePress = function(){
  $('.listArea').on('click','#delete', function(event){
    let id = getBookmarkId(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.deleteBookmark(id);
        render();
      });   
  });
};


export default {
  bindEventListeners,
  render,
};