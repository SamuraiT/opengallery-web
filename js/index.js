'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config.json';
import ExhibitionCollection from './collections/exhibition';

Backbone.ajax = function(params) {
  params.url = config.api_url + params.url;
  return $.ajax(params);
};

// var exhibitions = new ExhibitionCollection();
// exhibitions.searchByDate('2014-04-24');
// exhibitions.searchByGalleryId("b9fe1506-30c4-4cff-b73e-99d859199a6d");

var $main = $('main');
var $details = $('.ex-details');

$main.on('click' ,'.ex-item', function(e) {
  var $target = $(e.currentTarget);
  if ($target.is('.selected')) {
    return;
  }

  $target
    .siblings('.selected').removeClass('selected').end()
    .addClass('selected');
  $details.addClass('active');
});

$main.on('click', '.ex-details-close', function (e) {
  $details.removeClass('active');
  $('.ex-item.selected').removeClass('selected');
});
