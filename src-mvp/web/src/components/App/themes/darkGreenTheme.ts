import { ThemeOptions } from '@mui/material';

export const darkGreenTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#2e7d32', // глубокий зелёный
            dark: '#1b5e20',
            light: '#60ad5e',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#66bb6a', // светло-зелёный для вторичных элементов
        },
        background: {
            default: '#121212', // типичный тёмный фон
            paper: '#1e1e1e',
        },
        text: {
            primary: '#e0f2f1',
            secondary: '#a5d6a7',
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: 14,
    },
};
