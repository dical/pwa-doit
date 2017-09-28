import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class Activities extends Component {
    render() {
        return (
            <List style={{marginTop: 56}}>
                <ListItem button onClick={this.props.onClickItem}>
                    <Avatar
                        src={"images/surf.jpg"}
                        style={{borderRadius: 0}}
                    />
                    <ListItemText
                        primary="Clases de Surf"
                        secondary="Disfruta de una clase asistida por un instructor en nuestra escuela, dos horas ..."
                        style={{paddingRight: 62}}
                    />
                    <ListItemSecondaryAction>
                        <Typography type="caption" gutterBottom align="center" style={{marginRight: 16}}>
                            16 min
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <Button fab color="accent" aria-label="add" onClick={this.props.onClickFab} style={{position: 'fixed', right: 16, bottom: 92}}>
                    <Icon>add</Icon>
                </Button>
            </List>
        );
    }
}

export default Activities;