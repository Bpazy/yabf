import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import rollupTypescript from 'rollup-plugin-typescript'

const banner = `// ==UserScript==
// @name         Yet Another Bilibili Filter
// @name:zh-CN   Yet Another Bilibili Filter 看真正想看的哔哩哔哩
// @namespace    https://github.com/Bpazy
// @version      0.4
// @description  yet another bilibili filter
// @author       Bpazy
// @match        *://*.bilibili.com/*
// @grant        none
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
