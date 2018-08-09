import React, { Component } from 'react';
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import Header from '../Header';
import Compte from './Compte'
import MesVins from './MesVins'
import MesFavoris from './MesFavoris'
import Emitter from '../../emitter';


function TabContainer(props) {
    return (
        <Typography component="div" style={{
            padding: 8 * 3
        }}>
            {props.children}
        </Typography>
    );
}

class MonCompte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.emitter = Emitter;
        this.handleAncre = this.handleAncre.bind(this);
        this.emitter.addListener("handleAncre", this.handleAncre);
    };


    handleAncre(param, name) {
        const value = (name === "monCompte") ? 0 : (name === "mesVins") ? 1 : 2
        this.setState({
            value
        })
        // if (name === "monCompte") {
        //     this.setState({ value: 0 });
        //     console.log(this.state.value)

        // } else if (name === "mesVins") {
        //     this.setState({ value: 1 });
        //     console.log(this.state.value)
        // } else {
        //     this.setState({ value: 2 });
        //     console.log(this.state.value)

        // }

    }


    handleChange(event, value) {
        this.setState({ value });
    };

    render() {
        const { value } = this.state
        return (
            <div>
                <Header />
                <AppBar position="static" color="inherit">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="primary"
                        centered>
                        <Tab
                            label="Mon Compte"
                            style={{
                                outline: 0
                            }} />
                        <Tab
                            label="Mes Vins"
                            style={{
                                outline: 0
                            }} />
                        <Tab
                            label="Mes Favoris"
                            style={{
                                outline: 0
                            }} />
                    </Tabs>
                </AppBar>
                {(value === 0)
                    ? <TabContainer><Compte {...this.props.user} /></TabContainer>
                    : (value === 1)
                        ? <TabContainer><MesVins /></TabContainer>
                        : <TabContainer><MesFavoris /></TabContainer>}
            </div>
        );
    }
}

export default MonCompte;