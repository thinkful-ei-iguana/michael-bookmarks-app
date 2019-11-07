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
    $('.headerNav').html(renderAddButton());
  } else{
    $('.newBookmarkFormArea').html(renderNewBookmarkForm());
  }
};

//render bookmarks
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

//////// RENDERING ///////

const bookmarkString = function(bookmarks){
  const newBookmarks = bookmarks.map(bookmark => {
    if(bookmark.rating >= store.filter){
      return renderBookmarkElement(bookmark);
    }
  });
  return newBookmarks.join('');
};



const render = function(){
  renderAddForm();
  console.log(store.bookmarks);
  const bookmarks = [...store.bookmarks];
  const newString = bookmarkString(bookmarks);
  $('.listArea').html(newString);  
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


//handles the feature rating reads value

//event listeners
const bindEventListeners = function () {
  addNewBookmark();
  confirmAdd();
  deletePress();
  filterSetting();
  changeExpandedState();
  getBookmarkId();
};


//inserts form html when form button is pressed.
const addNewBookmark = function(){
  $('.headerNav').on('click', function(event){
    if(!store.adding){
      store.toggleAdding();
      render();
    }
  });
};

const confirmAdd = function(){
  if(store.adding === true){
    $('.newBookmarkFormArea').on('click','#confirmAdd', function(event){
      event.preventDefault();
      console.log('I hear you');
      store.toggleAdding();
      const formData = serializeJson();
      api.createBookmark(formData)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);
          render();
        });
    });
  }
};

const getBookmarkId = function (bookmark) {
  return $(bookmark)
    .closest('section')
    .attr('id');
};

const changeExpandedState = function(){
  $('.listArea').on('click','.condensed', function(event){
    event.preventDefault();
    console.log('clicking on a div!');
    const id = getBookmarkId(event.currentTarget);
    store.toggleExpanded(id);
    render();
  });
};



const deletePress = function(){
  $('.listArea').on('click','#delete', function(event){
    console.log(event.currentTarget);
    let id = getBookmarkId(event.currentTarget);
    console.log(id);
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