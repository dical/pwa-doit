import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

class AddActivity extends Component {
    state = {
        add: true,
        disableTitle: false,
        disableStartDate: false,
        disableStartTime: false,
        disableEndDate: false,
        disableEndTime: false,
        disableCity: false,
        disableAddress: false,
        disableQuotas: false,
        disablePrice: false,
        disableDetails: false,
        disableTags: false,
        errorTitle: false,
        errorStartDate: false,
        errorStartTime: false,
        errorEndDate: false,
        errorEndTime: false,
        errorCity: false,
        errorAddress: false,
        errorQuotas: false,
        errorPrice: false,
        chipData: [
            { key: 0, label: 'Deporte' },
        ],
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Agregar actividad';

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
    }

    handleAddTags = (event) => {
        if (event.charCode === 13) {
            this.state.chipData.push({ key: this.state.chipData.length, label: event.target.value });
            this.setState({chipData: this.state.chipData})
        }
    };

    handleAlert = () => {
        this.setState({
            alert: !this.state.alert
        });
    };

    handleCheckAdd = () => {
        this.setState({
            add:
            this.state.errorTitle ||
            this.state.errorStartDate ||
            this.state.errorStartTime ||
            this.state.errorEndDate ||
            this.state.errorEndTime ||
            this.state.errorCity ||
            this.state.errorAddress ||
            this.state.errorQuotas ||
            this.state.errorPrice ||
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
            errorAddress: !(new RegExp("[A-Za-z0-9!?-]{2,250}")).test(event.target.value)
        }, this.handleCheckAdd);
    };

    handleCheckDate = () => {
        let dateStart = document.getElementById('new-activity-start-date').value.split('-'),
            dateEnd = document.getElementById('new-activity-end-date').value.split('-'),
            timeStart = document.getElementById('new-activity-start-time').value.split(':'),
            timeEnd = document.getElementById('new-activity-end-time').value.split(':'),
            dateError = (new Date(dateStart[0], dateStart[1], dateStart[2], timeStart[0], timeStart[1])) > (new Date(dateEnd[0], dateEnd[1], dateEnd[2], timeEnd[0], timeEnd[1]));

        this.setState({
            errorStartDate: dateError,
            errorStartTime: dateError,
            errorEndDate: dateError,
            errorEndTime: dateError
        }, this.handleCheckAdd);
    };

    handleCheckTitle = (event) => {
        this.setState({
            errorTitle: !(new RegExp("[A-Za-z]{5,50}")).test(event.target.value)
        }, this.handleCheckAdd);
    };

    handleCheckQuotas = (event) => {
        this.setState({
            errorQuotas: !(new RegExp("[0-9]{2,250}")).test(event.target.value) && event.target.value < 1
        }, this.handleCheckAdd);
    };

    handleCheckPrice = (event) => {
        this.setState({
            errorPrice: !(new RegExp("[0-9]{2,250}")).test(event.target.value) && event.target.value < 0
        }, this.handleCheckAdd);
    };

    handleDisabled = () => {
        this.setState({
            add: !this.state.add,
            disableTitle: !this.state.disableTitle,
            disableStartDate: !this.state.disableStartDate,
            disableStartTime: !this.state.disableStartTime,
            disableEndDate: !this.state.disableEndDate,
            disableEndTime: !this.state.disableEndTime,
            disableCity: !this.state.disableCity,
            disableAddress: !this.state.disableAddress,
            disableQuotas: !this.state.disableQuotas,
            disablePrice: !this.state.disablePrice,
            disableDetails: !this.state.disableDetails,
            disableTags: !this.state.disableTags
        });
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(), onAlert = this.handleAlert, onDisabled = this.handleDisabled, onProgress = this.handleProgress, onResponse = this.handleResponse;

        onDisabled(); onProgress(); onResponse("Agregando actividad..."); onAlert();

        request.open('POST', 'http://' + window.location.hostname + ':8081/events', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        console.log(document.cookie);

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
                switch (request.status) {
                    case 201:
                        onDisabled(); onProgress(); document.cookie = JSON.parse(request.response)._id; document.getElementById('activity').click();
                        break;
                    case 403:
                        onDisabled(); onProgress(); onResponse(snack(request.response));
                        break;
                    default:
                        onDisabled(); onProgress(); onResponse("Sin conexion");
                        break;
                }
            }
        }
    };

    handleRequestDelete = data => () => {
        const chipData = [...this.state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({ chipData });
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
            <form style={{margin: '26px 16px'}}>
                <TextField fullWidth id="new-activity-name" label="Titulo *" type="text" disabled={this.state.disableTitle} error={this.state.errorTitle} onChange={this.handleCheckTitle} style={{marginBottom: 16}}/>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <TextField id="new-activity-start-date" label="Fecha de Inicio *" type="date" InputLabelProps={{ shrink: true }} disabled={this.state.disableStartDate} error={this.state.errorStartDate} onChange={this.handleCheckDate} style={{margin: '0 16px 16px 0', width: '-webkit-fill-available'}}/>
                    <TextField id="new-activity-start-time" label="Hora de Inicio *" type="time" InputLabelProps={{ shrink: true }} disabled={this.state.disableStartTime} error={this.state.errorStartTime} onChange={this.handleCheckDate} style={{margin: '0 0 16px 16px', width: '-webkit-fill-available'}}/>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <TextField id="new-activity-end-date" label="Fecha de Termino *" type="date" InputLabelProps={{ shrink: true }} disabled={this.state.disableEndDate} error={this.state.errorEndDate} onChange={this.handleCheckDate} style={{margin: '0 16px 16px 0', width: '-webkit-fill-available'}}/>
                    <TextField id="new-activity-end-time" label="Hora de Termino *" type="time" InputLabelProps={{ shrink: true }} disabled={this.state.disableEndTime} error={this.state.errorEndTime} onChange={this.handleCheckDate} style={{margin: '0 0 16px 16px', width: '-webkit-fill-available'}}/>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField id="new-activity-city" label="Ciudad" select value={this.state.valueSex} SelectProps={{native: true}} disabled={this.state.disableCity} style={{margin: '0 16px 16px 0', width: '100%'}}>
                        <option value="la serena">La Serena</option>
                        <option value="coquimbo">Coquimbo</option>
                    </TextField>
                    <TextField fullWidth id="new-activity-address" label="Direccion *" type="text" disabled={this.state.disableAddress} error={this.state.errorAddress} onChange={this.handleCheckAddress} style={{margin: '0 0 16px 16px'}}/>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField fullWidth id="new-activity-quotas" label="Cupos *" type="number" disabled={this.state.disableQuotas} error={this.state.errorQuotas} onChange={this.handleCheckQuotas} style={{margin: '0 16px 16px 0'}}/>
                    <TextField fullWidth id="new-activity-price" label="Precio *" type="number" disabled={this.state.disablePrice} error={this.state.errorPrice} onChange={this.handleCheckPrice} style={{margin: '0 0 16px 16px'}}/>
                </div>

                <TextField fullWidth id="new-activity-details" label="Descripcion" multiline rowsMax="3" disabled={this.state.disableDetails} error={this.state.errorDetails} onChange={this.handleCheckDetails} style={{marginBottom: 16}}/>

                <TextField fullWidth id="new-activity-tags" label="Etiquetas" disabled={this.state.disableTags} onKeyPress={this.handleAddTags} style={{marginBottom: 16}}/>
                <div style={{display: 'flex', marginBottom: 16}}>
                    {this.state.chipData.map(data => {
                        return (
                            <Chip
                                label={data.label}
                                key={data.key}
                                onRequestDelete={this.handleRequestDelete(data)}
                                style={{marginRight: 8}}
                            />
                        );
                    })}
                </div>

                <Button raised color="primary" onClick={this.handleRequest} disabled={this.state.add} style={{margin: '16px 0', width: '100%'}}>Agregar</Button>

                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.alert}
                    autoHideDuration={6000}
                    onRequestClose={this.handleAlert}
                    SnackbarContentProps={{'aria-describedby': 'message-id'}}
                    message={<span id="message-id" style={{whiteSpace: 'pre'}}>{this.state.response}</span>}
                    action={[<Button key="undo" color="accent" dense onClick={this.handleAlert}>OCULTAR</Button>]}
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
