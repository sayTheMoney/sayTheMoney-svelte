const sveltePreprocess = require('svelte-preprocess');

function createPreprocessors(sourceMap) {
    return sveltePreprocess({
        sourceMap,
    });
}

module.exports = {
    preprocess: createPreprocessors(true),
    createPreprocessors,
};
