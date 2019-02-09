import {RankFilter} from "./filter";
import {videoNameBlackList} from "./blacklist";

class HomeFilter implements RankFilter {
    filter(rankItem: JQuery): boolean {
        const videoTitle = rankItem.find('p[title]').text()
        const ele = videoNameBlackList.find(blackName => videoTitle === blackName)
        console.log(videoTitle)
        console.log(ele)
        if (ele) {
            rankItem.remove()
            return true
        }
        return false
    }
}

function filterHomeRank() {
    // 排行榜过滤处理器
    const filters = [new HomeFilter()]
    console.log(filters)

    for (const item of $('.card-live-module')) {
        console.log(item)
        for (const filter of filters) {
            const filtered = filter.filter($(item))
            if (filtered) return
        }
    }
}

// TODO 首页是动态加载的，需额外处理
export default filterHomeRank
