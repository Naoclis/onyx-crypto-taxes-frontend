/********** [  LIBRARIES  ] ***************/
import React, { memo, useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

/********* [ MY LIBRARIES ] ***************/

/********** [ PROPERTIES ] ****************/
//Style
const styles = {
    root: {
        border: 0,
        padding: '5px 5px',
        fontSize: '1em',
        margin: '2px',
        width: '300px',
    },
    items: {
        '&& .MuiMenuItem-root': {
            color: 'black'
        },
    },
};
/*********** [ COMPONENT ] ****************/
const MyComboBox = (props: any) => {
    const { items, label, id, onChange } = props;
    //States
    const [element, setElement] = useState(props.init || '');

    //Functions
    const handleChange = (event: any) => {
        const value = event.target.value as string;
        setElement(value);
        onChange(value);
    };

    //Render
    return (
        <FormControl>
            <InputLabel id={`select-${id}`} sx={{color:'white'}}>{label}</InputLabel>
            <Select
                labelId={`select-${id}`}
                value={element}
                onChange={handleChange}
                MenuProps={{
                    sx: { ...styles.items }
                }}
                sx={styles.root}
            >
                <MenuItem value='-1' sx={{ color: 'black' }}>------</MenuItem>
                {items.length > 0 && items.map((item: any, index: number) =>
                    <MenuItem key={index} value={item._id} sx={{color:'black'}}>{item.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default memo(MyComboBox);