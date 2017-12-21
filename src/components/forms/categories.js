import React, { Component } from 'react';

import Button from 'material-ui/Button';

class FormCategories extends Component {
    render() {
        return <form style={{ display: 'flex' }}>
            <Button
                selected
                raised
                style={{
                    width: '50%',
                    marginRight: 8
                }}
            >
                Recientes
            </Button>

            <Button
                raised
                style={{
                    width: '50%',
                    marginLeft: 8
                }}
            >
                Con mas participantes
            </Button>
        </form>
    }
}

export default FormCategories;