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
            <Box>
                <CircularProgress color="secondary" />
                {props.message}
            </Box>
        </Box>
    );
}

export default memo(Loader);