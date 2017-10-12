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
            error: false,
            disabled: false
        },
        snack: {
            open: false,
            message: ''
        },
        user: {
            error: false,
            disabled: false
        }
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Iniciar sesion';

        document.getElementById('header').style.backgroundColor = '';
        document.getElementById('header').style.boxShadow = '';
        document.getElementById('shell').style.padding = '64px 0';

        ['back', 'title'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'search', 'filter', 'check', 'down', 'shared', 'edit'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        })
    }

    handleAllError = () => {
        this.setState({
            password: {
                disabled: false,
                error: true
            },
            user: {
                disabled: false,
                error: true
            }
        })
    };

    handleCheckLogin = () => {
        this.setState({
            login:
            this.state.user.error ||
            this.state.password.error ||
            document.getElementById('login-user').value.replace(' ', '') === '' ||
            document.getElementById('login-password').value.replace(' ', '') === ''
        })
    };

    handleCheckUserName = (event) => {
        this.setState({
            user: {
                error:
                !(new RegExp("[a-z0-9!?-]{5,20}")).test(event.target.value) &&
                !(event.target.value.replace(' ', '') === ''),
                disabled: this.state.user.disabled
            }
        }, this.handleCheckLogin)
    };

    handleCheckUserPassword = (event) => {
        this.setState({
            password: {
                error:
                !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value) &&
                !(event.target.value.replace(' ', '') === ''),
                disabled: this.state.password.disabled
            }
        }, this.handleCheckLogin)
    };

    handleDisabled = () => {
        this.setState({
            user: {
                error: this.state.user.error,
                disabled: !this.state.user.disabled
            },
            password: {
                error: this.state.user.error,
                disabled: !this.state.user.disabled
            },
            login: !this.state.login
        })
    };

    handleProgress = () => {
        let progress = document.getElementById('progress'); progress.style.display = progress.style.display === 'none' ? '' : 'none';
    };

    handleRequest = () => {
        let request = new XMLHttpRequest()
            , onSnacked = this.handleSnack
            , onDisabled = this.handleDisabled
            , onProgress = this.handleProgress
            , onError = this.handleAllError;

        onDisabled();
        onProgress();
        onSnacked("Iniciando sesion...");

        request.open('POST', 'http://' + window.location.hostname + ':8081/sessions', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.send(
            JSON.stringify({
                username: document.getElementById('login-user').value,
                password: document.getElementById('login-password').value
            })
        );

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                onDisabled();
                onProgress();

                switch (request.status) {
                    case 201:
                         setCookie('userId', JSON.parse(request.response)._id, 360); document.getElementById('link-activities').click();
                        break;
                    case 403:
                        let errors = JSON.parse(request.responseText).errors
                            , text = ''
                            , property;

                        for (property in errors) {
                            if (errors.hasOwnProperty(property)) {
                                text += errors[property].message + '\n'
                            }
                        }

                        onError();
                        onSnacked(text);
                        break;
                    default:
                        onSnacked("Sin conexion");
                        break;
                }
            }
        }
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
            <form
                style={{
                    margin: 16,
                    textAlign: 'center'
                }}
            >
                <Typography
                    style={{ padding: '72px 0' }}
                    type="title"
                >
                    DoItExp
                </Typography>

                <TextField
                    id="login-user"
                    autoComplete="off"
                    disabled={ this.state.user.disabled }
                    error={ this.state.user.error }
                    fullWidth
                    label="Usuario"
                    onChange={ this.handleCheckUserName }
                    style={{ margin: '8px 0' }}
                    type="text"
                />

                <TextField
                    id="login-password"
                    autoComplete="off"
                    disabled={ this.state.password.disabled}
                    error={ this.state.password.error}
                    fullWidth
                    label="Contraseña"
                    onChange={this.handleCheckUserPassword}
                    style={{ margin: '8px 0' }}
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

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default Login;
