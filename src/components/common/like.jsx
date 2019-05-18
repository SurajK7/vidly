import React from "react";

const Like = ({ onLikeToggled, ifLiked }) => {
  return (
    <i
      className={ifLiked ? "clickable fa fa-heart" : "clickable fa fa-heart-o"}
      onClick={onLikeToggled}
    />
  );
};

export default Like;
