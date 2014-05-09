'use strict';

import $ from 'jquery';
import Collection from './collection';
import reactive from 'reactive';
import template from './template';
import moment from 'moment';

var coll = new Collection();

var delegate = {
  next: function() {
    console.log('next');
  },
  prev: function() {
    console.log('prev');
  }
};

var view = reactive(template, {date: '2014-05-15'}, {
  delegate: delegate,
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

var exports = {
  el: view.el,
  collection: coll
};

export default exports;
