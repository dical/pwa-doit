import React, { Component } from 'react';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { get_cookie } from '../../helpers/cookie';

class ListFilters extends Component {
    filters = [
        {
            filter: 'soon',
            title: 'Próximos',
            icon: 'timer'
        },
        {
            filter: 'populate',
            title: 'Populares',
            icon: 'people'
        },
        {
            filter: 'near',
            title: 'Cercanos',
            icon: 'location_on'
        }
    ];

    componentWillMount() {
        if (get_cookie('userRut')) {
            this.filters.push({
                filter: 'me',
                title: 'Mis eventos',
                icon: 'person'
            })
        }
    }

    render() {
        return (
            <List>
                {
                    this.filters.map((filter, index) => (
                        <ListItem
                            button
                            key={ index }
                            onClick={ this.props.onClick.bind(null, filter.filter, filter.title) }
                            style={ filter.filter === 'me' ? { borderTop: '1px solid #eee' } : {} }
                        >
                            <ListItemIcon children={ <Icon children={ filter.icon }/> }/>
                            <ListItemText primary={ filter.title }/>
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}

export default ListFilters;
