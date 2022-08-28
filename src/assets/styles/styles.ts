/*********************************/
/*********     STYLE    **********/
/*********************************/
import palette from './palette';

const styles = {
    table: {
        'tr td': {
            backgroundColor: palette.background.heavy,
            color: 'white',
            '&.rejected': {
                backgroundColor: 'black'
            }
        },
        'tr th': {
            backgroundColor: palette.background.main,
            fontWeight: 'bold'
        },
        'td, th': {
            border: 1,
            padding: '4px',
            textAlign: 'center',
        },
    }
};

export default styles;