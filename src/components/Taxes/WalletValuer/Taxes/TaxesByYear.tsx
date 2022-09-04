/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Box } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import TaxesRow from './TaxesRow';
//Api

/********** [ PROPERTIES ] ****************/
//Style

/*********** [ COMPONENT ] ****************/

const TaxesByYear = (props: any) => {
    const { taxes } = props;
    const years = [2017, 2018, 2019, 2020, 2021, 2022];

    const getFractionsStartIndex = (year: number) => {
        const fractionIndexes = [];
        for (const year of years) {
            const hasRows = taxes.filter((el: any) => el.year === year.toString());
            const nbRows = (hasRows.length > 0) ? hasRows[0].taxes.length : 0;
            fractionIndexes.push({ year: year, startIndex: nbRows });
        }
        const index = fractionIndexes.filter((el: any) => el.year === year)[0].startIndex;
        console.log(fractionIndexes);
        return index;
    }


    //Render
    return (
        <Box>
            {years.map((year: number, index: number) =>
            (<Box mb={2} key={index}>
                <h1>Année : {year}</h1>
                <TaxesRow taxes={taxes.filter((el: any) => el.year === year.toString())} fractionsIndex={getFractionsStartIndex(year)}/>
            </Box>)
            )}
        </Box>
    );
};

export default TaxesByYear;