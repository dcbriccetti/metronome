export default class AudioLoader {
    private buffers: AudioBuffer[] = [];

    constructor(private context: AudioContext, urls: string[]) {
        const loadPromise = this.loadBuffers(urls);
    }

    private async loadBuffers(urls: string[]): Promise<AudioBuffer[]> {
        const bufferPromises: Promise<AudioBuffer>[] =
            urls.map(async (url) => {
                try {
                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();
                    return await this.context.decodeAudioData(arrayBuffer);
                } catch (error) {
                    console.error(`Error loading audio from ${url}:`, error);
                    throw error;
                }
            });

        try {
            this.buffers = await Promise.all(bufferPromises);
            return this.buffers;
        } catch (error) {
            console.error('Error loading audio buffers:', error);
            throw error;
        }
    }

    isLoaded(): boolean {
        return this.buffers.length > 0 && this.buffers.every(buffer => buffer !== undefined);
    }

    getBuffers(): AudioBuffer[] {
        if (!this.isLoaded()) {
            throw new Error('Attempt to access audio buffers before they are loaded');
        }
        return this.buffers;
    }
}
