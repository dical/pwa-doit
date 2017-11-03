import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Categories from './formCategories'

class Activities extends Component {
    state = {
        data: [],
        dialogs: {
            tags: false,
            filters: false
        },
        request: {
            q: '',
            sort: 'recent',
            tags: []
        }
    };

    componentDidMount() {
        document.getElementById('title').innerText = 'Recientes';
        document.getElementById('header').classList.remove('transparent');
        document.getElementById('shell').style.padding = '64px 0';

        ['title', 'search', 'filter', 'down', 'bottom-navigation'].forEach(function(id) {
            document.getElementById(id).style.display = ''
        });

        ['back', 'settings', 'shared', 'edit'].forEach(function(id) {
            document.getElementById(id).style.display = 'none'
        });

        if (getCookie('userRut') === '') {
            document.getElementById('add').style.display = 'none';
        }

        this.handleRequest()
    };

    handleRequest = () => {
        let request = new XMLHttpRequest(),
            onUpdate = this.handleUpdateData,
            query = this.state.request.q !== '' ? 'q=' + this.state.request.q + '&' : '';

        query = this.state.request.sort !== '' ? query + 'sort=' + this.state.request.sort + '&' : query + '';
        query = this.state.request.tags.length > 0 ? query + 'tags=' + this.state.request.tags.join(',') : query + '';
        query = query !== '' ? '?' + query : query;

        request.open('GET', 'http://' + window.location.hostname + ':8081/events' + query, true);

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        onUpdate(JSON.parse(request.response));
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleSearch = (event) => {
        this.setState({
            request: {
                q: event.target.value,
                sort: this.state.request.sort,
                tags: this.state.request.tags
            }
        }, this.handleRequest )
    };

    handleUpdateData = (data) => {
        this.setState({ data: data });
    };

    handleDialogTags = () => {
        document.getElementById('filter').style.display = document.getElementById('filter').style.display === 'none' ? '' : 'none';
        document.getElementById('search').style.display = document.getElementById('search').style.display === 'none' ? '' : 'none';

        this.setState({
            dialogs: {
                tags: !this.state.dialogs.tags,
                filters: this.state.dialogs.filters
            }
        })
    };

    handleDialogFilters = () => {
        document.getElementById('down').style.display = document.getElementById('down').style.display === 'none' ? '' : 'none';
        document.getElementById('search').style.display = document.getElementById('search').style.display === 'none' ? '' : 'none';

        this.setState({
            dialogs: {
                tags: this.state.dialogs.tags,
                filters: !this.state.dialogs.filters
            }
        })
    };

    render() {
        return (
            <div>
                <div
                    id="div-search"
                    style={{
                        padding: 16,
                        display: 'none'
                    }}
                >
                    <TextField
                        id="search-name"
                        autoComplete="off"
                        fullWidth
                        label="Buscar..."
                        onChange={ this.handleSearch }
                        type="text"
                    />
                </div>

                <List>
                    {this.state.data.map((event, i) => (
                        <Link key={this.state.data.length - i} to={'/activity/' + event._id} style={{textDecoration:'none'}}>
                            <ListItem button>
                                <Avatar src={event.image} style={{height: 64, width: 64, border: '2px solid black'}} classes={ { img: 'avatar-250' }  }/>
                                <ListItemText classes={{text:'overflow-text'}} primary={event.name} secondary={event.details}/>
                                <Typography type="caption" style={{position: 'absolute', right: 16, top: 16}}>
                                    {time(event.start)}
                                </Typography>
                            </ListItem>
                        </Link>
                    ))}

                    <Link id="add" to='/add' style={{textDecoration:'none'}}>
                        <Button fab color="accent" style={{position: 'fixed', right: 16, bottom: 72}}>
                            <Icon>add</Icon>
                        </Button>
                    </Link>
                </List>

                <Button
                    id="toggle-tags"
                    onClick={ this.handleDialogTags }
                    style={{ display: 'none' }}
                >
                    TOGGLE_TAGS
                </Button>

                <Button id="open-filters" onClick={ this.handleDialogFilters } style={{ display: 'none' }}> </Button>

                <Dialog
                    id="dialog-tags"
                    fullScreen
                    open={ this.state.dialogs.tags }
                    transition={ <Slide direction="up" /> }
                >
                    <div
                        style={{ padding: '32px 16px' }}
                    >
                        <Categories request={ this.state.request } onChange={ this.handleRequest }/>
                    </div>
                </Dialog>

                <Dialog
                    id="dialog-filters"
                    fullScreen
                    open={ this.state.dialogs.filters }
                    transition={<Slide direction="up" />}
                    style={{ top: 64 }}
                >
                    <div
                        style={{ padding: '32px 16px' }}
                    >
                        Filtros Generales
                    </div>
                </Dialog>
            </div>
        );
    }
}

function time(etime) {
    let start = new Date(etime),
        today = new Date(Date.now()),
        diff = (start.getTime() - today.getTime()) / 1000,
        end = ' seg';

    if (diff > 60 || diff < -60) {
        end = ' min';
        diff /= 60;
    }

    if (diff > 60 || diff < -60) {
        end = ' hr';
        diff /= 60
    }

    if (diff > 24 || diff < -24) {
        end = ' dia(s)';
        diff /= 24
    }

    if (diff > 365 || diff < -365) {
        end = ' año(s)';
        diff /= 365
    }

    if (diff > 0) {
        return 'Queda(n) '+diff.toFixed(0) + end
    } else {
        return 'Hace ' + (diff * -1).toFixed(0) + end
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default Activities;
