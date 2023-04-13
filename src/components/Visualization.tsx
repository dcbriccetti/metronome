/** This p5.js sketch makes a visualization of the metronome beats */
import React, {useRef, useEffect} from "react"
import p5 from "p5"

interface Props {
    getTime: () => number,
    visSettings: VisSettings
}

export interface VisSettings {
    tempoBpm: number,
    startTime: number,
    visualizationType: number,
    names: string[]
}

export function Visualization(props: Props): JSX.Element {
    const sketchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sketchRef.current) {
            const p5Instance = new p5(createSketch(props), sketchRef.current)
            return () => p5Instance.remove()
        }
    }, [props])

    return <div ref={sketchRef}/>
}

function createSketch(props: Props) {
    return (p: p5) => {
        const {getTime, visSettings} = props

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
                const secondsSinceStart = getTime() - visSettings.startTime
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
}
