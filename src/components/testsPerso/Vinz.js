import React, { Component } from "react";

class Vinz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { wines } = this.props;
    if (wines != undefined) {
      const bout = this.props.wines;
      const bouchon = bout[0];
      const comments = bouchon.comments;

      // for (let comment in comments) {
      //   console.log(comments[comment].content);
      // }

      const commentsTableau = Object.values(comments);

      commentsTableau.map(elt => console.log(elt.note));
      const arrayCommentaire = comments.entries();
      console.log(comments);
    }

    // return <p>{wines ? bouteille.content : null}</p>;
    return <p>coucou</p>;
  }
}

export default Vinz;

//this.props.wines[0].comments.content
