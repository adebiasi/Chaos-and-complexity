/**
 * Wolfram Cellular Automata
 * by Daniel Shiffman.
 *
 * Simple demonstration of a Wolfram's 1-dimensional
 * cellular automata. When the system reaches bottom
 * of the window, it restarts with a new ruleset.
 * Mouse click restarts as well.
 */

function setup() {
  createCanvas(640, 360);
  ruleset = [0,1,0,1,1,0,1,0];  // An initial rule system
  ca = new CA(ruleset);  // Initialize CA
  background(0);
}

function draw() {
  ca.render();  // Draw the CA
  ca.generate();  // Generate the next level

  // If we're done, clear the screen,
  // pick a new ruleset and restart
  if (ca.finished()) {
    background(0);
    ca.randomize();
    ca.restart();
  }
}

function mousePressed() {
  background(0);
  ca.randomize();
  ca.restart();
}