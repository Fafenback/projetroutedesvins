import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Person, Place, Mood } from "@material-ui/icons";
import Email from "@material-ui/icons/Email";
import { base } from "../../firebase";

class UnSommelier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sommelierSelected: {}
    };

  }


  // ajax
  componentDidMount() {
    base.syncState(`sommeliers/${this.props.match.params.sommelier}`, {
      context: this,
      state: "sommelierSelected"
    });
  }

  render() {
    const tab = [this.state.sommelierSelected.firstname, this.state.sommelierSelected.name, this.state.sommelierSelected.biography, this.state.sommelierSelected.email, this.state.sommelierSelected.location];

    return (
      <List>
        {tab.map((value, i) => (
          <ListItem key={i} role={undefined} button divider>
            <div>{value === tab[0] ? < Person /> : value === tab[1] ? < Person /> : value === tab[2] ? < Mood /> : value === tab[3] ? < Email /> : value === tab[4] ? < Place /> : null}</div>
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default UnSommelier;
