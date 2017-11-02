import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Login extends Component {
    state = {
        login: true,
        password: {
            disabled: false,
            error: false,
            value: ''
        },
        snack: {
            open: false,
            message: ''
        },
        user: {
            disabled: false,
            error: false,
            value: ''
        }
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Iniciar sesion';

        document.getElementById('header').classList.remove('transparent');

        document.getElementById('shell').style.padding = '';

        ['back', 'title'].forEach(function(id) { document.getElementById(id).style.display = '' });
        ['settings', 'search', 'filter', 'down', 'shared', 'edit', 'bottom-navigation'].forEach(function(id) { document.getElementById(id).style.display = 'none' });

        if (getCookie('userId') !== '') {
            document.getElementById('nav-activities').click()
        }
    }

    handleCheck = () => {
        this.setState({
            login:
            this.state.user.error ||
            this.state.password.error ||
            this.state.user.value.replace(' ', '') === '' ||
            this.state.password.value.replace(' ', '') === ''
        })
    };

    handleCheckPassword = (event) => {
        this.setState({
            password: {
                disabled: this.state.password.disabled,
                error: !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value) && !(event.target.value.replace(' ', '') === ''),
                value: event.target.value
            }
        }, this.handleCheck)
    };

    handleCheckUser = (event) => {
        this.setState({
            user: {
                disabled: this.state.user.disabled,
                error: !(new RegExp("[a-z0-9!?-]{5,20}")).test(event.target.value) && !(event.target.value.replace(' ', '') === ''),
                value: event.target.value
            }
        }, this.handleCheck)
    };

    handleDisabled = () => {
        this.setState({
            user: {
                disabled: !this.state.user.disabled,
                error: this.state.user.error,
                value: this.state.user.value
            },
            password: {
                disabled: !this.state.user.disabled,
                error: this.state.user.error,
                value: this.state.password.value
            },
            login: !this.state.login
        });

        document.getElementById('progress').style.display = document.getElementById('progress').style.display === 'block' ? '' : 'block';
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            snack = this.handleSnack,
            disable = this.handleDisabled;

        disable();
        snack("Iniciando sesion...");

        request.open('POST', 'http://' + window.location.hostname + ':8081/sessions', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201: setUser(JSON.parse(request.response));
                        break;
                    case 403: snack("Datos incorrectos");
                        break;
                    default: snack("El servicio no responde");
                        break;
                }

                disable()
            }
        };

        request.send(
            JSON.stringify({
                username: document.getElementById('login-user').value,
                password: document.getElementById('login-password').value
            })
        )
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                open: !(typeof message === 'object'),
                message: typeof message === 'object' ? '' : message
            }
        })
    };

    render() {
        return (
            <form id="login-form">
                <img
                    id="logo"
                    src={ "/images/logo.png" }
                    alt={""}
                />

                <TextField
                    id="login-user"
                    autoComplete="off"
                    classes={{ root: "mb-8" }}
                    disabled={ this.state.user.disabled }
                    error={ this.state.user.error }
                    fullWidth
                    label="Usuario"
                    onChange={ this.handleCheckUser }
                    type="text"
                />

                <TextField
                    id="login-password"
                    autoComplete="off"
                    classes={{ root: "mb-8" }}
                    disabled={ this.state.password.disabled}
                    error={ this.state.password.error}
                    fullWidth
                    label="Contraseña"
                    onChange={ this.handleCheckPassword }
                    type="password"
                />

                <Button
                    color="primary"
                    disabled={ this.state.login }
                    onClick={ this.handleRequest }
                    raised
                    style={{
                        margin: '16px 0',
                        width: '100%'
                    }}
                >
                    Iniciar sesión
                </Button>

                <Typography type="body1">
                    ¿No tienes cuenta? &nbsp;
                    <Link
                        to="/registry"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button color="primary">Registrate</Button>
                    </Link>
                </Typography>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={ this.state.snack.open }
                    autoHideDuration={ 6000 }
                    onRequestClose={ this.handleSnack }
                    SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
                    message={ <span id="message-id">{ this.state.snack.message }</span> }
                    action={[
                        <Button
                            color="accent"
                            dense
                            key="undo"
                            onClick={ this.handleSnack }
                        >
                            OCULTAR
                        </Button>
                    ]}
                />
            </form>
        );
    }
}

function getCookie(cookie) {
    let name = cookie + "=",
        decode = decodeURIComponent(document.cookie),
        ca = decode.split(';');

    for (let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function setCookie(name, value, days) {
    let date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/"
}

function setUser(res) {
    setCookie('userId', res._id, 360);

    if (res.hasOwnProperty('business')) {
        setCookie('userRut', res.business.rut.body, 360)
    }

    document.getElementById('nav-activities').click()
}

export default Login;
