var MessageList = function(depth) {
  this._messages = [];
  this._depth = depth || 100;
};

MessageList.prototype.addMessages = function(messages) {
  for(var i=0; i<messages.length; i++) {
    this._messages.push( new Message(messages[i]) );
  }
  this._messages = this._messages.splice(0, this._depth);
};

MessageList.prototype.filter = function( filterList ) {
  if (filterList.hasOwnProperty('rooms')) {
    var filter = 'rooms';
    var field = 'roomName';
  } else if (filterList.hasOwnProperty('friends')) {
    var filter = 'friends';
    var field = 'username'
  } else {
    return this._messages.slice(0);
  }
  return this._messages.filter( function(message) {
    return filterList[filter].indexOf( message[field]) > -1;
  });
};

var Message = function(message) {
  this.text = message.text;
  this.username = message.username;
  this.createdAt = message.createdAt || undefined;
  this.roomName = message.roomname;
  this.objectId = message.objectId;

};

Message.prototype.json = function() {
  return JSON.stringify( {
    text: this.text,
    username: this.username,
    roomname: this.roomName,
    createdAt: this.createdAt
  } );
};

Message.prototype.parse = function(messageJSON) {
  return JSON.parse( messageJSON );
};
