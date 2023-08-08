export function isChineseCharacter(text: string) {
    const regex = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/
    return text.match(regex) !== null
}

export function trim(text: string) {
    if (text) {
        text = text.trim()
        return text
    }
    return ""
}

export function removeWs(text: string) {
    if (text) {
        text = text.replace(' ', '')
        return text
    }
    return ""
}
