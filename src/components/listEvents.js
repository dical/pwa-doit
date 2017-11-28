import React, { Component } from 'react';

class ListEvents extends Component {

    render() {
        return (
            <Dialog
                open={ this.props.open }
                onRequestClose={ this.props.onClose }
                classes={{ paper: 'w-80' }}
            >
                <DialogTitle>{ "Compartir" }</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        fullWidth
                        id="href"
                        multiline
                        rowsMax="4"
                        value={ window.location.href }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        color="primary"
                        onClick={ this.props.onClose }
                    >
                        Cancel
                    </Button>
                </DialogActions>

                <Snack
                    open={ this.state.snack.open }
                    message="Copiado al portapapeles"
                />
            </Dialog>
        );
    }
}

export default ListEvents;