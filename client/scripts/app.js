// YOUR CODE HERE:
var Chatterbox = function() {
   // private data
  var timer          = null;

  // parameters
  this._username      = window.location.search.slice( window.location.search.search('=')+1 );
  this._roomsList     = {};
  this._roomJoined    = null;
  this._onlineUsers   = {};
  this._friendsList   = {};
  this._messageList   = new MessageList(30);

  // public data
  this._chatterboxUrl = "https://api.parse.com/1/classes/chatterbox";

  // displays
  this._chatDisplay = Handlebars.compile( $('#chats').html() );
  this._usersDisplay=Handlebars.compile( $('#users').html() );

  // Class methods
  Chatterbox.start = function(func) {
    timer = setInterval(_.bind(func, this), 2000);
  };

  Chatterbox.stop = function() {
    clearInterval( timer );
  };

};

// private methods
Chatterbox.prototype._transmit = function(message) {
  return $.ajax({
      url: this._chatterboxUrl,
      type: 'POST',
      data: message.json(),
      contentType: 'application/json'
    });
};

Chatterbox.prototype._transmitError = function(xhr, ajaxOptions, thrownError) {
  console.error('Message transmission failed!');
};

Chatterbox.prototype._transmitSuccess = function(response) {
  console.log("Message transmitted successfully: ", response);
  this.fetchMessages();
}

Chatterbox.prototype._receiveError = function(jqXhr, status) {
  console.error('Error while receiving messages: ', jqXhr.responseText );
};

Chatterbox.prototype._fetch = function(objectId) {
  var url = this._chatterboxUrl + (objectId ? '/' + objectId : '');
  url = url + '?order=-createdAt';
  console.log('fetch url ', url)
  return $.ajax({
      url: url,
      type: 'GET',
      limit: 500,
      contentType: 'application/json'
    });
};

Chatterbox.prototype._updateUserList = function() {
  for(var i=0; i < this._messageList._messages.length; i++) {
    this._onlineUsers[ this._messageList._messageList[i].username ] = 
       this._messageList._messages[i].username;
  }
};

Chatterbox.prototype._parseReceiveMessage = function(data, ajaxOptions, thrownError) {
  if (data.hasOwnProperty('results')) {
    this._messageList.addMessages( data.results );
  } else {
    this._messageList.addMessages( [data] );
  }
  var html = this._chatDisplay( this._messageList._messages );
  $('.chat-display').append(html);

  var html = this._chatDisplay( this._onlineUsers._messages );
};

// public API
Chatterbox.prototype.sendMessage = function(message) {
  var that = this;
    this
      ._transmit(message)
      .done(function() { that._transmitSuccess(); } )
      .fail(function() { that._transmitError(); } )
      .always(function() {
              console.log('Message transmission complete');
            });
};

Chatterbox.prototype.fetchMessages = function(objectId) {
  var that = this;
   this
     ._fetch(objectId)
     .done( _.bind( this._parseReceiveMessage, this)  )
     .fail( function() { that._receiveError(); } ) 
     .always( function() {
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

var chatterbox = new Chatterbox();
var message = new Message({
  text: 'Hello there',
  username: 'Billy',
  roomname: 'chatroom'
});
chatterbox.sendMessage(message);


