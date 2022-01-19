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
    
    console.log('New Message ... ');
    console.log(message.text);

    $message.append(`<p> <strong> ${message.name} - ${momentTimestamp.format('hh:mm A')} </strong> : </p>`);
    $message.append(`<p> ${message.text} </p>`);
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