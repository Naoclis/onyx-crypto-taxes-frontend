/*
 * App Main Theme
 * Please Note that you could only change the following properties in Material-UI Theme
    Palette
    Typography
    Spacing
    Breakpoints
    z-index
    Globals
*/
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './palette';
import defaultStyles from './styles';

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: palette.primary.light,
            main: palette.primary.main,
        },
        secondary: {
            main: palette.secondary.main,
        },
        background: {
            default: palette.background.dark,
        },
    }
});

theme = responsiveFontSizes(theme);

export { theme, palette, defaultStyles };