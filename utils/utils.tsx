export function formatHoursAndMinutes(date) {
    return {
        hours: date.getHours(),
        minutes: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }
}

export function returnAMPMString(hours: number, minutes: string) {
    return `${hours > 12 ? hours - 12 : hours}:${minutes}`
}

export function kelvinToCelsius(kelvTemp: number) {
    return kelvTemp - 273.15
}

export function kelvinToFarenheit(kelvTemp: number) {
    return (kelvTemp * (9 / 5)) - 459.67
}