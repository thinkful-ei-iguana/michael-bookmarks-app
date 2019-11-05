import cuid from 'cuid';
import $ from 'jquery';

const baseURL = 'https://thinkful-list-api.herokuapp.com/michael/bookmarks';

//default fetch expression
function apiFetch(...args){
  let error;
  return fetch(...args)
    .then(res =>{
      if (!res.ok){
        error = { code: res.status };
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.rejects(error);
      }
      return data;
    });
}

const getBookmarks = function(){
  return apiFetch(`${baseURL}`);
};

const createBookmark = function(newData){
  let newBookmark = JSON.stringify({newData});
 
  return apiFetch(`${baseURL}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: newItem
  });
};

export default {
  getBookmarks,
};