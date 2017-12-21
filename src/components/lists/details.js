import React from 'react';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class ListDetail extends React.Component {
    render() {
        return <List style={{ padding: 0 }}>
            <ListItem button>
                <ListItemIcon>
                    <Icon children="rate_review" />
                </ListItemIcon>
                <ListItemText primary={ this.props.detail === '' ? 'Sin descripcion' : this.props.detail }/>
            </ListItem>

            <ListItem>
                <ListItemIcon>
                    <Icon children="access_time" />
                </ListItemIcon>
                <ListItemText primary={ getDate(this.props.date) }/>
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <Icon children="location_on" />
                </ListItemIcon>
                <ListItemText primary={ this.props.location }/>
            </ListItem>
        </List>
    }
}

let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDate(dateObject) {
    let start = new Date(dateObject.start),
        end = new Date(dateObject.end);

    return <span>{days[start.getDay()] + ' ' + start.getDate() + ' de ' + months[start.getMonth()] + ' del ' + start.getFullYear() }<br/>{ getTime(start) + ' - ' + getTime(end) }</span>
}

function getTime(date) {
    return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
}

export default ListDetail;