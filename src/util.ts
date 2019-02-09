const StringUtils = {
    contains(str1: string, str2: string) {
        if (!str1 || !str2) return false
        return str1.indexOf(str2) !== -1
    }
}

export {
    StringUtils
}
