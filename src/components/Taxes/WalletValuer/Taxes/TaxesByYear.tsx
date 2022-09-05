/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesRow from './TaxesRow';
import LDYWallet from './LDYWallet';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/

const TaxesByYear = (props: any) => {
    const { taxes, ldyStates } = props;
    const years = [2017, 2018, 2019, 2020, 2021, 2022];

    //Render
    return (
        <Box>
            {years.map((year: number, index: number) =>
            (<Box mb={2} key={index}>
                <h1>Année : {year}</h1>
                <Box mb={2}>
                    <LDYWallet state={ldyStates.filter((el: any) => el.year === (year-1).toString())} />
                </Box>
                <Box mb={2}>
                    <TaxesRow taxes={taxes.filter((el: any) => el.year === year.toString())} />
                </Box>
            </Box>)
            )}
        </Box>
    );
};

export default TaxesByYear;