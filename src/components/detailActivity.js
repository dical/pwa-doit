import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import { CardMedia } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import Slide from 'material-ui/transitions/Slide';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import AddActivity from './formActivity';
import Users from './listUsers';

class Activity extends Component {
    state = {
        id: '',
        city: '',
        image: '/images/event.jpg',
        name: '',
        own: { },
        price: 500,
        quotas: 0,
        street: '',
        start: Date.now(),
        end: Date.now(),
        tabs: {
            value: 0
        },
        participants: [],
        participantButton: false,
        open: false,
        users: {
            open: false
        }
    };

    componentDidMount() {
        document.getElementById('header').classList.add('transparent');
        document.getElementById('shell').style.padding = 0;

        ['back', 'shared'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'search', 'filter', 'down', 'title', 'edit', 'bottom-navigation'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });

        document.getElementById('nav-empty').click();

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
        if (getCookie('userId') === data.own._id && (new Date(data.end)) > Date.now()) {
            document.getElementById('edit').style.display = '';
            document.getElementById('edit').setAttribute('href', '/edit/' + data._id)
        }

        let isParticipant = false, participants = [];

        if (typeof data.participants !== 'undefined') {
            participants = data.participants.filter(function(e) { return e !== '' });
        }

        if (participants.indexOf(getCookie('userId')) > -1 || (new Date(data.end)) < Date.now()) {
            isParticipant = true
        }

        this.setState({
            id: data._id,
            name: data.name,
            own: data.own,
            city: data.address.city,
            start: data.start,
            end: data.end,
            street: data.address.street,
            details: data.details,
            image: data.image,
            participants: participants,
            participantButton: isParticipant,
            price: data.price,
            quotas: data.quotas,
            tags: data.tags
        });
    };

    handleParticipate = () => {
        if (getCookie('userId') === '') {
            window.location.href = '/login'
        } else {
            let request = new XMLHttpRequest(), onUpdate = this.handleUpdate, participants = this.state.participants;

            participants.push(getCookie('userId'));

            request.open('PATCH', 'http://' + window.location.hostname + ':8081/events/' + window.location.pathname.split('/').pop() , true);
            request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    switch (request.status) {
                        case 200:
                            window.location.reload();
                            break;
                        default:
                            break;
                    }
                }
            };

            request.send(
                JSON.stringify({
                    $addToSet: { participants: { $each: participants } }
                })
            )
        }
    };

    handleOpen = () => {
        if (this.state.open) {
            this.componentDidMount()
        }

        this.setState({
            open: !this.state.open
        })
    };

    handleUsers = () => {
        if (this.state.users.open) {
            this.componentDidMount()
        }

        this.setState({
            users: {
                open: !this.state.users.open
            }
        })
    };


    render() {
        return (
            <div>
                <CardMedia
                    image={ this.state.image }
                    title="Contemplative Reptile"
                    style={{ boxShadow: 'inset 0px 300px 180px -300px #000, inset 0px -300px 180px -300px #000' }}
                >
                    <Typography
                        type="display1"
                        style={{
                            color: '#fafafa',
                            padding: '160px 16px 0',
                            textShadow: 'rgba(0,0,0,.18) 1px 1px'
                        }}
                    >
                        { this.state.name }
                    </Typography>

                    <Typography
                        type="subheading"
                        style={{
                            color: '#fafafa',
                            padding: '0 16px 26px',
                            textShadow: 'rgba(0,0,0,.18) 1px 1px'
                        }}
                    >
                        <Link
                            to={ "/user/" + this.state.own._id }
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            @{ this.state.own.username }
                        </Link>
                    </Typography>
                </CardMedia>

                <Button
                    fab
                    disabled={ this.state.participantButton }
                    color="accent"
                    aria-label="add"
                    onClick={ this.handleParticipate }
                    style={{
                        margin:'-28px 16px 0 0',
                        float: 'right'
                    }}
                >
                    <Icon>person_add</Icon>
                </Button>

                <Typography
                    style={{
                        padding: '16px 96px 26px 26px',
                        backgroundColor: '#212121',
                        lineHeight: 1.5,
                        color:'#fff'
                    }}
                    type="body1"
                >
                    <Icon
                        style={{
                            marginRight: 10,
                            verticalAlign: 'bottom'
                        }}
                    >
                        attach_money
                    </Icon>

                    { this.state.price } CLP

                    <br/>

                    <Icon
                        style={{
                            marginRight: 10,
                            verticalAlign: 'bottom'
                        }}
                    >
                        group
                    </Icon>

                    <span
                        id="toggle-users"
                        onClick={ this.handleUsers }
                        style={{ cursor: 'pointer' }}
                    >
                        { this.state.participants.length } Participante(s)
                    </span>
                </Typography>

                <Tabs
                    value={ this.state.tabs.value }
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    onChange={null}
                >
                    <Tab
                        icon={
                            <span>
                                <Icon style={{verticalAlign:'middle'}}>info</Icon>
                            </span>
                        }
                        style={{maxWidth:'100%'}}
                    />

                    <Tab
                        icon={
                            <span>
                                <Icon style={{verticalAlign:'middle'}}>message</Icon> 0
                            </span>
                        }
                        style={{maxWidth:'100%'}}
                    />
                </Tabs>

                {
                    this.state.tabs.value === 0 &&
                    <div
                        style={{ marginTop: 16 }}
                    >
                        <Typography
                            type="body1"
                            style={{
                                display: 'flex',
                                padding: '8px 16px'
                            }}
                        >
                            <Icon>rate_review</Icon>
                            <span
                                style={{
                                    margin: 0,
                                    paddingLeft: 26,
                                    display: 'inline-block'
                                }}
                            >
                                { this.state.details === '' ? 'Sin comentarios' : this.state.details }
                            </span>
                        </Typography>

                        <Typography
                            type="body1"
                            style={{
                                display: 'flex',
                                padding: '8px 16px'
                            }}
                        >
                            <Icon
                                style={{
                                    lineHeight: 1.5
                                }}
                            >
                                access_time
                            </Icon>
                            <span
                                style={{
                                    margin: 0,
                                    paddingLeft: 26,
                                    display: 'inline-block'
                                }}
                            >
                                { getDayOfWeek(this.state.start) }, { getMonth(this.state.start) } { getDayOfMonth(this.state.start) }
                                <br/>
                                { (new Date(this.state.start)).getHours() }:{ ((new Date(this.state.start)).getMinutes() < 10 ? '0' : '') + (new Date(this.state.start)).getMinutes() } { (new Date(this.state.start)).getHours() < 13 ? 'AM' : 'PM' }
                                 —
                                { (new Date(this.state.end)).getHours() }:{ ((new Date(this.state.end)).getMinutes() < 10 ? '0' : '') + (new Date(this.state.end)).getMinutes() } { (new Date(this.state.start)).getHours() < 13 ? 'AM' : 'PM' }
                            </span>
                        </Typography>

                        <Typography
                            type="body1"
                            style={{
                                display: 'flex',
                                padding: '8px 16px'
                            }}
                        >
                            <Icon>location_on</Icon>
                            <span
                                style={{
                                    margin: 0,
                                    paddingLeft: 26,
                                    display: 'inline-block'
                                }}
                            >
                                {this.state.street}, {this.state.city}, Chile
                            </span>
                        </Typography>
                    </div>
                }

                <Dialog
                    id="dialog-edit"
                    fullScreen
                    open={ this.state.open }
                    onRequestClose={ this.handleRequestClose }
                    transition={<Slide direction="up" />}
                    style={{ top: 64 }}
                >
                    <AddActivity method="patch" activity={ this.state }/>
                </Dialog>

                <Dialog
                    id="dialog-users"
                    fullScreen
                    open={ this.state.users.open }
                    onRequestClose={ this.handleUsers }
                    transition={<Slide direction="up" />}
                >
                    <Users list={ this.state.participants }/>
                </Dialog>

                <Button id="toggle-edit" onClick={ this.handleOpen } style={{ display: 'none' }}> </Button>
            </div>
        );
    }
}

function getDayOfWeek(date) {
    let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'], start = (new Date(date));

    return days[start.getDay()]
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