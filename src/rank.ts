import {StringUtils} from "./util";

interface RankFilter {
    filter(rankItem: JQuery): boolean
}

/**
 * 排行榜up名称过滤器
 */
class UpNameFilter implements RankFilter {
    // up黑名单列表
    upNameBlackList = ['蔡徐坤情报局']

    filter(rankItem: JQuery): boolean {
        const upName = rankItem.find('.content .info .detail a').text()
        const ele = this.upNameBlackList.find(blackName => upName === blackName)
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
class VideoNameFilter implements RankFilter {
    // up黑名单列表
    videoNameBlackList = ['张艺兴', '蔡徐坤']

    filter(rankItem: JQuery): boolean {
        const videoName = rankItem.find('.content .info .title').text()
        const ele = this.videoNameBlackList.find(blackName => StringUtils.contains(videoName, blackName))
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
    const rankFilters: RankFilter[] = [new UpNameFilter(), new VideoNameFilter()]

    for (const rankItem of $('.rank-item')) {
        for (const rankFilter of rankFilters) {
            const filtered = rankFilter.filter($(rankItem))
            if (filtered) return
        }
    }
}

export default filterRank
