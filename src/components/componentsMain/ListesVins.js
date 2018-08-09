import React, { Component } from "react";
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import ListeNouveautes from "../ListeNouveautes";
import ListeMillesimes from "../ListeMillesimes";
import ListeSommeliers from "../ListeSommeliers";
import BtnAjoutVin from "../BtnAjoutVin";
import BtnFavInfosHomepage from "../BtnFavInfosHomepage";
import Header from "../Header";
import Emitter from '../../emitter';


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

class ListesVins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.emitter = Emitter;
    this.handleAncre = this.handleAncre.bind(this);
    this.emitter.addListener("handleAncre", this.handleAncre);

  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleAncre(name) {
    if (name === "nouveautes") {
      this.setState({ value: 0 });
    }
  }

  render() {
    const { value } = this.state;
    // console.log(this.props);
    return (
      <div>
        <Header />
        <AppBar position="static" color="inherit">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="primary"
            fullWidth>
            <Tab label="Nouveautés" style={{
              outline: 0
            }} />
            <Tab label="Sommeliers" style={{
              outline: 0
            }} />
            <Tab label="Millésime" style={{
              outline: 0
            }} />
          </Tabs>
        </AppBar>
        <TabContainer>
          {(value === 0) ? (<ListeNouveautes {...this.props} />)
            : (value === 1) ? (<ListeSommeliers {...this.props} />)
              : (<ListeMillesimes {...this.props} />)}
        </TabContainer>

        <BtnAjoutVin />
        <BtnFavInfosHomepage />
      </div>
    );
  }
}

export default ListesVins;
