import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import GoogleSuggest from '../GoogleSuggest';
import { typesVins } from '../../constants'
const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit
    }
});

class CreationStepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (
            <Grid container direction="column">
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            required
                            id="required"
                            label="Nom de ton vin"
                            defaultValue={this.props.titre}
                            margin="normal"
                            onChange={e => this
                                .props
                                .handleChange(e, "titre")} />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            required
                            id="required"
                            label="Cépage de ton vin"
                            defaultValue={this.props.cepage}
                            margin="normal"
                            onChange={e => this
                                .props
                                .handleChange(e, "cepage")} />

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={8}>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    required
                                    id="required"
                                    label="Année"
                                    // defaultValue={this.props.annee}
                                    margin="normal"
                                    onChange={e => this
                                        .props
                                        .handleChange(e, "annee")} />
                            </Grid>

                            <Grid item xs={5}>
                                <TextField
                                    id="select-type"
                                    fullWidth
                                    required
                                    select
                                    label="Type de vin"
                                    value={this.props.type}
                                    onChange={e => this
                                        .props
                                        .handleChange(e, "type")}
                                    margin="normal">
                                    {typesVins.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                    </Grid>
                    {this.props.type === "Autres"
                        ? <Grid item xs={8}>
                            <TextField
                                fullWidth
                                required
                                id="required"
                                label="Quel est ton type de vin"
                                defaultValue={this.props.typeAutres}
                                margin="normal"
                                onChange={e => this
                                    .props
                                    .handleChange(e, "typeAutres")} />
                        </Grid>
                        : ""}

                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            required
                            id="required"
                            label="Producteur"
                            defaultValue={this.props.producteur}
                            margin="normal"
                            onChange={e => this
                                .props
                                .handleChange(e, "producteur")} />
                    </Grid>

                    <Grid item xs={8} align="center">
                        <GoogleSuggest handleChange={this.props.handleChange} />
                    </Grid>

                </Grid>
            </Grid >
        );
    }
}

export default withStyles(styles)(CreationStepOne);
