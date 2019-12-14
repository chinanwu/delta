module.exports = server => {
	const io = require('socket.io')(server);
	io.origins((origin, callback) => {
		if (origin !== 'http://localhost:8080') {
			return callback('origin not allowed', false);
		}
		callback(null, true);
	});

	io.on('connection', socket => {
		console.log('a user connected');

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});

		socket.on('room:join', data => {
			console.log('user joined room: ' + data.room);
			socket.join(data.room);
		});

		socket.on('game:win', data => {
			console.log('user has won');
			socket.broadcast.to(data.room).emit('game:win', data);
		});

		socket.on('words:change', data => {
			console.log('user has changed words');
			socket.broadcast.to(data.room).emit('words:change', data);
		});

		socket.on('chat:message', data => {
			console.log('user sent a message');
			data.message = 'Player ' + data.name + ': ' + data.message;
			socket.broadcast.to(data.room).emit('chat:message', data);
		});
	});
};
