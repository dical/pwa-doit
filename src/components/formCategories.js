import React, { Component } from 'react';

import Button from 'material-ui/Button';

class Categories extends Component {
    componentWillMount() {
        if (document.getElementById('title').innerText === 'Recientes') {
            this.handleRecent()
        } else {
            this.handleParticipants()
        }
    }

    state = {
        recent: {
            color: 'primary'
        },
        participants: {
            color: 'default'
        }
    };

    handleRecent = () => {
        document.getElementById('title').innerText = 'Recientes';

        this.props.request.sort = 'recent';

        this.setState({
            recent: {
                color: 'primary'
            },
            participants: {
                color: 'default'
            }
        }, this.props.onChange )
    };

    handleParticipants = () => {
        document.getElementById('title').innerText = 'Mas participantes';

        this.props.request.sort = 'participants';

        this.setState({
            recent: {
                color: 'default'
            },
            participants: {
                color: 'primary'
            }
        }, this.props.onChange )
    };

    render() {
        return <form
            style={{ display: 'flex' }}
        >
            <Button
                selected
                raised
                color={ this.state.recent.color }
                style={{ width: '50%', marginRight: 8 }}
                onClick={ this.handleRecent }
            >
                Recientes
            </Button>

            <Button
                raised
                color={ this.state.participants.color }
                style={{ width: '50%', marginLeft: 8 }}
                onClick={ this.handleParticipants }
            >
                Con mas participantes
            </Button>
        </form>
    }
}

export default Categories;