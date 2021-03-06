import React from 'react';

import DialogMap from '../dialogs/map';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class ListDetail extends React.Component {
    state = {
        map: false
    };

    handleMap = () => {
        this.setState({ map: !this.state.map })
    };

    render() {
        return <List style={{ padding: 0 }}>
            <ListItem button>
                <ListItemIcon>
                    <Icon children="rate_review" />
                </ListItemIcon>
                <ListItemText primary={ this.props.detail === '' ? 'Sin descripcion' : this.props.detail }/>
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <Icon children="access_time" />
                </ListItemIcon>
                <ListItemText primary={ getDate(this.props.date) }/>
            </ListItem>

            <ListItem button onClick={ this.handleMap }>
                <ListItemIcon>
                    <Icon children="location_on" />
                </ListItemIcon>
                <ListItemText primary={ this.props.location }/>
            </ListItem>

            <DialogMap
                close={ this.handleMap }
                open={ this.state.map }
                place={ this.props.location.split('#').join('') }
            />
        </List>
    }
}

let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDate(dateObject) {
    let start = new Date(dateObject.start),
        end = new Date(dateObject.end);

    return (
        <span>
            { getTime(start) + ' - ' + months[start.getMonth()] + ' ' + start.getDate() + ', ' + start.getFullYear() }
            <br/>
            { getTime(end) + ' - ' + months[end.getMonth()] + ' ' + end.getDate() + ', ' + end.getFullYear() }
        </span>
    )
}

function getTime(date) {
    return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}

export default ListDetail;