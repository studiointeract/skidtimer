People = new Meteor.Collection('people');

if (Meteor.isClient) {
  Template.people.helpers({
    people: function () {
      return People.find();
    },

    timer: function() {
      var time = Math.max(0, Session.get('now') - this.timestamp);
      return moment.utc(time).format("mm:ss");
    },

    total: function() {
      var time = Math.max(0, this.end - this.timestamp);
      return moment.utc(time).format("mm:ss");
    }
  });

  Template.people.events({
    'submit form': function (event, template) {
      event.preventDefault();
      var namn = template.find('input').value;
      People.insert({name: namn});
      template.find('input').value = '';
    },

    'click li': function() {
      if (!this.timestamp) {
        People.update({_id: this._id}, {$set: {timestamp: (+new Date)}});
      }
      else {
        People.update({_id: this._id}, {$set: {end: (+new Date)}});
      }
    }
  });

  Meteor.setInterval(function() {
    Session.set('now', (+new Date));
  }, 500);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
