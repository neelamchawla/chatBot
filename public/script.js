// to establish connection we need to run io function, so instead of manually we'll pass a function here below
const socket = io();

$('#send-btn').click(() => {

    // get input value
    socket.emit('send-msg', {
        msg: $('#inp').val()
    });

    // clear input box
    $('#inp').val("");
});

socket.on('received-msg', (data) => {
    
    $('#chat').append(`<li>${data.id} --> ${data.msg}</li>`);
    
    console.log(data);
})