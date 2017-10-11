import React, { Component } from 'react';

import { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';

class Profile extends Component {
    state = {
        tabs: 0,
        names: 'Rick',
        surnames: 'Sanchez',
        username: 'ricks',
        phrase: 'wubalubadubdub',
        activities: 0,
        votes: 0,
        comments: 0
    };

    componentDidMount() {
        document.getElementById('header').style.backgroundColor = 'transparent';
        document.getElementById('header').style.boxShadow = 'none';
        document.getElementById('shell').style.padding = 0;

        document.getElementById('back').style.display = '';
        document.getElementById('settings').style.display = '';

        document.getElementById('title').style.display = 'none';
        document.getElementById('search').style.display = 'none';
        document.getElementById('filter').style.display = 'none';
        document.getElementById('check').style.display = 'none';
        document.getElementById('down').style.display = 'none';
        document.getElementById('shared').style.display = 'none';
        document.getElementById('edit').style.display = 'none';

        this.handleRequest()
    }

    handleRequest = () => {
        let request = new XMLHttpRequest(), onUpdate = this.handleUpdate;

        request.open('GET', 'http://' + window.location.hostname + ':8081/users/' + getCookie('userId'), true);

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
        this.setState({
            names: data.names,
            surnames: data.surnames,
            username: data.username
        });
    };

    render() {
        return (
            <div>
                <CardMedia image="/images/landscape.jpg" title="Contemplative Reptile">
                    <Typography type="display1" style={{color: '#fafafa', padding: '160px 16px 0'}}>{this.state.names} {this.state.surnames}</Typography>
                    <Typography type="subheading" style={{color: '#fafafa', padding: '0 16px 26px'}}>@{this.state.username}</Typography>
                </CardMedia>

                <Button fab color="accent" aria-label="add" style={{ margin: '-28px 0 0', position: 'absolute', right: 16 }}>
                    <Icon>star</Icon>
                </Button>

                <Typography type="body1" style={{ backgroundColor: '#0D47A1', color: '#fafafa', padding: '16px 56px 22px 16px' }}>
                    <Icon>format_quote</Icon> {this.state.phrase}
                </Typography>

                <Tabs value={0} onChange={null} indicatorColor="primary" textColor="primary" fullWidth>
                    <Tab icon={<span><Icon style={{verticalAlign:'middle', marginRight: 3}}>directions_run</Icon>{this.state.activities}</span>} style={{maxWidth: '100%'}}/>
                    <Tab icon={<span><Icon style={{verticalAlign:'middle', marginRight: 6}}>thumb_up</Icon>{this.state.votes}</span>} style={{maxWidth: '100%'}}/>
                    <Tab icon={<span><Icon style={{verticalAlign:'middle', marginRight: 6}}>message</Icon>{this.state.comments}</span>} style={{maxWidth: '100%'}}/>
                </Tabs>

                {this.state.tabs === 0 && ''}
                {this.state.tabs === 1 && ''}
                {this.state.tabs === 2 && ''}
            </div>
        );
    }
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

export default Profile;