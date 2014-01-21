// YOUR CODE HERE:
var Chatterbox = function() {
   // private data
  var timer          = null;

  // parameters
  this._username      = window.location.search.slice( window.location.search.search('=')+1 );
  this._roomsList     = [];
  this._roomsJoined   = [];
  this._onlineUsers   = [];
  this._friends       = [];
  this._messageList   = new MessageList(30);

  // public data
  this._chatterboxUrl = "https://api.parse.com/1/classes/chatterbox";

  // bind object methods to object
  for(var key in this) {
    if (typeof this[key] === 'function') {
      console.log('binding ', key);
      _.bind( this[key], this);
    }
  }

  // Class methods
  Chatterbox.start = function(func) {
    timer = setInterval(_.bind(func, this), 2000);
  };

  Chatterbox.stop = function() {
    clearInterval( timer );
  };

};

// private methods
Chatterbox.prototype._fetch = function(objectId) {
  return $.ajax({
      url: this.chatterboxUrl + (objectId && '/' + objectId),
      type: 'GET',
      contentType: 'application/json'
    });
};

Chatterbox.prototype._transmit = function(message) {
  return $.ajax({
      url: this.chatterboxUrl,
      type: 'POST',
      data: message.json(),
      contentType: 'application/json'
    });
};

Chatterbox.prototype._transmitError = function(xhr, ajaxOptions, thrownError) {
  console.error('Message transmission failed!');
};

Chatterbox.prototype._receiveError = function() {
  console.error('Error while receiving messages');
};

Chatterbox.prototype._parseReceiveMessage = function(xhr, ajaxOptions, thrownError) {
  console.log('Received messages');
};

// public API
Chatterbox.prototype.sendMessage = function(message) {
    this
      ._transmit(message)
      .then(this.fetchMessages,
            this._transmitError,
            function() {
              console.log('Message transmission complete');
            });
};

Chatterbox.prototype.fetchMessages = function(objectId) {
   this
     ._fetch(objectId)
     .then(this._parseReceiveMessage,
           this._receiveError,
           function() {
            console.log('Received new message set');
           });
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

