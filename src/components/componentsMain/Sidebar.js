import React, { Component } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  List,
  ListItem,
  Button,
  IconButton,
  Grid
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Lock from "@material-ui/icons/Lock";
import logo from "../../assets/images/logo.png";
import Emitter from "../../emitter";
import { withRouter } from "react-router";
import { auth } from "../../firebase";

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleLogOut() {
    auth
      .signOut()
      .then(function() {
        this.props.history.push("/");
      })
      .catch(function(error) {
        console.log("An error has occurred");
      });
  }

  handleClick(param, name) {
    // const url = document.location.href.split("/")
    // const finUrl = url[url.length - 1];
    this.props.handleClose();
    Emitter.emit("handleAncre", param, name);
    this.props.history.push(param);
  }

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
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
              }}
            />
          </AppBar>
          <Grid container direction="column">
            <Grid container justify="center" spacing={40}>
              <List>
                <ListItem
                  button
                  onClick={() =>
                    this.handleClick("/creationvins", "creationVins")
                  }
                >
                  <h1
                    style={{
                      paddingTop: 150,
                      paddingBottom: 10,
                      fontSize: 30,
                      margin: "auto"
                    }}
                  >
                    Ajouter un vin
                  </h1>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.handleClick("/liste", "nouveautés")}
                >
                  <h1
                    style={{
                      paddingBottom: 10,
                      fontSize: 30,
                      margin: "auto",
                      color: "black"
                    }}
                  >
                    Les nouveautés
                  </h1>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.handleClick("/moncompte", "mesVins")}
                >
                  <h1
                    style={{
                      paddingBottom: 10,
                      fontSize: 30,
                      margin: "auto",
                      color: "black"
                    }}
                  >
                    Mes vins
                  </h1>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.handleClick("/moncompte", "mesFavoris")}
                >
                  <h1
                    style={{
                      paddingBottom: 10,
                      fontSize: 30,
                      margin: "auto"
                    }}
                  >
                    Mes favoris
                  </h1>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.handleClick("/moncompte", "monCompte")}
                >
                  <h1
                    style={{
                      paddingBottom: 10,
                      fontSize: 30,
                      margin: "auto"
                    }}
                  >
                    Mon compte
                  </h1>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              onClick={this.handleLogOut}
              variant="contained"
              color="secondary"
              style={{ marginTop: 50, outline: 0 }}
            >
              <Lock style={{ marginRight: 2, fontSize: 20 }} />Déconnexion
            </Button>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(Sidebar);
