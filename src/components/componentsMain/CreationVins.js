import React, { Component } from "react";
// elements STEPPER -  material UI
import { Button, Grid, Stepper, StepLabel, Step } from "@material-ui/core";
import CreationStepOne from "./CreationStepOne";
import CreationStepTwo from "./CreationStepTwo";
import { base } from '../../firebase'
import Header from "../Header";
import axios from "axios"

function getSteps() {
  return ["", ""];
}

class CreationVins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      titre: "",
      cepage: "",
      annee: "",
      type: "",
      typeAutres: "",
      producteur: "",
      lieux: "",
      descriptionVisuelle: "",
      descriptionGustative: "",
      accordMetsVins: "",
      fichier: [],
      date: Date.now()
    };

    this.handleNext = this
      .handleNext
      .bind(this);
    this.handleBack = this
      .handleBack
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.onDrop = this
      .onDrop
      .bind(this);
    this.handleFinish = this
      .handleFinish
      .bind(this);
  }

  handleNext() {
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  }

  handleBack() {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target
        ? e.target.value
        : e
    });
  };

  onDrop(fichier) {
    this.setState({ fichier });
  }

  handleFinish() {

    const {
      titre,
      cepage,
      type,
      typeAutres,
      producteur,
      lieux,
      descriptionVisuelle,
      descriptionGustative,
      accordMetsVins,
      fichier,
      date
    } = this.state

    base.push(`vins`, {
      data: {
        titre,
        cepage,
        annee: parseInt(this.state.annee, 10),
        type,
        typeAutres,
        producteur,
        lieux,
        descriptionVisuelle,
        descriptionGustative,
        accordMetsVins,
        fichier,
        date
      }
    })
    axios
      .get("https://thawing-dusk-40711.herokuapp.com/")
      .then(() => console.log("Mis à jour d'algolia"))
    this
      .props
      .history
      .push("/liste")

  }

  render() {
    const steps = getSteps();
    return (
      <div>
        <Header />
        <Grid container direction="column">
          <Grid container justify="center">
            <Grid item xs={12}>
              <Stepper activeStep={this.state.activeStep} alternativeLabel style={{ padding: 15 }}>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>

            {this.state.activeStep === 1
              ? <CreationStepTwo
                handleChange={this.handleChange}
                onDrop={this.onDrop}
                {...this.state} />
              : <CreationStepOne handleChange={this.handleChange} {...this.state} />}

            <Grid
              container
              justify="center"
              style={{
                marginTop: 50
              }}>
              <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} style={{ outline: 0 }}>Retour</Button>
              {this.state.activeStep === steps.length - 1
                ? (
                  <Button variant="contained" color="primary" onClick={this.handleFinish} style={{ outline: 0 }}>Je finalise ma fiche</Button>
                )
                : (
                  <Button variant="contained" color="primary" onClick={this.handleNext} style={{ outline: 0 }}>Je complète mon vin</Button>
                )
              }

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreationVins;
