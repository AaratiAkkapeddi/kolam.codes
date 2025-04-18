let capture;
let sceneNum = 1;
let dotCount = 11;
let coords = []; //all dots
let uncoords = [];
let nums = [];
let fs = 12;
let captureMode = false;
let photo;
let middle = 0;
let zoom = 1;
let tx = 0;
let ty = 0;
let r = 0;
document.querySelector("#x").addEventListener("input", (event) => {
  tx = eval(event.target.value);
});
document.querySelector("#y").addEventListener("input", (event) => {
  ty = eval(event.target.value);
});

document.querySelector("#scale").addEventListener("input", (event) => {
  zoom = eval(event.target.value);
});
document.querySelector("#rotate").addEventListener("input", (event) => {
  r = eval(event.target.value);
});
document.querySelector("#dotNum").addEventListener("change", updateDotCount);
document.querySelector("#capture").addEventListener("click", takePhoto);
document.querySelector("#capture-remove").addEventListener("click", removePhoto);
document.querySelector("#flip").addEventListener("click", flipNumbers);
document.querySelector("#go-scene2").addEventListener("click", function(){
   document.querySelector('main').classList.add('on')
   sceneNum = 2;
})
document.querySelector("#ok").addEventListener("click", function(){
  document.querySelector('.instruction-modal').classList.add('close')
});
document.querySelector("#info").addEventListener("click", function(){
  document.querySelector('.instruction-modal').classList.remove('close')
});
document.querySelector("#go-scene1").addEventListener("click", function(){
  document.querySelector('main').classList.remove('on')
  sceneNum = 0;
})
document.querySelector("#copy-text").addEventListener("click", function(){

    // // Get the text field
    // var copyText = document.getElementById("num").innerHTML;

  
    //  // Copy the text inside the text field
    // navigator.clipboard.writeText(copyText);

    // // Alert the copied text

    





      const textField = document.getElementById('num');
  
      // Create a temporary textarea element
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = textField.innerHTML;
      document.body.appendChild(tempTextArea);
  
      // Select the text
      tempTextArea.select();
      tempTextArea.setSelectionRange(0, 99999); // For mobile devices
  
      // Copy the text
      try {
          document.execCommand('copy');
      } catch (err) {
          console.error('Failed to copy text: ', err);
      }
  
      // Remove the temporary textarea element
      document.body.removeChild(tempTextArea);
  
  
      document.querySelector("#copy-success").classList.add('on');
      setTimeout(function(){
        document.querySelector("#copy-success").classList.remove('on');
      }, 1000)





})

function updateDotCount(event) {
  document.querySelector('#scene1').classList.add('on');
  coords = [];
  uncoords = [];
  nums = [];
  clear();
  dotCount = parseInt(event.target.value);
  middle = floor(dotCount / 2);
  makeGrid(dotCount);
}

function flipNumbers(){
   coords.forEach((coord, index) => {
    if(coord.num == "1"){
      coord.num = "0"
    }else if(coord.num == "0"){
      coord.num = "1"
    }
  });
  processNums(coords);
}
function removePhoto(){
  photo = null;
  document.querySelector("#adjust-image").classList.remove('on');
  capture.remove();
  captureMode = false;
  document.querySelector("#capture-remove").classList.remove('on');
}

function takePhoto(){





  if(captureMode){
    photo = capture;
    document.querySelector("#capture").innerHTML = "retake photo";
    captureMode = false;
    capture.remove();
    document.querySelector("#capture-remove").innerHTML = "clear photo"
    document.querySelector("#capture-remove").classList.add('on');
    document.querySelector("#adjust-image").classList.add('on');
  }else{
    document.querySelector("#adjust-image").classList.remove('on');
    document.querySelector("#capture-remove").innerHTML = "stop cam"
    document.querySelector("#capture-remove").classList.add('on');
    captureMode = true;
    if (window.innerWidth < 768) {
      let constraints = {
        audio: false,
        video: {
          facingMode: {
            exact: "environment"
          }
        }    
        //video: {
          //facingMode: "user"
        //} 
      };
      capture = createCapture(constraints);
        capture.hide();
    } else {
      capture = createCapture(VIDEO)
      capture.hide();
    }
    document.querySelector("#capture").innerHTML = "take reference photo";
    
  }
}


function insertCharacter(str, n) {
  let val = [];
  let i, l;
  for (i = 0, l = str.length; i < l; i += n) {
    val.push(str.substr(i, n));
  }

  return val;
}

function binaryToText(str) {
  let output = [];
  str.split(" ").forEach((element) => {
    output.push(String.fromCharCode(parseInt(element, 2)));
  });
  return output.join("");
}

function processNums(arr) {
  let message = "";
  let str = "";
  let churChar = "";
  coords.forEach((coord, index) => {
    str = str + coord.num;
  });
  str = str.trim();
  str.split("").forEach((char, index) => {
    if (index % 8 == 0) {
      message += binaryToText(churChar);
      churChar = "";
      churChar += char;
    } else if (index == str.length - 1) {
      churChar += char;
      message += binaryToText(churChar);
      churChar = "";
    } else {
      churChar += char;
    }
  });
  message = message.trim();
  document.querySelector("#num").innerHTML = message;
}




function setup() {
  textAlign(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
 



  if (window.innerWidth > 768) {
    c = createCanvas(window.innerHeight / 1.8, window.innerHeight / 1.8);
  } else {
    c = createCanvas(window.innerHeight / 2.1, window.innerHeight / 2.1);
  }
  c.parent("#grid")
  background(0);
}

function draw() {
  clear();
  // background(0);

  if(capture && coords.length > 0){
    let h = (width * 9) / 16;
    let ratio = h / capture.height;
    var video_w = capture.width * ratio;
    let cw = video_w * 2.2;
    let ch = h * 2.2;
   
    if(!captureMode && photo){
      push()
      imageMode(CENTER);
      translate(width / 2, height / 2);
      scale(zoom);
      rotate(r);
      imageMode(CENTER)
      image(photo,tx, ty, cw, ch)
      pop()
    }else if(capture && captureMode){
      push()
      imageMode(CENTER);
      translate(width / 2, height / 2);
      scale(zoom);
      rotate(r);
      imageMode(CENTER)
      image(capture, tx,ty, cw, ch);
      pop()
    }
  }
  

  textSize(fs);
  coords.forEach((coord, index) => {
    coord.show();
  });
  uncoords.forEach((coord, index) => {
    coord.show();
  });
}

/**************************/
/* build array from range */
/**************************/
function range(start, end) {
  const ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}
/**************************/
/* setup the grid of dots */
/**************************/
function makeGrid(dotCount) {
  fw = width / dotCount;
  fy = height / dotCount;
  dotRadius = fw / 9;
  fill(0, 0, 0, 0);
  let count = 0;
  for (let y = 0; y < dotCount; y++) {
    for (let x = 0; x < dotCount; x++) {
      let r = range(abs(middle - y), dotCount - abs(middle - y) - 1);

      if (r.includes(x)) {
        stroke(255, 255,255 ,100);
        strokeWeight(0.5)
        coords.push(
          new Digit(x * fw + fw / 2, y * fy + fy / 2, dotRadius * 9, "")
        );

        count += 1;
      } else {
        uncoords.push(
          new UnDigit(x * fw + fw / 2, y * fy + fy / 2, dotRadius * 9)
        );
      }

      noStroke();
      fs = dotRadius * 4;
      // rect(x * fw , y * fy, dotRadius*9, dotRadius*9);
    }
  }
}

function mousePressed() {
  if(window.innerWidth > 768 && sceneNum == 2){
  coords.forEach((coord, index) => {
    if (dist(coord.x, coord.y, mouseX, mouseY) < coord.size / 2) {
      if (coord.num == "1") {
        coord.num = "0";
      } else if (coord.num == "0") {
        coord.num = "";
      } else {
        coord.num = "1";
      }
    }
  });
  processNums(coords);
  }
}

function touchEnded() {
  if(window.innerWidth <= 768 && sceneNum == 2){
  coords.forEach((coord, index) => {
    if (dist(coord.x, coord.y, mouseX, mouseY) < coord.size / 2) {
      if (coord.num == "1") {
        coord.num = "0";
      } else if (coord.num == "0") {
        coord.num = "";
      } else {
        coord.num = "1";
      }
    }
  });
  processNums(coords);
}
}

class Digit {
  constructor(x, y, size, num) {
    // This code runs once when an instance is created.
    this.x = x;
    this.y = y;
    this.size = size;
    this.num = num;
  }

  show() {
    // This code runs once when myFrog.show() is called.

    fill(0, 0, 0, 100);
    stroke(255, 255,255 ,100);
    strokeWeight(0.5)
    rect(this.x, this.y, this.size, this.size);
    fill(255);
    noStroke();
    text(this.num, this.x, this.y + fs / 3);
  }
}

class UnDigit {
  constructor(x, y, size) {
    // This code runs once when an instance is created.
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    // This code runs once when myFrog.show() is called.

    fill(0, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}
