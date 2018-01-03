import React from 'react';

import Snackbar from 'material-ui/Snackbar';

class Snack extends React.Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={ this.props.open }
                message={ <span style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{ this.props.message }</span> }
                onClose={ this.props.close }
            />
        );
    }
}

export default Snack;