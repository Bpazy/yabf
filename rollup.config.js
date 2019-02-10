import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript'

const banner = `// ==UserScript==
// @name         yabf
// @namespace    https://github.com/Bpazy
// @version      0.1
// @description  yet another bilibili filter
// @author       Bpazy
// @match        *://www.bilibili.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==`

export default {
    input: 'src/yabf.ts',
    output: {
        file: 'dist/yabf.user.js',
        format: 'iife',
        banner: banner,
    },
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript(),
    ],
}
