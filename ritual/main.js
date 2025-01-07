
let dotCount = 29;
let coords = []; //all dots
let uncoords = [];
let nums = [];
let fs = 12;
let middle = 0;
let photo;
let drag = false;
let touchIsDown = false;
let currNum = "0";
let final = ''
let panning = false;
let fixed = [0, 1, 90, 110, 131, 132, 133, 154, 155, 156, 157, 158, 179, 180, 181, 182, 183, 184, 185, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 235, 236, 237, 238, 239, 240, 241, 262, 263, 264, 265, 266, 287, 288, 289, 310, 330]

document.querySelector("#grid").addEventListener("touchstart", function(e){
  let brect = document.querySelector("#pan-tool").getBoundingClientRect();
  let touch = e.touches[0]
  if(touch.pageX > brect.left && touch.pageY > brect.top){
      document.querySelector("#grid").classList.add("panning");
      document.querySelector("#pan-tool").classList.add("on")
      panning = true;  
  }else{
    e.preventDefault();
  }

});
 document.querySelector("#pan-tool").addEventListener("touchstart", function(e){
  e.preventDefault()
})
document.addEventListener("touchmove", (e) => {
  // if(panning){
  //   console.log('hello?')
  //   let touch = e.touches[0]
  //   document.querySelector("#pan-tool").animate({
  //       left: `${touch.pageX}px`,
  //       top: `${touch.pageY}px`
    
  //   }, {duration: 100, fill: "forwards"})
  // }
});
// document.querySelector("#pan-tool").addEventListener("touchstart", function(e){
//   // let brect = document.querySelector("#pan-tool").getBoundingClientRect();
//   // let touch = e.touches[0]
//   if(document.querySelector("#pan-tool").classList.contains("on")){
//       document.querySelector("#grid").classList.remove("panning");
//       document.querySelector("#pan-tool").classList.remove("on")
//       panning = true;  
//   }else{
//       document.querySelector("#grid").classList.add("panning");
//       document.querySelector("#pan-tool").classList.add("on")
//       panning = true;  
//   }

// });
document.addEventListener("touchend", function(){
  document.querySelector("#grid").classList.remove("panning");
  document.querySelector("#pan-tool").classList.remove("on")
  panning = false;
})

// document.querySelector("#flip").addEventListener("click", flipNumbers);

document.querySelector("#ok").addEventListener("click", function(){
  document.querySelector('.instruction-modal').classList.add('close')
});
document.querySelector("#info").addEventListener("click", function(){
  document.querySelector('.instruction-modal').classList.remove('close')
});

document.querySelector("#copy-text").addEventListener("click", function(){

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



function flipNumbers(){
   coords.forEach((coord, index) => {
    if(!fixed.includes(index)){
      if(coord.num == "1"){
        coord.num = "0"
      }else if(coord.num == "0"){
        coord.num = "1"
      }
    }
  });
  processNums(coords);
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
  final = ""
  coords.forEach((coord, index) => {
    str = str + coord.num;
    if(coord.num == ""){
      final = final + " " + (index).toString()
    }

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

function preload(){
  photo = loadImage("./assets/fkpoc.png")
}


function setup() {
  textAlign(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  if (window.innerWidth > 768) {
    c = createCanvas(window.innerWidth, window.innerWidth);
  } else {
    c = createCanvas(window.innerWidth * 2.9, window.innerWidth * 2.9 );
  }
  c.parent("#grid")
  background(0);
  middle = floor(dotCount / 2);
  makeGrid(dotCount);
  if(window.innerWidth < 768){
    var overflowContainer = document.querySelector('#grid');
    console.log(overflowContainer)
    overflowContainer.scrollLeft = (((window.innerWidth * 2.9))/2 + 50)/1.45;
    overflowContainer.scrollTop = 70;
  }
}

function draw() {

  touchIsDown = touches.length == 1;
  if (touchIsDown) {
    touchX = touches[0].x;
    touchY = touches[0].y;
  } 
  if((touchIsDown || mouseIsPressed ) && !panning){
    checkCoord()
  }
  clear();
  // background(0);  
  image(photo,0,0, width, height )
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

  coords[0].num = "0"
  coords[1].num = "1"
}

function mousePressed(){
    if(!panning){
    coords.forEach((coord, index) => {
      if(!fixed.includes(index)){
      if (dist(coord.x, coord.y, mouseX, mouseY) < coord.size / 2) {
        if(coord.num == ""){
          currNum = "0";
        }else if(coord.num == "0"){
          currNum = "1"
        }else if(coord.num == "1"){
          currNum = ""
        }
      }
    }
    });
  }
}
function touchStarted(){
  if(!panning){


  coords.forEach((coord, index) => {
    if (dist(coord.x, coord.y, mouseX, mouseY) < coord.size / 2) {
      if(coord.num == ""){
        currNum = "0";
      }else if(coord.num == "0"){
        currNum = "1"
      }else if(coord.num == "1"){
        currNum = ""
      }
    }
  });
}
}
function checkCoord() {
if(!panning){
    coords.forEach((coord, index) => {
      if(!fixed.includes(index)){
          if (dist(coord.x, coord.y, mouseX, mouseY) < coord.size / 2) {
            coord.num = currNum
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
    if(this.num == "1" ){
      fill(50, 0, 0, 160);
    }else if(this.num == "0"){
      fill(0, 0, 0, 160);
    }else{
      fill(0, 0, 0, 100);
    }
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
