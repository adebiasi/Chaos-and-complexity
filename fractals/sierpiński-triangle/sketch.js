var sliderNumVert;
var sliderInterp;
var vertexes;
var lastPoint;

function setup() {
	createCanvas(600, 600);
	vertexes = [];
	sliderNumVert = createSlider(3,15,3);
	sliderInterp = createSlider(0,1,0.5,0.1);
	lastPoint = createVector(random(width), random(height));
	populateVertexes();
}

function populateVertexes(){
	var d = sliderNumVert.value();
	vertexes = [];
	for(let a=0; a<TWO_PI;a+=TWO_PI/d){
		var r = 200;
		var x = r*cos(a);
		var y = r*sin(a);
		vertexes.push(createVector(width/2+x,height/2+y));
	}
}

function mousePressed() {
    background(51);
    populateVertexes();
    lastPoint = createVector(random(width), random(height));
    draw();
}

function draw() {
	stroke(255);
	background(51);
	push();
	
	strokeWeight(1);
	var d = sliderNumVert.value();
	noFill();
	beginShape();
	for(let a=0; a<vertexes.length;a++){
		vertex(vertexes[a].x,vertexes[a].y);
	}
	endShape(CLOSE);
	pop();
	strokeWeight(3);
	point(lastPoint.x, lastPoint.y);
	
	for(let a=0; a<20000;a++){
		
		let dest = random(vertexes);
		point(dest.x, dest.y);
		lastPoint=p5.Vector.lerp(dest, lastPoint, sliderInterp.value());
		point(lastPoint.x, lastPoint.y);
		
	}
	
	noLoop();
	
}