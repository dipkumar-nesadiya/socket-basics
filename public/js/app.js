const socket = io();

socket.on('connect', () => {
    console.log('Connected on socket.io !!!');
});

socket.on('message', function(message) {
    
    let momentTimestamp = moment().utc(message.timestamp);
    
    console.log('New Message ... ');
    console.log(message.text);

    jQuery('.messages').append(`<p> <strong> ${momentTimestamp.format('hh:mm A')} </strong> : ${message.text} </p>`);
});

// Handles submitting of new message

let $form = jQuery('#message-form');
$form.on('submit', (event) => {
    event.preventDefault();

    let $message = $form.find('input[name=message]');

    socket.emit('message', {
        text : $message.val()
    });

    $message.val('');
});