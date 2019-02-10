import {Filter} from "./filter"
import {videoNameBlackList} from "./blacklist"
import {StringUtils} from "./util";

class VideoNameFilter implements Filter<JQuery<Node>> {
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
    const filters = [new VideoNameFilter()]

    const mutationCallback = (mutationsList: MutationRecord[]) => {
        for (const mutation of mutationsList) {
            if (mutation.type != 'childList') continue
            if (!(mutation.target instanceof Element)) continue

            if (mutation.target.className == 'storey-box clearfix') {
                const spreadModules = mutation.target.childNodes
                for (const item of spreadModules) {
                    for (const filter of filters) {
                        const filtered = filter.filter($(item))
                        if (filtered) return
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

export default filterHomeRank
