import React, { Component } from 'react';

import { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';

import createProfile from '../styles/createProfile';
import Activities from "./withActivities";
import Votes from "../components/withVotes";
import Comments from "../components/withComments";

class Profile extends Component {
    state = createProfile;

    render() {
        return (
            <div>
                <CardMedia image="/images/background-mountains.jpg" title="Contemplative Reptile" style={{...this.state.cardMedia.style}}>
                    <Typography type="display1" style={{...this.state.typographyUserName.style}}>
                        Nombre Apellido
                    </Typography>
                    <Typography type="subheading" style={{...this.state.typographyUserNickName.style}}>
                        @{document.cookie.split("doitUser=")}
                    </Typography>
                </CardMedia>

                <Button fab color="accent" aria-label="add" style={{...this.state.buttonFabRank.style}}>
                    <Badge badgeContent={3.2} color="primary">
                        <Icon>star</Icon>
                    </Badge>
                </Button>

                <Typography type="subheading" style={{...this.state.typographyUserPhrase.style}}>
                    <Icon>format_quote</Icon> aventurera y amante de los animales. vive cada momento como si fuera el ultimo
                </Typography>

                <Tabs value={this.state.tabs.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" fullWidth>
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>directions_run</Icon>0%</span>} />
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>thumb_up</Icon> 16</span>} />
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>message</Icon> 64</span>} />
                </Tabs>

                {this.state.tabs.value === 0 && <Activities/>}
                {this.state.tabs.value === 1 && <Votes/>}
                {this.state.tabs.value === 2 && <Comments/>}
            </div>
        );
    }
}

export default Profile;