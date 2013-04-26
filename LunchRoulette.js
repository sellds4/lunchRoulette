
  var peoplePool = new Meteor.Collection('peoplePool');

  var Groups = new Meteor.Collection('Groups');

  var Places = ['Mall Food Court', 'Mexican', 'Little Delhi', 'Pearl\'s Burgers', 'Super Duper'];

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

  Template.Today.day = function () {
    return today;
  };

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
    console.log('the objects', Groups.find().fetch())
    return Groups.find().fetch();
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
    var groupSize = 3; // this is the suggested size of a lunch group
    var now = new Date();
    var randomPlace;

    var peepGroup;

    if (true) {
    // if (now.getHours() === 12 && now.getMinutes() === 00) {
      Groups.remove({});
      peeps = shuffle(peeps);
      for (var i = 0; i < peeps.length; i += groupSize) {
        if (peeps.length - i === groupSize + 1) {
          peepGroup = peeps.slice(i, peeps.length);
          randomPlace = Places[Math.floor(Math.random() * Places.length)];
          // peoplePool.remove({lunchDay: today});
          return Groups.insert({lunchDay : today, place : randomPlace, people : peepGroup});
        } else {
          peepGroup = peeps.slice(i, i+groupSize);
          randomPlace = Places[Math.floor(Math.random() * Places.length)];
          Groups.insert({lunchDay : today, place : randomPlace, people : peepGroup});
        }
      }
      // peoplePool.remove({lunchDay: today});
      return Groups;
    }
  }, 6000);
}
