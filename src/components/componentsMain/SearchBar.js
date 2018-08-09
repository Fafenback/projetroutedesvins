import React, {Component} from 'react';
import {InstantSearch, SearchBox, Hits} from 'react-instantsearch/dom';
import {Dialog, Slide, AppBar, Toolbar, IconButton} from "@material-ui/core";

import logo from "../../assets/images/logo.png";
import CloseIcon from "@material-ui/icons/Close";
import HitSearch from '../HitSearch';
import Styled from 'styled-components';

const StyledHits = Styled(Hits)`
    .ais-Hits-item{
        width: 100%;
        margin: 0;
    }
`;
const StyledSearchBox = Styled(SearchBox)`
    margin-top: 20vh;
    margin-left: 9vh;
    margin-bottom: 7vh;
    width: 70%;
    
`;

function Transition(props) {
    return <Slide direction="up" {...props}/>;
};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarValue: ""
        };
        this.handleChange = this
            .handleChange
            .bind(this)
    }

    handleChange(e) {
        const {value} = e.target;
        this.setState({searchBarValue: value})
    }
    render() {
        console.log(this.props);
        const {searchBarValue} = this.state;
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={this.props.handleClose}
                TransitionComponent={Transition}>
                <AppBar>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                    <img
                        src={logo}
                        alt=""
                        style={{
                        width: 150,
                        height: 150,
                        position: "absolute",
                        zIndex: 1,
                        marginLeft: 125,
                        marginTop: -20
                    }}/>
                </AppBar>
                <InstantSearch
                    appId="1WYSWXMAA0"
                    apiKey="5eaad0af223d32c2631920ee7142502a"
                    indexName="routedesvins">
                    <StyledSearchBox onChange={this.handleChange}/> {searchBarValue
                        ? <StyledHits hitComponent={hit => <HitSearch {...hit} {...this.props}/>}/>
                        : null}
                </InstantSearch>
            </Dialog>
        );
    }
}

export default SearchBar;