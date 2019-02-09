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
//# sourceMappingURL=util.js.map

/**
 * 视频名称黑名单列表
 */
const videoNameBlackList = ['张艺兴', '蔡徐坤'];
/**
 * up黑名单列表
 */
const upNameBlackList = ['蔡徐坤情报局'];

/**
 * 排行榜up名称过滤器
 */
class UpNameFilter {
    filter(rankItem) {
        const upName = rankItem.find('.content .info .detail a').text();
        const ele = upNameBlackList.find(blackName => upName === blackName);
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
    filter(rankItem) {
        const videoName = rankItem.find('.content .info .title').text();
        const ele = videoNameBlackList.find(blackName => StringUtils.contains(videoName, blackName));
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
//# sourceMappingURL=rankfilter.js.map

class HomeFilter {
    filter(rankItem) {
        const videoTitle = rankItem.find('p[title]').text();
        const ele = videoNameBlackList.find(blackName => videoTitle === blackName);
        console.log(videoTitle);
        console.log(ele);
        if (ele) {
            rankItem.remove();
            return true;
        }
        return false;
    }
}
function filterHomeRank() {
    // 排行榜过滤处理器
    const filters = [new HomeFilter()];
    console.log(filters);
    for (const item of $('.card-live-module')) {
        console.log(item);
        for (const filter of filters) {
            const filtered = filter.filter($(item));
            if (filtered)
                return;
        }
    }
}

// 主入口
(function () {
    filterRank();
    filterHomeRank();
})();
//# sourceMappingURL=yabf.js.map
