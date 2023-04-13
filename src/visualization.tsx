/** This p5.js sketch makes a visualization of the metronome beats */
import * as p5 from 'p5'

export interface VisSettings {
    tempoBpm: number,
    startTime: number,
    visualizationType: number,
    names: string[]
}

export default class Sketch {
    constructor(private getTime: () => number, private visSettings: VisSettings) {
        const thisSketch = this
        const sketch = (p: p5) => {
            p.setup = () => {
                const vis = document.querySelector('#visualization')
                if (vis) {
                    p.createCanvas(vis.clientWidth, vis.clientHeight).parent('visualization')
                    p.colorMode(p.HSB)
                }
            }

            p.draw = () => {
                function calcOffsetFraction() {
                    const secondsPerMinute = 60
                    const periodSeconds = secondsPerMinute / visSettings.tempoBpm
                    const secondsSinceStart = thisSketch.getTime() - visSettings.startTime
                    const offsetSeconds = secondsSinceStart % periodSeconds
                    return offsetSeconds / periodSeconds
                }

                const offsetFraction = calcOffsetFraction()

                const margin = 40
                const radius = p.min(p.width, p.height) / 2
                const diameter = radius * 2

                p.background(255)

                function drawLargeCircle() {
                    p.strokeWeight(10)
                    const greenHue = 120
                    const minimumBrightness = 30
                    p.fill(greenHue, 100, p.map(offsetFraction, 0, 1, 100, minimumBrightness))
                    p.ellipse(p.width / 2, p.height / 2, diameter - margin, diameter - margin)
                }

                const visualizations = [
                    () => {
                    },
                    () => {
                        function drawSpoke() {
                            p.translate(p.width / 2, p.height / 2)
                            p.rotate(p.map(offsetFraction, 0, 1, 0, p.TWO_PI) - p.HALF_PI)
                            p.strokeWeight(8)
                            p.line(0, 0, radius - margin / 2, 0)
                        }

                        function drawSmallCircle() {
                            p.translate(radius - margin / 2, 0)
                            p.strokeWeight(3)
                            p.fill(255)
                            p.ellipse(0, 0, 30, 30)
                        }

                        drawLargeCircle()
                        drawSpoke()
                        drawSmallCircle()
                    },
                    () => drawLargeCircle()
                ]

                visualizations[(visSettings.visualizationType)]()
            }
        }

        console.log('Creating new p5 sketch')
        // noinspection JSPotentiallyInvalidConstructorUsage
        new p5(sketch)
    }
}
