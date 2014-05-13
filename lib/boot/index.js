'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import config from './config.json';
import createCalendar from 'cal';
import createExhibition from 'exhibition';
import Collection from './collection';
import GalleryCollection from './gallery';

Backbone.$ = $;
Backbone.ajax = function(params) {
  params.url = config.api_url + params.url;
  return $.ajax(params);
};

var coll = new Collection();
var galleryColl = new GalleryCollection();

var cal = createCalendar({
  collection: coll
});

var ex = createExhibition({
  el: 'main',
  collection: coll
});

coll.date(new Date());

coll.on('select', function(model) {
  var galleryId = model.get('gallery_id') || model.get('gallery').id;
  var galleryModel = galleryColl.select(galleryId);
});

galleryColl.on('select', function(model) {
  ex.setGallery(model.toJSON());
});

$('main').append(ex.el);
$('.header').append(cal.el);

