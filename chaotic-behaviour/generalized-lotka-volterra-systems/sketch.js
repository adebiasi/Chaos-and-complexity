// Henon attractor

let number_species;
let matrix_params;
let switch_view = false;

let a = [];
let ind = 0;


let dt = 0.0001;
let t = 0;
function setup() {
  createCanvas(600, 600);
  
  background(50);
   
   t = 0;
   
   a[0] = 0.75;
   a[1] = 1.2;
   a[2] = 1.32;   
   a[3] = 1.387;
   a[4] = 1.5;
   
   number_species = [];
   
  for(var i=0; i<3; i++) {
	  number_species[i]=0.50;
  }
  
   matrix_params = [];
	for(var i=0; i<3; i++) {
		matrix_params[i] = [];
		for(var j=0; j<3; j++) {
			matrix_params[i][j] = undefined;
		}
	}
	
	matrix_params[0][0]=0.5;
	matrix_params[1][0]=-0.5;
	matrix_params[2][0]=a[ind%5];
	
	matrix_params[0][1]=0.5;
	matrix_params[1][1]=-0.1;
	matrix_params[2][1]=0.1;
	
	matrix_params[0][2]=0.1;
	matrix_params[1][2]=0.1;
	matrix_params[2][2]=0.1;
	
	console.log('param: '+a[ind%5]);
	
}

function draw() {
  //background(0);
  
  
  
  for(var k=0;k<5000;k++){
	  
	let sum_0 = 0;
	let sum_1 = 0;
	let sum_2 = 0;
	  
	  for(var i=0; i<3; i++) {
	  sum_0+=matrix_params[0][i]*(1-number_species[i]);
	  sum_1+=matrix_params[1][i]*(1-number_species[i]);
	  sum_2+=matrix_params[2][i]*(1-number_species[i]);
	  
	  }
  
  diff_number_species = [];
   
  diff_number_species[0] = number_species[0]*sum_0;
  diff_number_species[1] = number_species[1]*sum_1;
  diff_number_species[2] = number_species[2]*sum_2;

  number_species[0]+=(diff_number_species[0]*dt);
  number_species[1]+=(diff_number_species[1]*dt);
  number_species[2]+=(diff_number_species[2]*dt);
  }

  
  stroke('white'); // Change the color
strokeWeight(3); // Make the points 10 pixels in size

 t += 1.5;
 if(switch_view){
	stroke(255,50);
	var draw_number_species_0 = map(number_species[0],0,3,width, 0);
	var draw_number_species_1 = map(number_species[1],0,3,height, 0);
	var draw_number_species_2 = map(number_species[2],0,3,height, 0);
	
	point(draw_number_species_0,draw_number_species_1,draw_number_species_2);
 }else{
	var draw_number_species_0 = map(number_species[0],0,3,width, 0);
	var draw_number_species_1 = map(number_species[1],0,3,width, 0);
	var draw_number_species_2 = map(number_species[2],0,3,width, 0);
	stroke('red');
	point(t,draw_number_species_0); 
	stroke('blue');
	point(t,draw_number_species_1);
	stroke('green');
	point(t,draw_number_species_2);
}
}
function mouseClicked() {
	t = 0;
	background(50);
  switch_view=!switch_view;
  setup();
}

function keyPressed() {
   ind++;
  setup();
}