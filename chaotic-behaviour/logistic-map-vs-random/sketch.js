var counter;
var n_samples = 10000;
let x = 0.01;
let x2 = 0.01;
function setup() {
  createCanvas(800, 800);
  counter = 0;
  background(50);
}

function draw() {
  stroke(255,50);

  var r = 4;
  x = logistic_map(x,r)

  logistic_value = map(x, 0, 1, height, 0)
  line(0, logistic_value,width/2,logistic_value);

  var random_value = random()*height;
  line(width/2, random_value,width,random_value);
    
}

function logistic_map(x, r){
    return r * (x) * (1.0-x);
}