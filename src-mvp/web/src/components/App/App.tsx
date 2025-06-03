import CssBaseline from '@mui/material/CssBaseline';

import { AppTheme } from './AppTheme';
import { darkGreenTheme } from './themes';

import { AppNavigation } from './AppNavigation';
import { FC } from 'react';

type Props = { children: React.ReactNode };

export const App: FC<Props> = (props) => {
    const { children } = props;

    return (
        <AppTheme themeComponents={darkGreenTheme}>
            <CssBaseline enableColorScheme />
            <AppNavigation />
            {children}
        </AppTheme>
    );
};
