import React, { Component } from 'react';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class ListCategories extends Component {

    render() {
        return (
            <List style={{ padding: '64px 0' }}>
                <ListItem button>
                    <ListItemIcon>
                        <Icon children="timer" />
                    </ListItemIcon>

                    <ListItemText
                        primary={ 'New early' }
                    />
                </ListItem>
            </List>
        );
    }
}

export default ListCategories;