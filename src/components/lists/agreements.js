import React, { Component } from 'react';

import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class ListAgreements extends Component {
    agreements = [
        {
            title: 'Basico',
            details: 'Pensado para juntas de vecinos, micro empresas o entusiastas del senderismo',
            icon: 'star_border',
            price: 7500
        },
        {
            title: 'Medio',
            details: 'Indicado para empresas pequeñas y medianas que tienen cupos y desean mantener sus instalaciones llenas',
            icon: 'star_half',
            price: 25000
        },
        {
            title: 'Pro',
            details: 'Ideal para empresas que esten interesadas en tomar decicones inteligentes en funcion de los usuarios',
            icon: 'star',
            price: 70000
        },
    ];

    render() {
        return (
            <List>
                {
                    this.agreements.map((agreement, index) => (
                        <ListItem
                            button
                            key={ index }
                            onClick={ this.props.onClick.bind(null, agreement.title, agreement.title) }
                        >
                            <ListItemIcon children={ <Icon children={ agreement.icon }/> }/>

                            <ListItemText
                                classes={{ text: 'pre-wrap' }}
                                primary={ agreement.title }
                                secondary={ agreement.details }
                            />

                            <Typography
                                children={ '$' + agreement.price }
                            />
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}

export default ListAgreements;
