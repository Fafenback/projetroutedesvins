import React from "react";
import StarRatingComponent from "react-star-rating-component";

class Etoiles extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.props.changerNote(nextValue);
  }

  render() {
    const { rating } = this.state;

    return (
      <div
        style={{
          fontSize: "32px"
        }}
      >
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default Etoiles;
