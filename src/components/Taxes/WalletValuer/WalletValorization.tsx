/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import WalletValorRows from './WalletValorRows';
import WalletValorSummed from './WalletValorSummed';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/
const WalletStates = (props: any) => {
    const { valuedStateRows } = props;

    //Render
    return (
        <Box>
            {valuedStateRows.map((state: any, index: number) =>
            (<Box mb={2} key={index}>
                <h4>Calcul de la valeur globale du portefeuille de la cession {index+1} du {state.date} :</h4>
                <WalletValorRows rows={state.assets} num={index+1}/>
            </Box>)
            )}
        </Box>
    );
};

const WalletValorization = (props: any) => {
    const { valuedStates, onlySummed } = props;
    const years = [2017, 2018, 2019, 2020, 2021, 2022];
    //Render
    return (
        <Box>
            {years.map((year: number, index: number) =>
            (<Box mb={2} key={index}>
                <h1>Année : {year}</h1>
                {onlySummed !== undefined && <WalletValorSummed valuedStateRows={valuedStates.filter((el: any) => el.year === year.toString())} />}
                {onlySummed === undefined && <WalletStates valuedStateRows={valuedStates.filter((el: any) => el.year === year.toString())} />}
            </Box>)
            )}
        </Box>
    );
};

export default WalletValorization;