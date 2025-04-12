//BINARY CONVERTER
function stupid(txt){
  txt = txt.toLowerCase()
  let bin = ""
  let bytes = new TextEncoder("utf-8", { NONSTANDARD_allowLegacyEncoding: true }).encode(txt);
  //bytes = bytes.split(",");
  for(var i=0; i<bytes.length; i++)
  {
     var b=bytes[i].toString(2);
     if( b.length<8 ) b='0'.repeat(8-b.length)+b;
     bin+=b;
  }
  return(bin)

}


function getBinary(message){
    let input = message.toLowerCase();
    let output = "";
    if(input.length > 0){
      let test = 8 - (input[0].codePointAt(0).toString(2).length);
      if(test < 0){
        output = stupid(input);
        return output
      }
    }
    for (let i = 0; i < input.length; i++){
        
        let cc = 8 - (input[i].codePointAt(0).toString(2).length);
        output += "0".repeat(cc) + input[i].charCodeAt(0).toString(2) + "";

    }

    return(output)
 }

//GET DOTCOUNT
function getDotCount(bincode){
    let ml = bincode.length;
    //odd nums
    c = 0;
    let dc;
    let t;
    for(let i = 1; i < 1000; i+=2){
        c += 1;
        let total = (c*c) + ((c + 1)*(c+1));
        if(total >= ml){
            dc = i+2;
            t = total;
            break
        }
        
    }
    return [dc,t];
}
function isInt(n) {
    return n % 1 === 0;
 }
//GET SPACES TO BE ADDED
function consecutive(n){
    count = 0;
    let centerDot = Math.floor(dotCount/2);
    for(let j = 0; j < n; j++){
        let d = Math.abs((j) - (centerDot));
         d = d * 2;
        let rowDots = dotCount - d
        count += rowDots
    }
    return count
}
function isCenteredSqrNum(inputNum) {
    if (inputNum === 1) {
    return true;
    }
    let n = 1;
    while (true) {
        let triangularNum = (n * (n + 1)) / 2;
        let ans = 4 * triangularNum;
        ans = ans + 1;
        
        if (ans === inputNum) {
            return (n * 2)+1;
        } else if (ans > inputNum) {
            return false;
        }
        n = n + 1;
    }
}
function insertSpaces(bincode){
    let ml = bincode.length;
    let diff = totalDots - ml;
    let txt2 = bincode;
    let centerDot = Math.floor(dotCount/2);
    function getRowDots(x){
        let d = Math.abs((x) - (centerDot));
        d = d * 2;
        return(dotCount - d)
    }

    if(diff == 1){
        let start = Math.floor(totalDots/2);
        txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
    } else if(isInt(Math.sqrt(diff))){
        let sq = Math.sqrt(diff);
        let startRow = (dotCount - sq) / 2
        let start;
        for(i = 0; i < sq; i++){
            // let d = Math.abs((sq + i) - (centerDot));
            // d = d * 2;
            // let rowDots = dotCount - d     
            let rowDots = getRowDots(startRow+i)
            let half = (rowDots - sq)/2  
            start = consecutive(startRow+i) + half;
            txt2 = txt2.slice(0, start) + ".".repeat(sq) + txt2.slice(start);
        }       
    }else if(isCenteredSqrNum(diff)){
        let nearest_sq = isCenteredSqrNum(diff); //5
        let startingrow = (dotCount - nearest_sq)/2;
        let startingCount = consecutive(startingrow)

        for (let i=0; i < nearest_sq; i++){
            let start = consecutive(startingrow + i)
            let rowDots = getRowDots(startingrow+i)  
            let newrowDots = nearest_sq - (2 * Math.abs(i - Math.floor(nearest_sq/2)));
            let half = (rowDots - newrowDots)/2
            start = start + half;
            txt2 = txt2.slice(0, start) + ".".repeat(newrowDots) + txt2.slice(start);
        }

    }else{
        if(isCenteredSqrNum(diff - 4)){
            let nearest_sq = isCenteredSqrNum(diff - 4); //5
            let startingrow = (dotCount - nearest_sq)/2;
            let startingCount = consecutive(startingrow)
            start = startingCount - ((getRowDots(startingrow) - 1) /2 );
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            for (let i=0; i < nearest_sq; i++){
                let start = consecutive(startingrow + i)
                let rowDots = getRowDots(startingrow + i)  
                let newrowDots = nearest_sq - (2 * Math.abs(i - Math.floor(nearest_sq/2)));
                if(i == Math.floor(nearest_sq/2)){
                    newrowDots = newrowDots + 2
                }
                let half = (rowDots - newrowDots)/2
                start = start + half;
                txt2 = txt2.slice(0, start) + ".".repeat(newrowDots) + txt2.slice(start);
            }
            start = consecutive(startingrow + (nearest_sq)) + ((getRowDots((startingrow + (nearest_sq))) - 1 ) / 2);
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);


        }else if(isInt(Math.sqrt(diff - 4))){
          let sq = Math.sqrt(diff - 4);
          let startRow = (dotCount - sq) / 2
          let start;
          let startingCount = consecutive(startRow) + sq;
          start = consecutive(startRow) - ((getRowDots(startRow - 1) - 1) /2 ) - 1;
          txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
          for(i = 0; i < sq; i++){
              // let d = Math.abs((sq + i) - (centerDot));
              // d = d * 2;
              // let rowDots = dotCount - d     
              let rowDots = getRowDots(startRow+i)
              if(i == Math.floor(sq/2)){
                rowDots = rowDots + 2
              }
              let half = (rowDots - sq)/2  
              start = consecutive(startRow+i) + half;
              if(i == Math.floor(sq/2)){
                start = consecutive(startRow+i) + half - 2;
                txt2 = txt2.slice(0, start) + ".".repeat(sq + 2) + txt2.slice(start);

              }else{
                txt2 = txt2.slice(0, start) + ".".repeat(sq) + txt2.slice(start);

              }
          }
          start = consecutive(startRow + (sq)) + ((getRowDots((startRow + (sq))) - 1 ) / 2);
          txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
        }else if(isInt(Math.sqrt(diff - 8))){
          let sq = Math.sqrt(diff - 8);
          let startRow = (dotCount - sq) / 2
          let start;
          let startingCount = consecutive(startRow)
          start = consecutive(startRow - 1) - ((getRowDots(startRow - 1) - 1) /2 );
          txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
          start = startingCount - ((getRowDots(startRow) - 1) /2 );
          txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
          for(i = 0; i < sq; i++){
              // let d = Math.abs((sq + i) - (centerDot));
              // d = d * 2;
              // let rowDots = dotCount - d     
              let rowDots = getRowDots(startRow+i)
              if(i == Math.floor(sq/2)){
                  rowDots = rowDots + 4
              }
              let half = (rowDots - sq)/2  
              start = consecutive(startRow+i) + half;
              if(i == Math.floor(sq/2)){
                start = consecutive(startRow+i) + half - 4;
                txt2 = txt2.slice(0, start) + ".".repeat(sq + 4) + txt2.slice(start);

              }else{
                txt2 = txt2.slice(0, start) + ".".repeat(sq) + txt2.slice(start);

              }
          }
          start = consecutive(startRow + (sq)) + ((getRowDots((startRow + (sq))) - 1 ) / 2);
          txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
          start = consecutive(startRow + (sq) + 1) + ((getRowDots((startRow + (sq) + 1)) - 1 ) / 2);
          txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
        }else if(isCenteredSqrNum(diff - 8)){
            let nearest_sq = isCenteredSqrNum(diff - 8); //5
            let startingrow = (dotCount - nearest_sq)/2;
            let startingCount = consecutive(startingrow)
            start = consecutive(startingrow - 1) - ((getRowDots(startingrow - 1) - 1) /2 );
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            start = startingCount - ((getRowDots(startingrow) - 1) /2 );
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            for (let i=0; i < nearest_sq; i++){
                let start = consecutive(startingrow + i)  
                let rowDots = getRowDots(startingrow + i)  
                let newrowDots = nearest_sq - (2 * Math.abs(i - Math.floor(nearest_sq/2)));
                if(i == Math.floor(nearest_sq/2)){
                    newrowDots = newrowDots + 4
                }
                let half = (rowDots - newrowDots)/2
                start = start + half;
                txt2 = txt2.slice(0, start) + ".".repeat(newrowDots) + txt2.slice(start);

            }

            start = consecutive(startingrow + (nearest_sq)) + ((getRowDots((startingrow + (nearest_sq))) - 1 ) / 2);
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            start = consecutive(startingrow + (nearest_sq) + 1) + ((getRowDots((startingrow + (nearest_sq) + 1)) - 1 ) / 2);
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            


        }else if(isCenteredSqrNum(diff - 12)){
            let nearest_sq = isCenteredSqrNum(diff - 12); //5
            let startingrow = (dotCount - nearest_sq)/2;
            let startingCount = consecutive(startingrow)
            start = consecutive(startingrow - 2) - ((getRowDots(startingrow - 2) - 1) /2 );
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            start = consecutive(startingrow - 1) - ((getRowDots(startingrow - 1) - 1) /2 );
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            start = startingCount - ((getRowDots(startingrow) - 1) /2 );
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            for (let i=0; i < nearest_sq; i++){
                let start = consecutive(startingrow + i)  
                let rowDots = getRowDots(startingrow + i)  
                let newrowDots = nearest_sq - (2 * Math.abs(i - Math.floor(nearest_sq/2)));
                if(i == Math.floor(nearest_sq/2)){
                    newrowDots = newrowDots + 6
                }
                let half = (rowDots - newrowDots)/2
                start = start + half;
                txt2 = txt2.slice(0, start) + ".".repeat(newrowDots) + txt2.slice(start);

            }

            start = consecutive(startingrow + (nearest_sq)) + ((getRowDots((startingrow + (nearest_sq))) - 1 ) / 2);
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            start = consecutive(startingrow + (nearest_sq) + 1) + ((getRowDots((startingrow + (nearest_sq) + 1)) - 1 ) / 2);
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            start = consecutive(startingrow + (nearest_sq) + 2) + ((getRowDots((startingrow + (nearest_sq) + 2)) - 1 ) / 2);
            txt2 = txt2.slice(0, start) + "." + txt2.slice(start);
            


        } else{
           console.log(diff) 
        }
        
    }
    return(txt2)
}
let textbox, button;
let dotCount; //has to be an odd number
let middle = 0;
let coords = []; //all dots
let coords2 = []; //the 1's
let coords3 = []; //the 0's
let kolams = []; //the 1's
let kolams2 = []; //the 0's
let kolamsblank = []; //the middle's
let dotRadius = 5;
let totalDots;
let fw; //width and height of entire kolam based on number of dots
let fh;
let messageinput = "kolam.codes"
let message;
let blank=[];
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
function makeGrid() {
  fw = width / dotCount;
  fy = height / dotCount;
  dotRadius = fw / 9;

  let count = 0;
  for (let y = 0; y < dotCount; y++) {
    for (let x = 0; x < dotCount; x++) {
      let r = range(abs(middle - y), dotCount - abs(middle - y) - 1);

      if (r.includes(x)) {
        fill(255);
        coords.push([x * fw + fw / 2, y * fy + fy / 2]);
        if (message[count] === "1") {
          coords2.push([x * fw + fw / 2, y * fy + fy / 2]);
        }
        if (message[count] === "0") {
          coords3.push([x * fw + fw / 2, y * fy + fy / 2]);
        }
        if(message[count] === "."){
            blank.push([x * fw + fw / 2, y * fy + fy / 2]);
        }
            
        count += 1;
      } else {
        fill("#023d3a");
      }

      noStroke();
      ellipse(x * fw + fw / 2, y * fy + fy / 2, dotRadius, dotRadius);
    }
  }
}

/**************************/
/******* p5 code **********/
/**************************/
function saveIt(){
  saveCanvas()
}
function setup() {
    let btn = createButton('download kolam');
    btn.mousePressed(saveIt)
    
    textbox = createInput("kolam.codes");
    textbox.changed(checkEnter)
    rectMode(CENTER);
    angleMode(DEGREES);
    frameRate(5);
  
    button = createButton('submit');
    button.mousePressed(generate);
    textbox.parent("kolam")
    button.parent("kolam")
    let c;
   if(window.innerWidth > 768){
    c = createCanvas(window.innerHeight/1.2, window.innerHeight/1.2);

   }else{
    c = createCanvas(window.innerHeight/2, window.innerHeight/2);

   }

    c.parent("kolam")
    textAlign(CENTER);
    textSize(50);

    noLoop();
 
    describe('Curving lines loop around a perfect square or diamond shaped grid of dots. The lines are either yellow, pink, or white.');
}

function draw() {
  coords = []; //all dots
  coords2 = []; //the 1's
  coords3 = []; //the 0's
  kolams = []; //the 1's
  kolams2 = []
  kolamsblank = [];
  blank = []
  dotCount = getDotCount(getBinary(messageinput))[0];
  totalDots = getDotCount(getBinary(messageinput))[1];
  message = insertSpaces(getBinary(messageinput))
  middle = floor(dotCount / 2);
  background("#023d3a");
  makeGrid();
  for (let i = 0; i < coords2.length; i++) {
    kolams.push(new KolamDot(i, false));
  }
  for (let i = 0; i < coords3.length; i++) {
    kolams2.push(new KolamDot(i, true));
  }
  for (let i = 0; i < blank.length; i++) {
    kolamsblank.push(new KolamDot(i, "blank"));
  }
  noFill();
  stroke(255);
  strokeWeight(dotRadius);


   
  
  for (let i = 0; i < kolams.length; i++) {
    kolams[i].draw();
  }
  for (let i = 0; i < kolams2.length; i++) {
    kolams2[i].draw();
  }
  for (let i = 0; i < kolamsblank.length; i++) {
    kolamsblank[i].draw();
  }
}

function generate(){
    document.querySelector("canvas").classList.add("animate");
    setTimeout(function(){
      document.querySelector("canvas").classList.remove("animate");
    },2500)
    messageinput = textbox.value();
    redraw()
}
function checkEnter(){
  if (keyCode === ENTER) {
    generate()
  }
}
function keyPressed(){
    if (keyCode === ENTER) {
      generate()
    }
}
/**************************/
/**** Kolam Dot Class *****/
/**************************/
class KolamDot {
  constructor(index, c) {
    this.index = index;
    this.c = c;
    this.neighbors = this.getNeighbors(this.c);
    this.type = this.getRandomType();
  }

  evaluateType() {
    let currentTypes = this.type;
    if(this.c == 'blank'){
        for (let i = 0; i < kolamsblank.length; i++) {
            if (this.neighbors.includes(kolamsblank[i].index)) {
              /* if a neighbor is pointing to it*/
              let d = determineDir(kolamsblank[i].index, this.index, this.c);
              if (kolamsblank[i].type.includes(d) && !this.type.includes(opposite(d))) {
                this.type.push(opposite(d));
              }
            }
          }
    }else if (this.c) {
      for (let i = 0; i < kolams2.length; i++) {
        if (this.neighbors.includes(kolams2[i].index)) {
          /* if a neighbor is pointing to it*/
          let d = determineDir(kolams2[i].index, this.index, this.c);
          if (kolams2[i].type.includes(d) && !this.type.includes(opposite(d))) {
            this.type.push(opposite(d));
          }
        }
      }
    } else {
      for (let i = 0; i < kolams.length; i++) {
        if (this.neighbors.includes(kolams[i].index)) {
          /* if a neighbor is pointing to it*/
          let d = determineDir(kolams[i].index, this.index, this.c);
          if (kolams[i].type.includes(d) && !this.type.includes(opposite(d))) {
            this.type.push(opposite(d));
          }
        }
      }
    }
    if (this.type.length < 1) {
      this.type.push("O");
    }
  }
  getRandomType() {
    let r = random(this.neighbors);
    let types = [];
    for (let i = 0; i < this.neighbors.length; i++) {
      let t = determineDir(this.index, this.neighbors[i], this.c);
      types.push(t);
    }
    // let t = determineDir(this.index, r, this.c);
    return types;
  }
  draw() {
    noFill();
    stroke(255);
    strokeWeight(dotRadius);
    let x;
    let y;
    if(this.c == "blank"){
        stroke("darksalmon")
        x = blank[this.index][0];
        y = blank[this.index][1];
    }else if (this.c) {
      stroke("peachpuff");
      x = coords3[this.index][0];
      y = coords3[this.index][1];
    } else {
      x = coords2[this.index][0];
      y = coords2[this.index][1];
    }

    let s = dotRadius * 6;
    this.evaluateType();
    if (this.type.includes("O") && this.type.length > 1) {
      for (var i = 0; i < this.type.length; i++) {
        if (this.type[i] == "O") {
          this.type.splice(i, 1);
          i--;
        }
      }
    }
    if (this.type.includes("")) {
      for (var i = 0; i < this.type.length; i++) {
        if (this.type[i] == "") {
          this.type.splice(i, 1);
          i--;
        }
      }
    }
    /*****************/
    /* Just one type */
    /*****************/

    if (this.type.length == 1) {
      let dir = this.type[0];
      if (dir == "L") {
        push();
        translate(x, y);
        rotate(45); //l
        rect(0, 0, s, s, 100, 100, 100, 0);
        pop();
      } else if (dir == "R") {
        push();
        translate(x, y);
        rotate(-135); // r
        rect(0, 0, s, s, 100, 100, 100, 0);
        pop();
      } else if (dir == "U") {
        push();
        translate(x, y);
        rotate(135); // u
        rect(0, 0, s, s, 100, 100, 100, 0);
        pop();
      } else if (dir == "D") {
        push();
        translate(x, y);
        rotate(-45); //d
        rect(0, 0, s, s, 100, 100, 100, 0);
        pop();
      } else {
        push();
        translate(x, y);
        rotate(-45); //d
        rect(0, 0, s, s, 100, 100, 100, 100);
        pop();
      }
    }

    /*****************/
    /* Just two types */
    /*****************/
    if (this.type.length == 2) {
      /* are they next to each other? */
      if (this.diagonal(this.type[0], this.type[1])) {
        if (this.type.includes("R")) {
          push();
          translate(x, y);
          rotate(-45); //d
          rect(0, 0, s, s, 0, 100, 0, 100);
          pop();
        } else {
          push();
          translate(x, y);
          rotate(-135); //d
          rect(0, 0, s, s, 0, 100, 0, 100);
          pop();
        }
      } else {
        if (this.type.includes("L") && this.type.includes("U")) {
          push();
          translate(x, y);
          rotate(-45); //d
          // rotate(135) //RD
          rect(0, 0, s, s, 0, 0, 100, 100);
          pop();
        } else if (this.type.includes("R") && this.type.includes("U")) {
          push();
          translate(x, y);
          rotate(45);
          rect(0, 0, s, s, 0, 0, 100, 100);
          pop();
        } else if (this.type.includes("R") && this.type.includes("D")) {
          push();
          translate(x, y);
          rotate(135);
          rect(0, 0, s, s, 0, 0, 100, 100);
          pop();
        } else if (this.type.includes("L") && this.type.includes("D")) {
          push();
          translate(x, y);
          rotate(-135);
          rect(0, 0, s, s, 0, 0, 100, 100);
          pop();
        }
      }
    }

    /*****************/
    /*  three types */
    /*****************/
    if (this.type.length == 3) {
      push();
      translate(x, y);
      rotate(45);
      if (
        this.type.includes("L") &&
        this.type.includes("U") &&
        this.type.includes("D")
      ) {
        rect(0, 0, s, s, 0, 100, 0, 0); //LDU
      } else if (
        this.type.includes("L") &&
        this.type.includes("U") &&
        this.type.includes("R")
      ) {
        rect(0, 0, s, s, 0, 0, 100, 0); //RLU
      } else if (
        this.type.includes("R") &&
        this.type.includes("L") &&
        this.type.includes("D")
      ) {
        rect(0, 0, s, s, 100, 0, 0, 0); //RLD
      } else if (
        this.type.includes("R") &&
        this.type.includes("D") &&
        this.type.includes("U")
      ) {
        rect(0, 0, s, s, 0, 0, 0, 100); //RDU
      }
      pop();
    }
    /*****************/
    /*  four types */
    /*****************/
    if (this.type.length == 4) {
      push();
      translate(x, y);
      rotate(-135);
      rect(0, 0, s, s, 0, 0, 0, 0);
      pop();
    }

    if (this.type.length == 0) {
      push();
      translate(x, y);
      rotate(-135);
      stroke(0);
      rect(0, 0, s, s, 100, 100, 100, 100);
      pop();
    }
  }

  diagonal(a, b) {
    let together = a + b;
    if (["LD", "DL", "UL", "LU", "RD", "DR", "UR", "RU"].includes(together)) {
      return false;
    } else {
      return true;
    }
  }

  getNeighbors(three) {
    let arr;
    let c;
    if(three == "blank"){
        arr = blank;
        c = blank[this.index];
    } else if (three) {
      arr = coords3;
      c = coords3[this.index];
    } else {
      arr = coords2;
      c = coords2[this.index];
    }
    let options = [];
    let dir;
    for (let i = 0; i < arr.length; i++) {
      let d = dist(c[0], c[1], arr[i][0], arr[i][1]);
      let q = fw + dotRadius;
      let sq = sqrt(Math.pow(q, 2));
      let newA = [];
      if (d <= fw + dotRadius && arr[i] != c) {
        options.push(i);
      }
      // }else if(d <= sq + (dotRadius * 4) && (arr[i] != c)){
      //   options.push(i)
      // }
    }
    return options;
  }
}

function drawSquare(x, y, s) {
  rect(x, y, s, s, 0, 0, 0, 0);
}
function drawEyeLoop(x, y, s) {
  rect(x, y, s, s, 0, 100, 0, 100);
}
function drawPointedLoop(x, y, s) {
  rect(x, y, s, s, 0, 100, 100, 100);
}
function drawSemiLoop(x, y, s) {
  rect(x, y, s, s, 0, 0, 100, 100);
}
function ThreeQuarterLoop(x, y, s) {
  rect(x, y, s, s, 0, 0, 100, 0);
}

function drawPointedLoop(x, y) {
  rect(30, 20, 55, 55, 20, 15, 10, 5);
}

function determineDir(k, l, three) {
  let c;
  let b;
  if (!l) {
    return "O";
  }
  if (three == "blank") {
    c = blank[k]; //original
    b = blank[l]; //neighbor
  }else if (three) {
    c = coords3[k]; //original
    b = coords3[l]; //neighbor
  } else {
    c = coords2[k]; //original
    b = coords2[l]; //neighbor
  }

  let d = dist(c[0], c[1], b[0], b[1]);
  let q = fw + dotRadius;
  let sq = sqrt(Math.pow(q, 2));
  if (d <= fw + dotRadius && b != c) {
    let dir;
    if (b[0] < c[0]) {
      dir = "L";
    } else if (b[0] > c[0]) {
      dir = "R";
    } else if (b[1] < c[1]) {
      dir = "U";
    } else {
      dir = "D";
    }
    return dir;
  } else if (d <= sq + dotRadius * 4 && b != c) {
    if (b[0] < c[0]) {
      dir = "L";
      if (b[1] < c[1]) {
        dir = dir + "U";
      } else {
        dir = dir + "D";
      }
    } else if (b[0] > c[0]) {
      dir = "R";
      if (b[1] < c[1]) {
        dir = dir + "U";
      } else {
        dir = dir + "D";
      }
    }
    return dir;
  }
}

function opposite(t) {
  switch (t) {
    case "L":
      return "R";
      break;
    case "R":
      return "L";
      break;
    case "U":
      return "D";
      break;
    case "D":
      return "U";
      break;
    default:
      return "";
  }
}
