import React, { Component } from 'react';
import { Grid, TextField, Chip } from "@material-ui/core";
import Filter from '@material-ui/icons/Filter';
import Dropzone from 'react-dropzone'

class CreationStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Grid container direction="column">
        <Grid container justify="center" spacing={8}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="multiline-static"
              label="Mets une belle description visuelle et olfactive de ton vin"
              multiline
              onChange={e => this
                .props
                .handleChange(e, "descriptionVisuelle")}
              rows=""
              margin="normal" />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              id="multiline-static"
              label="Ajoutes-y une description gustative"
              multiline
              onChange={e => this
                .props
                .handleChange(e, "descriptionGustative")}
              rows=""
              margin="normal" />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              id="multiline-static"
              label="Accords mets et vins"
              multiline
              onChange={e => this
                .props
                .handleChange(e, "accordMetsVins")}
              rows=""
              margin="normal" />
          </Grid>

          <Grid item xs={8} align="center">
            <Dropzone
              onDrop={this.props.onDrop}
              style={{
                borderStyle: "none"
              }}>
              <Filter
                style={{
                  fontSize: 30,
                  marginRight: 20,
                  marginTop: 20
                }}
                color="primary" />
              <Chip label="Ajoute une jolie photo" />
            </Dropzone>
            <div>
              {this
                .props
                .fichier
                .map(f => <p key={f.name}>{f.name}
                  - {f.size}
                  bytes</p>)}
            </div>
          </Grid>

        </Grid>
      </Grid >
    );
  }
}
export default CreationStepTwo;
