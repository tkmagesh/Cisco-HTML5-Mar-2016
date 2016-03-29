var http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs');

var staticExtns = [".html", ".css", ".js", ".ico", ".jpg"];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

var server = http.createServer(function(req, res){
	req.url = url.parse(req.url === '/'  ? '/index.html' : req.url);

	if (isStatic(req.url.pathname)){
		var resourcePath = path.join(__dirname, req.url.pathname);
		if (fs.existsSync(resourcePath)){
			fs.createReadStream(resourcePath).pipe(res);
			return;
		} else {
			res.statusCode = 404;
			res.end();
		}
	} else if (req.url.pathname === '/time'){
		res.writeHead(200, {
			"content-type" : "text/event-stream",
			"connection" : "keep-alive"
		});
		setInterval(function(){
			res.write("event: time\n");
			res.write("data: " + new Date().toString() + "\n\n");
		},3000);
		fs.watch(path.join(__dirname , '/index.html'), function(){
			res.write("event: fileChange\n");
			res.write("data: " + 'index.html changed at ' + new Date().toString() + "\n\n");
		});
	} else {
		res.write('coming soon!');
		res.end();
	}
});

server.listen(8080);
console.log('server listening on port 8080!');