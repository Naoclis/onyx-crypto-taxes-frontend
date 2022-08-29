/********** [  LIBRARIES  ] ***************/
import React, { memo } from 'react';
import { Box, CircularProgress } from '@mui/material';
/********* [ MY LIBRARIES ] ***************/

/********** [ PROPERTIES ] ****************/
interface CustomInputProps {
    message: string,
}

/*********** [ COMPONENT ] ****************/
const Loader = (props: CustomInputProps) => {

    return (
        <Box display="flex" flexDirection="row">
            <Box display="flex" alignItems="center">
                <CircularProgress color="secondary" />
                <Box ml={2}>{props.message}</Box>
            </Box>
        </Box>
    );
}

export default memo(Loader);