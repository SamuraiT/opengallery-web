'use strict';
var Backbone = require('backbone');
var config = require('config.json');
var $ = require('jquery');

Backbone.ajax = function(params) {
  params.url = config.api_url + params.url;
  return $.ajax(params);
};
