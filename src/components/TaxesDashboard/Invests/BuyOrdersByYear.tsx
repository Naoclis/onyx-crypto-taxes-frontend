/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import BuyOrders from './BuyOrders';
import BuyOrdersSummed from './BuyOrdersSummed';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const BuyOrdersStates = (props: any) => {
    const { yearOrders } = props;
    //Render
    return (
        <Box>
            {yearOrders.map((state: any, index: number) =>
            (<Box mb={2} key={index}>
                <h4>Acquisition cumulée en EUR entre cession {index + 1} du {state.date} et la cession précédente du {index > 0 && yearOrders[index-1].date} :</h4>
                {<BuyOrders orders={state.orders} />}
            </Box>)
            )}
        </Box>
    );
};

const BuyOrdersByYear = (props: any) => {
    const { onlySummed, orders } = props;
    const years = [2017, 2018, 2019, 2020, 2021, 2022];
    //Render
    return (
        <Box>
            {years.map((year: number, index: number) =>
            (<Box mb={2} key={index}>
                <h1>Année : {year}</h1>
                {onlySummed !== undefined && <BuyOrdersSummed yearOrders={orders.filter((el: any) => el.year === year.toString())} />}
                {onlySummed === undefined && <BuyOrdersStates yearOrders={orders.filter((el: any) => el.year === year.toString())} />}
            </Box>)
            )}
        </Box>
    );
};

export default BuyOrdersByYear;