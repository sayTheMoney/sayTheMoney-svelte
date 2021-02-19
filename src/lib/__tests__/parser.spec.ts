import { Token } from '../parser'
import rewire from 'rewire'

// functions to be tested must be obtained from rewire instead of importings
// otherwise the coverage would be incorrect as ES imports get method from the
// outputs of ts-jest transformer which are not monitored by nyc
const parser = rewire('../parser')
const parse = parser.__get__('parse')


describe('Chinese Digits Parsing', () => {
    interface TestMatrix {
        [index: number]: Token[];
    }
    
    function installTestCases(testMatrix: TestMatrix) {
        Object.keys(testMatrix).map(n => test(`parse ${n}`, () => {
            expect(parse(parseFloat(n)).map(t => Token[t])).toMatchObject(testMatrix[n].map(t => Token[t]))
        }))
    }

    describe('Number is less than 10K', () => {
        const testMatrix: TestMatrix = {
            0: [Token.D0],
            1: [Token.D1],

            10: [Token.Shi],
            15: [Token.Shi, Token.D5],
            85: [Token.D8, Token.Shi, Token.D5],
            90: [Token.D9, Token.Shi],

            100: [Token.D1, Token.Bai],
            200: [Token.D2, Token.Bai],
            302: [Token.D3, Token.Bai, Token.D0, Token.D2],
            413: [Token.D4, Token.Bai, Token.D1, Token.Shi, Token.D3],

            1000: [Token.D1, Token.Qian],
            2007: [Token.D2, Token.Qian, Token.D0, Token.D7],
            3070: [Token.D3, Token.Qian, Token.D0, Token.D7, Token.Shi],
            3900: [Token.D3, Token.Qian, Token.D9, Token.Bai],
            3105: [Token.D3, Token.Qian, Token.D1, Token.Bai, Token.D0, Token.D5],
            4015: [Token.D4, Token.Qian, Token.D0, Token.Shi, Token.D5],
            5060: [Token.D5, Token.Qian, Token.D0, Token.D6, Token.Shi],
            6130: [Token.D6, Token.Qian, Token.D1, Token.Bai, Token.D3, Token.Shi],
            8234: [Token.D8, Token.Qian, Token.D2, Token.Bai, Token.D3, Token.Shi, Token.D4],
        }

        installTestCases(testMatrix)
    })

    describe('parse decimals', () => {
        const testMatrix: TestMatrix = {
            9311.23: [Token.D9, Token.Qian, Token.D3, Token.Bai, Token.D1, Token.Shi, Token.D1, Token.Dian, Token.D2, Token.D3],
            9311.20: [Token.D9, Token.Qian, Token.D3, Token.Bai, Token.D1, Token.Shi, Token.D1, Token.Dian, Token.D2],
            9311.02: [Token.D9, Token.Qian, Token.D3, Token.Bai, Token.D1, Token.Shi, Token.D1, Token.Dian, Token.D0, Token.D2],
            9311.021: [Token.D9, Token.Qian, Token.D3, Token.Bai, Token.D1, Token.Shi, Token.D1, Token.Dian, Token.D0, Token.D2],
            9311.025: [Token.D9, Token.Qian, Token.D3, Token.Bai, Token.D1, Token.Shi, Token.D1, Token.Dian, Token.D0, Token.D3],
        }

        installTestCases(testMatrix)
    })

    describe('parse >=1_0000 <= 9999_9999', () => {
        const testMatrix: TestMatrix = {
            1_0000: [Token.D1, Token.Wan],
            1_0002: [Token.D1, Token.Wan, Token.D0, Token.D2],
            1_0020: [Token.D1, Token.Wan, Token.D0, Token.D2, Token.Shi],
            1_0200: [Token.D1, Token.Wan, Token.D0, Token.D2, Token.Bai],
            1_2000: [Token.D1, Token.Wan, Token.D2, Token.Qian],

            10_0000: [Token.Shi, Token.Wan],
            10_0002: [Token.Shi, Token.Wan, Token.D0, Token.D2],
            10_0020: [Token.Shi, Token.Wan, Token.D0, Token.D2, Token.Shi],
            10_0200: [Token.Shi, Token.Wan, Token.D0, Token.D2, Token.Bai],
            10_2000: [Token.Shi, Token.Wan, Token.D2, Token.Qian],

            40_0000: [Token.D4, Token.Shi, Token.Wan],
            40_0002: [Token.D4, Token.Shi, Token.Wan, Token.D0, Token.D2],
            40_0020: [Token.D4, Token.Shi, Token.Wan, Token.D0, Token.D2, Token.Shi],
            40_0200: [Token.D4, Token.Shi, Token.Wan, Token.D0, Token.D2, Token.Bai],
            40_2000: [Token.D4, Token.Shi, Token.Wan, Token.D2, Token.Qian],

            205_0000: [Token.D2, Token.Bai, Token.D0, Token.D5, Token.Wan],
            205_0002: [Token.D2, Token.Bai, Token.D0, Token.D5, Token.Wan, Token.D0, Token.D2],
            205_0020: [Token.D2, Token.Bai, Token.D0, Token.D5, Token.Wan, Token.D0, Token.D2, Token.Shi],
            205_0200: [Token.D2, Token.Bai, Token.D0, Token.D5, Token.Wan, Token.D0, Token.D2, Token.Bai],
            205_2000: [Token.D2, Token.Bai, Token.D0, Token.D5, Token.Wan, Token.D2, Token.Qian],

            210_0000: [Token.D2, Token.Bai, Token.D1, Token.Shi, Token.Wan],
            210_0002: [Token.D2, Token.Bai, Token.D1, Token.Shi, Token.Wan, Token.D0, Token.D2],
            210_0020: [Token.D2, Token.Bai, Token.D1, Token.Shi, Token.Wan, Token.D0, Token.D2, Token.Shi],
            210_0200: [Token.D2, Token.Bai, Token.D1, Token.Shi, Token.Wan, Token.D0, Token.D2, Token.Bai],
            210_2000: [Token.D2, Token.Bai, Token.D1, Token.Shi, Token.Wan, Token.D2, Token.Qian],

            1000_0000: [Token.D1, Token.Qian, Token.Wan,],
            1000_0001: [Token.D1, Token.Qian, Token.Wan, Token.D0, Token.D1,],
            1000_0010: [Token.D1, Token.Qian, Token.Wan, Token.D0, Token.Shi,],
            1000_0100: [Token.D1, Token.Qian, Token.Wan, Token.D0, Token.D1, Token.Bai,],
            1000_1000: [Token.D1, Token.Qian, Token.Wan, Token.D1, Token.Qian,],
            1001_0000: [Token.D1, Token.Qian, Token.D0, Token.D1, Token.Wan,],
            1010_0000: [Token.D1, Token.Qian, Token.D0, Token.Shi, Token.Wan,],
            1100_0000: [Token.D1, Token.Qian, Token.D1, Token.Bai, Token.Wan,],
        }

        installTestCases(testMatrix)
    })

    describe('parse >= 1_0000_0000 and <= 9999_9999_9999.99', () => {
        const testMatrix: TestMatrix = {
            1_0000_0000: [Token.D1, Token.Yi],
            1_0000_0700: [Token.D1, Token.Yi, Token.D0, Token.D7, Token.Bai],
            1_0700_0000: [Token.D1, Token.Yi, Token.D0, Token.D7, Token.Bai, Token.Wan],
            1_8000_0000: [Token.D1, Token.Yi, Token.D8, Token.Qian, Token.Wan],
            9999_9999_9999.99: [
                Token.D9, Token.Qian, Token.D9, Token.Bai, Token.D9, Token.Shi, Token.D9, Token.Yi,
                Token.D9, Token.Qian, Token.D9, Token.Bai, Token.D9, Token.Shi, Token.D9, Token.Wan,
                Token.D9, Token.Qian, Token.D9, Token.Bai, Token.D9, Token.Shi, Token.D9, Token.Dian,
                Token.D9, Token.D9,
            ]
        }

        installTestCases(testMatrix)
    })

    describe('abnormal cases', () => {
        test('should refuse negative', () => expect(() => parse(-1.32)).toThrow())
        test('should refuse >=1_0000_0000_0000', () => expect(() => parse(1_0000_0000_0000)).toThrow())
    })

    describe('parseTill10K internal method', () => {
        const parseTill10K: ((n: number) => Token[]) = parser.__get__('parseTill10K')
        test('should refuse negative', () => expect(() => parseTill10K(-1)).toThrow())
        test('should refuse larger than 9999', () => expect(() => parseTill10K(10000)).toThrow())
    })

})
