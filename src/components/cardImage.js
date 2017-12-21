import React, { Component } from 'react';

import { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class CardImage extends Component {
    render() {
        return (
            <CardMedia
                className='profile'
                image={ this.props.image === undefined ? '/images/landscape.jpg' : this.props.image }
                title="Title"
            >
                <Typography
                    type="display1"
                    style={{
                        color: '#fafafa',
                        padding: 'calc(25vh) 16px 0',
                        textShadow: '-1px 1px 0px rgba(0,0,0,0.12), 1px 1px 1px rgba(0,0,0,0.24)'
                    }}
                >
                    { this.props.title }
                </Typography>

                <Typography
                    type="subheading"
                    style={{
                        color: '#fafafa',
                        padding: '0 16px 26px',
                        textShadow: '-1px 1px 0px rgba(0,0,0,0.12), 1px 1px 1px rgba(0,0,0,0.24)'
                    }}
                >
                    { this.props.subtitle }
                </Typography>
            </CardMedia>
        );
    }
}

export default CardImage;