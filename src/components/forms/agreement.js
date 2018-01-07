import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';

import { request} from '../../helpers/request';
import { get_cookie } from "../../helpers/cookie";

class FormAgreement extends Component {
    state = { agreement: 0 };

    agreements = [
        {
            title: 'Basico',
            details: 'Publica toda la informacion de la actividad, cupos y ofrecerlos, pero tendra que ser el usuario el que encuentre la empresa y actividad en base a los gustos que ha configurado',
            price: 7500
        },
        {
            title: 'Medio',
            details: 'Envia notificaciones al bolsillo de sus potenciales clientes. Las notificaciones seran enviadas a las personas que han determinado que les gustaria realizar dicha actividad, o a quienes la aplicacion a determinado tienen alta probabilidad que les guste realizar dicha actividad',
            price: 25000
        },
        {
            title: 'Pro',
            details: 'Doit Exp, analizara la informacion de los usuaios relevantes para la empresa, como los lugares mas convenientes para desplegar publicidad, a través de estadisticas de geolocalizacion, rango de precios de los usuarios y sus servicios, utilizacion de drones y diversas herramientas para mostrar su actividad.',
            price: 70000
        },

    ];

    componentWillReceiveProps(nextProps) {
        this.setState({ agreement: nextProps.agreement })
    }

    handleNext = () => {
        this.setState({ agreement: this.state.agreement + 1 < this.agreements.length ? this.state.agreement + 1 : 0 })
    };

    handlePatch = () => {
        request('patch', 'http://' + window.location.hostname + ':8081/users/' + get_cookie('userId'), { agreement: this.state.agreement }, this.props.update, true)
    };

    render() {
        return (
            <form>
                <DialogTitle>{ 'Plan ' + this.agreements[this.state.agreement].title }</DialogTitle>
                <DialogContent>
                    <Typography
                        children={ this.agreements[this.state.agreement].details }
                        type='subheading'
                    />

                    <br/>

                    <Typography
                        children={ '$ ' + this.agreements[this.state.agreement].price }
                        type='subheading'
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        children='Siguiente'
                        color='primary'
                        onClick={ this.handleNext }
                    />

                    <Button
                        disabled={ this.state.agreement === this.props.agreement }
                        children={ this.state.agreement === this.props.agreement ? 'Contratado' : 'Contratar' }
                        color='accent'
                        onClick={ this.handlePatch }
                    />
                </DialogActions>
            </form>
        );
    }
}

export default FormAgreement;