import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: movie => (
        <Like
          ifLiked={movie.ifLiked}
          onLikeToggled={() => this.props.onLikeToggled(movie)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { moviesToRender, sortColumn, onSort } = this.props;
    return moviesToRender.length ? (
      <Table
        data={moviesToRender}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    ) : null;
  }
}

export default MoviesTable;
