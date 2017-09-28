import React, { Component } from 'react';

import Button from 'material-ui/Button';

class Tags extends Component {
    render() {
        return (
            <div style={{ marginTop: 112 }}>
                <Button
                    raised
                    color={"accent"}
                    style={{
                        margin: 8,
                        minHeight: 96,
                        width: 'calc(50% - 16px)',
                        backgroundImage: 'url(https://lh3.googleusercontent.com/yLXgqRnnPM-w9XwsbRIuEwcM0TXEmwOZulGh9HgGmKo8_hSBgE3CLBYmcDnD0Nobcv63uU8v5SxyehmDaqjb)',
                        backgroundPosition: 'center'
                    }}>
                >
                    Recientes
                </Button>

                <Button
                    raised
                    color={"accent"}
                    style={{
                        margin: 8,
                        minHeight: 96,
                        width: 'calc(50% - 16px)',
                        backgroundImage: 'url(https://vmcdn.ca/f/files/guelphtoday/images/stock-images/concert.jpg;w=630)',
                        backgroundPosition: 'center'
                    }}
                >
                    Populares
                </Button>

                <Button
                    raised
                    color={"accent"}
                    style={{
                        margin: 8,
                        minHeight: 96,
                        width: 'calc(50% - 16px)',
                        backgroundImage: 'url(http://www.redwoodcity.org/Home/ShowImage?id=4287&amp;t=635781283776400000)',
                        backgroundPosition: 'center'
                    }}
                >
                    Cercanos
                </Button>

                <Button
                    raised
                    color={"accent"}
                    style={{
                        margin: 8,
                        minHeight: 96,
                        width: 'calc(50% - 16px)',
                        backgroundImage: 'url(http://wwwstage8.miamidade.gov/resources/images/news/2017-02-21-spring-camps.jpg)',
                        backgroundPosition: 'center'
                    }}
                >
                    Deportivos
                </Button>
            </div>
        );
    }
}

export default Tags;