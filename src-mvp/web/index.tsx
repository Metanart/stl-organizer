import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { App } from './src/components/App/App';

import { HomePage } from './src/pages/HomePage';
import { PathsPage } from './src/pages/PathsPage';
import { GalleryPage } from './src/pages/GalleryPage';

import 'reset.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <StrictMode>
        <Router>
            <App>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/gallery' element={<GalleryPage />} />
                    <Route path='/paths' element={<PathsPage />} />
                </Routes>
            </App>
        </Router>
    </StrictMode>,
);
