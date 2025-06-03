import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';

interface AppThemeProps {
    themeComponents: ThemeOptions;
    children: React.ReactNode;
}

export const AppTheme = ({ themeComponents, children }: AppThemeProps) => {
    const theme = createTheme(themeComponents);
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
