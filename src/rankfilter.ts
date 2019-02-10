import {StringUtils} from "./util";
import {Filter} from "./filter";
import {upNameBlackList, videoNameBlackList} from "./blacklist";

/**
 * 排行榜up名称过滤器
 */
class UpNameFilter implements Filter<JQuery> {

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
class VideoNameFilter implements Filter<JQuery> {

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
    const rankFilters = [new UpNameFilter(), new VideoNameFilter()]

    for (const rankItem of $('.rank-item')) {
        for (const rankFilter of rankFilters) {
            const filtered = rankFilter.filter($(rankItem))
            if (filtered) return
        }
    }
}

export default filterRank
