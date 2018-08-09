import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import UnSommelier from './UnSommelier';
import Header from "../Header";
import BtnAjoutVin from '../BtnAjoutVin';
import BtnFavInfosHomepage from '../BtnFavInfosHomepage';
import SesVins from '../SesVins';
import SesFavoris from '../SesFavoris';



function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir}>
            {children}
        </Typography>
    );
}

class FicheSommelier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event, value) {
        this.setState({ value });
    };


    render() {
        const { value } = this.state;
        return (
            <div>
                <Header />
                <AppBar position="static" color="inherit">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Infos" style={{ outline: 0 }} />
                        <Tab label="Ses Vins" style={{ outline: 0 }} />
                        <Tab label="Ses Favoris" style={{ outline: 0 }} />
                    </Tabs>
                </AppBar>
                <TabContainer>
                    {value === 0 && <UnSommelier  {...this.props} />}
                    {value === 1 && <SesVins />}
                    {value === 2 && <SesFavoris />}
                </TabContainer>
                <BtnAjoutVin />
                <BtnFavInfosHomepage />
            </div>
        );
    }
}

export default FicheSommelier;