import React, { Component } from 'react';

/* Material-UI */
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

/* DoItExp */
import Activities from '../components/withActivities';
import Activity from '../components/withDetailActivity';
import Filters from '../components/withFilters';
import AddActivity from '../components/withAddActivity';
import Tags from '../components/withTags';
import createHome from '../styles/createHome';
import withRoot from '../components/withRoot';

/**/
class Home extends Component {
    state = createHome;

    showTabActivities = () => {
        let states = this.state;

        states.appBar.elevation = 3;
        states.appBar.style.backgroundColor = '';

        [states.buttonBack, states.buttonInvite, states.buttonShare, states.buttonCheck, states.typographyTitle].forEach(function(e) { e.style.display = 'none' });
        [states.bottomNavigation, states.buttonTags, states.buttonLook, states.buttonFilter].forEach(function(e) { e.style.display = '' });

        states.tabs.value = 0;

        this.setState(states);
    };

    showTabActivity = () => {
        let states = this.state;

        states.appBar.elevation = 0;
        states.appBar.style.backgroundColor = 'transparent';

        [states.buttonBack, states.buttonInvite, states.buttonShare].forEach(function(e) { e.style.display = '' });
        [states.bottomNavigation, states.buttonTags, states.buttonLook, states.buttonFilter].forEach(function(e) { e.style.display = 'none' });

        states.tabs.value = 1;

        this.setState(states);
    };

    showTabAddActivity = () => {
        let states = this.state;

        states.typographyTitle.text = 'Agregar Actividad';

        [states.buttonBack, states.buttonCheck, states.typographyTitle].forEach(function(e) { e.style.display = '' });
        [states.bottomNavigation, states.buttonTags, states.buttonLook, states.buttonFilter].forEach(function(e) { e.style.display = 'none' });

        states.tabs.value = 4;

        this.setState(states);
    };

    showTabFilters = () => {
        let states = this.state;

        states.typographyTitle.text = 'Filtros';

        [states.buttonBack, states.buttonCheck, states.typographyTitle].forEach(function(e) { e.style.display = '' });
        [states.bottomNavigation, states.buttonTags, states.buttonLook, states.buttonFilter].forEach(function(e) { e.style.display = 'none' });

        states.tabs.value = 2;

        this.setState(states);
    };

    toggleShowTabTags = () => {
        let states = this.state;

        if (states.tabs.value === 3) {
            [states.bottomNavigation, states.buttonLook, states.buttonFilter].forEach(function(e) { e.style.display = '' });
            states.buttonTags.iconName = 'keyboard_arrow_down';
            states.tabs.value = 0
        } else {
            [states.bottomNavigation, states.buttonLook, states.buttonFilter].forEach(function(e) { e.style.display = 'none' });
            states.buttonTags.iconName = 'keyboard_arrow_up';
            states.tabs.value = 3
        }

        this.setState(states);
    };

    addActivityConfirm = () => {
        this.addactivity.handleRequest()
    };

    render () {
        return (
            <div>
                <AppBar color="primary" position="fixed" elevation={this.state.appBar.elevation} style={{...this.state.appBar.style}}>
                    <Toolbar>
                        <IconButton color="contrast" onClick={this.showTabActivities} style={{...this.state.buttonBack.style}}>
                            <Icon>arrow_back</Icon>
                        </IconButton>

                        <Button color="contrast" onClick={this.toggleShowTabTags} style={{...this.state.buttonTags.style}}>
                            Recientes &nbsp; <Icon>{this.state.buttonTags.iconName}</Icon>
                        </Button>

                        <Typography type="title" style={{...this.state.typographyTitle.style}}>
                            {this.state.typographyTitle.text}
                        </Typography>

                        <IconButton color="contrast" style={{...this.state.buttonShare.style}}>
                            <Icon>share</Icon>
                        </IconButton>

                        <IconButton color="contrast" style={{...this.state.buttonInvite.style}}>
                            <Icon>person_add</Icon>
                        </IconButton>

                        <IconButton color="contrast" style={{...this.state.buttonLook.style}}>
                            <Icon>search</Icon>
                        </IconButton>

                        <IconButton color="contrast" onClick={this.showTabFilters} style={{...this.state.buttonFilter.style}}>
                            <Icon>filter_list</Icon>
                        </IconButton>

                        <IconButton color="contrast" onClick={this.addActivityConfirm} style={{...this.state.buttonCheck.style}}>
                            <Icon>check</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {this.state.tabs.value === 0 && <Activities onClickItem={this.showTabActivity} onClickFab={this.showTabAddActivity}/>}
                {this.state.tabs.value === 1 && <Activity/>}
                {this.state.tabs.value === 2 && <Filters/>}
                {this.state.tabs.value === 3 && <Tags/>}
                {this.state.tabs.value === 4 && <AddActivity onRef={ref => (this.addactivity = ref)} />}

                <BottomNavigation color={"primary"} onChange={null} value={this.state.bottomNavigation.value} style={{...this.state.bottomNavigation.style}}>
                    <BottomNavigationButton icon={<Icon>forum</Icon>} />
                    <BottomNavigationButton icon={<Icon>home</Icon>} />
                    <BottomNavigationButton onClick={function() { window.location.href = "/user" }} icon={<Icon>person</Icon>} />
                </BottomNavigation>
            </div>
        );
    };
}

export default withRoot(Home);
