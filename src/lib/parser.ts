export enum Token {
    D0 = 0,
    D1,
    D2,
    D3,
    D4,
    D5,
    D6,
    D7,
    D8,
    D9,
    Dian,
    Shi,
    Bai,
    Qian,
    Wan,
    Yi,
}

function parseTill10K(n: number): Token[] {
    if (n >= 10000 || n < 0) {
        throw `value must be between 0 and 10000 (n=${n})`
    }

    const digits = [1000, 100, 10, 1].map(
        i => Math.floor(n / i) % 10
    ).map(
        i => i as Token
    )

    const ans: Token[] = []

    if (digits[0] != Token.D0) {
        ans.push(digits[0], Token.Qian)
    }

    if (digits[1] != Token.D0) {
        ans.push(digits[1], Token.Bai)
    }
    else if (digits[0] != Token.D0 && (digits[2] != Token.D0 || digits[3] != Token.D0)) {
        ans.push(Token.D0)
    }

    if (digits[2] == Token.D1 && digits[1] == Token.D0) {
        ans.push(Token.Shi)
    }
    else if (digits[2] != Token.D0) {
        ans.push(digits[2], Token.Shi)
    }
    else if (digits[1] != Token.D0 && digits[3] != Token.D0) {
        ans.push(Token.D0)
    }

    if (digits[3] != Token.D0 || digits.filter(d => d == Token.D0).length == digits.length) {
        ans.push(digits[3])
    }

    return ans
}


export interface NumberSections {
    yi: number;
    wan: number;
    yuan: number;
    jiao: number;
    fen: number;
}

type Tokenized<T> = {
    [P in keyof T]: Token[] | null
};

export type TokenizedSections = Tokenized<NumberSections>


function splitToSections(n: number) : NumberSections {
    const i = Math.floor(n)
    const d = Math.round(n * 100) % 100

    if (n < 0 || n > 9999_9999_9999.99) {
        throw `value must be between 0 and 9999_9999_9999.99 (n=${n})`
    }

    return {
        yi: Math.floor(i / 1_0000_0000),
        wan: Math.floor(i / 1_0000) % 1_0000,
        yuan: i % 1_0000,
        jiao: Math.floor(d / 10),
        fen: d % 10,
    }
}

function needPrefixD0(n: number, largeSections: number[]): boolean {
    return largeSections.some(i => i > 0) && n > 0 && n < 1000
}

export function parse(n: number): Token[] {
    if (Math.floor(n * 100) == 0) {
        return [Token.D0]
    }

    const sections = splitToSections(n)
    const tokenized: TokenizedSections = {
        yi: null, wan: null, yuan: null, jiao: null, fen: null
    }

    Object.keys(sections).map(
        s => tokenized[s] = parseTill10K(sections[s])
    )
    
    const ans: Token[] = []

    if (sections.yi > 0) {
        ans.splice(ans.length, 0, ...tokenized.yi)
        ans.push(Token.Yi)
    }

    if (needPrefixD0(sections.wan, [sections.yi,])) {
        ans.push(Token.D0)
    }
    if (sections.wan > 0) {
        ans.splice(ans.length, 0, ...tokenized.wan)
        ans.push(Token.Wan)
    }

    if (needPrefixD0(sections.yuan, [sections.yi, sections.wan,])) {
        ans.push(Token.D0)
    }

    if (
        [sections.yuan, sections.jiao, sections.fen].some(i => i > 0)
    ) {
        ans.splice(ans.length, 0, ...tokenized.yuan)
    }

    if (sections.jiao > 0 || sections.fen > 0) {
        ans.push(Token.Dian)
        ans.splice(ans.length, 0, ...tokenized.jiao)
        if (sections.fen > 0) {
            ans.splice(ans.length, 0, ...tokenized.fen)
        }
    }

    return ans
}
