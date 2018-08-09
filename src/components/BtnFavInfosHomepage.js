import React, {Component} from 'react';
import {Favorite, Person} from '@material-ui/icons';
import {Grid, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

class BtnFavInfosHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const linkInfos = props => <Link to="/moncompte" {...props}/>;
        const linkFavoris = props => <Link to="/moncompte/mesfavoris" {...props}/>

        return (
            <Grid container justify="center">
                <Button
                    component={linkFavoris}
                    variant="contained"
                    color="secondary"
                    outlined="false"
                    style={{
                    marginRight: 20,
                    marginTop: 30,
                    borderRadius: 30,
                    fontSize: 11
                }}>
                    <Favorite
                        style={{
                        fontSize: 18,
                        marginRight: 5
                    }}/>
                    Mes favoris
                </Button>
                <Button
                    component={linkInfos}
                    variant="contained"
                    color="secondary"
                    style={{
                    borderRadius: 30,
                    marginTop: 30,
                    fontSize: 11
                }}>
                    <Person
                        style={{
                        fontSize: 21,
                        marginRight: 5
                    }}/>Mes infos
                </Button>
            </Grid>
        );
    }
}

export default BtnFavInfosHomepage;