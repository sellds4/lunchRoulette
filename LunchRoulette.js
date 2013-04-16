
  var peoplePool = new Meteor.Collection('peoplePool');

  var Groups = new Meteor.Collection('Groups');

  var date = new Date();
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = weekdays[date.getDay()];
  var yesterday = date.getDay() > 0 ? weekdays[date.getDay() - 1] : weekdays[6];


if (Meteor.isClient) {

  Template.signUp.events({
    'click .submit' : function (e) {
      var user = {};
      user.name = $('.name').val();
      user.email = $('.email').val();
      user.phone = $('.phone').val();
      user.lunchDay = $('.day').val();
      user.lunchDay === '%s' ? alert('Please pick a day') : peoplePool.insert(user);
      $('form > input').val('');
      $('form .day').val('');
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
    return peoplePool.find({lunchDay: 'Wednesday'});
  };

  Template.TodayList.TodayPool = function() {
    var names = [];

    var todayGrps = Groups.find().fetch();
    for(var key in todayGrps){
      for(var k in todayGrps[key]){
        if (typeof todayGrps[key][k] === 'string'){
          names.push({name: 'Lunch Group:'})
        } else {
          names.push(todayGrps[key][k]);
        }

      }
    }
    return names.reverse();
  };

  Template.calendar.rendered = function(){
    $('#' + today).addClass('hiddenday');
    $('#' + yesterday).removeClass('hiddenday');
  };


}

if (Meteor.isServer) {

  var shuffle = function ( myArray ) {
    var i = myArray.length;
    if ( i === 0 ) return false;
    while ( --i ) {
       var j = Math.floor( Math.random() * ( i + 1 ) );
       var tempi = myArray[i];
       var tempj = myArray[j];
       myArray[i] = tempj;
       myArray[j] = tempi;
    }
    return myArray;
  };

  Meteor.setInterval(function(){
    var peeps = peoplePool.find({lunchDay: today}).fetch();
    var groupSize = 3; // this is the ordinary size of a lunch group
    var now = new Date();

    var peepGroup;

    if (now.getHours() === 12 && now.getMinutes() === 00) {
      Groups.remove();
      peeps = shuffle(peeps);
      for (var i = 0; i < peeps.length; i += groupSize) {
        if (peeps.length - i === groupSize + 1) {
          peepGroup = peeps.slice(i, peeps.length);
          peoplePool.remove({lunchDay: today});
          return Groups.insert(peepGroup);
        } else {
          peepGroup = peeps.slice(i, i+groupSize);
          Groups.insert(peepGroup);
        }
      }
      return Groups;
    }
  }, 60000);
};
