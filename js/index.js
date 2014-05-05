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
var $content = $('.ex-content');
var $body = $('body');
var $list = $('.ex-list');
var scrollTop;

$main.on('click' ,'.ex-item:not(.selected)', function(e) {
  $(e.currentTarget)
    .siblings('.selected').removeClass('selected').end()
    .addClass('selected');
  $content.addClass('active');

  var t = $body.scrollTop();
  $list.css({
    position: 'fixed',
    top: -t
  }).addClass('shrink');

  if (!scrollTop) {
    scrollTop = t;
  }
  $body.scrollTop(0);
});

$main.on('click', '.ex-item.selected', closeContent);

function closeContent() {
  $content.removeClass('active');
  $('.ex-item.selected').removeClass('selected');
  $list.css({
    position: '',
    top: ''
  }).removeClass('shrink');
  $body.scrollTop(scrollTop);
  scrollTop = null;
}

$main.on('click', '.ex-content-close', closeContent);

var $header = $('.header');
$header.on('click', '.header-calendar-day li:not(.selected)', function (e) {
  $(e.currentTarget)
    .siblings('.selected').removeClass('selected').end()
    .addClass('selected');
});
