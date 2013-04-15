  // var FridayPool = new Meteor.Collection('FridayPool');
  // var SaturdayPool = new Meteor.Collection('SaturdayPool');
  // var SundayPool = new Meteor.Collection('SundayPool');
  // var MondayPool = new Meteor.Collection('MondayPool');
  // var TuesdayPool = new Meteor.Collection('TuesdayPool');
  // var WednesdayPool = new Meteor.Collection('WednesdayPool');

  var peoplePool = new Meteor.Collection('peoplePool');

  var Groups = new Meteor.Collection('Groups');

  var date = new Date();
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = weekdays[date.getDay()];
  var yesterday = date.getDay() > 0 ? weekdays[date.getDay() - 1] : weekdays[6];


if (Meteor.isClient) {

  Template.signUp.events({
    'click .submit' : function (e) {
      // template data, if any, is available in 'this'
      var user = {};
      user.name = $('.name').val();
      user.email = $('.email').val();
      user.phone = $('.phone').val();
      user.lunchDay = $('.day').val();
      user.lunchDay === '%s' ? alert('Please pick a day') :

      peoplePool.insert(user);
      $('form > input').val('');
      e.preventDefault();
    }
  });

  Template.FridayList.FridayPool = function() {
    return peoplePool.find({lunchDay : 'Friday'});
  };

  Template.SaturdayList.SaturdayPool = function() {
    return peoplePool.find({lunchDay: 'Saturday'});
  };

  Template.SundayList.SundayPool = function() {
    return peoplePool.find({lunchDay: 'Sunday'});
  };

  Template.MondayList.MondayPool = function() {
    return peoplePool.find({lunchDay: 'Monday'});
  };

  Template.TuesdayList.TuesdayPool = function() {
    return peoplePool.find({lunchDay: 'Tuesday'});
  };

  Template.WednesdayList.WednesdayPool = function() {
    console.log(peoplePool.find({lunchDay: 'Wednesday'}))
    return peoplePool.find({lunchDay: 'Wednesday'});
  };

  Template.TodayList.TodayPool = function() {
    // todayArray = peoplePool.find({lunchDay: today});

  };

  // Meteor.subscribe('peoplePool', function() {
  Template.calendar.rendered = function(){
        console.log(today, yesterday);
        $('#' + today).addClass('hiddenday');
        $('#' + yesterday).removeClass('hiddenday');
        // peoplePool.remove({lunchDay: yesterday});
    };
//   });
}

if (Meteor.isServer) {

  // for item in peoplePool.find({lunchDay: today}) {
  //   console.log
  // }
  console.log(peoplePool.findOne({lunchDay: today}));

  // var now = new Date();
  // var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
  // console.log(millisTill10)
  // if (millisTill10 < 0) {
  //      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
  // }

  // setTimeout(function(){/*set function(

  //   create groups --> helper function
  //   send notifications -- helper function
  //   */
  // }, millisTill8);

  Meteor.methods({

  });
}
