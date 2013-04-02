if (Meteor.isClient) {

  var peoplePool = new Meteor.Collection('peoplePool');
  var groupPool = new Meteor.Collection('groupPool');
  var lunchGroups = new Meteor.Collection('lunchGroups');
  var peopleArray;

  var groupPeople = function(array) {
    // var groups = [];
    for (var i = 0; i < array.length; i += 3) {
      console.log((array.slice(i, i + 3)));
    }
    // if (groups[groups.length - 1].length === 1) {
    //   groups[0].push(groups.pop());
    // }

    return groups;
  };

  Template.signUp.events({
    'click .submit' : function (e) {
      // template data, if any, is available in 'this'
      var user = {};
      user.name = $('.name').val();
      user.email = $('.email').val();
      user.phone = $('.phone').val();      
      peoplePool.insert(user);

      $('form > input').val('');
      e.preventDefault();
    }
  });

  Template.list.peopleInPool = function() {
    return peoplePool.find({});
  };

  Template.grouplist.groupsMade = function() {
    return groupPool.find({});
  };

  Meteor.autorun(function() {
    peopleArray = peoplePool.find({}).fetch();
    if (peopleArray.length !== 0) {
      groups = groupPeople(peopleArray);
      for (var i = 0; i < groups.length; i++) {
        var group = {};
        group.number = i;
        group.people = groups[i];

        groupPool.insert(group);
      }
    }
  });

}
 
if (Meteor.isServer) {
  var peoplePool = new Meteor.Collection('peoplePool');
  var groupPool = new Meteor.Collection('groupPool');
  Meteor.methods({
    'superclear' : function() {
      peoplePool.remove({});
      groupPool.remove({});
    }
  });
}
