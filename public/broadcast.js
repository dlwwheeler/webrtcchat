const video = document.querySelector("video");
const thisPeer = new Peer('thisID',{host: "js.devan-wheeler.net", port:9000, secure:true});
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
getUserMedia({video: true, audio: true}, function(stream) {
	var call = thisPeer.call('thatID', stream);
	call.on('stream', function(remoteStream) {
		video.srcObject = remoteStream;
	});
}, function (err) {
	console.log('failed to get stream', err);
});


