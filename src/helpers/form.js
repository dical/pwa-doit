export function test_value(exp, val) {
    return (new RegExp(exp)).test(val)
}

export function test_rut(rut) {
    let n = rut.replace('.','').replace('-',''),
        c = n.slice(0, -1),
        v = n.slice(-1).toLowerCase(),
        s = 0,
        m = 2;

    for(let i = 1; i <= c.length; i++) {
        let index = m * n.charAt(c.length - i);

        s = s + index;

        if(m < 7) { m = m + 1; } else { m = 2; }
    }

    v = (v === 'k') ? 10 : v;
    v = (v === '0') ? 11 : v;

    return parseInt(v, 0) === parseInt(11 - (s % 11), 0);
}
