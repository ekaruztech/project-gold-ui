const express = require('express');
const path = require('path');
const http = require('http');
const livereload = require('livereload');
const app = express();
// Create a livereload server
const reloadServer = livereload.createServer({
	// Reload on changes to these file extensions.
	exts: [ 'css', 'html' ],
	// Print debug info
	debug: false,
	originalPath: 'localhost:4000'
});

// Specify the folder to watch for file-changes.
reloadServer.watch(path.join(__dirname + '/public'));
// Put livereload scripts in your client
app.use(require('connect-livereload')({
	port: 35729
}));

app.use(express.static(__dirname + '/public'));
app.get('/*', function(req, res) {
	return res.sendFile(path.join(__dirname + '/public/index.html'));
});


const server = http.createServer(app);
app.set('port', process.env.PORT || 4000);
const port = app.get('port');
server.listen(port, () => {
	console.log(`Application listening on ${app.get('port')}`);
});
