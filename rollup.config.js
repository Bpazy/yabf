const rollupTypescript = require('rollup-plugin-typescript')

const banner = `
// ==UserScript==
// @name         yabf
// @namespace    https://github.com/Bpazy
// @version      0.1
// @description  yet another bilibili filter
// @author       Bpazy
// @match        *://www.bilibili.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
`
export default {
    input: 'src/yabf.ts',
    output: {
        file: 'dist/yabf.user.js',
        format: 'cjs',
        banner: banner,
    },
    plugins: [
        rollupTypescript()
    ],
}
