import React from 'react';

import Button from 'material-ui/Button';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import DialogMoments from '../dialogs/moments';
import FormMoment from '../formMoment';

class GridMoments extends React.Component {
    state = {
        dialog: {
            open: false,
            image: undefined
        },
        form: {
            open: false
        },
        moments: [],
        status: {
            display: 'none'
        }
    };

    componentWillMount() {
        this.handleRequest('get', 'http://' + window.location.hostname + ':8081/moments?' + this.props.query, {}, this.handleResponse)
    }

    handleDialog = (event) => {
        this.setState({
            dialog: {
                open: !this.state.dialog.open,
                image: event.currentTarget.parentNode.firstChild.src
            }
        })
    };

    handleForm = () => {
        this.setState({
            form: {
                open: !this.state.form.open
            }
        })
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
            case 200: this.handleUpdate(JSON.parse(request.response));
                break;
            default :
                break;
        }
    };

    handleUpdate = (moments) => {
        this.setState({
            moments: moments,
            status: {
                display: moments.length === 0 ? '' : 'none'
            }
        })
    };

    render() {
        return <GridList
            cellHeight={ 180 }
            style={{
                margin: '2px 0',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                position: 'absolute',
                width: '-webkit-fill-available',
                height: 'calc(100% - 250px - 90px - 48px)',
                overflowY: 'auto',
                zIndex: -1
            }}
            cols={ 4 }
        >
            <GridListTile key={ -1 } cols={ 4 } style={ this.state.status }>
                <Typography align='center' style={{ paddingTop: 8 }} type='subheading'>No se encontraron momentos.</Typography>
            </GridListTile>

            {
                this.state.moments.map((tile, index) => (
                    <GridListTile
                        key={ index }
                        cols={ 4 }
                    >
                        <img
                            src={ tile.img }
                            alt={ 'ja' }
                        />

                        <GridListTileBar
                            actionIcon={<IconButton children={ <Icon children='zoom_in'/> }/>}
                            onClick={ this.handleDialog }
                            title={ tile.user.username }
                            subtitle={ tile.date.split('T').reverse().pop() }
                        />
                    </GridListTile>
                ))
            }

            <DialogMoments
                image={ this.state.dialog.image }
                open={ this.state.dialog.open }
                onRequestClose={ this.handleDialog }
            />

            <FormMoment
                open={ this.state.form.open }
                onRequestClose={ this.handleForm }
            />
        </GridList>;
    }
}

export default GridMoments;