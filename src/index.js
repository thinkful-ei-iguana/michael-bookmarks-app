import $ from 'jquery';
import './index.css';
import handleFeatures from './handleFeatures';

const main = function(){
  handleFeatures.bindEventListeners();
};

$(main);