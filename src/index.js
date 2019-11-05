import $ from 'jquery';
import handleFeatures from './handleFeatures';

const main = function(){
  handleFeatures.bindEventListeners();
};

$(main);