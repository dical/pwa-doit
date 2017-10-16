import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

class AddActivity extends Component {
    state = {
        add: true,
        title: {
            disabled: false,
            error: false
        },
        startDate: {
            disabled: false,
            error: false
        },
        startTime: {
            disabled: false,
            error: false
        },
        endDate: {
            disabled: false,
            error: false
        },
        endTime: {
            disabled: false,
            error: false
        },
        city: {
            disabled: false,
            value: 'Coquimbo'
        },
        address: {
            disabled: false,
            error: false
        },
        quotas: {
            disabled: false,
            error: false
        },
        price: {
            disabled: false,
            error: false
        },
        details: {
            disabled: false,
            error: false
        },
        tags: {
            disabled: false,
            error: false
        },
        chipData: [
            { key: 0, label: 'Deporte' },
        ],
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Agregar actividad';

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

    handleCheckAdd = () => {
        this.setState({
            add:
            this.state.title.error ||
            this.state.startDate.error ||
            this.state.startTime.error ||
            this.state.endDate.error ||
            this.state.endTime.error ||
            this.state.city.error ||
            this.state.address.error ||
            this.state.quotas.error ||
            this.state.price.error ||
            document.getElementById('new-activity-name').value.replace(' ','') === '' ||
            document.getElementById('new-activity-start-date').value.replace(' ','') === '' ||
            document.getElementById('new-activity-start-time').value.replace(' ','') === '' ||
            document.getElementById('new-activity-end-date').value.replace(' ','') === '' ||
            document.getElementById('new-activity-end-time').value.replace(' ','') === '' ||
            document.getElementById('new-activity-address').value.replace(' ','') === '' ||
            document.getElementById('new-activity-quotas').value.replace(' ','') === '' ||
            document.getElementById('new-activity-price').value.replace(' ','') === ''
        });
    };

    handleCheckAddress = (event) => {
        this.setState({
            address: {
                error: !(new RegExp("[A-Za-z0-9!?-]{2,250}")).test(event.target.value),
                disabled: false
            }
        }, this.handleCheckAdd);
    };

    handleCheckDate = () => {
        let dateStart = document.getElementById('new-activity-start-date').value.split('-'),
            dateEnd = document.getElementById('new-activity-end-date').value.split('-'),
            timeStart = document.getElementById('new-activity-start-time').value.split(':'),
            timeEnd = document.getElementById('new-activity-end-time').value.split(':'),
            startDate = new Date(dateStart[0], dateStart[1] - 1, dateStart[2], timeStart[0], timeStart[1]),
            endDate = new Date(dateEnd[0], dateEnd[1] - 1, dateEnd[2], timeEnd[0], timeEnd[1]),
            dateError = Date.now() > startDate || startDate > endDate;

        console.log(startDate);

        this.setState({
            startDate: {
                disabled: this.state.startDate.disabled,
                error: dateError
            },
            startTime: {
                disabled: this.state.startTime.disabled,
                error: dateError
            },
            endDate: {
                disabled: this.state.endDate.disabled,
                error: dateError
            },
            endTime: {
                disabled: this.state.endTime.disabled,
                error: dateError
            }
        }, this.handleCheckAdd);
    };

    handleCheckTitle = (event) => {
        this.setState({
            title: {
                disabled: false,
                error: !(new RegExp("[A-Za-z 0-9]{5,50}")).test(event.target.value) && !(event.target.value.replace(' ', '') === '')
            }
        }, this.handleCheckAdd);
    };

    handleCheckQuotas = (event) => {
        this.setState({
            quotas: {
                disabled: false,
                error: !(new RegExp("[0-9]{2,250}")).test(event.target.value) && event.target.value < 1
            }
        }, this.handleCheckAdd);
    };

    handleCheckPrice = (event) => {
        this.setState({
            price : {
                disabled: false,
                error: !(new RegExp("[0-9]{2,250}")).test(event.target.value) && event.target.value < 0
            }
        }, this.handleCheckAdd);
    };

    handleDisabled = () => {
        this.setState({
            add: !this.state.add,
            title: {
                disabled: !this.state.title.disabled,
                error: this.state.title.error
            },
            startDate: {
                disabled: !this.state.startDate.disabled,
                error: this.state.startDate.error
            },
            startTime: {
                disabled: !this.state.startTime.disabled,
                error: this.state.startTime.error
            },
            endDate: {
                disabled: !this.state.endDate.disabled,
                error: this.state.endDate.error
            },
            endTime: {
                disabled: !this.state.endTime.disabled,
                error: this.state.endTime.error
            },
            city: {
                disabled: !this.state.city.disabled,
                error: this.state.city.error
            },
            address: {
                disabled: !this.state.address.disabled,
                error: this.state.address.error
            },
            quotas: {
                disabled: !this.state.quotas.disabled,
                error: this.state.quotas.error
            },
            price: {
                disabled: !this.state.price.disabled,
                error: this.state.price.error
            },
            details: {
                disabled: !this.state.details.disabled,
                error: this.state.details.error
            },
            tags: {
                disabled: !this.state.tags.disabled,
                error: this.state.tags.error
            }
        })
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            onDisabled = this.handleDisabled,
            onProgress = this.handleProgress,
            onSnacked  = this.handleSnack;

        onDisabled();
        onProgress();
        onSnacked();

        request.open('POST', 'http://' + window.location.hostname + ':8081/events', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.send(
            JSON.stringify({
                name: document.getElementById('new-activity-name').value,
                own: getCookie('userId'),
                start: document.getElementById('new-activity-start-date').value + ' ' + document.getElementById('new-activity-start-time').value,
                end: document.getElementById('new-activity-end-date').value + ' ' + document.getElementById('new-activity-end-time').value,
                address: {
                    city: document.getElementById('new-activity-city').value,
                    street: document.getElementById('new-activity-address').value,
                    number: 1
                },
                quotas: document.getElementById('new-activity-quotas').value,
                price: document.getElementById('new-activity-price').value,
                details: document.getElementById('new-activity-details').value,
                tags: document.getElementById('new-activity-tags').value,
                coordinates: "0z0n"
            })
        );

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                onDisabled();
                onProgress();

                switch (request.status) {
                    case 201:
                        let link = document.getElementById('activity');

                        link.setAttribute('href', 'activity/' + JSON.parse(request.response)._id);
                        link.click();
                        break;
                    case 403:
                        onSnacked(snack(request.response));
                        break;
                    default:
                        onSnacked("Sin conexion");
                        break;
                }
            }
        }
    };

    handleRequestAdd = (event) => {
        if (event.charCode === 13) {
            this.state.chipData.push({ key: this.state.chipData.length, label: event.target.value });
            this.setState({ chipData: this.state.chipData })
        }
    };

    handleRequestDelete = data => () => {
        const chipData = [...this.state.chipData], chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({ chipData });
    };

    handleProgress = () => {
        let progress = document.getElementById('progress'); progress.style.display = progress.style.display === 'none' ? '' : 'none';
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
                    margin: '26px 16px'
                }}
            >
                <TextField
                    fullWidth
                    id="new-activity-name"
                    label="Titulo *"
                    type="text"
                    disabled={ this.state.title.disabled }
                    error={ this.state.title.error }
                    onChange={ this.handleCheckTitle }
                    style={{ marginBottom: 16 }}
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    <TextField
                        id="new-activity-start-date"
                        label="Fecha de Inicio *"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        disabled={ this.state.startDate.disabled }
                        error={ this.state.startDate.error }
                        onChange={ this.handleCheckDate }
                        style={{
                            margin: '0 16px 16px 0',
                            width: '-webkit-fill-available'
                        }}
                    />

                    <TextField
                        id="new-activity-start-time"
                        label="Hora de Inicio *"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        disabled={ this.state.startTime.disabled }
                        error={ this.state.startTime.error }
                        onChange={ this.handleCheckDate }
                        style={{
                            margin: '0 0 16px 16px',
                            width: '-webkit-fill-available'
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    <TextField
                        id="new-activity-end-date"
                        label="Fecha de Termino *"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        disabled={ this.state.endDate.disabled }
                        error={ this.state.endDate.error }
                        onChange={ this.handleCheckDate }
                        style={{
                            margin: '0 16px 16px 0',
                            width: '-webkit-fill-available'
                        }}
                    />

                    <TextField
                        id="new-activity-end-time"
                        label="Hora de Termino *"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        disabled={ this.state.endTime.disabled }
                        error={ this.state.endTime.error }
                        onChange={ this.handleCheckDate }
                        style={{
                            margin: '0 0 16px 16px',
                            width: '-webkit-fill-available'
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <TextField
                        id="new-activity-city"
                        label="Ciudad"
                        select
                        value={ this.state.city.value }
                        SelectProps={{ native: true }}
                        disabled={ this.state.city.disabled }
                        style={{
                            margin: '0 16px 16px 0',
                            width: '100%'
                        }}
                    >
                        <option value="la Serena">La Serena</option>
                        <option value="Coquimbo">Coquimbo</option>
                    </TextField>

                    <TextField
                        fullWidth
                        id="new-activity-address"
                        label="Direccion *"
                        type="text"
                        disabled={ this.state.address.disabled }
                        error={ this.state.address.error }
                        onChange={ this.handleCheckAddress }
                        style={{ margin: '0 0 16px 16px' }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <TextField
                        fullWidth
                        id="new-activity-quotas"
                        label="Cupos *"
                        helperText="Min. 1"
                        type="number"
                        disabled={ this.state.quotas.disabled }
                        error={ this.state.quotas.error }
                        onChange={ this.handleCheckQuotas }
                        style={{ margin: '0 16px 16px 0' }}
                    />

                    <TextField
                        fullWidth
                        id="new-activity-price"
                        label="Precio *"
                        helperText="Min. 0"
                        type="number"
                        disabled={ this.state.price.disabled }
                        error={ this.state.price.error }
                        onChange={ this.handleCheckPrice }
                        style={{ margin: '0 0 16px 16px' }}
                    />
                </div>

                <TextField
                    fullWidth
                    id="new-activity-details"
                    label="Descripción"
                    multiline
                    rowsMax="3"
                    disabled={ this.state.details.disabled }
                    error={ this.state.details.error }
                    onChange={ this.handleCheckDetails }
                    style={{ marginBottom: 16 }}
                />

                <TextField
                    fullWidth
                    id="new-activity-tags"
                    label="Etiquetas"
                    disabled={ this.state.tags.disabled }
                    onKeyPress={ this.handleRequestAdd }
                    style={{ marginBottom: 16 }}
                />

                <div
                    style={{
                        display: 'flex',
                        marginBottom: 16
                    }}
                >
                    {
                        this.state.chipData.map(data => {
                            return (
                                <Chip
                                    label={ data.label }
                                    key={ data.key }
                                    onRequestDelete={ this.handleRequestDelete(data) }
                                    style={{ marginRight: 8 }}
                                />
                            );
                        })
                    }
                </div>

                <Button
                    raised
                    color="primary"
                    onClick={ this.handleRequest }
                    disabled={ this.state.add }
                    style={{
                        margin: '16px 0',
                        width: '100%'
                    }}
                >
                    Agregar
                </Button>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={ this.state.alert }
                    autoHideDuration={ 6000 }
                    onRequestClose={ this.handleAlert }
                    SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
                    message={
                        <span
                            id="message-id"
                            style={{ whiteSpace: 'pre' }}
                        >
                            {this.state.response}
                            </span>
                    }
                    action={[
                        <Button
                            key="undo"
                            color="accent"
                            dense
                            onClick={ this.handleAlert }
                        >
                            OCULTAR
                        </Button>
                    ]}
                />
            </form>
        );
    }
}

function snack(res) {
    let errors = JSON.parse(res).errors, text = '', property;

    for (property in errors) {
        if (errors.hasOwnProperty(property)) {
            text += errors[property].message + '\n'
        }
    }

    return text
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

export default AddActivity;
