import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel }  from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';

import createLogin from '../styles/createLogin';

class Login extends Component {
    state = createLogin;

    handleSnackBar = message => {
        this.setState({ open: true, message: message });
        //document.getElementById('progress').style.visibility = 'hidden';
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false });
    };

    handleRequest = () => {
        let request = new XMLHttpRequest();
        let handleSnackBar = this.handleSnackBar;

        request.open('POST', 'http://172.16.17.242:8081/sessions', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(
            "l_usuario=" + document.getElementById('login-user').value +
            "&l_clave=" + document.getElementById('login-password').value
        );

        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                if (request.status === 0) {
                    handleSnackBar("Sin conexion");
                }

                if (request.status === 400) {
                    handleSnackBar("Datos incorrectos");
                }

                if (request.status === 200) {
                    document.cookie = "doitUser=" + document.getElementById('login-user').value;
                    window.location.href = "/"
                }
            }
        }

        if (document.cookie.indexOf('doitUser') !== -1 ) {
            window.location.reload()
        }
    };

    checkUserName = (event) => {
        let states = this.state;

        states.inputLoginUser.error = false;

        if (!RegExp("^([a-z]+[0-9]{0,2}){5,20}$").test(event.target.value.replace(" ", "")) && event.target.value.replace(" ", "") != "") {
            states.inputLoginUser.error = true;
        }

        this.setState(states);
        this.checkLogin();
    };

    checkPassword = (event) => {
        let states = this.state;

        states.inputLoginPassword.error = false;

        if (!RegExp("[A-Za-z0-9!?-]{8,16}").test(event.target.value.replace(" ", "")) && event.target.value.replace(" ", "") != "") {
            states.inputLoginPassword.error = true;
        }

        this.setState(states);
        this.checkLogin();
    };

    checkLogin = (event) => {
        let states = this.state;

        states.buttonLogin.disabled = true;

        if (states.inputLoginPassword.error !== true && states.inputLoginUser.error !== true && document.getElementById("login-user").value.replace(" ", "") !== "" && document.getElementById("login-password").value.replace(" ", "") !== "") {
            states.buttonLogin.disabled = false;
        }

        this.setState(states);
    }; 

    render() {
        return (
            <form style={{...this.state.form.style}}>
                <Typography type="display3" style={{...this.state.typographyTitle.style}}>DoItExp</Typography>

                <div style={{...this.state.divLogo.style}}/>

                <FormControl style={{...this.state.formControl.style}} fullWidth>
                    <InputLabel htmlFor="login-user">Usuario</InputLabel>
                    <Input id="login-user" type={"text"} onChange={this.checkUserName} error={this.state.inputLoginUser.error}/>
                </FormControl>

                <FormControl style={{...this.state.formControl.style}} fullWidth>
                    <InputLabel htmlFor="login-password">Contraseña</InputLabel>
                    <Input id="login-password" type={"password"} onChange={this.checkPassword} error={this.state.inputLoginPassword.error}/>
                </FormControl>

                <Button raised onClick={this.handleRequest} style={{...this.state.buttonLogin.style}} disabled={this.state.buttonLogin.disabled}>
                    Iniciar sesión
                </Button>

                <Typography type="body1" gutterBottom>
                    ¿No tienes cuenta? <Button onClick={this.props.onClickRegistry}>Registrate</Button>
                </Typography>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[<Button key="undo" color="accent" dense onClick={this.handleRequestClose}>OCULTAR</Button>]}
                />
            </form>
        );
    }
}

export default Login;
