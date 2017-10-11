import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

class Activity extends Component {
    state = {
        name: 'name',
        city: 'city',
        street: 'street',
        start: Date.now(),
        price: 500,
        tabs: {
            value: 0
        }
    };

    componentDidMount() {
        document.getElementById('header').style.backgroundColor = 'transparent';
        document.getElementById('header').style.boxShadow = 'none';
        document.getElementById('shell').style.padding = 0;

        document.getElementById('back').style.display = '';
        document.getElementById('shared').style.display = '';

        document.getElementById('settings').style.display = 'none';
        document.getElementById('title').style.display = 'none';
        document.getElementById('search').style.display = 'none';
        document.getElementById('filter').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('down').style.display = 'none';

        this.handleRequest();
    }

    handleRequest = () => {
        let request = new XMLHttpRequest(), onUpdate = this.handleUpdate;

        request.open('GET', 'http://' + window.location.hostname + ':8081/events/' + window.location.pathname.split('/').pop() , true);

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        onUpdate(JSON.parse(request.response));
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdate = (data) => {
        if (getCookie('userId') === data.own) {
            document.getElementById('edit').style.display = '';
        }

        this.setState({
            name: data.name,
            city: data.address.city,
            start: data.start,
            street: data.address.street
        });
    };

    render() {
        return (
            <div>
                <CardMedia image="/images/event.jpg" title="Contemplative Reptile" style={{ boxShadow: 'inset 0px 300px 180px -300px #000, inset 0px -300px 180px -300px #000' }}>
                    <Typography type="display1" style={{color: '#fafafa', padding: '160px 16px 0'}}>{this.state.name}</Typography>
                    <Typography type="subheading" style={{color: '#fafafa', padding: '0 16px 26px'}}>@{this.state.name}</Typography>
                </CardMedia>

                <Button fab color="accent" aria-label="add" style={{margin:'-28px 16px 0 0', float: 'right'}}>
                    <Icon>person_add</Icon>
                </Button>

                <Typography
                    style={{padding: '16px 96px 26px 26px', backgroundColor: '#212121', lineHeight: 1.2, color:'#fff'}}
                    type="body1"
                >
                    Disfruta de una clase asistida por un instructor en nuestra escuela, dos horas para conectarte con el mar en nuestra escuela ubicada en la avenida del mar
                </Typography>

                <Tabs
                    value={this.state.tabs.value}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    onChange={null}
                >
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>info</Icon></span>} style={{maxWidth:'100%'}}/>
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>message</Icon> 64</span>} style={{maxWidth:'100%'}}/>
                </Tabs>

                {
                    this.state.tabs.value === 0 &&
                    <div style={{marginTop: 16}}>
                        <Typography type="body1" style={{display: 'flex', padding:16}}>
                            <Icon>access_time</Icon> <span style={{margin: 0, paddingLeft: 26, display: 'inline-block'}}>{getDayOfWeek(this.state.start)}, {getMonth(this.state.start)} {getDayOfMonth(this.state.start)} <br/> 12:00 — 1:00 PM</span>
                        </Typography>

                        <Typography type="body1" style={{display: 'flex', padding:16}}>
                            <Icon>location_on</Icon> <span style={{margin: 0, paddingLeft: 26, display: 'inline-block'}}> {this.state.street}, {this.state.city}, Chile</span>
                        </Typography>
                    </div>
                }
            </div>
        );
    }
}

function getDayOfWeek(date) {
    let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    return days[(new Date(date)).getDay() - 1]
}

function getMonth(date) {
    let days = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return days[(new Date(date)).getMonth()]
}

function getDayOfMonth(date) {
    return (new Date(date)).getDate()
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

export default Activity;