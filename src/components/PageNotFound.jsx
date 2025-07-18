import { Grid } from '@mui/material'
import React from 'react'
import notFound from '../assets/images/404.png'

const PageNotFound = () => {
    return (
        <Grid
            container
        >
            <Grid
                item
                xs={12}
            >
                <img
                    // src={merc}
                    width={150}
                    height={150}
                    style={{
                        position: 'fixed',
                        // left: 10,
                        right: 10
                    }}
                />
                <img
                    src={notFound}
                    width={'100%'}
                    height={window.innerHeight - 10}
                />
            </Grid>
        </Grid>
    )
}

export default React.memo(PageNotFound)