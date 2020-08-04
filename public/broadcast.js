const peerConnections = {};
//establish ice
const config = {
	iceServers:[
		{
			urls:["stun:stun.l.google.com:19302"]
		}
	]
};

//set up video
const socket = io.connect(window.location.origin);
const video = document.querySelector("video");

const constraints = {
	video: { facingMode: "user" }
	//audio: true
}

//get video from camera
navigator.mediaDevices
	.getUserMedia(constraints)
	.then(stream => {
		video.srcObject = stream;
		socket.emit("broadcaster");
	}).catch(error => console.error(error));

//rct connection
socket.on("watcher", id=> {
	const peerConnection = new RTCPeerConnection(config);
	peerConnections[id] = peerConnection;

	let stream = video.srcObject;
	stream.getTracks().forEach(track => peerConnection.addTrack(track,stream));

	peerConnection.onicecandidate = event => {
		if (event.candidate) {
			console.log(event.candidate);
			socket.emit("candidate", id, event.candidate);
		}
	};

	peerConnection
		.createOffer()
		.then(sdp => peerConnection.setLocalDescription(sdp))
		.then(() => {
			socket.emit("offer", id, peerConnection.localDescription);
		});
});

//more socket stuff	
socket.on("answer", (id, description) => {
	peerConnections[id].setRemoteDescription(description);
});

//handling potential candidate
socket.on("candidate", (id, candidate) => {
	console.log(candidate);
	peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on("disconnectPeer", id =>{
	peerConnections[id].close();
	delete peerConnections[id];
});

window.onunload = window.onbeforeunload = () => {
	socket.close()
};

