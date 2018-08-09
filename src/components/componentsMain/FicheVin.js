import React, { Component } from "react";
import Commentaires from "../Commentaires";
import Letacomment from "../Letacomment";
import Header from "../Header";
// card material ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { base, auth } from "../../firebase";
import { Grid } from "@material-ui/core";
import Loader from "../Loader";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

const styles = {
  card: {
    maxWidth: 145
  },
  media: {
    height: 0,
    paddingTop: "57%" // 16:9
  }
};

//recup data pour affichage en URL
class FicheVin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loaded: false,
      vinSelected: {},
      refresh: true,
      open: false,
      message: "",
      isFavorite: false,


    };
    this.favorite = this.favorite.bind(this);
    this.refreshUser = this.refreshUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }



  // ajax
  componentDidMount() {
    this.refreshUser();

    base.syncState(`vins/${this.props.all.match.params.wine}`, {
      context: this,
      state: "vinSelected"
    });

  }



  refreshUser() {
    const favoris = this.props.all.user.favoris;
    const listfav = Object.values(favoris);

    if (listfav.includes(this.props.all.match.params.wine)) {
      this.setState({
        isFavorite: true
      })
    }

    //    const isFav = valuesArr.includes(idVin);

    base.fetch("sommeliers", {
      context: this,
      asArray: true,
      then(data) {
        this.setState({ users: data });
      }
    });
  }
  handleClick() {
    this.setState({ open: !this.state.open });
  }

  favorite(e) {
    e.preventDefault();
    const idVin = this.props.all.match.params.wine;
    const mailUser = auth.currentUser.email;
    const listeUser = this.state.users;
    const idUser = listeUser.filter(elt => elt.email === mailUser);
    const keyUser = idUser[0].key;
    const listfav = Object.entries(idUser[0].favoris);
    const filtre = listfav.filter(elt => elt.includes(idVin));
    const valuesArr = Object.values(this.props.all.user.favoris);
    const isFav = valuesArr.includes(idVin);
    this.setState({
      isFavorite: isFav
    })

    //vérification si le vin est déjà en favoris
    let alreadyFavorite;
    filtre.length > 0 ? (alreadyFavorite = false) : (alreadyFavorite = true);
    if (alreadyFavorite === true) {
      base
        .push(`sommeliers/${keyUser}/favoris`, { data: idVin })
        .then(() =>
          this.setState({
            isFavorite: true,
            open: true,
            message: "Votre vin a été ajouté aux favoris"
          })
        )
        .catch(error => alert(error));
    } else {
      // console.log(filtre);
      const supprWine = filtre[0][0];
      base
        .remove(`sommeliers/${keyUser}/favoris/${supprWine}`)
        .then(() =>
          this.setState({
            isFavorite: false,
            open: true,
            message: "Votre vin a été supprimé aux favoris"
          })
        )
        .catch(error => alert(error));
    }
    this.refreshUser();
  }

  render() {

    // console.log(this.state.refresh);
    const { classes } = this.props;
    const { vinSelected } = this.state;
    return (
      <div>
        <Header isFavorite={this.state.isFavorite} favorite={this.favorite} />
        {vinSelected.annee ? (
          <div>
            <Card>
              <CardContent>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    {/* titre et lieux */}
                    <Grid item xs={12}>
                      {/* title */}
                      <Typography
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          marginTop: "20px",
                          marginBottom: "5px"
                        }}
                      >
                        {vinSelected.titre}
                      </Typography>
                      {/* cépage */}
                      <Typography
                        style={{
                          textAlign: "center",
                          color: "grey",
                          marginBottom: "20px"
                        }}
                      >
                        {vinSelected.cepage}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* photo */}
                  <Grid item xs={12}>
                    {vinSelected.photo ? (
                      <CardMedia
                        className={classes.media}
                        image={vinSelected.photo}
                      />
                    ) : (
                        <CardMedia
                          className={classes.media}
                          image="https://c1.staticflickr.com/4/3748/18671874943_cee2fae428_b.jpg"
                        />
                      )}
                  </Grid>

                  <Grid item xs={12}>
                    {/* millesime */}
                    <Typography
                      style={{
                        color: "grey",
                        textAlign: "center",
                        marginTop: "20px"
                      }}
                    >
                      {vinSelected.annee}
                    </Typography>
                  </Grid>
                  <Typography>
                    <span
                      style={{
                        color: "lightgrey",
                        fontSize: "10px",
                        textAlign: "center",
                        fontWeight: "italic",
                        marginBottom: "20px"
                      }}
                    >
                      Recommandé par Réza Nahaboo
                    </span>
                  </Typography>
                </Grid>

                {/* autres infos sur le vin */}
                {/* producteur */}
                <Typography>
                  <span>
                    {" "}
                    <b> Producteur : </b>
                  </span>
                  {vinSelected.producteur}
                </Typography>
                {/* lieux */}
                <Typography>
                  <span>
                    {" "}
                    <b> Lieux : </b>
                  </span>
                  {vinSelected.lieux}
                </Typography>
                {/* type */}
                <Typography>
                  <span>
                    {" "}
                    <b> Type : </b>
                  </span>
                  {vinSelected.type}
                </Typography>

                {/* descritpion olfactive */}
                <Typography>
                  <span>
                    {" "}
                    <b> Descritpion olfalctive : </b>
                  </span>
                  {vinSelected.descriptionGustative}
                </Typography>
                {/* description visuelle */}
                <Typography>
                  <span>
                    {" "}
                    <b> Description visuelle : </b>
                  </span>
                  {vinSelected.descriptionVisuelle}
                </Typography>
              </CardContent>
            </Card>
            {/* commentaires ? */}
            {vinSelected.comments ? (
              <Commentaires vinSelected={vinSelected} />
            ) : (
                <p
                  style={{
                    marginLeft: "15px",
                    marginTop: "15px"
                  }}
                >
                  Aucun commentaire sur ce vin
              </p>
              )}
          </div>
        ) : (
            <div>
              <Loader />
            </div>
          )}
        {/* bouton Laisser un commentaire */}
        <Letacomment
          clef={this.props.all.match.params.wine}
          vinSelected={vinSelected}
        />
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
            message={this.state.message}
          />
        </Grid>
      </div>
    );
  }
}

FicheVin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FicheVin);
