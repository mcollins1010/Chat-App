//Make connection
//frontend socket is diff from the backend socket,
//io is called here cuz we now hv the cdn in the html file
const socket = io.connect('http://localhost:4000');

//get all the params from the html
//query DOM
let message = document.querySelector('#message'),
	handle = document.querySelector('#handle'),
	btn = document.querySelector('#send'),
	output = document.querySelector('#output'),
	feedback = document.querySelector('#feedback');

//Emit event
btn.addEventListener('click', function() {
	//if click => send the msg to the server
	//1st params=> give it any name u wnt for the chat and
	//ensure u maintain when calling at the backend/server
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
});

message.addEventListener('keypress', () => {
	socket.emit('typing', handle.value);
});

//listen for events from the frontend
socket.on('chat', (data) => {
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
	feedback.innerHTML = '<p><em>' + data + ', is typing a message...  </em></p>';
});
