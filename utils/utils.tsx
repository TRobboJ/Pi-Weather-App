export function formatHoursAndMinutes(date) {
    return {
        hours: date.getHours(),
        minutes: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }
}

export function returnAMPMString(hours, minutes) {
    return `${hours > 12 ? hours - 12 : hours}:${minutes}`
}

export function kelvinToCelsius(kelvTemp) {
    return kelvTemp - 273.15
}

export function kelvinToFarenheit(kelvTemp) {
    return (kelvTemp * (9 / 5)) - 459.67
}