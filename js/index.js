'use strict';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config.json';
import ExhibitionCollection from './collections/exhibition';

Backbone.ajax = function(params) {
  params.url = config.api_url + params.url;
  return $.ajax(params);
};

var exhibitions = new ExhibitionCollection();
// exhibitions.searchByDate('2014-04-24');
// exhibitions.searchByGalleryId("b9fe1506-30c4-4cff-b73e-99d859199a6d");
