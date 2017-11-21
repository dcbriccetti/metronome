const SketchSettings = {
    tempo: 0,
    startTime: 0,
    getTime: undefined
};

function setup() {
    const vis = $("#visualization");
    createCanvas(vis.width(), vis.height()).parent("visualization");
    colorMode(HSB);
}

function draw() {
    background(255);
    strokeWeight(10);
    const margin = 40;
    const periodSec = 60 / SketchSettings.tempo;
    const offsetSec = (SketchSettings.getTime() - SketchSettings.startTime) % periodSec;
    const offsetFrac = offsetSec / periodSec;
    fill(120, 100, 100 - 50 * offsetFrac);
    const radius = min(width, height) / 2;
    const diam = radius * 2;
    ellipse(width / 2, height / 2, diam - margin, diam - margin);
    translate(width / 2, height / 2);
    rotate(map(offsetFrac, 0, 1, 0, TWO_PI) - HALF_PI);
    line(0, 0, radius - margin / 2, 0);
    translate(radius - margin / 2, 0);
    strokeWeight(3);
    fill(255);
    ellipse(0, 0, 30, 30);
}
