'use strict';

import listTemplate from './list';
import contentTemplate from './content';
import reactive from 'reactive';
import $ from 'jquery';
import moment from 'moment';
import Emitter from 'emitter';
import Backbone from 'backbone';
import _ from 'underscore';

var format = 'YYYY-MM-DD';

var View = Backbone.View.extend({
  initialize: function(options) {
    this.list = options.list;
    this.content = options.content;
    this.$list = $(options.list.el);
    this.$content = $(options.content.el);
    this.$doc = $(document);
    this.scrollTop = null;
    this._selected = null;
    this.listenTo(this.collection, 'reset', function () {
      this.list.set('exhibitions', this.collection.toJSON());
    });
    this.listenTo(this.collection, 'select', this.selectHandler);
    this.listenTo(this.collection, 'deselect', this.deselectHandler);
    this.listenTo(this.collection, 'populate', function (model) {
      this.content.set(model.toJSON());
    });
  },
  events: {
    'click .ex-item:not(.selected)': 'clickItem',
    'click .ex-item.selected': 'closeContent',
    'click .ex-content-close': 'closeContent'
  },
  clickItem: function (e) {
    if (this.scrollTop !== null) {
      this.closeContent();
    }
    var $target = $(e.currentTarget);
    this.content.set('active', 'active');
    this.scrollTop = this.$doc.scrollTop();
    this.$list.css({
      position: 'fixed',
      top: -this.scrollTop
    }).addClass('shrink');
    this.$doc.scrollTop(0);
    var id = $target.attr('data-id');
    this.collection.select(id);
  },
  closeContent: function () {
    this.collection.deselect();
  },
  selectHandler: function(model) {
    var index = this.collection.indexOf(model);
    var exhibitions = this.list.get('exhibitions');
    var data = model.toJSON();
    data.selected = 'selected';
    exhibitions.splice(index, 1, data);
    this.content.set(data);
  },
  deselectHandler: function(model) {
    this.content.set('active', '');
    this.$list.css({
      position: '',
      top: ''
    }).removeClass('shrink');
    this.$doc.scrollTop(this.scrollTop);
    this.scrollTop = null;
    var index = this.collection.indexOf(model);
    var exhibitions = this.list.get('exhibitions');
    var data = exhibitions[index];
    if (data) {
      data.selected = undefined;
      exhibitions.splice(index, 1, data);
    }
  },
  setGallery: function(data) {
    var model = {};
    _.each(data, function (val, key) {
      model['gallery_' + key] = val;
    });
    this.content.set(model);
  }
});

var today = moment().format(format);

function create(options) {
  if (!options || !options.collection) throw new Error('collection is required');
  if (!options.el) throw new Error('el is required');
  var list = options.list = reactive(listTemplate, {exhibitions: []}, {
    bindings: {
      label: function(el, property) {
        var binding = this;
        var $el = $(el);
        binding.change(function () {
          $el.removeClass('label-note label-alert label-transparent');
          var val = binding.value(property);
          if (!val || !val[1]) {
            return;
          }

          if (today === val[1]) {
            $el.addClass('label-alert').text('最終日');
            return;
          }

          var dateStart = moment(val[0]);
          var dateEnd = moment(val[1]);

          if (dateEnd.isBefore(today) || dateStart.isAfter(today)) {
            var text = dateStart.format('M[月]D[日]') + ' 〜 ';
            if (dateStart.isSame(dateEnd, 'month')) {
              text += dateEnd.format('D[日]');
            } else {
              text += dateEnd.format('M[月]D[日]');
            }
            $el.addClass('label-transparent').text(text);
            return;
          }

          var formatStr = 'D[日まで]';
          if (!dateEnd.isSame(today, 'month')) {
            formatStr = 'M[月]' + formatStr;
          }
          $el.addClass('label-note').text(dateEnd.format(formatStr));
        });
      }
    }
  });

  var content = options.content = reactive(contentTemplate, {active: ""}, {
    bindings: {
      daterange: function(el, property) {
        var binding = this;
        binding.change(function () {
           var val = binding.value(property);
           if (val) {
             var start = moment(val[0], format).format('LL');
             var end = moment(val[1], format).format('LL');
             el.innerText = start + '〜' + end;
           }
        });
      }
    }
  });

  $(options.el)
    .append(content.el)
    .append(list.el);
  return new View(options);
}

export default create;
