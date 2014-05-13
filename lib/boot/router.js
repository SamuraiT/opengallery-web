'use strict';
import Backbone from 'backbone';
import moment from 'moment';

var format = 'YYYY-MM-DD';

export default Backbone.Router.extend({
  routes: {
    'exhibitions/:date': 'dateSearch',
    '*any': 'fallback'
  },
  initialize: function (options) {
    if (!options || !options.collection) {
      throw new Error('collection is required');
    }
    var coll = this.collection = options.collection;
    this.listenTo(coll, 'date', this.navigateDate);
  },
  dateSearch: function(dateStr) {
    var date = moment(dateStr, format).toDate();
    this.collection.date(date);
  },
  navigateDate: function(date) {
    var dateStr = moment(date).format(format);
    this.navigate('exhibitions/' + dateStr);
  },
  fallback: function() {
    this.navigate('exhibitions/' + moment().format(format), {trigger: true});
  }
});
