import React, { Component } from 'react';


import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

class FormRank extends Component {
    state = {
        rank: {
            value: 0
        },
        stars: [
            'inherit',
            'inherit',
            'inherit',
            'inherit',
            'inherit'
        ]
    };

    componentWillReceiveProps() {
        this.handleRequest(
            'get',
            'http://' + window.location.hostname + ':8081/ranks?user=' + this.props.user._id + '&ranker=' + cookie('userId'),
            {},
            this.handleResponse
        )
    }

    handleRank = (value) => {
        this.handleRequest(
            this.state.rank.value === 0 ? 'post' : 'patch',
            'http://' + window.location.hostname + ':8081/ranks' + (this.state.rank.value === 0 ? '' : '/' + this.state.rank._id),
            {
                ranker: cookie('userId'),
                user: this.props.user._id,
                value: value
            },
            this.handleResponse
        )
    };

    handleRequest = (type, url, body, callback) => {
        let request = new XMLHttpRequest();

        request.open(type.toUpperCase(), url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() { if (request.readyState === 4) { callback(request) } };

        request.send(JSON.stringify(body))
    };

    handleResponse = (request) => {
        switch (request.status) {
            case 200:
                this.handleUpdate(JSON.parse(request.response));
                break;
            case 201:
                this.handleUpdate(JSON.parse(request.response));
                break;
            default:
                break;
        }
    };

    handleUpdate = (response) => {
        let rank = Array.isArray(response) ? response.length < 1 ? { value: 0 } : response.pop() : response;

        this.setState({
            rank: rank,
            stars: [
                rank.value < 1 ? 'inherit' : 'accent',
                rank.value < 2 ? 'inherit' : 'accent',
                rank.value < 3 ? 'inherit' : 'accent',
                rank.value < 4 ? 'inherit' : 'accent',
                rank.value < 5 ? 'inherit' : 'accent'
            ]
        })
    };

    render() {
        return (
            <Dialog open={ this.props.open } onClose={ this.props.close } classes={{ paper: 'w-80' }}>
                <DialogTitle children={ this.state.rank ? 'Tu clasificacion: ' + this.state.rank.value.toFixed(1) : 'Sin clasificar' }/>

                <DialogContent>
                    <IconButton children={ <Icon children='star' color={ this.state.stars[0] }/> } onClick={ () => this.handleRank(1) }/>
                    <IconButton children={ <Icon children='star' color={ this.state.stars[1] }/> } onClick={ () => this.handleRank(2) }/>
                    <IconButton children={ <Icon children='star' color={ this.state.stars[2] }/> } onClick={ () => this.handleRank(3) }/>
                    <IconButton children={ <Icon children='star' color={ this.state.stars[3] }/> } onClick={ () => this.handleRank(4) }/>
                    <IconButton children={ <Icon children='star' color={ this.state.stars[4] }/> } onClick={ () => this.handleRank(5) }/>
                </DialogContent>
            </Dialog>
        );
    }
}

function cookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default FormRank;