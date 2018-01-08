export function utc_full_date(date) {
    return utc_year(date) + '-' + utc_month(date) + '-' + utc_date(date)
}

export function utc_full_hour(date) {
    return utc_hours(date) + ':' + utc_minutes(date)
}

export function utc_minutes(date) {
    return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
}

export function utc_hours(date) {
    return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
}

export function utc_date(date) {
    return date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
}

export function utc_month(date) {
    return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
}

export function utc_year(date) {
    return date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear()
}

export function is_down_years(date, years) {
    let now = new Date(Date.now()),
        dif = now.getFullYear() - date.getFullYear();

    return dif < years || (dif === years && now.getMonth() < date.getMonth()) || (dif === years && now.getMonth() === date.getMonth() && now.getDate() < date.getDate())
}
