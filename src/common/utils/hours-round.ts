export function roundHours(time: number) {
    const hours = Math.floor(time);
    const minutes = time % 1;

    if (minutes >= 0.25) {
        return hours + 1;
    } else {
        return hours;
    }
}