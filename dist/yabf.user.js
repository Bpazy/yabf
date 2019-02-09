
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

'use strict';

const StringUtils = {
    contains(str1, str2) {
        if (!str1 || !str2)
            return false;
        return str1.indexOf(str2) !== -1;
    }
};

/**
 * 排行榜up名称过滤器
 */
class UpNameFilter {
    constructor() {
        // up黑名单列表
        this.upNameBlackList = ['蔡徐坤情报局'];
    }
    filter(rankItem) {
        const upName = rankItem.find('.content .info .detail a').text();
        const ele = this.upNameBlackList.find(blackName => upName === blackName);
        if (ele) {
            rankItem.remove();
            return true;
        }
        return false;
    }
}
/**
 * 排行榜视频名称过滤器
 */
class VideoNameFilter {
    constructor() {
        // up黑名单列表
        this.videoNameBlackList = ['张艺兴', '蔡徐坤'];
    }
    filter(rankItem) {
        const videoName = rankItem.find('.content .info .title').text();
        const ele = this.videoNameBlackList.find(blackName => StringUtils.contains(videoName, blackName));
        if (ele) {
            rankItem.remove();
            return true;
        }
        return false;
    }
}
// 排行榜过滤入口
function filterRank() {
    // 排行榜过滤处理器
    const rankFilters = [new UpNameFilter(), new VideoNameFilter()];
    for (const rankItem of $('.rank-item')) {
        for (const rankFilter of rankFilters) {
            const filtered = rankFilter.filter($(rankItem));
            if (filtered)
                return;
        }
    }
}

// 主入口
(function () {
    filterRank();
})();
