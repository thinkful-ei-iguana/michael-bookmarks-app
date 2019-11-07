

const storeObj = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};



const addBookmark = function(bookmark){
  bookmark.expanded = false;
  this.storeObj.bookmarks.push(bookmark);
};

//toggle expanded on target bookmark
const toggleExpanded = function(){
  this.bookmarks.expanded = !this.bookmarks.expanded;
};

const toggleAdding = function(){
  storeObj.adding = !storeObj.adding;
};

//change filter
const filterSelect = function(number){
  this.filter = number;
};

export default {
  storeObj,
  addBookmark,
  toggleExpanded,
  toggleAdding,

};