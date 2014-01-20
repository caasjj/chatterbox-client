// YOUR CODE HERE:
var Chatterbox = function() {
   // private data
  var username      = window.location.search.slice( window.location.search.search('=')+1 );
  var roomsList     = [];
  var roomsJoined   = [];
  var onlineUsers   = [];
  var friends       = [];
  var timer         = null;

  // public data
  this.chatterboxUrl = "https://api.parse.com/1/classes/chatterbox";

  // Class methods
  Chatterbox.start = function(func) {
    timer = setInterval(_.bind(func, this), 2000);
  };

  Chatterbox.stop = function() { 
    clearInterval( timer );
  }

};

// private methods
Chatterbox.prototype._fetch = function() {

};

Chatterbox.prototype._transmit = function(roomName) {

};

Chatterbox.prototype._transmitError = function() {

};

Chatterbox.prototype._parseReceiveMessage = function() {

};

Chatterbox.prototype._receiveError = function() {

};

// public API
Chatterbox.prototype.sendMessage = function(message) {

};

Chatterbox.prototype.receiveMessage = function(objectId) {

};

Chatterbox.prototype.createRoom = function(roomName) {

};

Chatterbox.prototype.joinRoom = function(roomName) {

};

Chatterbox.prototype.leaveRoom = function(roomName) {

};

Chatterbox.prototype.addToFollowList = function(username) {

};

Chatterbox.prototype.removeFromFollowList = function(username) {

};


/*


var chatterbox = (function(username) {

 // private data
  var chatterboxUrl = "https://api.parse.com/1/classes/chatterbox";
  var roomsList = [];
  var roomsJoined = [];
  var onlineUsers = [];
  var myFriends = [];
  var timer = null;

  // private methods
  var composeMessage = function(message) {
  };

  var objectId = null;

  var transmitSuccess = _.bind( function(data) {
        console.log('chatterbox: Message sent - ', data);
        objectId = data.objectId;
        this.readMessage();
  }, this);

  var transmit = function(message) { 
    $.ajax({
      // always use this url
      url: chatterboxUrl,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: _.bind( function (data) {
        console.log('chatterbox: Message sent - ', data);
        objectId = data.objectId;
        this.readMessage();
      }, this),
      error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  // public API
  var sendMessage = function(message) {
    transmitMessage.call(this, {
      username: username,
      message: message,
      roomname: 'aroom'
    });

  };
  
  var fetch = function() {
      console.log('Reading message with objectId' , chatterboxUrl+'/'+objectId)
      $.ajax({
      // always use this url
      url: chatterboxUrl+'/'+objectId,
      type: 'GET',
      success: function (data) {
        console.log('chatterbox: Message received - ', data);
      },
      error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to read message');
      }
    });
  };

  var createRoom = function(roomName) {
  };

  var joinRoom = function(roomName) {
  
  };

  var displayMessage = function() {

  };

  var updateScreen = function() {

  };

  var start = function() {
    timer = setInterval( fetch.call(this), 2000);
  }

  var stop = function() {
    clearInterval( timer );
  }
  return {
    sendMessage: sendMessage,
    readMessage: readMessage
  };

}).call(this, window.location.search.slice( window.location.search.search('=')+1 ) );


  chatterbox.sendMessage('Hello World');

  */

