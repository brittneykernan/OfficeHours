define(['marionette','jquery'], function(Marionette,$) {
  'use strict';

  var TimeView = Marionette.ItemView.extend({
    template: '#template-timeview',

    events: {
      'keyup': 'onType',
      'click': 'onClick'
    },

    onType: function(e) {
      if(e.target.value.length > 0 &&
        e.target.value.indexOf('@') > 0 &&
        e.target.value.indexOf('.') > 0 ) {
        this.$el.addClass('valid');
      } else {
        this.$el.removeClass('valid');
      }
    },

    onClick:function(e) {
      if($(e.target).hasClass('go')) {
        this.onGoClick(e);
      } else if($(e.target).hasClass('cancel')) {
        this.onCancelClick(e);
      }
    },

    onGoClick: function(e) {
      if($(e.target).css('opacity') == 1) {
        this.model.set('email',$('input',this.$el).val());
        this.trigger('click:go');
      }
    },

    onBooked: function() {
      $('.row',this.$el).addClass('status-booked active');
    },

    onCancelClick: function(e) {
      var yn = confirm('Are you sure you\'d like to give up this spot?');
      if(yn) {
        this.model.set('email','');
        this.trigger('click:cancel');
      }
    },

    onCanceled: function() {
      this.$el.removeClass('valid');
      $('.row',this.$el).removeClass('status-booked active');
      $('input',this.$el).val('');
    },
  });

  var TimesView = Marionette.CollectionView.extend({
    itemView: TimeView,

    initialize: function(options) {
      // parent model
      this.todaysOfficeHours = options.todaysOfficeHours;

      // itemView events
      this.itemEvents();
      
    }, 

    // registers and handles events bubbling up from itemViews
    itemEvents: function() {
      var self = this;
      
      // schedule
      this.on("itemview:click:go", function(itemView, data){
        this.updateSchedule({
          scheduleItem: itemView.model,
          success: function() {
            itemView.onBooked();
          }, 
          error: function() {
            self.onError();
            // reset itemview?
          }
        });
      });

      // cancel
      this.on("itemview:click:cancel", function(itemView, data){
        this.updateSchedule({
          scheduleItem: itemView.model,
          success: function() {
            itemView.onCanceled();
          }, 
          error: function() {
            self.onError();
            // reset itemview?
          }
        });
      });
    }, 

    // options.success {function} what to do when model updates
    // options.error {function} what to do when model fails to updates
    // options.scheduleItem {Object} itemViews model
    updateSchedule: function(options) {
      var self = this;

      var schedule = this.todaysOfficeHours.get('schedule');
      for(var i in schedule) {
        if(schedule[i].time == options.scheduleItem.get('time')) {
          schedule[i].email = options.scheduleItem.get('email');
          this.todaysOfficeHours.set('schedule',schedule);
          this.todaysOfficeHours.save(this.todaysOfficeHours.attributes, {
            wait:true,
            success: function() {
              options.success();
            },
            error: function() {
              self.onError();
            }
          });
          return;
        }
      }
    }, 

    onError: function() {
      alert('sorry, us an email, something went wrong');
    }
  });

  return TimesView;
});
