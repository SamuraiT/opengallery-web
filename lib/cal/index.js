'use strict';

import $ from 'jquery';
import reactive from 'reactive';
import template from './template';
import moment from 'moment';
import Backbone from 'backbone';

var format = 'YYYY-MM-DD';

var View = Backbone.View.extend({
  initialize: function(options) {
    this.view = options.view;
    this.listenTo(this.collection, 'date', this.setDate);
  },
  events: {
    'click .header-nav-next': 'next',
    'click .header-nav-prev': 'prev'
  },
  setDate: function(date) {
    this.view.set('date', date);
  },
  next: function (e) {
    this.offsetDate(e, 1);
  },
  prev: function (e) {
    this.offsetDate(e, -1);
  },
  offsetDate: function(e, offset) {
    e.preventDefault();
    var current = this.view.get('date');
    var next = moment(current).add('days', offset).toDate();
    this.collection.date(next);
  }
});

function create(options) {
  if (!options || !options.collection) {
    throw new Error('collection is required');
  }
  var view = newView();
  options.view = view;
  options.el = view.el;
  return new View(options);
}

function newView() {
  var view = reactive(template, {date: null}, {
    bindings: {
      current: function(el, property) {
        var binding = this;
        binding.change(function () {
           var val = binding.value(property);
           el.innerText = moment(val).format('LL');
        });
      },
      next: function(el, property) {
       var binding = this;
        binding.change(function () {
           var val = binding.value(property);
           el.innerText = moment(val).add('days', 1).format('D[日]');
        });
      },
      prev: function(el, property) {
       var binding = this;
        binding.change(function () {
           var val = binding.value(property);
           el.innerText = moment(val).subtract('days', 1).format('D[日]');
        });
      }
    }
  });
  return view;
}

export default create;
