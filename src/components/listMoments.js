import React from 'react';

import Button from 'material-ui/Button';
import { GridList, GridListTile } from 'material-ui/GridList';

import FormMoment from './formMoment';

class ListMoments extends React.Component {
    state = {
        form: {
            open: false
        },
        moments: []
    };

    componentWillMount() {
        this.handleRequest()
    }

    handleForm = () => {
        this.setState({
            form: {
                open: !this.state.form.open
            }
        })
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            updates = this.handleUpdate;

        request.open('GET', 'http://' + window.location.hostname + ':8081/moments?' + decodeQuery(this.props.query), true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200: updates(JSON.parse(request.response));
                        break;
                    default : console.log(request.status + ': ' + request.statusText);
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdate = (moments) => {
        this.setState({
            moments: moments
        })
    };

    render() {
        return <GridList
            cellHeight={ 160 }
            style={{
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                position: 'absolute',
                width: '-webkit-fill-available',
                height: 'calc(100% - 250px - 90px - 48px)',
                overflowY: 'scroll',
                zIndex: -1
            }}
            cols={ 3 }
        >
            <GridListTile
                key={ 0 }
                cols={ 1 }
            >
                <Button
                    children="Agregar momento"
                    onClick={ this.handleForm }
                    style={{
                        width: '-webkit-fill-available',
                        height:'-webkit-fill-available'
                    }}
                />
            </GridListTile>

            {
                this.state.moments.map((tile, index) => (

                    <GridListTile
                        key={ index }
                        cols={ 1 }
                    >
                        <img
                            src={ tile.img }
                            alt={ tile.title + ' por ' + tile.author }
                        />
                    </GridListTile>
                ))
            }

            <FormMoment
                open={ this.state.form.open }
                onRequestClose={ this.handleForm }
            />
        </GridList>;
    }
}


function decodeQuery(objQuery) {
    let str = '';

    for (let p in objQuery) {
        if (objQuery.hasOwnProperty(p)) {
            str += p + '=' + objQuery[p] + '&';
        }
    }

    return str;
}

export default ListMoments;