var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
const socket = io();

jQuery('.room-title').text(room);

socket.on('connect', () => {
    console.log('Connected on socket.io !!!');

    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    
    let momentTimestamp = moment().utc(message.timestamp);
    let $message = jQuery('.messages');
    let $messages = jQuery('<li class="list-group-item">  </li>')
    
    console.log('New Message ... ');
    console.log(message.text);

    $messages.append(`<p> <strong> ${message.name} - ${momentTimestamp.format('hh:mm A')} </strong> : </p>`);
    $messages.append(`<p> ${message.text} </p>`);
    $message.append($messages);
});

// Handles submitting of new message

let $form = jQuery('#message-form');
$form.on('submit', (event) => {
    event.preventDefault();

    let $message = $form.find('input[name=message]');

    socket.emit('message', {
        name : name,
        text : $message.val()
    });

    $message.val('');
});