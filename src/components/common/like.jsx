import React, { Component } from "react";

class Like extends Component {
  formatLike() {
    return this.props.ifLiked ? "" : "-o";
  }

  render() {
    return (
      <i
        className={"fa fa-heart" + this.formatLike()}
        aria-hidden="true"
        onClick={this.props.onLikeToggled}
        style={{ cursor: "pointer" }}
      />
    );
  }
}

export default Like;
