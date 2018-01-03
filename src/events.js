import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ListEvents from './components/lists/events';
import ListFilters from './components/lists/filters';

import Navigation from './components/navigation';

class Events extends Component {
    state = {
        filtering: false,
        filter: 'soon',
        searching: false,
        search: '',
        title: 'Próximos'
    };

    handleChange = (event) => {
        this.setState({ search: event.target.value })
    };

    handleClick = (filter, title) => {
        this.setState({ filter: filter, filtering: false, title: title })
    };

    handleFilter = () => {
        this.setState({ filtering: !this.state.filtering })
    };

    handleSearch = () => {
        this.setState({ searching: !this.state.searching })
    };

    render() {
        return (
            <div style={{ padding: '64px 0' }}>
                <AppBar
                    position='fixed'
                    style={{ background: 'linear-gradient(45deg, #18252d 30%, #0a1014 90%)' }}
                >
                    <Toolbar style={ !this.state.searching ? {} : { display: 'none' } }>
                        <IconButton
                            children={ <Icon>filter_list</Icon> }
                            color='contrast'
                            onClick={ this.handleFilter }
                        />

                        <Typography
                            children={ this.state.title }
                            color='inherit'
                            style={{ marginLeft: 16 }}
                            type='title'
                        />

                        <IconButton
                            children={ <Icon>search</Icon> }
                            color='contrast'
                            onClick={ this.handleSearch }
                            style={{ marginLeft: 'auto' }}
                        />
                    </Toolbar>

                    <Toolbar style={ this.state.searching ? {} : { display: 'none' } }>
                        <IconButton
                            children={ <Icon>search</Icon> }
                            color='contrast'
                        />

                        <TextField
                            classes={{ root: 'search' }}
                            fullWidth
                            placeholder='Buscar...'
                            onChange={ this.handleChange }
                            style={{ marginLeft: 16 }}
                            type='text'
                        />

                        <IconButton
                            children={ <Icon>close</Icon> }
                            color='contrast'
                            onClick={ this.handleSearch }
                            style={{ marginLeft: 'auto' }}
                        />
                    </Toolbar>
                </AppBar>

                <ListEvents action src={ 'http://' + window.location.hostname + ':8081/events?search=' + this.state.search + '&filter=' + this.state.filter }/>

                <Dialog
                    classes={{ paper: 'dialog' }}
                    fullScreen
                    open={ this.state.filtering }
                >
                    <AppBar
                        position='fixed'
                        style={{ background: 'linear-gradient(45deg, #18252d 30%, #0a1014 90%)' }}
                    >
                        <Toolbar>
                            <IconButton
                                children={ <Icon>close</Icon> }
                                color='contrast'
                                onClick={ this.handleFilter }
                            />

                            <Typography
                                children='Seleccione un filtro'
                                color='inherit'
                                style={{ marginLeft: 16 }}
                                type='title'
                            />
                        </Toolbar>
                    </AppBar>

                    <ListFilters onClick={ this.handleClick }/>
                </Dialog>

                <Navigation value={ 'home' }/>
            </div>
        );
    }
}

export default Events;