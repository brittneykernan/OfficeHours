define(['backbone'], function(Backbone) {
  'use strict';

  var OfficeHour = Backbone.Model.extend({
    urlRoot: '/officehours/',

    fetchToday: function(options) {
      options.url = this.url() + 'today';
      this.fetch(options);
    }
  });  

  return OfficeHour;
});
