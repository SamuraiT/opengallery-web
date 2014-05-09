'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import config from './config.json';
import cal from 'cal';
import exhibition from 'exhibition';

Backbone.ajax = function(params) {
  params.url = config.api_url + params.url;
  return $.ajax(params);
};

// cal.collection.searchByDate('2014-04-24');

$('main').append(exhibition.el);
$('.header').append(cal.el);
