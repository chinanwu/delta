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

		socket.on('game:join', data => {
			console.log('user joined room: ' + data.room);
			socket.join(data.room);
			socket.broadcast.to(data.room).emit('user has joined room: ', data.room);
		});

		socket.on('game:leave', data => {
			console.log('user has left room: ' + data.room);
			socket.leave(data.room);
			socket.broadcast.to(data.room).emit('user has left room: ', data.room);
		});

		socket.on('game:win', data => {
			console.log('user has won');
			socket.broadcast.to(data.room).emit('someone has won', data);
		});

		socket.on('words:change', data => {
			console.log('user has changed words in room: ' + data.room);
			socket.emit('test');
			socket.broadcast
				.to(data.room)
				.emit('someone has changed the words', data);
		});

		socket.on('message', data => {
			console.log('user sent a message');
			socket.broadcast.to(data.room).emit('someone has sent a message', data);
		});
	});
};
