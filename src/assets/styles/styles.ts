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
            },
            '&.odd': {
                backgroundColor: palette.background.light
            },
            '&.even': {
                backgroundColor: palette.background.main
            }
        },
        'tr.odd td': {
            backgroundColor: palette.secondary.dark
        },
        'tr.even td': {
            backgroundColor: palette.background.dark
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
        'td.short': {
            width: '50px!important',
            overflow: 'hidden',
            display: 'inline-block',
            whiteSpace: 'nowrap'
        },
    }
};

export default styles;