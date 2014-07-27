define([
  'marionette',
  'backbone',
  'days',
  'office-hour',
  'times'
], function(Marionette,Backbone,DaysView,OfficeHour,TimesView) {
  'use strict';

  var App = new Marionette.Application();

  var todaysOfficeHours = new OfficeHour();
  todaysOfficeHours.fetchToday({
    success:function(model){
      var times = new TimesView({
        todaysOfficeHours: model,
        collection: new Backbone.Collection(model.get('schedule'))
      });
      App.times.show(times);
    }
  });

  //var today = new Today(viewOptions);
  var days = new DaysView({el:'.days-scroller'});
  
  App.addRegions({
    //today: '.today',
    days: '.days',
    times: '.times-list'
  });

  App.addInitializer(function () {
    //App.today.show(header);
    App.days.show(days);
    //todoList.fetch();
  }); 

  App.on('initialize:after', function() {
    console.log('Application has started');
  });

  return App;
});
