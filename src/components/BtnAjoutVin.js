import React, {Component} from "react";
import {Button, Grid} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";

class BtnAjoutVin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const MyLink = props => <Link to="/creationVins" {...props}/>;
    return <Grid
      container
      style={{
      display: "flex",
      justifyContent: "flex-end",
      paddingRight: 20
    }}>
      <Button component={MyLink} variant="fab" color="primary" aria-label="add">
        <AddIcon/>
      </Button>
    </Grid>

  }
}

export default BtnAjoutVin;
