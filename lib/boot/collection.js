'use strict';
import Backbone from 'backbone';
import moment from 'moment';
import Model from './model';

export default Backbone.Collection.extend({
  model: Model,
  initialize: function (models, options) {
    this._galleryId = null;
    this._date = null;
    this._type = null;
    this._selected = null;
  },
  searchByGalleryId: function(galleryId) {
    if (this._type === 'gallery' && this._galleryId === galleryId) {
      return;
    }
    this._type = 'gallery';
    this._galleryId = galleryId;
    var url = '/galleries/' + galleryId + '/exhibitions';
    var xhr = this.fetch({url: url});
    return xhr;
  },
  date: function(date) {
    var d = moment(date).format('YYYY-MM-DD');
    if (this._type === 'date' && this._date === d) {
      return;
    }
    this.deselect();
    this._type = 'date';
    this._date = d;
    var url = '/exhibitions/' + d;
    var xhr = this.fetch({url: url, reset: true});
    this.trigger('date', date);
    return xhr;
  },
  parse: function(data, options) {
    return data.results;
  },
  select: function(id) {
    var model = this.get(id);
    if (!model) throw new Error('no such id: ' + id);
    if (model === this._selected) return;
    this._selected = model;
    this.trigger('select', model);
    if (!model.populated()) {
      model.populate();
    }
  },
  deselect: function() {
    var selected = this._selected;
    if (!selected) return;
    this._selected = null;
    this.trigger('deselect', selected);
  }
});
