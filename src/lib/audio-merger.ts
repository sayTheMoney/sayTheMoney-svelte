import Crunker from 'crunker';


class AudioMerger {
    private readonly cache = new Map<string, any>();
    private readonly _crunker = new Crunker();

    async loadOne(url: string): Promise<any> {
        if (this.cache.has(url)) {
            return this.cache.get(url)
        }
        const buffers = await this.crunker.fetchAudio(url)
        const [buffer] = buffers
        this.cache.set(url, buffer)
        return buffer
    }

    async load(...urls: string[]): Promise<any[]> {
        return await Promise.all(urls.map(url => this.loadOne(url)))
    }

    async concat(...urls: string[]): Promise<any> {
        const buffers = await this.load(...urls)
        return this.crunker.concatAudio(buffers)
    }

    async export(audio: any): Promise<{element: HTMLAudioElement, blob: any, url: string}> {
        const output = await this.crunker.export(audio, 'audio/mp3')
        return output
    }

    public get crunker() : any {
        return this._crunker
    }
}

export default new AudioMerger()
