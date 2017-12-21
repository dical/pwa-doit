import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import DialogCategories from './components/dialogs/categories';
import ListEvents from './components/lists/events';
import Navigation from './components/navigation';

class Events extends Component {
    state = {
        categories: {
            open: false
        }
    };

    handleCategory = () => {
        this.setState({
            categories: {
                open: !this.state.categories.open
            }
        })
    };

    render() {
        return (
            <div id='events'>
                <AppBar position='fixed'>
                    <div className= 'header-radial-gradient'/>

                    <Toolbar>
                        <Typography
                            children='New early'
                            color='inherit'
                            type='title'
                        />

                        <IconButton
                            children={ <Icon>{ this.state.categories.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }</Icon> }
                            color="contrast"
                            onClick={ this.handleCategory }
                        />

                        <IconButton
                            children={ <Icon>search</Icon> }
                            color="contrast"
                            style={{ marginLeft: 'auto' }}
                        />
                    </Toolbar>
                </AppBar>

                <ListEvents/>

                <Navigation value={ 'home' }/>

                <DialogCategories open={ this.state.categories.open } onClose={ this.handleCategory }/>
            </div>
        );
    }
}

export default Events;