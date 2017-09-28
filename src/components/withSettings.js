import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class Settings extends Component {
    handleLogout = () => {
        document.cookie = "doitUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload()
    };

    render() {
        return (
            <List style={{marginTop: 56}} subheader={<ListSubheader>Settings</ListSubheader>}>
                <ListItem button onClick={this.props.action}>
                    <ListItemText
                        primary="Salir"
                        style={{paddingRight: 62}}
                        onClick={this.handleLogout}
                    />
                </ListItem>
            </List>
        );
    }
}

export default Settings;