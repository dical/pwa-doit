import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { CardMedia } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

class Activity extends Component {
    state = {
        tabs: {
            value: 0
        }
    };

    render() {
        return (
            <div>
                <CardMedia
                    image="/images/surf.jpg"
                    title="Contemplative Reptile"
                    style={{
                        padding: '0 20px',
                        boxShadow: 'inset 0px 300px 180px -300px #000, inset 0px -300px 180px -300px #000',
                        backgroundPosition: 'center'
                    }}
                >
                    <Typography
                        style={{color: "#fff", padding: '144px 16px 0 6px'}}
                        type="display1"
                    >
                        Clase de Surf
                    </Typography>

                    <Typography
                        style={{color: "#eee", padding: '0 16px 32px 6px'}}
                        type="subheading"
                    >
                        @escuelasurf
                    </Typography>
                </CardMedia>

                <Button fab color="accent" aria-label="add" style={{margin:'-16px 26px 0 0', float: 'right'}}>
                    <Icon>payment</Icon>
                </Button>

                <Typography
                    style={{padding: '16px 96px 26px 26px', backgroundColor: '#212121', lineHeight: 1.2, color:'#fff'}}
                    type="body1"
                >
                    Disfruta de una clase asistida por un instructor en nuestra escuela, dos horas para conectarte con el mar en nuestra escuela ubicada en la avenida del mar
                </Typography>

                <Tabs
                    value={this.state.tabs.value}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    onChange={alert}
                >
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>info</Icon></span>} />
                    <Tab icon={<span><Icon style={{verticalAlign:'middle'}}>message</Icon> 64</span>} />
                </Tabs>

                {
                    this.state.tabs.value === 0 &&
                    <div>
                        <Typography type="body1" style={{display: 'flex', padding:26}}>
                            <Icon>access_time</Icon> <span style={{margin: 0, paddingLeft: 26, display: 'inline-block'}}>Viernes, Junio 26 <br/> 12:00 - 1:00 PM</span>
                        </Typography>

                        <Typography type="body1" style={{display: 'flex', padding:26}}>
                            <Icon>location_on</Icon> <span style={{margin: 0, paddingLeft: 26, display: 'inline-block'}}>Escuela de Surf <br/> Avenida del Mar #324, La Serena, Chile</span>
                        </Typography>
                    </div>
                }
            </div>
        );
    }
}

export default Activity;