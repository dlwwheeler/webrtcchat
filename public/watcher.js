const video = document.querySelector("video");
const thisPeer = new Peer('thatID', {secure: true, key:"peerjs", host:"135.180.41.233", port:9000, path:"/home/devan/Projects/webrtcchat"});
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
thisPeer.on('call', function(call) {
	getUserMedia({video: true, audio: true}, function(stream) {
		call.answer(stream); // Answer the call with an A/V stream.
		call.on('stream',function(remoteStream) {
			video.srcObject = remoteStream;
		});
	}, function(err){
		console.log('Error with stream', err);
	});
});


