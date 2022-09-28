import tabs from './modules/tabs';
import timer from './modules/timer';
import modalWindows from './modules/modalWindows';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calculator from './modules/calculator';
import {openModal} from './modules/modalWindows'

window.addEventListener('DOMContentLoaded', function() {

  const modalTimerId = setTimeout(()=>openModal('.modal', modalTimerId), 10000);

  tabs();
  timer('.timer', '2023-01-01');
  modalWindows('[data-modal]', '.modal', modalTimerId);
  cards();
  forms('form', modalTimerId);
  slider();
  calculator();
   
      
});