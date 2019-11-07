import cuid from 'cuid';
import $ from 'jquery';


const baseURL = 'https://thinkful-list-api.herokuapp.com/michael/bookmarks';

//default fetch expression ***WORKS
// const apiFetch = function(...args){
//   let error;
//   return fetch(...args)
//     .then(res =>{
//       if (!res.ok){
//         error = { code: res.status };
//       }
//       return res.json();
//     })
//     .then(data => {
//       if (error) {
//         error.message = data.message;
//         return Promise.rejects(error);
//       }
//       return data;
//     });
// };

const apiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getBookmarks = function(){
  return apiFetch(`${baseURL}`);
};
  
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