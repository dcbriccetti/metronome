/** This p5.js sketch makes a visualization of the metronome beats */

const VisSettings = {
    tempoBpm: 0,
    startTime: 0,
    getTime: undefined,
    visualizationType: 1,
    names: ['Spinning Circle', 'Circle']
};

function setup() {
    const vis = $("#visualization");
    createCanvas(vis.width(), vis.height()).parent("visualization");
    colorMode(HSB);
}

function draw() {
    function calcOffsetFraction() {
        const secondsPerMinute = 60;
        const periodSeconds = secondsPerMinute / VisSettings.tempoBpm;
        const secondsSinceStart = VisSettings.getTime() - VisSettings.startTime;
        const offsetSeconds = secondsSinceStart % periodSeconds;
        return offsetSeconds / periodSeconds;
    }

    const offsetFraction = calcOffsetFraction();

    const margin = 40;
    const radius = min(width, height) / 2;
    const diameter = radius * 2;

    background(255);

    function drawLargeCircle() {
        strokeWeight(10);
        const greenHue = 120;
        const minimumBrightness = 30;
        fill(greenHue, 100, map(offsetFraction, 0, 1, 100, minimumBrightness));
        ellipse(width / 2, height / 2, diameter - margin, diameter - margin);
    }

    const visualizations = [
        () => {},
        () => {
            function drawSpoke() {
                translate(width / 2, height / 2);
                rotate(map(offsetFraction, 0, 1, 0, TWO_PI) - HALF_PI);
                strokeWeight(8);
                line(0, 0, radius - margin / 2, 0);
            }

            function drawSmallCircle() {
                translate(radius - margin / 2, 0);
                strokeWeight(3);
                fill(255);
                ellipse(0, 0, 30, 30);
            }

            drawLargeCircle();
            drawSpoke();
            drawSmallCircle();
        },
        () => drawLargeCircle()
    ];

    visualizations[(VisSettings.visualizationType)]();
}
