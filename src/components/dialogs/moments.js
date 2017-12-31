import React, { Component } from 'react';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

class DialogMoments extends Component {
    render() {
        return <Dialog
            classes={{ paper: 'w-80' }}
            open={ this.props.open }
            onClose={ this.props.onRequestClose }
        >
            <DialogContent
                children={ <img src={ this.props.image }/> }
                style={{ padding: 0 }}
            />
        </Dialog>
    }
}

export default DialogMoments;