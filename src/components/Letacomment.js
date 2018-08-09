import React, { Component } from "react";
import Etoiles from "./Etoiles";
import { base, auth } from "../firebase";
import axios from "axios";
import Moment from "react-moment";

// modal material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Grid, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Letacomment extends Component {
  constructor(props) {
    super(props);

    const dateCrea = new Date().toDateString();
    this.state = {
      open: false,
      comments: "",
      note: 0,
      userName: [],
      date: dateCrea
    };
    // bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changerNote = this.changerNote.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //   actions modal
  handleSubmit(e) {
    // recup Nom de la perosnne qui écrit le commentaire
    const mailUser = auth.currentUser.email;
    const oneUser = this.state.users.filter(elt => elt.email === mailUser);
    const userName = `${oneUser[0].firstname} ${oneUser[0].name}`;
    // traitement de date

    const { comments, note, date } = this.state;
    e.preventDefault();
    const objet = this;
    base.push(`vins/${this.props.clef}/comments`, {
      data: {
        comments,
        note,
        date,
        userName
      },
      then(data) {
        objet.setState({ open: false });
      }
    });
    axios
      .get("https://thawing-dusk-40711.herokuapp.com/")
      .then(() => console.log("Mis à jour d'algolia"));
  }

  changerNote(note) {
    this.setState({ note: note });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ comments: e.target.value });
  }

  // ajax
  componentDidMount() {
    base.fetch("sommeliers", {
      context: this,
      asArray: true,
      then(data) {
        this.setState({ users: data });
      }
    });
  }

  render() {
    return (
      <div>
        <Button
          style={{
            outline: 0
          }}
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={this.handleClickOpen}
        >
          Laisser un commentaire
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Grid item xs={12}>
            <DialogTitle id="alert-dialog-slide-title">
              <Typography>{"Tu veux laisser un commentaire ?"}</Typography>
            </DialogTitle>
          </Grid>
          <DialogContent>
            <div>
              {/* détails sur modal : nom du vin et année */}
              <Typography
                style={{
                  marginBottom: "5px"
                }}
                variant="title"
                id="modal-title"
              >
                <b>{this.props.vinSelected.titre}</b>
              </Typography>
              <Typography
                style={{
                  marginBottom: "10px"
                }}
                variant="title"
                id="modal-title"
              >
                {this.props.vinSelected.annee}
              </Typography>
              {/* notation étoiles */}
              <Etoiles changerNote={this.changerNote} />{" "}
              {/* grid écrire le commentaire*/}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="multiline-static"
                  label="Écris ici"
                  multiline
                  name={this.state.comments}
                  onChange={this.handleChange}
                  rows=""
                  margin="normal"
                />
              </Grid>
              {/* bouton submit */}
              <Button
                style={{
                  outline: 0
                }}
                onClick={this.handleSubmit}
              >
                Envoyer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Letacomment;
