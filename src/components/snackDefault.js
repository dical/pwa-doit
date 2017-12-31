import React from 'react';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

class Snack extends React.Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={ this.props.open }
                autoHideDuration={ 2000 }
                message={ <span style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{ this.props.message }</span> }
                onClose={ this.props.close }
                action={
                    typeof this.props.close !== "undefined" &&
                    [<Button
                        key="undo"
                        color="accent"
                        dense
                        onClick={ this.props.close }
                    >
                        Ocultar
                    </Button>]
                }

            />
        );
    }
}

export default Snack;