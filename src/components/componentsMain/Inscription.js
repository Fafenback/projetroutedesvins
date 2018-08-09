import React, { Component } from "react";
import { withStyles} from "@material-ui/core/styles";
import logo from '../../assets/images/logo.png'
import { Grid, Button, InputLabel, FormControl, SvgIcon, Input, FormHelperText, InputAdornment, IconButton } from "@material-ui/core";
//import de firebase
import { auth, base } from '../../firebase'
// import Input from "react-validation/build/input";
//import pour les icones
import MailOutline from "@material-ui/icons/MailOutline";
import LockOutline from "@material-ui/icons/LockOutline";
// //import pour la visibilité password
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";



const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});


class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:"",
      name: "",
      location: "",
      email: "",
      password: "",
      passwordTwo: "",
      biography: "",
      favoris: "premier favori",
      showPasswordOne: false,
      showPasswordTwo: false,
    };

    //définition des regex
    this.regexes = {
      name: `^.{3,40}$`,
      firstname: `^.{3,40}$`,
      location: `^.{3,90}`,
      email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      password: `^.{6,40}$`,
      passwordTwo: [this.state.password],
      biography: `^.{3,40}$`
    };

    //definition des visibilités des erreurs
    this.hidden = {
      firstname: true,
      name: true,
      location: true,
      email: true,
      password: true,
      passwordTwo: true,
      biography: true,
    };
    this.soumission = false;

    //bind pour que la fonction comprenne le this
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleClickShowPassword = this
      .handleClickShowPassword
      .bind(this);
    this.handleMouseDownPassword = this
      .handleMouseDownPassword
      .bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    const idChange = e.target.id;

    //on met à jour le state quand on entre des données
    this.setState({[idChange]: e.target.value});

    //on teste le champ entré si faux message formhelper apparait
    const regex = new RegExp(this.regexes[idChange], "i");
    // console.log(regex, [this.state.password]);

    if (idChange === "passwordTwo") {
      e.target.value !== this.state.password
        ? (this.hidden.passwordTwo = false)
        : (this.hidden.passwordTwo = true);
    } else if (idChange !== "biography") {
      regex.test(e.target.value)
        ? (this.hidden[idChange] = true)
        : (this.hidden[idChange] = false);
    }
  };
  //afficher la visibilité ou non des passwords
  handleClickShowPassword = mdpValue => {
    console.log(this.state[mdpValue]);
    this.setState({ [mdpValue]: !this.state[mdpValue] });
  };
  //eviter une action lors du changement d'état de la visibilité password
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    console.log(history);
    const { email, password, firstname, name, location, biography, favoris } = this.state;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => console.log(authUser));
    base.push(`sommeliers`, {
      data: {
        email,
        firstname,
        name,
        location,
        biography,
        favoris,
      }
    });
    history.push("/");
  };

  render() {
    const stateArray = Object
      .values(this.state)
      .slice(0, 5);
    const hiddenArray = Object.values(this.hidden);
    // const {classes} = this.props;

     
         
       
    return <form onSubmit={this.handleSubmit.bind(this)}>
        <div style={{ padding: 20 }}>
          <Grid container spacing={8} justify="center">
            <Grid item xs={12} align="center">
              <img src={logo} alt="" style={{ width: 250, height: 250 }} />
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Ton prénom</InputLabel>
                <Input id="firstname" onChange={this.handleChange} value={this.state.firstname} startAdornment={<InputAdornment position="start">
                      <SvgIcon style={{ fontSize: 19 }}>
                        <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2z M7.07,18.28
                        c0.43-0.9,3.05-1.78,4.93-1.78s4.51,0.88,4.93,1.78C15.57,19.36,13.86,20,12,20S8.43,19.36,7.07,18.28z M18.36,16.83
                        c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93,0.59-6.36,2.33C4.62,15.49,4,13.82,4,12c0-4.41,3.59-8,8-8c4.41,0,8,3.59,8,8
                        C20,13.82,19.38,15.49,18.36,16.83z" />
                        <path d="M12,6c-1.94,0-3.5,1.56-3.5,3.5S10.06,13,12,13c1.94,0,3.5-1.56,3.5-3.5S13.94,6,12,6z M12,11c-0.83,0-1.5-0.67-1.5-1.5
                        C10.5,8.67,11.17,8,12,8c0.83,0,1.5,0.67,1.5,1.5C13.5,10.33,12.83,11,12,11z" />
                      </SvgIcon>
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.firstname} id="nom-error-text">
                  Le prénom est trop court.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Ton nom</InputLabel>
                <Input id="name" onChange={this.handleChange} value={this.state.name} startAdornment={<InputAdornment position="start">
                      <SvgIcon style={{ fontSize: 19 }}>
                        <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2z M7.07,18.28
                        c0.43-0.9,3.05-1.78,4.93-1.78s4.51,0.88,4.93,1.78C15.57,19.36,13.86,20,12,20S8.43,19.36,7.07,18.28z M18.36,16.83
                        c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93,0.59-6.36,2.33C4.62,15.49,4,13.82,4,12c0-4.41,3.59-8,8-8c4.41,0,8,3.59,8,8
                        C20,13.82,19.38,15.49,18.36,16.83z" />
                        <path d="M12,6c-1.94,0-3.5,1.56-3.5,3.5S10.06,13,12,13c1.94,0,3.5-1.56,3.5-3.5S13.94,6,12,6z M12,11c-0.83,0-1.5-0.67-1.5-1.5
                        C10.5,8.67,11.17,8,12,8c0.83,0,1.5,0.67,1.5,1.5C13.5,10.33,12.83,11,12,11z" />
                      </SvgIcon>
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.name} id="nom-error-text">
                  Le nom est trop court.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Ton lieu de travail</InputLabel>
                <Input id="location" onChange={this.handleChange} value={this.state.location} startAdornment={<InputAdornment position="start">
                      <SvgIcon style={{ fontSize: 19 }}>
                        <path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M7,9c0-2.76,2.24-5,5-5s5,2.24,5,5
                      c0,2.88-2.88,7.19-5,9.88C9.92,16.21,7,11.85,7,9z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </SvgIcon>
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.location} id="location-error-text">
                  La localisation est trop courte.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Ton email</InputLabel>
                <Input id="email" type="email" onChange={this.handleChange} value={this.state.email} startAdornment={<InputAdornment position="start">
                      <MailOutline style={{ fontSize: 19 }} />
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.email} id="email-error-text">
                  L'email n'est pas valide.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel htmlFor="inputInscriptionPassword">
                  Ton mot de passe
                </InputLabel>
                <Input id="password" type={this.state.showPasswordOne ? "text" : "password"} onChange={this.handleChange} value={this.state.password} startAdornment={<InputAdornment position="start">
                      <LockOutline style={{ fontSize: 19 }} />
                    </InputAdornment>} endAdornment={<InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={() => this.handleClickShowPassword("showPasswordOne")} onMouseDown={this.handleMouseDownPassword}>
                        {this.state.showPasswordOne ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.password} id="password-error-text">
                  Le mot de passe n'est pas valide.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Répète ton mot de passe</InputLabel>
                <Input id="passwordTwo" type={this.state.showPasswordTwo ? "text" : "password"} onChange={this.handleChange} value={this.state.passwordTwo} startAdornment={<InputAdornment position="start">
                      <LockOutline style={{ fontSize: 19 }} />
                    </InputAdornment>} endAdornment={<InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={() => this.handleClickShowPassword("showPasswordTwo")} onMouseDown={this.handleMouseDownPassword}>
                        {this.state.showPasswordTwo ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.passwordTwo} id="name-error-text">
                  Le mot de passe n'est pas le même que le précédent.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={10}>
              <FormControl fullWidth>
                <InputLabel>Ta bio</InputLabel>
                <Input id="biography" onChange={this.handleChange} value={this.state.biography} startAdornment={<InputAdornment position="start">
                      <SvgIcon style={{ marginLeft: -3, fontSize: 19 }}>
                        <path d="M15,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4c-2.21,0-4,1.79-4,4C11,10.21,12.79,12,15,12z M15,6c1.1,0,2,0.9,2,2
                    s-0.9,2-2,2c-1.1,0-2-0.9-2-2S13.9,6,15,6z" />
                        <path d="M15,14c-2.67,0-8,1.34-8,4v2h16v-2C23,15.34,17.67,14,15,14z M9,18c0.22-0.72,3.31-2,6-2c2.7,0,5.8,1.29,6,2H9z" />
                      </SvgIcon>
                    </InputAdornment>} />
                <FormHelperText hidden={this.hidden.biography} id="biography-error-text">
                  La biographie est un peu courte.
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid container justify="center">
              {stateArray.includes("") || hiddenArray.includes(false) ? (this.soumission = true) : (this.soumission = false)}
              <Button disabled={this.soumission} type="submit" variant="contained" color="secondary" margin="normal">
                Je m'inscris
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>;
  }
}



export default withStyles(styles)(Inscription);
