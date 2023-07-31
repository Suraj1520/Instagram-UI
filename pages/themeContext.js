import React, { createContext, useState } from "react";

const themes = {
    light: {
        primaryColor: '#000',
        secondaryColor: '#fcfefe',
    },
    dark: {
        primaryColor: '#fff',
        secondaryColor: '#000',
    }
}
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
    const [currTheme, setCurrTheme] = useState('dark');
    const toggle = () => {
        setCurrTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme: currTheme, toggle, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
export { ThemeContext, ThemeProvider };