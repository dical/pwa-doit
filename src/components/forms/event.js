import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';

import Snack from '../snack';

import { utc_full_date, utc_full_hour, utc_hours, utc_minutes } from '../../helpers/date';

class FormEvent extends Component {
    state = {
        event: {
            name: '',
            own: getCookie('userId'),
            start: new Date(Date.now()),
            end: new Date(Date.now() + 3600000),
            address: {
                city: 'coquimbo',
                street: '',
                number: 1
            },
            quotas: 1,
            price: 0,
            details: '',
            tags: [],
            coordinates: "0z0n",
            image: ''
        },
        fieldset: {
            disabled: false
        },
        snack: {
            message: '',
            open: false
        },
        tag: '',
        uploading: false
    };

    componentDidMount() {
        if (this.props.dataEvent !== undefined) {
            let event = this.props.dataEvent;

            event.start = new Date(event.start);
            event.end = new Date(event.end);

            this.setState({
                event: this.props.dataEvent,
                fieldset: {
                    disabled: this.props.dataEvent.start < new Date(Date.now())
                }
            })
        }
    }

    handleAdd = () => {
        let event = this.state.event;

        if (event.tags.indexOf(this.state.tag) < 0) {
            event.tags.push(this.state.tag)
        }

        this.setState({
            tag: '' ,
            event: event
        })
    };

    handleChange = name => event => {
        let aux = this.state.event;

        aux[name] = event.target.value;

        this.setState({ event: aux })
    };

    handleCity = (event) => {
        let aux = this.state.event;

        aux.address.city = event.target.value;

        this.setState({ event: aux })
    };

    handleDisable = () => {
        this.setState({
            fieldset: {
                disabled: !this.state.fieldset.disabled
            }
        })
    };

    handleEndDate = (event) => {
        let aux = this.state.event; aux.end = new Date(event.target.value + 'T' + utc_hours(this.state.event.end) + ':' + utc_minutes(this.state.event.end) + ':00'); this.setState({ event: aux })
    };

    handleEndTime = (event) => {
        let aux = this.state.event; aux.end = new Date(utc_full_date(this.state.event.end) + 'T' + event.target.value + ':00'); this.setState({ event: aux })
    };

    handleFile = () => {
        document.querySelector('form input[type="file"]').click()
    };

    handleNumber = (event) => {
        let aux = this.state.event;

        aux.address.number = event.target.value;

        this.setState({ event: aux })
    };

    handleTag = (event) => {
        this.setState({ tag: event.target.value })
    };

    handlePatchRequest = () => {
        this.handleRequest('patch', 'http://' + window.location.hostname + ':8081/events/' + this.state.event._id, function() { window.location.reload() } )
    };

    handlePostRequest = () => {
        this.handleRequest('post', 'http://' + window.location.hostname + ':8081/events', function() { window.location.href = '/' })
    };

    handleRequest = (type, url, callback) => {
        let request = new XMLHttpRequest(), parent = this;

        request.open(type.toUpperCase(), url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        this.handleDisable();

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        callback(request.response);
                        break;
                    case 201:
                        callback(request.response);
                        break;
                    case 403:
                        parent.handleSnack(getErrors(request.response));
                        break;
                    default:
                        parent.handleSnack('Service not respond');
                        break;
                }
            }
        };

        request.send( JSON.stringify( this.state.event ) )
    };

    handleRemove = tag => () => {
        let event = this.state.event;

        event.tags.splice(event.tags.indexOf(tag));

        this.setState({ event: event });
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                message: typeof message === 'string' ? message : this.state.snack.message,
                open: typeof message === 'string'
            },
            fieldset: {
                disabled: typeof message === 'string'
            }
        })
    };

    handleStartDate = (event) => {
        let aux = this.state.event; aux.start = new Date(event.target.value + 'T' + utc_hours(this.state.event.start) + ':' + utc_minutes(this.state.event.start) + ':00'); this.setState({ event: aux })
    };

    handleStartTime = (event) => {
        let aux = this.state.event; aux.start = new Date(utc_full_date(this.state.event.start) + 'T' + event.target.value + ':00'); this.setState({ event: aux })
    };

    handleStreet = (event) => {
        let aux = this.state.event;

        aux.address.street = event.target.value;

        this.setState({ event: aux })
    };

    handleUpload = (event) => {
        this.setState({ uploading: true });

        let xhr = new XMLHttpRequest();
        let fdt = new FormData();
        let response = this.handleResponseImage;

        fdt.append('image', event.target.files[0]);

        xhr.open("POST", 'http://' + window.location.hostname + ':8081/images', true);

        xhr.onreadystatechange = function() { if (xhr.readyState === 4) { response(xhr) } };

        xhr.send(fdt);
    };

    handleResponseImage = (request) => {
        switch (request.status) {
            case 200:
                let event = this.state.event; event.image = JSON.parse(request.response).image;
                this.setState({ event: event });
                this.handleSnack('Imagen subida');
                break;
            default:
                this.handleSnack('No se pudo subir la imagen');
                break;
        }

        this.setState({ uploading: false })
    };

    render() {
        return (
            <form
                style={{
                    overflowY: 'auto',
                    padding: '64px 0 0'
                }}
            >
                <fieldset
                    disabled={ this.state.fieldset.disabled }
                    style={{
                        border: 0,
                        margin: 0,
                        padding: '16px 16px 0',
                        lineHeight: 1
                    }}
                >
                    <TextField
                        fullWidth
                        error={ this.state.event.name.trim().length === 0 }
                        helperText='Caracteres y/o dígitos numéricos'
                        label='Titulo'
                        onChange={ this.handleChange('name') }
                        style={{ paddingBottom: 16 }}
                        type='text'
                        value={ this.state.event.name }
                    />

                    <TextField
                        disabled={ true }
                        label='Pais'
                        select
                        onChange={ null }
                        SelectProps={{ native: true }}
                        style={{
                            paddingBottom: 16,
                            marginRight: 8,
                            width: 'calc(50% - 8px)'
                        }}
                    >
                        <option value='chile'>Chile</option>
                    </TextField>

                    <TextField
                        helperText='Seleccione una ciudad'
                        label='Ciudad'
                        onChange={ this.handleCity }
                        select
                        SelectProps={{ native: true }}
                        style={{
                            paddingBottom: 16,
                            marginLeft: 8,
                            width: 'calc(50% - 8px)'
                        }}
                        value={ this.state.event.address.city }
                    >
                        <option value='la serena'>La Serena</option>
                        <option value='coquimbo'>Coquimbo</option>
                    </TextField>

                    <TextField
                        error={ this.state.event.address.street.trim().length === 0 }
                        helperText='Caracteres y/o dígitos numéricos'
                        label='Calle'
                        onChange={ this.handleStreet }
                        style={{
                            paddingBottom: 16,
                            marginRight: 8,
                            width: 'calc(70% - 8px)'
                        }}
                        type="text"
                        value={ this.state.event.address.street }
                    />

                    <TextField
                        error={ this.state.event.address.number === '' || this.state.event.address.number < 1 }
                        helperText='Numero'
                        label='Numero'
                        onChange={ this.handleNumber }
                        style={{
                            paddingBottom: 16,
                            marginLeft: 8,
                            width: 'calc(30% - 8px)'
                        }}
                        type="number"
                        value={ this.state.event.address.number }
                    />

                    <TextField
                        error={ this.state.event.start >= this.state.event.end || this.state.event.start <= new Date(Date.now()) }
                        helperText='Formato: dia/mes/año'
                        InputLabelProps={{ shrink: true }}
                        label='Fecha de Inicio'
                        onChange={ this.handleStartDate }
                        style={{
                            marginRight: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type='date'
                        value={ utc_full_date(this.state.event.start) }
                    />

                    <TextField
                        error={ this.state.event.start >= this.state.event.end || this.state.event.start <= new Date(Date.now()) }
                        helperText='Formato: hora:minuto'
                        InputLabelProps={{ shrink: true }}
                        label='Hora de Inicio'
                        onChange={ this.handleStartTime }
                        style={{
                            marginLeft: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type='time'
                        value={ utc_full_hour(this.state.event.start) }
                    />

                    <TextField
                        error={ this.state.event.start >= this.state.event.end || this.state.event.start <= new Date(Date.now()) }
                        helperText='Formato: dia/mes/año'
                        label='Fecha de Termino'
                        onChange={ this.handleEndDate }
                        style={{
                            marginRight: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type='date'
                        value={ utc_full_date(this.state.event.end) }
                    />

                    <TextField
                        error={ this.state.event.start >= this.state.event.end || this.state.event.start <= new Date(Date.now()) }
                        helperText='Formato: hora:minuto'
                        InputLabelProps={{ shrink: true }}
                        label="Hora de Termino *"
                        onChange={ this.handleEndTime }
                        style={{
                            marginLeft: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type="time"
                        value={ utc_full_hour(this.state.event.end) }
                    />

                    <TextField
                        fullWidth
                        label="Descripcion"
                        multiline
                        rowsMax="3"
                        onChange={ this.handleChange('details') }
                        style={{ marginBottom: 16 }}
                        value={ this.state.event.details }
                    />

                    <TextField
                        error={ this.state.event.quotas < 1 }
                        helperText='Minimo 1'
                        label='Cupos'
                        onChange={ this.handleChange('quotas') }
                        style={{
                            paddingBottom: 16,
                            marginRight: 8,
                            width: 'calc(50% - 8px)'
                        }}
                        type='number'
                        value={ this.state.event.quotas }
                    />

                    <TextField
                        error={ this.state.event.price < 0 || this.state.event.price === '' }
                        helperText='Minimo 0'
                        label='Precio'
                        onChange={ this.handleChange('price') }
                        style={{
                            paddingBottom: 16,
                            marginLeft: 8,
                            width: 'calc(50% - 8px)'
                        }}
                        type="number"
                        value={ this.state.event.price }
                    />

                    <TextField
                        disabled={ this.state.uploading }
                        helperText='Dirección url de la imagen'
                        fullWidth
                        label='Imagen'
                        onChange={ this.handleChange('image') }
                        style={{
                            marginRight: 8,
                            width: 'calc(70% - 8px)'
                        }}
                        type="text"
                        value={ this.state.event.image }
                    />

                    <input type="file" name="pic" accept="image/*" hidden onChange={ this.handleUpload }/>

                    <Button
                        color='primary'
                        children={ this.state.uploading ? <CircularProgress size={ 15 }/> : 'Subir' }
                        dense
                        onClick={ this.handleFile }
                        style={{
                            marginLeft: 8,
                            width: 'calc(30% - 8px)'
                        }}
                    />

                    <div
                        style={{
                            backgroundColor: '#eee',
                            margin: '16px -16px 0',
                            padding: 16
                        }}
                    >
                        <TextField
                            placeholder='Texto de la etiqueta'
                            helperText='Ingrese una etiqueta y presione "agregar"'
                            onChange={ this.handleTag }
                            style={{
                                marginRight: 8,
                                width: 'calc(70% - 8px)'
                            }}
                            value={ this.state.tag }
                        />

                        <Button
                            color='primary'
                            dense
                            disabled={ this.state.tag.trim().length === 0 }
                            onClick={ this.handleAdd }
                            style={{
                                marginLeft: 8,
                                width: 'calc(30% - 8px)'
                            }}
                        >
                            Agregar
                        </Button>

                        <div
                            style={{
                                display: 'flex',
                                margin: '16px -16px 0',
                                flexWrap: 'wrap',
                                padding: '0 16px'
                            }}
                        >
                            {
                                this.state.event.tags.length === 0 &&
                                <Chip
                                    key={ -1 }
                                    label={ <span><Icon style={{ verticalAlign: 'middle' }}>mood_bad</Icon> Sin etiquetas</span> }
                                    style={{ opacity: .7 }}
                                />
                            }

                            {
                                this.state.event.tags.map((tag, index) => {
                                    return (
                                        <Chip
                                            label={ tag }
                                            key={ index }
                                            onDelete={ this.handleRemove(tag) }
                                            style={{ marginRight: 8, marginBottom: 8 }}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>

                    <Snack
                        close={ this.handleSnack }
                        message={ this.state.snack.message }
                        open={ this.state.snack.open }
                    />

                    <Button
                        id='create_event_button'
                        children='Create event'
                        onClick={ this.props.dataEvent === undefined ? this.handlePostRequest : this.handlePatchRequest }
                        style={{ display: 'none' }}
                    />
                </fieldset>
            </form>
        );
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

function getErrors(response) {
    let errors = JSON.parse(response),
        string = '';

    if (errors.hasOwnProperty('errors')) {
        for (let property in errors.errors) {
            if (errors.errors.hasOwnProperty(property)) {
                string = string + errors.errors[property].message + '\n'
            }
        }
    } else {
        if (errors.hasOwnProperty('code')) {
            string = textFields[errors.errmsg.split('index: ').pop().split('_').reverse().pop()] + ' ya registrado.'
        }
    }

    return string
}

let textFields = {
    'username': 'Nombre de usuario',
    'business.rut.body': 'Rut de empresa',
    'mail': 'Correo electrónico'
};

export default FormEvent;
