class CA {

  constructor( r) {
    this.rules = r;
    this.scl = 1;
    this.cells = new Array(width/this.scl);
    this.restart();
  }

  // Set the rules of the CA
  setRules(r) {
    this.rules = r;
  }

  // Make a random ruleset
  randomize() {
    for (var i = 0; i < 8; i++) {
      this.rules[i] = int(random(2));
    }
  }

  // Reset to generation 0
  restart() {
    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i] = 0;
    }
    // We arbitrarily start with just the middle
    // cell having a state of "1"
    this.cells[this.cells.length/2] = 1;
    this.generation = 0;
  }

  // The process of creating the new generation
  generate() {
    // First we create an empty array for the new values
    this.nextgen = new Array(this.cells.length);
    // For every spot, determine new state by examing current
    // state, and neighbor states
    // Ignore edges that only have one neighor
    for (var i = 1; i < this.cells.length-1; i++) {
      var left = this.cells[i-1];   // Left neighbor state
      var me = this.cells[i];       // Current state
      var right = this.cells[i+1];  // Right neighbor state
      // Compute next generation state based on ruleset
      this.nextgen[i] = this.executeRules(left,me,right);
    }
    // Copy the array into current value
    for (var i = 1; i < this.cells.length-1; i++) {
      this.cells[i] = this.nextgen[i];
    }
    //cells = (int[]) nextgen.clone();
    this.generation++;
  }

  // This is the easy part, just draw the cells,
  // fill 255 for '1', fill 0 for '0'
  render() {
    for (var i = 0; i < this.cells.length; i++) {
      if (this.cells[i] == 1) {
        fill(255);
      } else {
        fill(0);
      }
      noStroke();
      rect(i*this.scl,this.generation*this.scl, this.scl,this.scl);
    }
  }

  // Implementing the Wolfram rules
  // Could be improved and made more concise,
  // but here we can explicitly see what is going on for each case
  executeRules(a, b, c) {
    if (a == 1 && b == 1 && c == 1) { return this.rules[0]; }
    if (a == 1 && b == 1 && c == 0) { return this.rules[1]; }
    if (a == 1 && b == 0 && c == 1) { return this.rules[2]; }
    if (a == 1 && b == 0 && c == 0) { return this.rules[3]; }
    if (a == 0 && b == 1 && c == 1) { return this.rules[4]; }
    if (a == 0 && b == 1 && c == 0) { return this.rules[5]; }
    if (a == 0 && b == 0 && c == 1) { return this.rules[6]; }
    if (a == 0 && b == 0 && c == 0) { return this.rules[7]; }
    return 0;
  }

  // The CA is done if it reaches the bottom of the screen
  finished() {
    if (this.generation > height/this.scl) {
       return true;
    } else {
       return false;
    }
  }
}