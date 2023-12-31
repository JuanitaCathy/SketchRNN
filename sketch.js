let model;
let strokePath = null;

let x, y;
let pen = "down";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(-width / 2, width / 2);
  y = random(-height / 2, height / 2);
  model = ml5.sketchRNN("octopus", modelReady);
  background(0);
}

function modelReady() {
  console.log("model ready");
  model.reset();
  model.generate(gotSketch);
}

function draw() {
  translate(width / 2, height / 2);
  if (strokePath != null) {
    let newX = x + strokePath.dx * 0.2;
    let newY = y + strokePath.dy * 0.2;
    if (pen == "down") {
      stroke(0,200, 200);
      strokeWeight(2);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

    if (pen !== "end") {
      model.generate(gotSketch);
    } else {
      model.reset();
      model.generate(gotSketch);
      x = random(-width / 2, width / 2);
      y = random(-height / 2, height / 2);
    }
  }
}

function gotSketch(error, st) {
  if (error) {
    console.error(error);
  } else {
    strokePath = st;
  }
}