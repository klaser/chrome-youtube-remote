
var ws;
const ports = new Set();

console.log("Loaded on a YouTube or Udemy page: %s", window.location.hostname);

const initWsConnection = () => {
    ws = new WebSocket("ws://localhost:8887");

    ws.onopen = function() {
        ws.send(JSON.stringify({
            message: "Hello, I'm connected from the content.js file"
        }));
    };

    ws.onmessage = function(message) {
        let data = JSON.parse(message.data);
        console.log(data);
        if (data.message == "toggle") {
            togglePlayer();
        }
    };
};

const togglePlayer = () => {
    var video = document.getElementsByTagName("video")[0];
    var playButton = document.querySelectorAll('[aria-labelledby="popper1"]')[0];
    var pauseButton = document.querySelectorAll('[aria-labelledby="popper1"]')[0];
    if (window.location.hostname == "www.youtube.com") {    // YouTube
        console.log("Toggling youtube video");
        if (video.paused){
            video.play();
        } else {
            video.pause();
        }
    } else {        // Udemy
        if (playButton){
            console.log("Pausing udemy video");
            playButton.click();
        } else {
            console.log("Playing udemy video");
            pauseButton.click();
        }

    }
};

// Only attempt to establish connections to VSCode WS Server when a video is on the page.
initWsConnection();
