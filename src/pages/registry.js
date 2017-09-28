import React from 'react';
import PropTypes from 'prop-types';

import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel }  from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { LinearProgress } from 'material-ui/Progress';

import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    bar : {
      minHeight: 56,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 2,
        marginBottom: 16,
        background: theme.palette.background.default,
    },
    mobileStepper : {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: 0,
    },
    flex: {
        flex: 1,
        fontWeight: 500,
        paddingTop: 5,
    },
    iconButton: {
        margin:'0 16px 0 -9px',
    },
    form: {
        margin: '0 16px',
    },
    formControl: {
        width: '100%',
        marginBottom: '16px',
    },
    textField: {
        width: '45%',
        marginBottom: '16px',
    },
    progress: {
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        visibility: 'hidden',
    },
});

class Registry extends React.Component {
    state = {
        open: false,
        message: "",
        activeStep: 0,
        name: {
            disabled: false,
            error: false,
        },
        surname: {
            disabled: false,
            error: false,
        },
        user: {
            disabled: false,
            error: false,
        },
        password1: {
            disabled: false,
            error: false,
        },
        password2: {
            disabled: false,
            error: false,
        },
        phone: {
            disabled: false,
            error: false,
        },
        mail: {
            disabled: false,
            error: false,
        },
        born: {
            disabled: false,
            error: false,
        },
        sex: {
            disabled: false,
            value: "M",
            error: false,
        },
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });

        document.getElementById("registry-personal").style.display = 'none';
        document.getElementById("registry-confirm").style.display = '';
        document.getElementById("registry-confirm-icon").style.display = ''
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });

        document.getElementById("registry-personal").style.display = '';
        document.getElementById("registry-confirm").style.display = 'none';
        document.getElementById("registry-confirm-icon").style.display = 'none'
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSnackBar = message => {
        this.setState({ open: true, message: message });
        document.getElementById('progress').style.visibility = 'hidden';
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false });
    };

    handleCheck = event => {
        if (event.target.value.replace(" ", "") === "") {
            this.setState({ [event.target.id.replace("registry-", "")]: { error: true } });
        }
    };

    handleRequest = () => {
        document.getElementById('progress').style.visibility = 'visible';

        let me = this;
        let request = new XMLHttpRequest();
        let handleSnackBar = this.handleSnackBar;

        me.setState({
            name: { disabled: true },
            surname: { disabled: true },
            born: { disabled: true },
            sex: { disabled: true },
            phone: { disabled: true },
            mail: { disabled: true },
            user: { disabled: true },
            password1: { disabled: true },
            password2: { disabled: false },
        });

        request.open('POST', 'http://34.240.133.65:8081/users', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(
            "r_nombres=" + document.getElementById('registry-name').value +
            "&r_apellidos=" + document.getElementById('registry-surname').value +
            "&r_natal=" + document.getElementById('registry-born').value +
            "&r_sexo=" + document.getElementById('registry-sex').value +
            "&r_fono=" + document.getElementById('registry-phone').value +
            "&r_email=" + document.getElementById('registry-mail').value +
            "&r_usuario=" + document.getElementById('registry-user').value +
            "&r_clave1=" + document.getElementById('registry-password1').value +
            "&r_clave2=" + document.getElementById('registry-password2').value
        );

        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                document.getElementById('progress').style.visibility = 'hidden';

                me.setState({
                    name: { disabled: false },
                    surname: { disabled: false },
                    born: { disabled: false },
                    sex: { disabled: false },
                    phone: { disabled: false },
                    mail: { disabled: false },
                    user: { disabled: false },
                    password1: { disabled: false },
                    password2: { disabled: false },
                });

                if (request.status === 0) {
                    handleSnackBar("Sin conexion");
                }

                if (request.status === 200) {
                    window.location.href = "/activities"
                }

                if (request.status === 400) {
                    handleSnackBar(request.responseText);
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

                <AppBar position="static" style={{backgroundColor:'#2196f3'}} className={classes.bar}>
                    <Toolbar className={classes.bar}>
                        <IconButton color="contrast" aria-label="Menu" className={classes.iconButton} href={"/"}>
                            <Icon>arrow_back</Icon>
                        </IconButton>

                        <Typography type="title" color="inherit" className={classes.flex}>Registrarse</Typography>

                        <IconButton id={"registry-confirm-icon"} style={{display: 'none'}} color="contrast" aria-label="Menu" onClick={this.handleRequest}>
                            <Icon>check</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Paper square elevation={0} className={classes.header}>
                    <Typography>Paso {this.state.activeStep + 1} de 2</Typography>
                </Paper>

                <form>
                    <div id={"registry-personal"} className={classes.form}>
                        <FormControl className={classes.formControl} error={state.name.error} disabled={state.name.disabled}>
                            <InputLabel htmlFor="registry-name" color="accent">Nombre *</InputLabel>
                            <Input id="registry-name" onChange={this.handleCheck}/>
                        </FormControl>

                        <FormControl className={classes.formControl} error={state.surname.error} disabled={state.surname.disabled}>
                            <InputLabel htmlFor="registry-surname" color="accent">Apellido *</InputLabel>
                            <Input id="registry-surname"/>
                        </FormControl>

                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <TextField
                                id="registry-born"
                                label="Nacimiento *"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{ shrink: true, }}
                                error={state.born.error}
                                disabled={state.born.disabled}
                            />

                            <FormControl className={classes.formControl} style={{width:'45%'}} error={state.sex.error} disabled={state.sex.disabled}>
                                <InputLabel htmlFor="registry-sex">Sexo</InputLabel>
                                <Select
                                    native
                                    input={<Input id="registry-sex" />}
                                    value={state.sex.value}
                                    onChange={this.handleChange('sex')}
                                >
                                    <option value={"M"}>Masculino</option>
                                    <option value={"F"}>Femenino</option>
                                </Select>
                            </FormControl>

                        </div>

                        <FormControl className={classes.formControl} error={state.phone.error} disabled={state.phone.disabled}>
                            <InputLabel htmlFor="registry-phone" color="primary">Telefono *</InputLabel>
                            <Input id="registry-phone" type={"tel"} />
                        </FormControl>

                        <FormControl className={classes.formControl} error={state.mail.error} disabled={state.mail.disabled}>
                            <InputLabel htmlFor="registry-mail" color="primary">Contacto *</InputLabel>
                            <Input id="registry-mail" type={"email"} />
                        </FormControl>

                        <Typography type="caption" gutterBottom style={{margin:'16px 0'}}>
                            Campos requeridos *
                        </Typography>
                    </div>

                    <div id={"registry-confirm"} style={{display: 'none'}} className={classes.form}>
                        <FormControl className={classes.formControl} error={state.user.error} disabled={state.user.disabled}>
                            <InputLabel htmlFor="registry-user" color="primary">Nombre de Usuario *</InputLabel>
                            <Input id="registry-user"/>
                        </FormControl>

                        <FormControl className={classes.formControl} error={state.password1.error} disabled={state.password1.disabled}>
                            <InputLabel htmlFor="registry-password1" color="primary">Contraseña *</InputLabel>
                            <Input id="registry-password1" type={"password"} />
                        </FormControl>

                        <FormControl className={classes.formControl} error={state.password2.error} disabled={state.password2.disabled}>
                            <InputLabel htmlFor="registry-password2" color="primary">Repetir Contraseña *</InputLabel>
                            <Input id="registry-password2" type={"password"} />
                        </FormControl>

                        <Typography type="caption" gutterBottom style={{margin:'16px 0'}}>
                            Campos requeridos *
                        </Typography>
                    </div>
                </form>

                <MobileStepper
                    type="text"
                    steps={2}
                    position="static"
                    activeStep={this.state.activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button dense onClick={this.handleNext} disabled={this.state.activeStep === 1}>
                            Confirmar
                            <Icon>arrow_forward</Icon>
                        </Button>
                    }
                    backButton={
                        <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            <Icon>arrow_back</Icon>
                            Datos Personales
                        </Button>
                    }
                />

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
                    <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>OCULTAR</Button>,
                  ]}
                />
            </div>
        );
    }
}

Registry.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Registry));
