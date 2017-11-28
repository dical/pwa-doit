import React from 'react';

import Button from 'material-ui/Button';
import { GridList, GridListTile } from 'material-ui/GridList';

const tileData = [
    {
        img: '/images/event.jpg',
        title: 'Image',
        author: 'author'
    },
    {
        img: '/images/activity.jpg',
        title: 'Image',
        author: 'author'
    }
];

class ListMoments extends React.Component {
    render() {
        return <GridList
            cellHeight={ 160 }
            style={{
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                position: 'absolute',
                width: '-webkit-fill-available',
                height: 'calc(100% - 250px - 90px - 48px)',
                overflowY: 'scroll',
                zIndex: -1
            }}
            cols={ 3 }
        >
            <GridListTile
                key={ 0 }
                cols={ 1 }
            >
                <Button
                    children="Agregar momento"
                    style={{
                        width: '-webkit-fill-available',
                        height:'-webkit-fill-available'
                    }}
                />
            </GridListTile>

            {
                tileData.map((tile, index) => (

                    <GridListTile
                        key={ index }
                        cols={ 1 }
                    >
                        <img
                            src={ tile.img }
                            alt={ tile.title + ' por ' + tile.author }
                        />
                    </GridListTile>
                ))
            }
        </GridList>;
    }
}

export default ListMoments;