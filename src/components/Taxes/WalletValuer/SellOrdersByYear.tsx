/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import SellOrders from './SellOrders';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/

const SellOrdersByYear = (props: any) => {
    const { orders } = props;
    const years = [2017, 2018, 2019, 2020, 2021, 2022];

    //Render
    return (
        <Box>
            {years.map((year: number, index: number) =>
                (<Box mb={2} key={index}>
                    <h1>Année : {year}</h1>
                    <SellOrders orders={orders.filter((el: any) => el.year === year.toString())} />
                </Box>)
            )}
        </Box>
    );
};

export default SellOrdersByYear;