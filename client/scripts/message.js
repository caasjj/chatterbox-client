var MessageList = function(depth) {
  this.messages = [];
  this.depth = depth || 50;
};

MessageList.prototype.addMessages = function(messages) {
  this.messages = this.messages.concat( messages );
  this.messages = this.messages.splice(-this.depth);
};

MessageList.prototype.filter = function( filterList ) {
  if (filterList.hasOwnProperty('rooms')) {
    filter = 'room';
  } else if (filterList.hasOwnProperty('friends')) {
    filter = 'friend';
  } else {
    return this.messages.slice(0);
  }
  return this.messages.filter( function(message) {
    return filterList[filter+'s'].indexOf( message[filter]) > -1;
  });
};

var Message = function(message, username, room) {
  this.message  = message;
  this.username = username;
  this.room     = room;
};

Message.prototype.json = function() {
  return JSON.stringify( {
    username: this.username,
    message: this.message,
    room: this.room
  } );
};

Message.prototype.parse = function(messageJSON) {
  return JSON.parse( messageJSON );
};
