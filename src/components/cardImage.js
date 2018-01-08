import React, { Component } from 'react';

import { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class CardImage extends Component {
    render() {
        return (
            <CardMedia
                className='profile'
                image={ typeof this.props.image === "string" && this.props.image.trim() !== '' ? this.props.image : '/images/landscape.jpg' }
                title="Title"
            >
                <div
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'
                    }}
                >
                    <Typography
                        type="display1"
                        style={{
                            color: '#fafafa',
                            padding: 'calc(25vh) 16px 0',
                            textShadow: '-1px 1px 0px rgba(0,0,0,0.12), 1px 1px 1px rgba(0,0,0,0.24)',
                            textTransform: this.props.titleTextTransform === undefined ? '' : this.props.titleTextTransform
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
                </div>
            </CardMedia>
        );
    }
}

export default CardImage;