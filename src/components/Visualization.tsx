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

const drawLargeCircle = (p5: p5Types, offsetFraction: number, diameter: number) => {
    p5.strokeWeight(10);
    const greenHue = 120;
    const minimumBrightness = 30;
    p5.fill(greenHue, 100, p5.map(offsetFraction, 0, 1, 100, minimumBrightness));
    p5.ellipse(p5.width / 2, p5.height / 2, diameter, diameter);
};
const margin = 34; // To keep the visualization from extending beyond the canvas

const visualizations = [
    {
        name: 'Spinning Circle',
        draw: (p5: p5Types, offsetFraction: number, diameter: number) => {
            const radius = diameter / 2;

            function drawSpoke() {
                p5.translate(p5.width / 2, p5.height / 2)
                p5.rotate(p5.map(offsetFraction, 0, 1, 0, p5.TWO_PI) - p5.HALF_PI)
                p5.strokeWeight(8)
                p5.line(0, 0, radius, 0)
            }

            function drawSmallCircle() {
                p5.translate(radius, 0)
                p5.strokeWeight(3)
                p5.fill(255)
                p5.ellipse(0, 0, 30, 30)
            }

            drawLargeCircle(p5, offsetFraction, diameter)
            drawSpoke()
            drawSmallCircle()
        }
    },
    {
        name: 'Circle',
        draw: (p5: p5Types, offsetFraction: number, diameter: number) => {
            drawLargeCircle(p5, offsetFraction, diameter)
        }
    },
]

export function visualizationNames() {
    return visualizations.map(visualization => visualization.name);
}

function Visualization(props: Props) {
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(200, 200).parent(canvasParentRef);
        p5.colorMode(p5.HSB);
    };

    const draw = (p5: p5Types) => {
        const {running, visualizationType, getTime, tempoBpm, startTime} = props;

        function calcOffsetFraction() {
            const secondsPerMinute = 60;
            const periodSeconds = secondsPerMinute / tempoBpm;
            const secondsSinceStart = getTime() - startTime;
            const offsetSeconds = secondsSinceStart % periodSeconds;
            return offsetSeconds / periodSeconds;
        }

        const offsetFraction = running ? calcOffsetFraction() : 0;
        const radius = p5.min(p5.width, p5.height) / 2;
        const diameter = radius * 2;

        p5.background(255);

        const visualization = visualizations[visualizationType];
        visualization.draw(p5, offsetFraction, diameter - margin);
    };

    return <Sketch setup={setup} draw={draw}/>;
}

export default Visualization;
