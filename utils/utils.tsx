export function formatHoursAndMinutes(date) {
    return {
        hours: date.getHours(),
        minutes: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }
}

export function kelvinToCelsius(kelvTemp) {
    return kelvTemp - 273.15
}