import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Login extends Component {
    state = {
        login: true,
        password: false,
        user: false,
        alert: false,
        response: "Error",
        username: false,
        pass: false
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Iniciar sesion';

        document.getElementById('header').style.backgroundColor = '';
        document.getElementById('header').style.boxShadow = '';
        document.getElementById('shell').style.padding = '64px 0';

        document.getElementById('back').style.display = '';
        document.getElementById('title').style.display = '';

        document.getElementById('settings').style.display = 'none';
        document.getElementById('search').style.display = 'none';
        document.getElementById('filter').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('down').style.display = 'none';
        document.getElementById('shared').style.display = 'none';
        document.getElementById('edit').style.display = 'none';
    }

    handleAlert = () => {
        this.setState({
            alert: !this.state.alert
        });
    };

    handleCheckLogin = () => {
        this.setState({
            login: this.state.username || this.state.pass || document.getElementById('login-user').value.replace(' ', '') === '' || document.getElementById('login-password').value.replace(' ', '') === ''
        });
    };

    handleCheckUserName = (event) => {
        this.setState({
            username: !(new RegExp("^([a-z]+[0-9]{0,2}){5,20}$")).test(event.target.value)
        }, this.handleCheckLogin);
    };

    handleCheckUserPassword = (event) => {
        this.setState({
            pass: !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value)
        }, this.handleCheckLogin);
    };

    handleDisabled = () => {
        this.setState({
            user: !this.state.user,
            password: !this.state.password,
            login: !this.state.login,
            alert: true
        });
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            onAlert = this.handleAlert,
            onDisabled = this.handleDisabled,
            onProgress = this.handleProgress,
            onResponse = this.handleResponse;

        onDisabled(); onProgress(); onResponse("Iniciando sesion..."); onAlert();

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
                switch (request.status) {
                    case 201:
                        onDisabled(); onProgress(); document.cookie = 'userId=' + JSON.parse(request.response)._id; document.getElementById('user').click();
                        break;
                    case 403:
                        onDisabled(); onProgress(); onResponse(JSON.parse(request.responseText).data.text);
                        break;
                    default:
                        onDisabled(); onProgress(); onResponse("Sin conexion");
                        break;
                }
            }
        }
    };

    handleResponse = (text) => {
        this.setState({
            response: text
        });
    };

    handleProgress = () => {
        let progress = document.getElementById('progress'); progress.style.display = progress.style.display === 'none' ? '' : 'none';
    };

    render() {
        return (
            <form style={{margin: 26, textAlign: 'center'}}>
                <Typography type="title">DoItExp</Typography>

                <TextField fullWidth id="login-user" label="Usuario" type="text" disabled={this.state.user} error={this.state.username} onChange={this.handleCheckUserName} style={{margin: '8px 0'}}/>
                <TextField fullWidth id="login-password" label="Contraseña" type="password" disabled={this.state.password} error={this.state.pass} onChange={this.handleCheckUserPassword} style={{margin: '8px 0'}}/>

                <Button raised color="primary" onClick={this.handleRequest} disabled={this.state.login} style={{margin: '16px 0', width: '100%'}}>Iniciar sesión</Button>

                <Typography type="body1" gutterBottom>
                    ¿No tienes cuenta? &nbsp;
                    <Link to="/registry" style={{textDecoration: 'none'}}>
                        <Button>Registrate</Button>
                    </Link>
                </Typography>

                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.alert}
                    autoHideDuration={6000}
                    onRequestClose={this.handleAlert}
                    SnackbarContentProps={{'aria-describedby': 'message-id'}}
                    message={<span id="message-id">{this.state.response}</span>}
                    action={[<Button key="undo" color="accent" dense onClick={this.handleAlert}>OCULTAR</Button>]}
                />
            </form>
        );
    }
}

export default Login;
