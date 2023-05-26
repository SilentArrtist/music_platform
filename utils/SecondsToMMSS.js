export const SecondsToMMSS = (number) => {
    console.log(number, number / 60);
    if (number < 60) {
        if (number < 10) {
            return `00:0${number}`
        }
        return `00:${number}`
    }
    const mins = Math.floor(number / 60) < 10 ? `0${Math.floor(number / 60)}` : `${Math.floor(number / 60)}`
    const seconds = `${number - (60 * Math.floor(number / 60))}`
    if (seconds < 10) return `${mins}:0${seconds}`
    return `${mins}:${seconds}`
}