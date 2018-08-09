import PropTypes from "prop-types"
import React, {Component} from "react";
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import {TextField} from "@material-ui/core";

const API_KEY = "AIzaSyBRCC4KdTit73xre8WLdZ3XLI1yBoc6sm4"
class GoogleSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            value: ""
        }
        this.handleInputChange = this
            .handleInputChange
            .bind(this)
        this.handleSelectSuggest = this
            .handleSelectSuggest
            .bind(this)
    }

    handleInputChange(e) {
        console.log(e.target.value);
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest(suggest) {
        console.log(suggest.formatted_address)
        this.setState({search: "", value: suggest.formatted_address})
        this
            .props
            .handleChange(suggest.formatted_address, "lieux")
    }

    render() {
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                key: API_KEY,
                libraries: "places,geocode"
            }}
                render={googleMaps => googleMaps && (
                <div>
                    <ReactGooglePlacesSuggest
                        autocompletionRequest={{
                        input: search
                    }}
                        googleMaps={googleMaps}
                        onSelectSuggest={this.handleSelectSuggest}>
                        <TextField
                            fullWidth
                            required
                            type="text"
                            label="Localité"
                            value={value}
                            margin="normal"
                            onChange={this.handleInputChange}/>
                    </ReactGooglePlacesSuggest>
                </div>
            )}/>
        )
    }
}

GoogleSuggest.propTypes = {
    googleMaps: PropTypes.object
}

export default GoogleSuggest
