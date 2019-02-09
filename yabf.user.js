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

const StringUtils = {
    contains(str1, str2) {
        if (!str1 || !str2) return false
        return str1.indexOf(str2) !== -1
    }
}

// 排行榜up名称过滤器
const upNameBlackList = ['蔡徐坤情报局']
function upNameFilter(rankItem) {
    const upName = rankItem.find('.content .info .detail a').text()
    const ele = upNameBlackList.find(blackName => upName === blackName)
    if (ele) {
        rankItem.remove()
        return true
    }
    return false
}

// 排行榜视频名称过滤器
const videoNameBlackList = ['张艺兴', '蔡徐坤']
function videoNameFilter(rankItem) {
    const videoName = rankItem.find('.content .info .title').text()
    const ele = videoNameBlackList.find(blackName => StringUtils.contains(videoName, blackName))
    if (ele) {
        rankItem.remove()
        return true
    }
    return false
}

// 排行榜过滤处理器
const rankItemFilters = [upNameFilter, videoNameFilter]
function rankItemFilterHandler(rankItem) {
    for (let i = 0; i < rankItemFilters.length; i++) {
        const filtered = rankItemFilters[i]($(rankItem))
        if (filtered) return
    }
}

// 排行榜过滤入口
function filterRank() {
    const rankItems = $('.rank-item')
    for (let i = 0; i < rankItems.length; i++) {
        rankItemFilterHandler(rankItems[i])
    }
}

// 主入口
(function () {
    filterRank()
})();
