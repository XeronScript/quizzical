export default function parseString(str) {
    if (typeof str === "string")
        return str.replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')
            .replace(/&amp;/g, '&')
            .replace(/&shy/g, '-')
            .replace(/&rsquo/g, "'")
            .replace(/&eacute/g, "é")
    else
        return str.map(answer =>
            answer.replace(/&quot;/g, '"')
                .replace(/&#039;/g, '\'')
                .replace(/&amp;/g, '&')
                .replace(/&shy/g, '-')
                .replace(/&rsquo/g, "'")
                .replace(/&eacute/g, "é")
        )
}
