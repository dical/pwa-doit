import React, { Component } from 'react';

import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';

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