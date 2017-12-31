import React, { Component } from 'react';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

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
        },
    ];

    render() {
        return (
            <List>
                {
                    this.filters.map((filter, index) => (
                        <ListItem
                            button
                            key={ index }
                            onClick={ this.props.onClick.bind(null, filter.filter, filter.title) }
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
