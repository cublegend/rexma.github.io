const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

//test vars
const threshold = 5; //how many consecutive passes is needed to pass the detection
const epsilon = 0.1;
var locks = 2;
var count = 0;

window.onload = function() {
    console.log(videoElement);
}

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#F9CDAD', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#83AF9B', lineWidth: 2});
    }

    //testing..
    let vec1 = results.multiHandLandmarks[0][4]; //finger 1
    let vec2 = results.multiHandLandmarks[0][8]; //finger 2
    let vec3 = results.multiHandLandmarks[0][12]; //finger 3
    let vec4 = results.multiHandLandmarks[0][16]; //finger 4
    let vec5 = results.multiHandLandmarks[0][20]; //finger 5
    let vectors = new Array(vec1, vec2, vec3, vec4, vec5);

    if (locks == 2) {
        if (AllVectorsTogether(vectors, 0.6)) {
            count++;
            if (count > threshold) {
                count = 0;
                locks--;
            }
        }
        else {
            count = 0;
        }
    }
    else if (locks == 1) {
        if (!AllVectorsTogether(vectors, 0.6)) {
            count++;
            if (count > threshold) {
                count = 0;
                locks--;
            }
        }
        else {
            count = 0;
        }
    }
    else if (locks == 0) {
        console.log("create new sphere!!");        
        locks = 2;
        console.log(drawLandmarks());
        //create a sphere object
        

    }

    //finish testing

};

animate();
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();


//added functions
function Vector3Equals(vec1, vec2, epsilon) {
    if (Math.abs(vec2.x - vec1.x) <= epsilon &&
        Math.abs(vec2.y - vec1.y) <= epsilon &&
        Math.abs(vec2.z - vec1.z) <= epsilon) {
            return true;
        }
        return false;
}

function AllVectorsTogether(vectors, percentage) {
    let num = percentage * 16;
    let count = 0;
    for(var i = 0; i < vectors.length; i++) {
        for (var j = 0; j < vectors.length; j++) {
            if (i != j) {
                if (Vector3Equals(vectors[i], vectors[j], epsilon)) {
                    count++;
                    if (count >= num){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}