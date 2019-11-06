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

//newData needs to be formatted as an object that we can post in
//the following format:

const createBookmark = function(newData){
  let newBookmark = JSON.stringify(newData);
 
  return apiFetch(`${baseURL}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: newBookmark
  });
};

const updateBookmark = function(id, updateData){
  const updatedBookmark = JSON.stringify(updateData);
  return apiFetch(`${baseURL}/${id}`,{
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: updatedBookmark
  });
};

const deleteBookmark = function(id){
  return apiFetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};