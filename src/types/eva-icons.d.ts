declare module 'eva-icons' {
    type AnimationType = 'zoom' | 'pulse' | 'shake' | 'flip'
    interface Animation {
        type: AnimationType;
        hover?: boolean; // default true
        infinite?: boolean; // default false
    }
    interface Options {
        fill?: string;
        width?: string | number; // default 24
        height?: string | number; // default 24
        class?: string;
        animation? : Animation;

    }
    export function replace(options? : Options): void;
}
