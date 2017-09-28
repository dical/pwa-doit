import React, { Component } from 'react';

/* Material-UI */
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

/* DoItExp */
import Profile from "../components/withProfile";
import Settings from "../components/withSettings";
import Login from "../components/withLogin";
import Registry from "../components/withRegistry";
import createUser from '../styles/createUser';
import withRoot from '../components/withRoot';

class User extends Component {
    state = createUser;

    componentWillMount() {
        if (document.cookie.indexOf('doitUser') === -1 ) {
            let states = this.state;

            states.tabs.value = 2;
            states.buttonSettings.style.display = 'none';
            states.buttonBack.style.color = '#fff';

            document.body.style.backgroundColor = '#2196F3';

            this.setState(states);
        }
    }

    showTabProfile = () => {
        let states = this.state;

        switch (states.tabs.value) {
            case 0:
                window.location.href= "/";
                break;
            case 1:
                states.tabs.value = 0;
                states.buttonSettings.style.display = '';
                states.appBar.elevation = 0;
                states.appBar.style.backgroundColor = 'transparent';

                document.body.style.backgroundColor = '';

                this.setState(states);
                break;
            case 2:
                window.location.href= "/";
                break;
            default:
                this.showTabLogin();
                break;
        }
    };

    showTabLogin = () => {
        let states = this.state;

        states.tabs.value = 2;
        states.buttonSettings.style.display = 'none';
        states.typographyTitle.style.display = 'none';
        document.body.style.backgroundColor = '#2196F3';

        this.setState(states);
    };

    showTabRegistry = () => {
        let states = this.state;

        states.tabs.value = 3;
        states.typographyTitle.style.display = '';
        document.body.style.backgroundColor = '#2196F3';

        this.setState(states);
    };

    showTabSettings = () => {
        let states = this.state;

        states.tabs.value = 1;
        states.typographyTitle.style.display = 'none';
        states.appBar.elevation = 3;
        states.appBar.style.backgroundColor = '#2196F3';
        document.body.style.backgroundColor = '';

        this.setState(states);
    };

    registryConfirm = () => {
        this.registry.handleRequest()
    };

    render () {
        return (
            <div style={{...this.state.divContent.style}}>
                <AppBar elevation={this.state.appBar.elevation} position="fixed" style={{...this.state.appBar.style}}>
                    <Toolbar>
                        <IconButton color={"contrast"} onClick={this.showTabProfile} style={{...this.state.buttonBack.style}}>
                            <Icon>arrow_back</Icon>
                        </IconButton>

                        <Typography type="title" style={{...this.state.typographyTitle.style}}>{this.state.typographyTitle.text}</Typography>

                        <IconButton color={"contrast"} onClick={this.showTabSettings} style={{...this.state.buttonSettings.style}}>
                            <Icon>settings</Icon>
                        </IconButton>

                        <IconButton id="registry-confirm-button" color={"contrast"} onClick={this.registryConfirm} style={{...this.state.buttonCheck.style}}>
                            <Icon>check</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {this.state.tabs.value === 0 && <Profile/>}
                {this.state.tabs.value === 1 && <Settings/>}
                {this.state.tabs.value === 2 && <Login onClickRegistry={this.showTabRegistry}/>}
                {this.state.tabs.value === 3 && <Registry onRef={ref => (this.registry = ref)} />}
            </div>
        );
    }
}

export default withRoot(User);
