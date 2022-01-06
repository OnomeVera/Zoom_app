const videoElement = document.querySelector('#userVid')
const btn = document.querySelector('button')

const settings = {
    video: true,
    audio: true,
}

function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
        track.stop();
    });

    videoElem.srcObject = null;
}

navigator.mediaDevices.getUserMedia(settings)
.then(mediaStreamObj => {
    if ('srcObject' in videoElement)
    videoElement.srcObject = mediaStreamObj
    else
    videoElement.src = window.URL.createObjectURL(mediaStreamObj)

    videoElement.onloadedmetadata = () => {
        videoElement.play()
    }
})

btn.onclick = () => stopStreamedVideo(videoElement)