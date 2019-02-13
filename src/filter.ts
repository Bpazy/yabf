import {upNameBlackList, videoNameBlackList} from "./blacklist";
import {StringUtils} from "./util";

interface Filter<T> {
    filter(rankItem: T): boolean
}


/**
 * 搜索--up名称过滤器
 */
class SearchUpNameFilter implements Filter<JQuery> {

    filter(rankItem: JQuery): boolean {
        const upName = rankItem.find('.up-name').text()
        const ele = upNameBlackList.find(blackName => upName === blackName)
        if (ele) {
            rankItem.remove()
            return true
        }
        return false
    }
}

/**
 * 搜索--视频名称过滤器
 */
class SearchVideoNameFilter implements Filter<JQuery> {

    filter(rankItem: JQuery): boolean {
        const videoName = rankItem.find('a[title].title').text()
        const ele = videoNameBlackList.find(blackName => StringUtils.contains(videoName, blackName))
        if (ele) {
            rankItem.remove()
            return true
        }
        return false
    }
}

// 搜索过滤入口
function filterSearch() {
    // 排行榜过滤处理器
    const filters = [new SearchUpNameFilter(), new SearchVideoNameFilter()]

    for (const rankItem of $('.video.matrix')) {
        for (const rankFilter of filters) {
            const filtered = rankFilter.filter($(rankItem))
            if (filtered) break
        }
    }
}


class HomeVideoNameFilter implements Filter<JQuery<Node>> {
    filter(item: JQuery<Node>): boolean {
        const videoName = item.find('p[title]').text()
        const blackedName = videoNameBlackList.find(blackVideoName => StringUtils.contains(videoName, blackVideoName))
        if (blackedName) {
            item.remove()
            return true
        }
        return false
    }
}

function filterHomeRank() {
    // 排行榜过滤处理器
    const filters = [new HomeVideoNameFilter()]

    const mutationCallback = (mutationsList: MutationRecord[]) => {
        for (const mutation of mutationsList) {
            if (mutation.type != 'childList') continue
            if (!(mutation.target instanceof Element)) continue

            if (mutation.target.className == 'storey-box clearfix') {
                const spreadModules = mutation.target.childNodes
                for (const item of spreadModules) {
                    for (const filter of filters) {
                        const filtered = filter.filter($(item))
                        if (filtered) break
                    }
                }
            }
        }
    }

    const targetNode = document.querySelector(`#app`)
    if (targetNode) {
        const config = {attributes: true, childList: true, subtree: true}
        new MutationObserver(mutationCallback).observe(targetNode, config)
    }
}

/**
 * 排行榜up名称过滤器
 */
class RankUpNameFilter implements Filter<JQuery> {

    filter(rankItem: JQuery): boolean {
        const upName = rankItem.find('.content .info .detail a').text()
        const ele = upNameBlackList.find(blackName => upName === blackName)
        if (ele) {
            rankItem.remove()
            return true
        }
        return false
    }
}

/**
 * 排行榜视频名称过滤器
 */
class RankVideoNameFilter implements Filter<JQuery> {

    filter(rankItem: JQuery): boolean {
        const videoName = rankItem.find('.content .info .title').text()
        const ele = videoNameBlackList.find(blackName => StringUtils.contains(videoName, blackName))
        if (ele) {
            rankItem.remove()
            return true
        }
        return false
    }
}

// 排行榜过滤入口
function filterRank() {
    // 排行榜过滤处理器
    const rankFilters = [new RankUpNameFilter(), new RankVideoNameFilter()]

    for (const rankItem of $('.rank-item')) {
        for (const rankFilter of rankFilters) {
            const filtered = rankFilter.filter($(rankItem))
            if (filtered) break
        }
    }
}


export {
    Filter,
    filterRank,
    filterSearch,
    filterHomeRank
}

