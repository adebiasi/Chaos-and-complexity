
var angle;
var start_len;
var start_angle;
var step1 = 0.05;


function setup() {
	//angle = PI/4;
  createCanvas(400, 400);
  slider = createSlider(0.0, 1.0,0.01, 0.01);
  start_len = 0;
	start_angle=0;
}

function mouseClicked() {
start_len=random();
start_angle=random();
xoff+=0.45;
}

var id_branch;
var xoff = 0;
function draw() {
 	
	id_branch = 0;
	
	background(20);
	
	step1 = slider.value();
	
	stroke(255);
	translate(200,height);
	branch(100, 0,xoff);
  
}


function branch(len, level, xoff){
	//id_branch++;
	var rdm_len =  len;
	//map(noise(id_branch+start_len), 0, 1, -15, +15)+len;
	strokeWeight(rdm_len/10); // Thicker
	line(0,0,0,-rdm_len);
	translate(0,-rdm_len);
	
	xoff+=step1;	
	angle = (noise(xoff)*PI/4);
	
	id_branch++;
	subBranch(len*0.67, level+1,angle,xoff);
	
	xoff+=step1;
	angle2 = (noise(xoff)*PI/4);
	
	id_branch++;
	subBranch(len*0.67, level+1,-angle2,xoff);
	
	
}

function subBranch(len, level,angle, xoff){
if(len>2){
	//textSize(10);
//text(xoff, 10, 30);
	//var rdm_angle = map(noise(
	//start_angle+id_branch
//	xoff),0,1,angle-PI,angle+PI);
	
	var adj_angle = 
	//map(noise(xoff+id_branch),0,1,rdm_angle-0.05,rdm_angle+0.05);
	//rdm_angle;
	angle;
	push();
	rotate(adj_angle);	
	branch(len, level,xoff);	
	pop();
}
}