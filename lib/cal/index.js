'use strict';

import $ from 'jquery';
import Collection from './collection';
import reactive from 'reactive';
import template from './template';

var model = {
  current: '2014年5月16日',
  next: '15日',
  prev: '13日'
};

var coll = new Collection();

var delegate = {
  next: function() {
    console.log('next');
  },
  prev: function() {
    console.log('prev');
  }
};

var view = reactive(template, model, {
  delegate: delegate
});

var exports = {
  el: view.el,
  collection: coll
};

export default exports;
