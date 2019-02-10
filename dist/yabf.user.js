// ==UserScript==
// @name         Yet Another Bilibili Filter
// @name:zh-CN   Yet Another Bilibili Filter 看真正想看的哔哩哔哩
// @namespace    https://github.com/Bpazy
// @version      0.1
// @description  yet another bilibili filter
// @author       Bpazy
// @match        *://www.bilibili.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
(function () {
    'use strict';

    const StringUtils = {
        contains(str1, str2) {
            if (!str1 || !str2)
                return false;
            return str1.indexOf(str2) !== -1;
        }
    };

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

    class VideoNameFilter$1 {
        filter(item) {
            const videoName = item.find('p[title]').text();
            const blackedName = videoNameBlackList.find(blackVideoName => StringUtils.contains(videoName, blackVideoName));
            if (blackedName) {
                item.remove();
                return true;
            }
            return false;
        }
    }
    function filterHomeRank() {
        // 排行榜过滤处理器
        const filters = [new VideoNameFilter$1()];
        const mutationCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type != 'childList')
                    continue;
                if (!(mutation.target instanceof Element))
                    continue;
                if (mutation.target.className == 'storey-box clearfix') {
                    const spreadModules = mutation.target.childNodes;
                    for (const item of spreadModules) {
                        for (const filter of filters) {
                            const filtered = filter.filter($(item));
                            if (filtered)
                                return;
                        }
                    }
                }
            }
        };
        const targetNode = document.querySelector(`#app`);
        if (targetNode) {
            const config = { attributes: true, childList: true, subtree: true };
            new MutationObserver(mutationCallback).observe(targetNode, config);
        }
    }

    // 主入口
    filterRank();
    filterHomeRank();

}());
