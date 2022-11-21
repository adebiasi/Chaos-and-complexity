
var angle;
var tree = [];
function setup() {
	//angle = PI/4;
  createCanvas(400, 400);
 // slider = createSlider(0, TWO_PI,PI /4, 0.01);
  
  var a = createVector(width/2, height);
	var b = createVector(width/2, height-100);
	;
	tree[0] = new Branch(a, b);
	
	
}

function mousePressed(){
	
	for(var i=tree.length-1; i>=0;i--){
		if(!tree[i].finished){
	tree.push(tree[i].branchA());
	tree.push(tree[i].branchB());
		}
	tree[i].finished = true;
	}
	
}

function draw() {
 	background(20);
	for(var i=0; i<tree.length;i++){
		
	tree[i].show();
	
	
	}
	//stroke(255);
	//translate(200,height);
	//branch(100);
  
}


function branch(len){
	
	line(0,0,0,-len);
	translate(0,-len);
	angle = slider.value(width/2, height);
	
	
	push();
	rotate(angle);
	if(len>4){
	branch(len*0.67);
	}
	pop();
	push();
	rotate(-angle);
	if(len>4){
	branch(len*0.67);
	}
	pop();
}