let mic;
let fft;
let particles = [];

function setup() {
  createCanvas(800, 600);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(10, 10, 30, 40);

  let spectrum = fft.analyze();
  let volume = mic.getLevel();

  // WAVE VISUALIZATION
  noFill();
  strokeWeight(2);

  beginShape();
  for (let i = 0; i < spectrum.length; i += 10) {

    let x = map(i, 0, spectrum.length, 0, width);
    let y = map(spectrum[i], 0, 255, height, 0);

    stroke(spectrum[i], 200, 255);

    vertex(x, y);
  }
  endShape();

  // CENTER CIRCLE REACTS TO VOLUME
  let size = map(volume, 0, 0.5, 50, 300);

  fill(100 + size, 150, 255, 150);
  noStroke();

  ellipse(width/2, height/2, size);

  // PARTICLES WHEN SOUND IS LOUD
  if (volume > 0.05) {
    particles.push(new Particle());
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {

  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-2,2);
    this.alpha = 255;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 4;
  }

  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 8);
  }

}
