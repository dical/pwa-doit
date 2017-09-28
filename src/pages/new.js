import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel }  from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Select from 'material-ui/Select';
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
        paddingLeft: theme.spacing.unit * 4,
        marginBottom: 0,
        background: theme.palette.background.default,
    },
    mobileStepper : {
      position: 'fixed',
      bottom: 0,
        right: '-8px',
      width: '100%',
    },
    flex: {
        flex: 1,
        fontWeight: 400,
        fontSize: 19,
    },
    iconButton: {
        margin:'0 16px 0 -9px',
    },
    form: {
        margin: '16px',
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

class New extends React.Component {
    state = {
        open: false,
        message: "",
        title: {
            disabled: false,
            error: false,
        },
        image: {
            disabled: false,
            error: false,
        },
        startDate: {
            disabled: false,
            error: false,
        },
        startTime: {
            disabled: false,
            error: false,
        },
        endDate: {
            disabled: false,
            error: false,
        },
        endTime: {
            disabled: false,
            error: false,
        },
        location: {
            disabled: false,
            error: false,
        },
        category: {
            disabled: false,
            error: false,
        },
        details: {
            disabled: false,
            error: false,
        },
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleSnackBar = message => {
        this.setState({ open: true, message: message });
    };

    handleRequest = () => {
        document.getElementById('progress').style.visibility = 'visible';

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

        request.open('POST', 'http://34.240.133.65:8081/activities', true);
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
                document.getElementById('progress').style.visibility = 'hidden';

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

                <AppBar position="static" style={{backgroundColor:'#2196f3'}} className={classes.bar}>
                    <Toolbar className={classes.bar}>
                        <IconButton color="contrast" aria-label="Menu" className={classes.iconButton} href={"/activities"}>
                            <Icon>arrow_back</Icon>
                        </IconButton>

                        <Typography type="title" color="inherit" className={classes.flex}>Agregar Actividad</Typography>

                        <IconButton color="contrast" aria-label="Menu" onClick={this.handleRequest}>
                            <Icon>check</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div className={classes.form}>
                    <FormControl className={classes.formControl} disabled={state.title.disabled}>
                        <InputLabel htmlFor="new-activity-title" color="primary">Titulo *</InputLabel>
                        <Input id="new-activity-title" />
                    </FormControl>

                    <div style={{minHeight: '30vw', backgroundColor: '#eee', marginBottom: 16, textAlign: 'center', cursor: 'pointer' }}>
                        <img src={"images/icon-image-128.png"} style={{ opacity: '.5' }} alt={"Seleccionar imagen"}/>
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <TextField
                            id="new-activity-startDate"
                            label="Fecha de Inicio *"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={state.startDate.disabled}
                        />

                        <TextField
                            id="new-activity-startTime"
                            label="Hora de Inicio *"
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={state.startTime.disabled}
                        />
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <TextField
                            id="new-activity-endDate"
                            label="Fecha de Termino *"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={state.endDate.disabled}
                        />

                        <TextField
                            id="new-activity-endTime"
                            label="Hora de Termino *"
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={state.endTime.disabled}
                        />
                    </div>

                    <FormControl className={classes.formControl} disabled={state.location.disabled}>
                        <InputLabel htmlFor="new-activity-location" color="primary">Ubicacion *</InputLabel>
                        <Input id="new-activity-location" type={"tel"} />
                    </FormControl>

                    <FormControl className={classes.formControl} disabled={state.category.disabled}>
                        <InputLabel htmlFor="new-activity-category">Categoria</InputLabel>
                        <Select
                            native
                            input={<Input id="new-activity-category" />}
                            value={20}
                        >
                            <option value={20}>Deportiva</option>
                            <option value={30}>Recreativa</option>
                        </Select>
                    </FormControl>

                    <TextField
                        id="new-activity-details"
                        label="Descripcion"
                        multiline
                        rowsMax="3"
                        margin="normal"
                        className={classes.textField}
                        style={{width:'100%'}}
                        disabled={state.details.disabled}
                    />

                    <Typography type="caption" gutterBottom style={{margin:'16px 0'}}>
                        Campos requeridos *
                    </Typography>
                </div>

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
                    message={<span id="message-id">{state.message}</span>}
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

New.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(New));
