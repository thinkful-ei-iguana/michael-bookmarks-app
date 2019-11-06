

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

export default {
  storeObj,
  addBookmark
};