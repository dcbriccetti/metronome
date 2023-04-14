export default class AudioLoader {
    buffers: AudioBuffer[]

    constructor(context: AudioContext, urls: string[]) {
        this.buffers = []

        const promises: Promise<AudioBuffer>[] = urls.map((url: string) =>
            fetch(url)
                .then((response: Response) => response.arrayBuffer())
                .then((arrayBuffer: ArrayBuffer) => context.decodeAudioData(arrayBuffer)))

        Promise.all(promises)
            .then((buffers: Awaited<AudioBuffer>[]) => this.buffers = buffers)
            .catch(error => console.error(error))
    }
}
