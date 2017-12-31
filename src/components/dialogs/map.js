import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import { CircularProgress } from 'material-ui/Progress';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class DialogMap extends Component {
    render() {
        return <Dialog
            fullScreen
            open={ this.props.open }
        >
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        children={ <Icon>close</Icon> }
                        color="contrast"
                        onClick={ this.props.close }
                    />

                    <Typography
                        children='Ubicacion'
                        color='inherit'
                        type='title'
                    />
                </Toolbar>
            </AppBar>

            <CircularProgress size={ 50 } style={{ padding: '25vw', position: 'absolute', width: '50vw', zIndex: -1 }}/>

            <iframe
                id='map'
                frameBorder='0'
                width='auto'
                height='100%'
                src={ 'https://www.google.com/maps/embed/v1/place?q='+ encodeURI(this.props.place) +'&key=AIzaSyA1lqHGsB6HW6Ms2mKr6UOsTwqtHsF3EvA' }
                style={{ paddingTop: 56, display: 'none' }}
                onLoad={ function() { document.getElementById('map').style.display = '' }}
            >

            </iframe>
        </Dialog>
    }
}

export default DialogMap;