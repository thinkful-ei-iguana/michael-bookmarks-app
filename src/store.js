const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;



const addBookmark = function(bookmark){
  bookmark.expanded = false;
  return bookmarks.push(bookmark);
};

const deleteBookmark = function(id){
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
};

//toggle expanded on target bookmark
const toggleExpanded = function(id){
  let currentBookmark = findById(id);
  currentBookmark.expanded = !currentBookmark.expanded;
};

const toggleAdding = function(){
  this.adding = !this.adding;
};

//change filter
const filterSelect = function(number){
  this.filter = number;
};

const findById = function(id){
  return bookmarks.find(bookmark => bookmark.id === id);
};

const setError = function(error){
  this.error = error;
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  deleteBookmark,
  toggleExpanded,
  toggleAdding,
  filterSelect,
  findById,
  setError
};