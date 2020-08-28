const video = document.querySelector("video");
const thisPeer = new Peer('thatID', {host:"js.devan-wheeler.net", port:9000, secure:true});
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


