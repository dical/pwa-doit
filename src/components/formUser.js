import React from 'react';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Snackbar from 'material-ui/Snackbar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Registry extends React.Component {
    state = {
        alert: false,
        buttonRegistry: true,
        errorBorn: false,
        errorMail: false,
        errorName: false,
        errorSex: false,
        errorSurname: false,
        errorUsername: false,
        errorPassword: false,
        errorPasswordConfirm: false,
        valueSex: "masculino",
        response: "Registrando usuario",
        tabs: 0
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Registrarse';

        document.getElementById('header').style.backgroundColor = '';
        document.getElementById('header').style.boxShadow = 'none';
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

    handleCheckBorn = (event) => {
        this.setState({
            errorBorn: false
        }, this.handleCheckRegistry);
    };

    handleCheckMail = (event) => {
        this.setState({
            errorMail: !(new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$")).test(event.target.value)
        }, this.handleCheckRegistry);
    };

    handleCheckName = (event) => {
        this.setState({
            errorName: !(new RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}")).test(event.target.value)
        }, this.handleCheckRegistry);
    };

    handleCheckRegistry = () => {
        this.setState({
            buttonRegistry:
            this.state.errorName ||
            this.state.errorSurname ||
            this.state.errorMail ||
            this.state.errorUsername ||
            this.state.errorPassword ||
            this.state.errorPasswordConfirm ||
            document.getElementById('registry-name').value.replace(' ','') === '' ||
            document.getElementById('registry-surname').value.replace(' ','') === '' ||
            document.getElementById('registry-born').value.replace(' ','') === '' ||
            document.getElementById('registry-sex').value.replace(' ','') === '' ||
            document.getElementById('registry-mail').value.replace(' ','') === '' ||
            document.getElementById('registry-user').value.replace(' ','') === '' ||
            document.getElementById('registry-password').value.replace(' ','') === '' ||
            document.getElementById('registry-password-confirm').value.replace(' ','') === ''
        });
    };


    handleCheckSex = (event) => {
        this.setState({
            errorSex: false,
            valueSex: event.target.value
        }, this.handleCheckRegistry);
    };

    handleCheckSurname = (event) => {
        this.setState({
            errorSurname: !(new RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}")).test(event.target.value)
        }, this.handleCheckRegistry);
    };

    handleCheckUsername = (event) => {
        this.setState({
            errorUsername: !(new RegExp("^([a-z]+[0-9]{0,2}){5,20}$")).test(event.target.value)
        }, this.handleCheckRegistry);
    };

    handleCheckPassword = (event) => {
        this.setState({
            errorPassword: !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value)
        }, this.handleCheckRegistry);
    };

    handleCheckPasswordConfirm = (event) => {
        this.setState({
            errorPasswordConfirm: !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value) || document.getElementById('registry-password').value !== document.getElementById('registry-password-confirm').value
        }, this.handleCheckRegistry);
    };

    handleDisabled = () => {
        this.setState({
            registry: !this.state.login,
            alert: true
        });
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            onAlert = this.handleAlert,
            onDisabled = this.handleDisabled,
            onProgress = this.handleProgress,
            onResponse = this.handleResponse;

        onDisabled(); onProgress(); onResponse("Registrando usuario..."); onAlert();

        request.open('POST', 'http://' + window.location.hostname + ':8081/users', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.send(
            JSON.stringify({
                names: document.getElementById('registry-name').value,
                surnames: document.getElementById('registry-surname').value,
                born: document.getElementById('registry-born').value,
                sex: document.getElementById('registry-sex').value,
                mail: document.getElementById('registry-mail').value,
                username: document.getElementById('registry-user').value,
                password: document.getElementById('registry-password').value
            })
        );

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 403:
                        let errors = JSON.parse(request.responseText).errors, text = '', property;

                        for (property in errors) {
                            if (errors.hasOwnProperty(property)) {
                                text += errors[property].message + '\n'
                            }
                        }

                        onDisabled(); onProgress(); onResponse(text);
                        break;
                    case 201:
                        document.cookie = 'doitID=' + JSON.parse(request.response)._id;
                        document.getElementById('user').click();

                        onDisabled(); onProgress(); onResponse('Registrado');
                        break;
                    default:
                        onDisabled(); onProgress(); onResponse("Sin conexion");
                        break;
                }
            }
        };
    };

    handleResponse = (text) => {
        this.setState({
            response: text
        });
    };

    handleProgress = () => {
        let progress = document.getElementById('progress'); progress.style.display = progress.style.display === 'none' ? '' : 'none';
    };

    handleChange = (event, value) => {
        this.setState({ tabs: value })
    };

    render() {
        return (
            <div>
                <Tabs value={this.state.tabs} onChange={this.handleChange} indicatorColor="primary" textColor="primary" fullWidth style={{backgroundColor: '#E3F2FD', boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'}}>
                    <Tab icon={<span><Icon>person</Icon></span>} style={{maxWidth: '100%'}}/>
                    <Tab icon={<span><Icon>business</Icon></span>} style={{maxWidth: '100%'}}/>
                </Tabs>

                <form noValidate autoComplete="off" style={{margin: '16px 16px 0'}}>
                    <TextField fullWidth id="registry-name" label="Nombre(s) *" type="text" error={this.state.errorName} onChange={this.handleCheckName} style={{marginBottom: 16}}/>

                    {this.state.tabs === 0 && <TextField fullWidth id="registry-surname" label="Apellido(s) *" type="text" error={this.state.errorSurname} onChange={this.handleCheckSurname}/>}

                    {this.state.tabs === 1 && <TextField fullWidth id="registry-rut" label="Rut *" type="text" error={this.state.errorSurname} onChange={this.handleCheckSurname}/>}

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <TextField id="registry-born" label="Fecha de nacimiento *" type="date" InputLabelProps={{ shrink: true }} error={this.state.errorBorn} onChange={this.handleCheckBorn} style={{margin: '20px 8px 0 0', width: '-webkit-fill-available'}}/>
                        {this.state.tabs === 0 && <TextField id="registry-sex" label="Sexo" select value={this.state.valueSex} SelectProps={{native: true}} error={this.state.errorSex} onChange={this.handleCheckSex} style={{margin: '20px 0 0 8px', width: '-webkit-fill-available'}}>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </TextField>}
                        {this.state.tabs === 1 && <TextField id="new-activity-city" label="Ciudad" select value={this.state.valueSex} SelectProps={{native: true}} disabled={this.state.disableCity} style={{margin: '20px 0 0 8px', width: '100%'}}>
                            <option value="la serena">La Serena</option>
                            <option value="coquimbo">Coquimbo</option>
                        </TextField>}
                    </div>

                    {this.state.tabs === 1 && <TextField fullWidth id="new-activity-address" label="Direccion *" type="text" disabled={this.state.disableAddress} error={this.state.errorAddress} onChange={this.handleCheckAddress} style={{margin: '16px 0 0'}}/>}

                    <TextField fullWidth id="registry-mail" label="Correo electronico *" type="mail" error={this.state.errorMail} onChange={this.handleCheckMail} style={{margin: '16px 0 0'}}/>
                    <TextField fullWidth id="registry-user" label="Nombre de usuario *" type="text" error={this.state.errorUsername} onChange={this.handleCheckUsername} style={{margin: '16px 0 0'}}/>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <TextField fullWidth id="registry-password" label="Contraseña *" style={{margin: '20px 8px 0 0', width: '-webkit-fill-available'}} type="password" error={this.state.errorPassword} onChange={this.handleCheckPassword}/>
                        <TextField fullWidth id="registry-password-confirm" label="Confirmar *" style={{margin: '20px 0 0 8px', width: '-webkit-fill-available'}} type="password" error={this.state.errorPasswordConfirm} onChange={this.handleCheckPasswordConfirm}/>
                    </div>

                    <Typography type="caption" gutterBottom style={{margin:'16px 0'}}>Campos requeridos *</Typography>

                    <Button raised color="primary" onClick={this.handleRequest} disabled={this.state.buttonRegistry} style={{margin: '26px 0', width: '100%'}}>Registrarse</Button>

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
            </div>
        );
    }
}

export default Registry;
