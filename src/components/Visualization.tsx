import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface Props {
    running: boolean,
    visualizationType: number,
    getTime: () => number,
    tempoBpm: number,
    startTime: number,
}

const GREEN_HUE = 120;
const MIN_BRIGHTNESS = 30;
const MAX_BRIGHTNESS = 100;
const MAX_SATURATION = 100;
const SECONDS_PER_MINUTE = 60;

function drawLargeCircle(p5: p5Types, offsetFraction: number, diameter: number) {
    p5.strokeWeight(10);
    const brightness = p5.map(offsetFraction, 0, 1, MAX_BRIGHTNESS, MIN_BRIGHTNESS);
    p5.fill(GREEN_HUE, MAX_SATURATION, brightness);
    p5.ellipse(p5.width / 2, p5.height / 2, diameter, diameter);
}

function drawSpinningCircle(p5: p5Types, offsetFraction: number, diameter: number) {
    const radius = diameter / 2;

    drawLargeCircle(p5, offsetFraction, diameter)

    // Spoke
    p5.translate(p5.width / 2, p5.height / 2)
    p5.rotate(p5.map(offsetFraction, 0, 1, 0, p5.TWO_PI) - p5.HALF_PI)
    p5.strokeWeight(8)
    p5.line(0, 0, radius, 0)

    // Small circle
    p5.translate(radius, 0)
    p5.strokeWeight(3)
    p5.fill(100)
    p5.ellipse(0, 0, 30, 30)
}

const visualizations = [
    {name: 'Spinning Circle', draw: drawSpinningCircle},
    {name: 'Circle', draw: drawLargeCircle},
]

export const visualizationNames = () => visualizations.map(vis => vis.name);

export default function Visualization(props: Props) {
    const {running, visualizationType, getTime, tempoBpm, startTime} = props;

    function setup(p5: p5Types, canvasParentRef: Element) {
        p5.createCanvas(200, 200).parent(canvasParentRef);
        p5.colorMode(p5.HSB);
    }

    function draw(p5: p5Types) {
        const MARGIN = 34; // To keep the visualization from extending beyond the canvas

        function calcOffsetFraction() {
            const periodSeconds = SECONDS_PER_MINUTE / tempoBpm;
            const secondsSinceStart = getTime() - startTime;
            const offsetSeconds = secondsSinceStart % periodSeconds;
            return offsetSeconds / periodSeconds;
        }

        const offsetFraction = running ? calcOffsetFraction() : 0;
        const radius = p5.min(p5.width, p5.height) / 2;
        const diameter = radius * 2;

        p5.background(100);
        visualizations[visualizationType].draw(p5, offsetFraction, diameter - MARGIN);
    }

    return <Sketch setup={setup} draw={draw}/>;
}
