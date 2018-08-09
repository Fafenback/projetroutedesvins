import React, { Component } from "react";
import { auth } from "../../firebase/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../../assets/images/logo.png";
import { Grid, FormHelperText } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutline from "@material-ui/icons/LockOutline";
import { Link } from "react-router-dom";
//snackbar
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      open: false
    };
    //ajout de regex pour vérifier les champs
    this.regex = {
      email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      password: /^.{6,40}$/
    };

    this.hidden = {
      email: true,
      password: true,
      connexion: true
    };

    this.inputChanges = this.inputChanges.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  inputChanges(e, key) {
    this.regex[key].test(e.target.value)
      ? (this.hidden[key] = true)
      : (this.hidden[key] = false);
    // console.log(this.hidden[key]);
    this.setState({ [key]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    // pour afficher le snackbar
    //   this.handleClick();

    const { history } = this.props;
    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        history.push("/liste");
      })
      .catch(error => {
        this.handleClick();
      });
    //   catch (error) { this.handleClick() }
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={8} justify="center">
          <Grid item xs={12} align="center">
            <img src={logo} alt="" style={{ width: 250, height: 250, }} />
          </Grid>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Grid container justify="center">
              <Grid item xs={10}>
                <TextField
                  type="text"
                  name="email"
                  onChange={e => this.inputChanges(e, "email")}
                  margin="normal"
                  fullWidth
                  label="Ton email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline style={{ fontSize: 19 }} />
                      </InputAdornment>
                    )
                  }}
                />
                <FormHelperText hidden={this.hidden.email} id="nom-error-text">
                  Ton e-mail n'est pas au bon format.
                </FormHelperText>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  type="password"
                  name="password"
                  onChange={e => this.inputChanges(e, "password")}
                  margin="normal"
                  fullWidth
                  label="Ton mot de passe"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutline style={{ fontSize: 19 }} />
                      </InputAdornment>
                    )
                  }}
                />
                <FormHelperText
                  hidden={this.hidden.password}
                  id="nom-error-text"
                >
                  Ton mot de passe est trop court.
                </FormHelperText>
              </Grid>
              <br />
              <Grid container justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  margin="normal"
                  style={{ outline: 0, marginTop: 20, marginBottom: 30 }}
                >
                  <LockOutline style={{ fontSize: 20, marginRight: 5 }} />
                  Je me connecte
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* {this.props.notLogged && <p>{this.props.notLogged}</p>} */}
        </Grid>
        <Grid container spacing={16} justify="center">
          <Link to={`/inscription`}>Pas encore inscrit ? Rejoins-nous !</Link>
        </Grid>{" "}
        <Grid container style={{ width: 5 }} justify="center">
          <Grid item xs={3}>
            <Snackbar
              open={this.state.open}
              onClose={this.handleClick}
              TransitionComponent={Fade}
              transitionDuration={1000}
              autoHideDuration={3000}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={"Mauvais e-mail et/ou mot de passe"}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Connexion;
