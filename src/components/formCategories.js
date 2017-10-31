import React, { Component } from 'react';

import Button from 'material-ui/Button';

class Categories extends Component {
    render() {
        return <form>
            <Button>Recientes</Button>
            <Button>Con mas participantes</Button>
        </form>
    }
}

export default Categories;