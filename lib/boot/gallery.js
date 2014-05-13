'use strict';
import Backbone from 'backbone';
import _ from 'underscore';

var Model = Backbone.Model.extend({
  url: function () {
    return '/galleries/' + this.id;
  },
  parse: function (data, options) {
    _.each(data.meta, function(val, key) {
      data['meta_' + key] = val;
    });
    data._meta = data.meta;
    delete data.meta;
    return data;
  }
});

var Collection = Backbone.Collection.extend({
  model: Model,
  select: function(id) {
    var galleryModel = this.get(id);
    if (galleryModel) {
      return this.trigger('select', galleryModel);
    }

    galleryModel = new Model({id: id});
    var self = this;
    galleryModel.fetch().done(function() {
      self.trigger('select', galleryModel);
    });
    return this;
  }
});

export default Collection;
