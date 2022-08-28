/********** [  LIBRARIES  ] ***************/
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/
//Components
import { futureHeader, spotHeader } from '../../../assets/variables';
/********** [ PROPERTIES ] ****************/
//Style
import { defaultStyles, palette } from '../../../assets/styles/theme';
const styles = {
    ...defaultStyles,
    table: {
        'tr td': {
            backgroundColor: palette.primary.light,
            color: palette.background.black
        },
        'tr th': {
            backgroundColor: palette.primary.main,            
        },
    }
};

/*********** [ COMPONENT ] ****************/
const FileLoadedLines = (props: any) => {
    const { lines, market } = props;
    const header = ((market === 'Future') && futureHeader)
        || ((market === 'Spot') && spotHeader)
        || ['None'];

    //Render
    return (
        <Table sx={styles.table}>
            <TableHead>
                <TableRow>
                    {header.map((el: any) => el.label).map((field: any, index: number) =>
                        <TableCell key={index}>{field}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {lines.map((line: any, index: number) =>
                    <TableRow key={index}>
                        {header.map((el: any) => el.index).map((fieldIndex: number, index: number) =>
                            <TableCell key={index}>{line[fieldIndex]}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default FileLoadedLines;