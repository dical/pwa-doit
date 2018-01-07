export function decode_errors(response) {
    let errors_json = JSON.parse(response),
        errors_string = '';

    if (errors_json.hasOwnProperty('errors')) {
        for (let property in errors_json.errors) {
            if (errors_json.errors.hasOwnProperty(property)) {
                if (errors_json.errors[property].kind === 'required') {
                    errors_string = errors_string + errors_json.errors[property].message + '\n'
                }

                if (errors_json.errors[property].kind === 'max') {
                    errors_string = errors_string + 'La fecha fundación supera el maximo permitido' + '\n'
                }
            }
        }
    } else {
        if (errors_json.hasOwnProperty('code')) {
            errors_string = textFields[errors_json.errmsg.split('index: ').pop().split('_').reverse().pop()] + ' ya registrado.'
        }
    }

    return errors_string
}

export function request(type, url, body, callback, async) {
    let request = new XMLHttpRequest();

    request.open(type.toUpperCase(), url, async);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    request.onreadystatechange = function() { if (request.readyState === 4) { callback(request) } };

    request.send(JSON.stringify(body))
}

let textFields = {
    'username': 'Nombre de usuario',
    'business.rut.body': 'Rut de empresa',
    'mail': 'Correo electrónico'
};
