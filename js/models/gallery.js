'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({
  initialize: function (attributes, options) {
  },
  url: function () {
    return '/galleries/' + this.id;
  }
});
