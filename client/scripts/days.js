define(['marionette','jquery'], function(Marionette,$) {
  'use strict';

  var DaysView = Marionette.ItemView.extend({

    events: {
      'click' : 'onClick'
    },

    weekdays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],

    initialize: function() {
      this.makeDayLinks();
      this.todayLink = $('a:first',this.el);
      this.toggleToday();
    },

    makeDayLinks: function() {
      this.$el.append('<a href="#" class="current-day active">Friday');

      for (var d = new Date(), i = 0; i <= 5; d.setDate(d.getDate() + 1), i++) {
        this.$el.append('<a href="#">' + this.weekdays[d.getDay()]);
      }
    },

    // show {Boolean} 
    toggleToday: function(show) {
      var width = 0;
      if(!show)
        width = -(this.todayLink.width() + parseInt(this.todayLink.css('padding-left')));

      this.$el.css('transform','translateX(' +  width + 'px)');

    },

    // passes to appropriate handler
    onClick: function(e) {
      e.preventDefault();

      this.onAClicked(e);
    }, 

    onAClicked: function(e) {
      console.log(e.target.text);

      if( this.todayLink.text() != e.target.text ) {
        this.toggleToday(true);
      } else {
        this.toggleToday();        
      }

    }

  });

  /*  */
  

  return DaysView;
});
