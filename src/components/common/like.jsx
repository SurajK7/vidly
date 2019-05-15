import React from "react";

const Like = ({ onLikeToggled, ifLiked }) => {
  return (
    <i
      className={ifLiked ? "fa fa-heart" : "fa fa-heart-o"}
      aria-hidden="true"
      onClick={onLikeToggled}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
