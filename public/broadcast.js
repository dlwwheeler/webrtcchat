const video = document.querySelector("video");
const thisPeer = new Peer('thisID',{host: "135.180.41.233", port:9000,key:"peerjs",path:"/home/devan/Projects/webrtcchat"});
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
getUserMedia({video: true, audio: true}, function(stream) {
	var call = thisPeer.call('thatID', stream);
	call.on('stream', function(remoteStream) {
		video.srcObject = remoteStream;
	});
}, function (err) {
	console.log('failed to get stream', err);
});


