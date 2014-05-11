'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import config from './config.json';
import createCalendar from 'cal';
import createExhibition from 'exhibition';
import Collection from './collection';

Backbone.$ = $;
Backbone.ajax = function(params) {
  params.url = config.api_url + params.url;
  return $.ajax(params);
};

var coll = new Collection();

var cal = createCalendar({
  collection: coll
});

var ex = createExhibition({
  el: 'main',
  collection: coll
});

coll.date(new Date());

// collection.on('populate', function(model) {
//   exhibition.setSelected(model.toJSON());
// });

window.coll = coll;

$('main').append(ex.el);
$('.header').append(cal.el);

