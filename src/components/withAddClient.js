import React from 'react';

/* Material-UI */
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel }  from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'material-ui/Select';

import createAddActivity from '../styles/createAddActivity';

class AddClient extends React.Component {
    state = createAddActivity;

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(null)
    }

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        let states = this.state;

        states.snackBar.open = false;

        this.setState(states);
    };

    handleSnackBar = message => {
        let states = this.state;

        states.snackBar.open = true;
        states.snackBar.message = message;

        this.setState(states);
    };

    handleRequest = () => {
        //document.getElementById('progress').style.visibility = 'visible';

        let me = this;
        let request = new XMLHttpRequest();
        let handleSnackBar = this.handleSnackBar;

        me.setState({
            title: { disabled: true },
            image: { disabled: true },
            startDate: { disabled: true },
            startTime: { disabled: true },
            endDate: { disabled: true },
            location: { disabled: true },
            category: { disabled: true },
            details: { disabled: true },
        });

        request.open('POST', 'http://localhost:8081/events', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(
            "a_titulo=" + document.getElementById('new-activity-title').value +
            "&a_fecha_inicio=" + document.getElementById('new-activity-startDate').value +
            "&a_hora_inicio=" + document.getElementById('new-activity-startTime').value +
            "&a_fecha_termino=" + document.getElementById('new-activity-endDate').value +
            "&a_hora_termino=" + document.getElementById('new-activity-endTime').value +
            "&a_ubicacion=" + document.getElementById('new-activity-location').value +
            "&a_categoria=" + document.getElementById('new-activity-category').value +
            "&a_descripcion=" + document.getElementById('new-activity-details').value
        );

        request.onreadystatechange = function() {
            if(request.readyState === 4) {
                //document.getElementById('progress').style.visibility = 'hidden';

                me.setState({
                    title: { disabled: false },
                    image: { disabled: false },
                    startDate: { disabled: false },
                    startTime: { disabled: false },
                    endDate: { disabled: false },
                    location: { disabled: false },
                    category: { disabled: false },
                    details: { disabled: false },
                });

                if (request.status === 200) {
                    window.location.href = "/"
                } else {
                    console.log("error");
                    handleSnackBar("Error");
                }
            }
        }
    };

    render() {
        return (
            <div style={{...this.state.divContent.style}}>
                <div style={{...this.state.divForm.style}}>
                    <FormControl style={{...this.state.formControl.style}}>
                        <InputLabel htmlFor="new-activity-title" color="primary">Titulo *</InputLabel>
                        <Input id="new-activity-title"/>
                    </FormControl>

                    <div style={{...this.state.inputImage.style}}>
                        <img src={"images/icon-image-128.png"} style={{ opacity: '.5' }} alt={"Seleccionar imagen"}/>
                    </div>

                    <div style={{...this.state.divFlex.style}}>
                        <TextField id="new-activity-startDate" label="Fecha de Inicio *" type="date" InputLabelProps={{ shrink: true }} style={{...this.state.textField.style}}/>
                        <TextField id="new-activity-startTime" label="Hora de Inicio *" type="time" InputLabelProps={{ shrink: true }} style={{...this.state.textField.style}}/>
                    </div>

                    <div style={{...this.state.divFlex.style}}>
                        <TextField id="new-activity-endDate" label="Fecha de Termino *" type="date" InputLabelProps={{ shrink: true }} style={{...this.state.textField.style}}/>
                        <TextField id="new-activity-endTime" label="Hora de Termino *" type="time" InputLabelProps={{ shrink: true }} style={{...this.state.textField.style}}/>
                    </div>

                    <FormControl style={{...this.state.formControl.style}}>
                        <InputLabel htmlFor="new-activity-location" color="primary">Ubicacion *</InputLabel>
                        <Input id="new-activity-location" type={"tel"}/>
                    </FormControl>

                    <FormControl style={{...this.state.formControl.style}}>
                        <InputLabel htmlFor="new-activity-category">Categoria</InputLabel>
                        <Select native input={<Input id="new-activity-category"/>} value={20}>
                            <option value={20}>Deportiva</option>
                            <option value={30}>Recreativa</option>
                        </Select>
                    </FormControl>

                    <TextField id="new-activity-details" label="Descripcion" multiline rowsMax="3" margin="normal" style={{...this.state.textField.style, width: '100%'}}/>

                    <Typography type="caption" gutterBottom style={{...this.state.typographyCaption.style}}>
                        Campos requeridos *
                    </Typography>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackBar.open}
                    autoHideDuration={6e3}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
                    message={<span id="message-id">{this.state.snackBar.message}</span>}
                    action={[<Button key="undo" color="accent" dense onClick={this.handleRequestClose}>OCULTAR</Button>]}
                />
            </div>
        );
    }
}

export default AddClient;