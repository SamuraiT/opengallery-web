'use strict';
import Backbone from 'backbone';
import moment from 'moment';

export default Backbone.Collection.extend({
  initialize: function (models, options) {
    this._galleryId = null;
    this._date = null;
    this._type = null;
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
  searchByDate: function (date) {
    if (this._type === 'date' && this._date === date) {
      return;
    }
    this._type = 'date';
    this._date = date;
    var url = '/exhibitions/' + date;
    var xhr = this.fetch({url: url});
    return xhr;
  }
});
