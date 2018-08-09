import React, { Component } from "react";
import Moment from "react-moment";

// fleche dans commentaires
import FlecheComment from "./FlecheComment";
// card material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
//material-ui icons
import Grade from "@material-ui/icons/Grade";
class Commentaires extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      visible: false
    };
    this.handleLimit = this.handleLimit.bind(this);
  }

  handleLimit() {
    this.setState({
      limit: this.state.limit + 100,
      visible: !this.state.visible
    });
  }

  render() {
    // const { wines } = this.props;
    let commentsTableau = [];
    const comments = this.props.vinSelected.comments;
    commentsTableau = Object.values(comments).reverse();
    let newcommentsTableau = [];
    if (this.state.visible === true) {
      newcommentsTableau = [...commentsTableau].slice(0, this.state.limit);
    } else {
      newcommentsTableau = [...commentsTableau].slice(0, 2);
    }

    const dateToFormat = new Date();

    return (
      <Grid>
        <Card>
          <CardContent>
            {/* note */}
            <Grid item xs={12}>
              {newcommentsTableau.map((elt, i) => (
                <div
                  style={{
                    alignContent: "center"
                  }}
                  key={i}
                >
                  {/* note étoiles */}
                  {[...Array(elt.note)].map(elt => <Grade />)}
                  {/* comment */}
                  {elt.comments}
                  {/* prénom nom et date */}
                  <div
                    style={{
                      fontSize: "13px",
                      color: "grey",
                      textAlign: "left"
                    }}
                  >
                    {elt.userName} ,{" "}
                    <Moment date={elt.date} format="DD MMM YYYY" />
                  </div>
                </div>
              ))}
            </Grid>
            <div>
              <FlecheComment handleLimit={this.handleLimit} />
            </div>
            {/* content */}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
export default Commentaires;
