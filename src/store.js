const bookmarks = [];
let  adding = false;
let  error = null;
let  filter = 0;



const addBookmark = function(bookmark){
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
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
  return this.bookmarks.find(bookmark => bookmark.id === id);
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
  toggleExpanded,
  toggleAdding,
  filterSelect,
  findById,
  setError
};