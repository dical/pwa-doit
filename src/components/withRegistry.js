import React from 'react';

import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel }  from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import createRegistry from '../styles/createRegistry';

class Registry extends React.Component {
    state = createRegistry;

    handleNext = () => {
        let states = this.state;

        states.mobileStepper.activeStep += 1;

        this.setState(states);

        document.getElementById("registry-personal").style.display = 'none';
        document.getElementById("registry-confirm").style.display = '';
        document.getElementById("registry-confirm-button").style.display = '';
    };

    handleBack = () => {
        let states = this.state;

        states.mobileStepper.activeStep -= 1;

        this.setState(states);

        document.getElementById("registry-personal").style.display = '';
        document.getElementById("registry-confirm").style.display = 'none';
        document.getElementById("registry-confirm-button").style.display = 'none';

    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

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

    handleCheck = event => {
        if (event.target.value.replace(" ", "") === "") {
            this.setState({ [event.target.id.replace("registry-", "")]: { error: true } });
        }
    };

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(null)
    }

    handleRequest = () => {
        //document.getElementById('progress').style.visibility = 'visible';

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

        request.open('POST', 'http://172.16.17.242:8081/users', true);
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
                //document.getElementById('progress').style.visibility = 'hidden';

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
                    document.cookie = "doitUser=" + document.getElementById('registry-user').value;
                    window.location.href = "/"
                }

                if (request.status === 400) {
                    var error = JSON.parse(request.responseText).error;
                    var errores = error.split("ValidationError:")[1].split(",")

                    var erroresString = "";

                    errores.forEach(function(e) {
                        
                        erroresString += (e.split(":")[1] + "\n")
                    })

                    handleSnackBar(erroresString);
                }
            }
        }
    };

    checkName = (event) => {
        let states = this.state;

        states.inputName.error = false;

        if (event.target.value.replace(" ", "") !== "" && !RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}").test(event.target.value)) {
            states.inputName.error = true;
        }

        this.setState(states);
    };

    checkSurname = (event) => {
        let states = this.state;

        states.inputSurname.error = false;

        if (event.target.value.replace(" ", "") !== "" && !RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}").test(event.target.value)) {
            states.inputSurname.error = true;
        }

        this.setState(states);
    };

    checkPhone = (event) => {
        let states = this.state;

        states.inputPhone.error = false;

        if (event.target.value.replace(" ", "") !== "" && !RegExp("^([0-9]{9})$").test(event.target.value)) {
            states.inputPhone.error = true;
        }

        this.setState(states);
    };

    checkEmail = (event) => {
        let states = this.state;

        states.inputEmail.error = false;

        if (event.target.value.replace(" ", "") !== "" && !RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").test(event.target.value)) {
            states.inputEmail.error = true;
        }

        this.setState(states);
    };

    checkUserName = (event) => {
        let states = this.state;

        states.inputUser.error = false;

        if (!RegExp("^([a-z]+[0-9]{0,2}){5,20}$").test(event.target.value.replace(" ", "")) && event.target.value.replace(" ", "") != "") {
            states.inputUser.error = true;
        }

        this.setState(states);
    };

    checkPassword = (event) => {
        let states = this.state;

        states.inputPassword.error = false;

        if (!RegExp("[A-Za-z0-9!?-]{8,16}").test(event.target.value.replace(" ", "")) && event.target.value.replace(" ", "") != "") {
            states.inputPassword.error = true;
        }

        this.setState(states);
    };

    checkPasswordRepeat = (event) => {
        let states = this.state;

        states.inputPasswordRepeat.error = false;

        if (!RegExp("[A-Za-z0-9!?-]{8,16}").test(event.target.value.replace(" ", "")) && event.target.value.replace(" ", "") != "") {
            states.inputPasswordRepeat.error = true;
        }

        this.setState(states);
    };

    render() {
        return (
            <div style={{...this.state.root.style}}>
                <form style={{...this.state.form.style}}>
                    <div id={"registry-personal"}>
                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-name" color="accent">Nombre *</InputLabel>
                            <Input id="registry-name" onChange={this.checkName} error={this.state.inputName.error}/>
                        </FormControl>

                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-surname" color="accent">Apellido *</InputLabel>
                            <Input id="registry-surname" onChange={this.checkSurname} error={this.state.inputSurname.error}/>
                        </FormControl>

                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <TextField
                                id="registry-born"
                                label="Nacimiento *"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                style={{...this.state.textField.style}}
                            />

                            <FormControl style={{...this.state.formControl.style, width: '45%'}}>
                                <InputLabel htmlFor="registry-sex">Sexo</InputLabel>
                                <Select
                                    native
                                    input={<Input id="registry-sex" />}
                                    value={"masculino"}
                                    onChange={this.handleChange('sex')}
                                >
                                    <option value={"masculino"}>Masculino</option>
                                    <option value={"femenino"}>Femenino</option>
                                </Select>
                            </FormControl>

                        </div>

                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-phone" color="primary">Telefono *</InputLabel>
                            <Input id="registry-phone" type={"tel"} onChange={this.checkPhone} error={this.state.inputPhone.error}/>
                        </FormControl>

                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-mail" color="primary">Email *</InputLabel>
                            <Input id="registry-mail" type={"email"} onChange={this.checkEmail} error={this.state.inputEmail.error}/>
                        </FormControl>

                        <Typography type="caption" gutterBottom style={{margin:'16px 0'}}>
                            Campos requeridos *
                        </Typography>
                    </div>

                    <div id={"registry-confirm"} style={{display: 'none'}}>
                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-user" color="primary">Nombre de Usuario *</InputLabel>
                            <Input id="registry-user" onChange={this.checkUserName} error={this.state.inputUser.error}/>
                        </FormControl>

                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-password1" color="primary">Contraseña *</InputLabel>
                            <Input id="registry-password1" type={"password"} onChange={this.checkPassword} error={this.state.inputPassword.error} />
                        </FormControl>

                        <FormControl style={{...this.state.formControl.style}}>
                            <InputLabel htmlFor="registry-password2" color="primary">Repetir Contraseña *</InputLabel>
                            <Input id="registry-password2" type={"password"} onChange={this.checkPasswordRepeat} error={this.state.inputPasswordRepeat.error} />
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
                    activeStep={this.state.mobileStepper.activeStep}
                    style={{...this.state.mobileStepper.style}}
                    nextButton={
                        <Button dense onClick={this.handleNext} disabled={this.state.mobileStepper.activeStep === 1}>
                            Confirmar
                            <Icon>arrow_forward</Icon>
                        </Button>
                    }
                    backButton={
                        <Button dense onClick={this.handleBack} disabled={this.state.mobileStepper.activeStep === 0}>
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
                  SnackbarContentProps={{'aria-describedby': 'message-id'}}
                  message={<p id="message-id" style={{ margin: 0, whiteSpace: 'pre-line' }}>{this.state.message}</p>}
                  action={[<Button key="undo" color="accent" dense onClick={this.handleRequestClose}>OCULTAR</Button>]}
                />
            </div>
        );
    }
}

export default Registry;
