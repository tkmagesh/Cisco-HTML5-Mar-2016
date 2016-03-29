var nodejsWebSocket = require("nodejs-websocket");

var server = nodejsWebSocket.createServer(function(connection){
	connection.on("text", function(message){
		console.log(message);
		server.connections.forEach(function(con){
			con.sendText(message);
		});
	});
});

server.listen(9090);
console.log('server listening on port 9090!');