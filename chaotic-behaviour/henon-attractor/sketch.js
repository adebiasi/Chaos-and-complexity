// Henon attractor

let new_x;
let new_y;

function setup() {
  createCanvas(600, 600);
  background(50);
  new_x = random(-1.0,1.0);
  new_y = random(-1.0,1.0);
}

function draw() {
  //background(0);
  var old_x = new_x;
  var old_y = new_y;
  
  new_x = 1.29 - (old_x*old_x) + 0.3 * old_y;
  new_y = old_x;
  
  console.log(new_x + '--' + new_y);
  stroke('white'); // Change the color
strokeWeight(5); // Make the points 10 pixels in size

var draw_x = map(new_x,-2,2,0,width);
var draw_y = map(new_y,-2,2,height,0);
 stroke(255,50);
  point(draw_x,draw_y);
 
}
