import React, { Component } from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';

class Settings extends Component {
    handleLogout = () => {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userRut=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.getElementById('login').click()
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Ajustes';

        document.getElementById('header').classList.remove('transparent');
        document.getElementById('shell').style.padding = '64px 0';

        ['back', 'title'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['settings', 'shared', 'edit', 'filter', 'down', 'search'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });
    }

    render() {
        return (
            <List>
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