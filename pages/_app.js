import Navbar from '@/Components/Navbar/Navbar'
import '@/styles/globals.css'

import {ThemeProvider} from '../pages/themeContext';

export default function App({ Component, pageProps }) {

  return (
    <ThemeProvider>
        <Component {...pageProps} />
    </ThemeProvider>
  );
};
