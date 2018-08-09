import React, { Component } from 'react'
import { Grid } from "@material-ui/core";
import logo from "../assets/images/logo.png";
import { Menu, Search } from "@material-ui/icons";
import Sidebar from './componentsMain/Sidebar';
import SearchBar from './componentsMain/SearchBar'
import { Link, withRouter } from "react-router-dom";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            searchOpen: false
        };

        this.handleMenu = this
            .handleMenu
            .bind(this);
        this.handleSearchBar = this
            .handleSearchBar
            .bind(this);

    }

    handleMenu() {
        const { open } = this.state
        this.setState({
            open: !open
        });
    };
    handleSearchBar() {
        const { searchOpen } = this.state
        this.setState({
            searchOpen: !searchOpen
        })
    }

    render() {
        // console.log(this.props);
        const url = (document.location.href);
        const reg = new RegExp("^.+/liste/.+")
        return (
            <div
                style={{
                    backgroundColor: "rgb(166, 0, 67)",
                    height: 5,
                    padding: 20,
                    marginBottom: 25,
                    marginTop: 20
                }}>
                <Grid container spacing={40}>
                    <Grid
                        item
                        xs={2}
                        align="center"
                        style={{
                            marginTop: -14
                        }}>
                        <Menu
                            style={{
                                color: "white"
                            }}
                            onClick={this.handleMenu} /> {this.state.open === true
                                ? <Sidebar {...this.state} handleClose={this.handleMenu} />
                                : ""}
                    </Grid>
                    <Grid item xs={8} align="center">
                        <Link to="/liste"><img
                            src={logo}
                            alt=""
                            style={{
                                width: 125,
                                height: 125,
                                marginTop: -60
                            }} /></Link>
                    </Grid>
                    {reg.test(url)
                        ? (
                            <Grid
                                item
                                xs={2}
                                onClick={this.props.favorite}
                                align="center"
                                style={{
                                    marginTop: -15
                                }}>
                                {this.props.isFavorite ? <Favorite style={{
                                    color: "white", marginTop: 2
                                }} /> : <FavoriteBorder style={{
                                    color: "white", marginTop: 2
                                }} />}
                            </Grid>
                        )
                        : (
                            <Grid
                                item
                                xs={2}
                                align="center"
                                style={{
                                    marginTop: -13
                                }}>

                                <Search
                                    style={{
                                        color: "white"
                                    }}
                                    onClick={this.handleSearchBar} /> {this.state.searchOpen
                                        ? <SearchBar
                                            {...this.props}
                                            open={this.state.searchOpen}
                                            handleClose={this.handleSearchBar} />
                                        : ""}
                            </Grid>
                        )}

                </Grid >

            </div >

        );
    }
}

export default withRouter(Header);