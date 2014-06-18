var socket = io("0.0.0.0:3000");

socket.emit('createNote');

var lastValue = '';
$("#textbox").on('change keyup paste mouseup', function() {
  setTimeout(function() {
    if ($("#textbox").val() != lastValue) {
      lastValue = $("#textbox").val();
      socket.emit('updateNote', lastValue);
      console.log('I really changed the text.');
    }
  }, 1000);
});