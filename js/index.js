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
var $doc = $(document);
var $list = $('.ex-list');
var scrollTop = null;

$main.on('click' ,'.ex-item:not(.selected)', function(e) {
  if (scrollTop !== null) {
    closeContent();
  }

  $(e.currentTarget).addClass('selected');
  $content.addClass('active');

  scrollTop = $doc.scrollTop();
  $list.css({
    position: 'fixed',
    top: -scrollTop
  }).addClass('shrink');
  $doc.scrollTop(0);
});

$main.on('click', '.ex-item.selected', closeContent);

function closeContent() {
  $content.removeClass('active');
  $('.ex-item.selected').removeClass('selected');
  $list.css({
    position: '',
    top: ''
  }).removeClass('shrink');
  $doc.scrollTop(scrollTop);
  scrollTop = null;
}

$main.on('click', '.ex-content-close', closeContent);

var $header = $('.header');
$header.on('click', '.header-calendar-day li:not(.selected)', function (e) {
  $(e.currentTarget)
    .siblings('.selected').removeClass('selected').end()
    .addClass('selected');
});
