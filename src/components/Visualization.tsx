import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface Props {
    running: boolean,
    visualizationType: number,
    getTime: () => number,
    getTempoBpm: () => number,
    getStartTime: () => number,
}

const Visualization = (props: Props): JSX.Element => {
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(200, 200).parent(canvasParentRef);
        p5.colorMode(p5.HSB);
    };

    const draw = (p5: p5Types) => {
        const {running, visualizationType, getTime, getTempoBpm, getStartTime} = props;

        function calcOffsetFraction() {
            const secondsPerMinute = 60;
            const periodSeconds = secondsPerMinute / getTempoBpm();
            const secondsSinceStart = getTime() - getStartTime();
            const offsetSeconds = secondsSinceStart % periodSeconds;
            return offsetSeconds / periodSeconds;
        }

        const offsetFraction = running ? calcOffsetFraction() : 0;
        const margin = 40;
        const radius = p5.min(p5.width, p5.height) / 2;
        const diameter = radius * 2;

        p5.background(255);

        const drawLargeCircle = () => {
            p5.strokeWeight(10);
            const greenHue = 120;
            const minimumBrightness = 30;
            p5.fill(greenHue, 100, p5.map(offsetFraction, 0, 1, 100, minimumBrightness));
            p5.ellipse(p5.width / 2, p5.height / 2, diameter - margin, diameter - margin);
        };

        function drawSpinningCircle() {
            p5.translate(p5.width / 2, p5.height / 2);
            p5.rotate(p5.map(offsetFraction, 0, 1, 0, p5.TWO_PI) - p5.HALF_PI);
            p5.strokeWeight(8);
            p5.line(0, 0, radius - margin / 2, 0);
            p5.translate(radius - margin / 2, 0);
            p5.strokeWeight(3);
            p5.fill(255);
            p5.ellipse(0, 0, 30, 30);
        }

        const visualizations = [
            () => {
                function drawSpoke() {
                    p5.translate(p5.width / 2, p5.height / 2)
                    p5.rotate(p5.map(offsetFraction, 0, 1, 0, p5.TWO_PI) - p5.HALF_PI)
                    p5.strokeWeight(8)
                    p5.line(0, 0, radius - margin / 2, 0)
                }

                function drawSmallCircle() {
                    p5.translate(radius - margin / 2, 0)
                    p5.strokeWeight(3)
                    p5.fill(255)
                    p5.ellipse(0, 0, 30, 30)
                }

                drawLargeCircle()
                drawSpoke()
                drawSmallCircle()
            },
            () => drawLargeCircle()
        ]
        visualizations[visualizationType]();
    };

    return <Sketch setup={setup} draw={draw}/>;
};

export default Visualization;
