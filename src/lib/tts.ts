import { Token } from './parser'

export abstract class TTSProvider {
    abstract use(token: Token): string
    abstract begin(): Array<string>
    abstract end(): Array<string>
}

export class LocalAliPayTTS extends TTSProvider {
    readonly base: string = './build/assets/alipay/'

    begin(): Array<string> {
        return [`${this.base}diaoluo_da.mp3`, `${this.base}tts_success.mp3`]
    }

    end(): Array<string> {
        return [`${this.base}tts_yuan.mp3`]
    }

    use(token: Token): string {
        
        const digitals = new Set([...Array(10).keys()].map((_, idx) => idx as Token))
        const suffix = new Map<Token, string>([
            [Token.Dian, 'dot'],
            [Token.Shi, 'ten'],
            [Token.Bai, 'hundred'],
            [Token.Qian, 'thousand'],
            [Token.Wan, 'ten_thousand'],
            [Token.Yi, 'ten_million'],
        ])
        if (digitals.has(token)) {
            return `${this.base}tts_${token}.mp3`
        }
        if (suffix.has(token)) {
            return `${this.base}tts_${suffix.get(token)}.mp3`
        }
        
        throw `invalid token ${token}`
    }
}

export const alipay = new LocalAliPayTTS();
