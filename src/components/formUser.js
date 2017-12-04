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
            disabled: false,
            value: ''
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
        tabs: {
            value: 0
        },
        sex: {
            disabled: false,
            value: 'femenino'
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

        [
            'back',
            'title'
        ].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        [
            'settings',
            'search',
            'filter',
            'down',
            'shared',
            'edit',
            'bottom-navigation'
        ].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        })
    }

    handleChange = (event, value) => {
        this.setState({
            tabs: {
                value: value
            }
        })
    };

    handleCheckAddress = (event) => {
        this.setState({
            address: {
                error: false,
                disabled: this.state.address.disabled
            }
        }, this.handleCheckRegistry)
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
                !(document.getElementById('registry-password').value === document.getElementById('registry-confirm').value),
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
                error:
                !(new RegExp("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}")).test(event.target.value) &&
                !(event.target.value.replace(' ', '') === ''),
                disabled: false,
                value: event.target.value
            }
        }, this.handleCheckRegistry)
    };

    handleCheckRegistry = () => {
        this.setState({
            registry:
            this.state.name.error ||
            (this.state.tabs === 0 ? this.state.surname.error : false) ||
            (this.state.tabs === 1 ? this.state.rut.error : false) ||
            this.state.mail.error ||
            this.state.user.error ||
            this.state.password.error ||
            this.state.confirm.error ||
            document.getElementById('registry-name').value.replace(' ','') === '' ||
            (this.state.tabs === 0 ? document.getElementById('registry-surname').value.replace(' ','') === '' : false) ||
            (this.state.tabs === 1 ? document.getElementById('registry-rut').value.replace(' ','') === '' : false) ||
            document.getElementById('registry-born').value.replace(' ','') === '' ||
            document.getElementById('registry-mail').value.replace(' ','') === '' ||
            document.getElementById('registry-user').value.replace(' ','') === '' ||
            document.getElementById('registry-password').value.replace(' ','') === '' ||
            document.getElementById('registry-confirm').value.replace(' ','') === ''
        });
    };

    handleCheckRut = (event) => {
        this.setState({
            rut: {
                error: !(new RegExp("[K|k|0-9]{2,16}")).test(event.target.value.replace('-','').replace('.','')) || !checkDigit11(event.target.value),
                disabled: false
            }
        }, this.handleCheckRegistry)
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
            password: {
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

    handleErrorUserName = () => {
        this.setState({
            user: {
                error: true,
                disabled: this.state.user.disabled
            }
        }, this.handleCheckRegistry)
    };

    handleErrorRut = () => {
        this.setState({
            rut: {
                error: true,
                disabled: this.state.rut.disabled
            }
        }, this.handleCheckRegistry)
    };

    handleRequest = () => {
        let request = new XMLHttpRequest()
            , onDisabled = this.handleDisabled
            , onProgress = this.handleProgress
            , onSnacked = this.handleSnack;

        onDisabled();
        onProgress();
        onSnacked("Registrando usuario...");

        let errorUserName = this.handleErrorUserName;
        let errorRut = this.handleErrorRut;

        request.open('POST', 'http://' + window.location.hostname + ':8081/users', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                onDisabled();
                onProgress();

                switch (request.status) {
                    case 403:
                        let errors = JSON.parse(request.responseText).errors
                            , text = ''
                            , property;

                        if (JSON.parse(request.responseText).hasOwnProperty('code')) {
                            if (JSON.parse(request.responseText).errmsg.indexOf('username') > 0) {
                                text = "Nombre de usuario ya registrado";
                                errorUserName()
                            }

                            if (JSON.parse(request.responseText).errmsg.indexOf('business.rut') > 0) {
                                text = "Rut ya registrado";
                                errorRut()
                            }
                        } else {
                            for (property in errors) {
                                if (errors.hasOwnProperty(property)) {
                                    text += errors[property].message + '\n'
                                }
                            }
                        }

                        onSnacked(text);
                        break;
                    case 201:
                        document.cookie = 'userId=' + JSON.parse(request.response)._id;

                        if ( JSON.parse(request.response).hasOwnProperty('business')) {
                            setCookie('userRut', JSON.parse(request.response).business.rut.body, 360);
                        }

                        window.location.href = '/user/' + JSON.parse(request.response)._id;

                        onSnacked("Registrado existosamente");
                        break;
                    default:
                        onSnacked("Sin conexion");
                        break;
                }
            }
        };

        if (this.state.tabs.value === 0) {
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
            )
        } else {
            request.send(
                JSON.stringify({
                    names: document.getElementById('registry-name').value,
                    rut: document.getElementById('registry-rut').value,
                    born: document.getElementById('registry-born').value,
                    city: document.getElementById('registry-city').value,
                    address: document.getElementById('registry-address').value,
                    mail: document.getElementById('registry-mail').value,
                    username: document.getElementById('registry-user').value,
                    password: document.getElementById('registry-password').value
                })
            )
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
                    value={ this.state.tabs.value }
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
                    label={ this.state.tabs.value === 0 ? 'Nombre(s) *' : 'Razon social *' }
                    onChange={ this.handleCheckName }
                    style={{ margin: '16px 0 0' }}
                    type="text"
                />

                { this.state.tabs.value === 0 &&
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

                { this.state.tabs.value === 1 &&
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
                        helperText="DD/MM/YYYY"
                        InputLabelProps={{ shrink: true }}
                        label={ this.state.tabs.value === 0 ? "Fecha de nacimiento *" : "Fecha de fundacion *" }
                        onChange={ this.handleCheckBorn }
                        style={{ margin: '16px 16px 0 0' }}
                        type="date"
                    />

                    { this.state.tabs.value === 0 &&
                        <TextField
                            id="registry-sex"
                            disabled={ this.state.sex.disabled }
                            fullWidth
                            label="Sexo"
                            select
                            SelectProps={{ native: true }}
                            style={{ margin: '16px 0 0 16px' }}
                        >
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </TextField>
                    }

                    { this.state.tabs.value === 1 &&
                        <TextField
                            id="registry-city"
                            disabled={ this.state.city.disabled }
                            fullWidth
                            label="Ciudad"
                            select
                            SelectProps={{ native: true }}
                            style={{ margin: '16px 0 0 16px' }}
                        >
                            <option value="La Serena">La Serena</option>
                            <option value="Coquimbo">Coquimbo</option>
                        </TextField>
                    }
                </div>

                { this.state.tabs.value === 1 &&
                    <TextField
                        disabled={ this.state.address.disabled }
                        error={ this.state.address.error }
                        fullWidth
                        helperText={ "Formato: Calle #Numero" }
                        id="registry-address"
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
                        id="registry-confirm"
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

let checkDigit11 = function(r) {
    let n = r.replace('.','').replace('-',''),
        c = n.slice(0, -1),
        v = n.slice(-1).toLowerCase(),
        s = 0,
        m = 2;

    for(let i = 1; i <= c.length; i++) {
        let index = m * n.charAt(c.length - i);

        s = s + index;

        if(m < 7) { m = m + 1; } else { m = 2; }
    }

    v = (v === 'k') ? 10 : v;
    v = (v === '0') ? 11 : v;

    return parseInt(v, 0) === parseInt(11 - (s % 11), 0);

};

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default Registry;
