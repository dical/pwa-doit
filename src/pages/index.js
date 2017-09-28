import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Input, { InputLabel }  from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import { LinearProgress } from 'material-ui/Progress';

import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

const styles = ({
    root: {
        backgroundImage: 'url(images/climbing-blue-168.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        padding: '150px 24px 0px',
        textAlign: 'center',
        width: 'auto',
    },
    flex: {
        flex: 1,
        fontWeight: 500,
        paddingTop: 5
    },
    formControl: {
        margin: '16px 0',
        width: '100%',
    },
    button: {
        margin: '16px 0',
        display: 'block',
        width: '100%',
    },
    typography: {
        margin: '32px 0',
    },
    progress: {
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        visibility: 'hidden',
    },
});

class Index extends Component {
    state = {
        open: false,
        message: "",
        user: false,
        password: false,
        button: false,
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false });
    };

    handleSnackBar = message => {
        this.setState({ open: true, message: message });
        document.getElementById('progress').style.visibility = 'hidden';
    };

    handleRequest = () => {
        document.getElementById('progress').style.visibility = 'visible';

        let me = this;
        let request = new XMLHttpRequest();
        let handleSnackBar = this.handleSnackBar;

        me.setState({ user: true, password: true, button: true });

        request.open('POST', 'http://34.240.133.65:8081/sessions', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(
            "l_usuario=" + document.getElementById('login-user').value +
            "&l_clave=" + document.getElementById('login-password').value
        );

        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                me.setState({ user: false, password: false, button: false });

                if (request.status === 0) {
                    handleSnackBar("Sin conexion");
                }
                if (request.status === 200) {
                    window.location.href = "/activities"
                }
            }
        }
    };

    render() {
        const classes = this.props.classes;
        const state = this.state;

        return (
            <div className={classes.root}>
                <LinearProgress id={"progress"} className={classes.progress} />

                <Typography type="display1" gutterBottom>DoitExp</Typography>

                <FormControl className={classes.formControl} color="accent" disabled={state.user}>
                    <InputLabel htmlFor="login-user">Usuario</InputLabel>
                    <Input id="login-user"/>
                </FormControl>

                <FormControl className={classes.formControl} color="accent" disabled={state.password}>
                    <InputLabel htmlFor="login-password">Contraseña</InputLabel>
                    <Input id="login-password" type={"password"}/>
                </FormControl>

                <Button raised color="primary" className={classes.button} onClick={this.handleRequest} disabled={state.button}>Iniciar sesión</Button>

                <Typography type="body1" gutterBottom className={classes.typography}>
                    ¿No tienes cuenta? <Button color="primary" href={"/registry"}>Registrate</Button>
                </Typography>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6e3}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
                            OCULTAR
                        </Button>,
                    ]}
                />
            </div>
        );
    }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
