export function get_cookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export function set_cookie(name, value, days) {
    let date = new Date(); date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/"
}

export function quit_cookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}
