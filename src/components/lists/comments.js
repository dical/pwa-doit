import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import FormComments from '../forms/comments';

class ListComments extends Component {
    state = {
        comment: {
            message: undefined,
            open: false
        },
        messages: [],
        request: {
            loading: true
        },
        rest: 3
    };

    componentDidMount() {
        this.handleRefresh()
    }

    handleClose = () => {
        this.setState({
            comment: {
                message: this.state.comment.message,
                open: !this.state.comment.open
            }
        })
    };

    handleComment = (event) => {
        this.setState({
            comment: {
                message: this.state.messages[ event.currentTarget.getAttribute('message') ],
                open: !this.state.comment.open
            }
        })
    };

    handleRefresh = () => {
        this.handleRequest(this.handleUpdate)
    };

    handleRequest = (callback) => {
        let request = new XMLHttpRequest();

        this.setState({
            loading: true
        });

        request.open('GET', 'http://' + window.location.hostname + ':8081/messages?' + this.props.query, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        callback(request.response);
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
            messages: JSON.parse(data).reverse(),
            request: {
                loading: false
            }
        })
    };

    render() {
        return (
            <List
                style={{
                    maxHeight: 'calc(100vh - 48px - 32px - 32px)',
                    overflowY: 'auto',
                    padding: 0
                }}
            >
                { this.state.request.loading && <div style={{ padding: 16, textAlign: 'center' }}><CircularProgress/></div> }

                {
                    !this.state.request.loading && this.state.messages.length === 0 &&
                    <ListItem>
                        <ListItemText align='center' primary='No se encontraron mensajes.'/>
                    </ListItem>
                }

                {
                    this.state.messages.map((message, index) => (
                        <ListItem
                            key={ this.state.messages.length - index }
                        >
                            <Link
                                to={ '/user/' + message.user._id }
                                style={{ textDecoration:'none' }}
                            >
                                <Avatar
                                    classes={{ img: 'avatar' }}
                                    src={ message.user.image === '/images/landscape.jpg' ? '/images/user.png' : message.user.image }
                                />
                            </Link>

                            <ListItemText
                                disableTypography
                                primary={
                                    <div>
                                        <Typography
                                            style={{ fontWeight: 500, display: 'inline' }}
                                            type='body1'
                                        >
                                            { message.user.username } &nbsp;
                                        </Typography>

                                        <Typography
                                            style={{ display: 'inline' }}
                                            type='caption'
                                        >
                                            { getDiffDate(message.date) }
                                        </Typography>
                                    </div>

                                }
                                secondary={
                                    <div>
                                        <Typography type="body1">{ message.details }</Typography>

                                        {
                                            message.responses.length > 0 &&
                                            <Typography
                                                style={{ fontWeight: 500 }}
                                                type="caption"
                                            >
                                                SEE { message.responses.length } RESPONSES <IconButton children={ 'keyboard_arrow_down' } style={{ verticalAlign: 'middle' }}/>
                                            </Typography>
                                        }
                                    </div>
                                }
                            />

                            <ListItemSecondaryAction>
                                {
                                    message.user._id !== getCookie('userId') &&
                                    <IconButton
                                        children={ <Icon>message</Icon> }
                                        onClick={ this.handleComment }
                                        message={ index }
                                    />
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }

                <FormComments
                    message={ this.state.comment.message }
                    onClose={ this.handleClose }
                    onSuccess={ this.handleRefresh }
                    open={ this.state.comment.open }
                />

                <Link id='add' onClick={ this.handleComment } to='#'/>
            </List>
        );
    }
}

function getDiffDate(date) {
    let diff = ((new Date(Date.now())).getTime() - (new Date(date)).getTime()) / 1000,
        text = ' segundo';

    if (diff > 59) {
        text = ' minuto';
        diff /= 60;
    }

    if (diff > 59 && text === ' minuto') {
        text = ' hora';
        diff /= 60;
    }

    if (diff > 23 && text === ' hora') {
        text = ' dia';
        diff /= 24;
    }

    if (diff.toFixed(0) > 1) {
        text = text + 's'
    }

    return 'Hace ' + diff.toFixed(0) + text
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default ListComments;