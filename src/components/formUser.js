import React from 'react';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Snackbar from 'material-ui/Snackbar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Registry extends React.Component {
    state = {
        address: {
            error: false,
            disabled: false
        },
        born: {
            error: false,
            disabled: false
        },
        city: {
            error: false,
            disabled: false
        },
        confirm: {
            error: false,
            disabled: false
        },
        name: {
            error: false,
            disabled: false
        },
        mail: {
            error: false,
            disabled: false
        },
        password: {
            error: false,
            disabled: false
        },
        registry: true,
        rut: {
            error: false,
            disabled: false
        },
        tabs: 0,
        sex: {
            disabled: false,
            value: 'masculino'
        },
        snack: {
            message: '',
            open: false
        },
        surname: {
            error: false,
            disabled: false
        },
        user: {
            error: false,
            disabled: false
        }
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Registrarse';

        document.getElementById('header').style.backgroundColor = '';
        document.getElementById('header').style.boxShadow = 'none';
        document.getElementById('shell').style.padding = '64px 0';

        ['back', 'title'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'search', 'filter', 'check', 'down', 'shared', 'edit'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        })
    }

    handleChange = (event, value) => {
        this.setState({ tabs: value })
    };

    handleCheckBorn = (event) => {
        this.setState({
            born: {
                error: false,
                disabled: this.state.born.disabled
            }
        }, this.handleCheckRegistry)
    };

    handleCheckConfirm = (event) => {
        this.setState({
            confirm : {
                error:
                !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value) ||
                !(document.getElementById('registry-password').value === document.getElementById('registry-password-confirm').value),
                disabled: false
            }
        }, this.handleCheckRegistry)
    };

    handleCheckMail = (event) => {
        this.setState({
            mail: {
                error: !(new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$")).test(event.target.value),
                disabled: false
            }
        }, this.handleCheckRegistry)
    };

    handleCheckName = (event) => {
        this.setState({
            name: {
                error: !(new RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}")).test(event.target.value),
                disabled: false
            }
        }, this.handleCheckRegistry)
    };

    handleCheckRegistry = () => {
        this.setState({
            registry:
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
        })
    };

    handleCheckSurname = (event) => {
        this.setState({
            surname: {
                error: !(new RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}")).test(event.target.value),
                disabled: false
            }
        }, this.handleCheckRegistry)
    };

    handleCheckUser = (event) => {
        this.setState({
            user: {
                error: !(new RegExp("^([a-z]+[0-9]{0,2}){5,20}$")).test(event.target.value),
                disabled: false
            }
        }, this.handleCheckRegistry)
    };

    handleCheckPassword = (event) => {
        this.setState({
            user: {
                error: !(new RegExp("[A-Za-z0-9!?-]{8,16}")).test(event.target.value),
                disabled: false
            }
        }, this.handleCheckRegistry)
    };

    handleDisabled = () => {
        this.setState({
            registry: !this.state.registry
        })
    };

    handleProgress = () => {
        let progress = document.getElementById('progress'); progress.style.display = progress.style.display === 'none' ? '' : 'none';
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
                autoComplete="off"
                style={{ margin: '0 16px' }}
            >
                <Tabs
                    fullWidth
                    indicatorColor="primary"
                    onChange={ this.handleChange }
                    style={{
                        backgroundColor: '#E3F2FD',
                        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
                        margin: '0 -16px'
                    }}
                    textColor="primary"
                    value={ this.state.tabs }
                >
                    <Tab
                        icon={ <Icon>person</Icon> }
                        style={{ maxWidth: '100%' }}
                    />

                    <Tab
                        icon={ <Icon>business</Icon>}
                        style={{ maxWidth: '100%' }}
                    />
                </Tabs>

                <TextField
                    id="registry-name"
                    disabled={ this.state.name.disabled }
                    error={ this.state.name.error }
                    fullWidth
                    label={ this.state.tabs === 0 ? 'Nombre(s) *' : 'Razon social *' }
                    onChange={ this.handleCheckName }
                    style={{ margin: '26px 0 0' }}
                    type="text"
                />

                { this.state.tabs === 0 &&
                    <TextField
                        id="registry-surname"
                        disabled={ this.state.surname.disabled }
                        error={ this.state.surname.error }
                        fullWidth
                        label="Apellido(s) *"
                        onChange={ this.handleCheckSurname }
                        style={{ margin: '16px 0 0' }}
                        type="text"
                    />
                }

                { this.state.tabs === 1 &&
                    <TextField
                        id="registry-rut"
                        disabled={ this.state.rut.disabled }
                        error={ this.state.rut.error }
                        fullWidth
                        label="Rut *"
                        onChange={ this.handleCheckRut }
                        style={{ margin: '16px 0 0' }}
                        type="text"
                    />
                }

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <TextField
                        id="registry-born"
                        disabled={ this.state.born.disabled }
                        error={ this.state.born.error }
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Fecha de nacimiento *"
                        onChange={ this.handleCheckBorn }
                        style={{ margin: '16px 16px 0 0' }}
                        type="date"
                    />

                    { this.state.tabs === 0 &&
                        <TextField
                            id="registry-sex"
                            disabled={ this.state.sex.disabled }
                            fullWidth
                            label="Sexo"
                            select
                            SelectProps={{ native: true }}
                            style={{ margin: '16px 0 0 16px' }}
                            value={ this.state.sex.value }
                        >
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </TextField>
                    }

                    { this.state.tabs === 1 &&
                        <TextField
                            id="registry-city"
                            disabled={ this.state.city.disabled }
                            fullWidth
                            label="Ciudad"
                            select
                            SelectProps={{ native: true }}
                            style={{ margin: '16px 0 0 16px' }}
                            value={ this.state.city.value }
                        >
                            <option value="La Serena">La Serena</option>
                            <option value="Coquimbo">Coquimbo</option>
                        </TextField>
                    }
                </div>

                { this.state.tabs === 1 &&
                    <TextField
                        id="registry-address"
                        disabled={ this.state.address.disabled }
                        error={ this.state.address.error }
                        fullWidth
                        label="Direccion *"
                        onChange={ this.handleCheckAddress }
                        style={{ margin: '16px 0 0' }}
                        type="text"
                    />
                }

                <TextField
                    id="registry-mail"
                    label="Correo electronico *"
                    disabled={ this.state.mail.disabled }
                    error={ this.state.mail.error }
                    fullWidth
                    onChange={ this.handleCheckMail }
                    style={{ margin: '16px 0 0' }}
                    type="mail"
                />

                <TextField
                    id="registry-user"
                    disabled={ this.state.user.disabled }
                    error={ this.state.user.error }
                    fullWidth
                    label="Nombre de usuario *"
                    onChange={ this.handleCheckUser }
                    style={{ margin: '16px 0 0' }}
                    type="text"
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <TextField
                        id="registry-password"
                        disabled={ this.state.password.disabled }
                        error={ this.state.password.error }
                        fullWidth
                        label="Contraseña *"
                        onChange={ this.handleCheckPassword }
                        style={{ margin: '16px 16px 0 0' }}
                        type="password"
                    />

                    <TextField
                        id="registry-password-confirm"
                        disabled={ this.state.confirm.disabled }
                        error={ this.state.confirm.error }
                        fullWidth
                        label="Confirmar *"
                        onChange={ this.handleCheckConfirm }
                        style={{ margin: '16px 0 0 16px' }}
                        type="password"
                    />
                </div>

                <Button
                    color="primary"
                    disabled={ this.state.registry }
                    onClick={ this.handleRequest }
                    raised
                    style={{
                        margin: '32px 0 16px',
                        width: '100%'
                    }}
                >
                    Registrarse
                </Button>

                <Typography
                    type="caption"
                    style={{ margin:'16px 0' }}
                >
                    Campos requeridos *
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
                    message={<span id="message-id">{ this.state.snack.message }</span>}
                    action={[
                        <Button
                            key="undo"
                            color="accent"
                            dense
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

export default Registry;
