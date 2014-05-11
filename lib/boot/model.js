'use strict';
import Backbone from 'backbone';
import moment from 'moment';

export default Backbone.Model.extend({
  idAttribute: '_id',
  initialize: function (attributes, options) {
    this._populated = false;
    this._pending = false;
  },
  populated: function() {
    return this._populated;
  },
  url: function () {
    var galleryId = this.get('gallery_id');
    var id = this.get('id');
    return '/galleries/' + galleryId + '/exhibitions/' + id;
  },
  parse: function (data, options) {
    data._id = data.gallery_id + ':' + data.id;
    return data;
  },
  populate: function() {
    if (this._pending || this._populated) return;
    this._pending = true;
    var self = this;
    var xhr = this.fetch();
    xhr.always(function() {
      self._pending = false;
    });
    xhr.done(function() {
      self._populated = true;
      self.trigger('populate', self);
    });
    return xhr;
  }
});
