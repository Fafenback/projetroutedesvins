import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './assets/css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import UserProvider from './components/provider/UserProvider';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme"


const myTheme = createMuiTheme(theme)


ReactDOM.render(
    <MuiThemeProvider theme={myTheme}>
        <Router>
            <UserProvider>
                <App />
            </UserProvider>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
