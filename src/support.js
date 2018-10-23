import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Support extends Component {
    render() {
        return (
            <div className='padding-top-64' style={{ paddingLeft: 16, paddingRight: 16 }}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Link to={ '/settings' }>
                            <IconButton
                                children={ <Icon>arrow_back</Icon> }
                                color='contrast'
                            />
                        </Link>

                        <Typography
                            children='Soporte'
                            color='inherit'
                            style={{ marginLeft: 16 }}
                            type='title'
                        />
                    </Toolbar>
                </AppBar>

                <br/>

                <Typography
                    children='En caso de requerir de asistencia técnica para utilizar este servicio, o reportar algun
                    problema encontrado durante su experiencia con esta aplicacion, por favor, contactenos por los siguientes medios:'
                    type='subheading'
                />

                <br/>

                <Typography
                    children='soporte@doitexp.com'
                    type='button'
                />

                <Typography
                    children='Correo Electronico'
                    type='caption'
                />

                <br/>

                <Typography
                    children='+56 9 646 445 88'
                    type='button'
                />

                <Typography
                    children='Numero Telefonico'
                    type='caption'
                />
            </div>
        );
    }
}

export default Support;
