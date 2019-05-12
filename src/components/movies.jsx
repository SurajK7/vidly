import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete(movieId) {
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== movieId)
    });
  }

  message() {
    return this.state.movies.length ? (
      <p>Showing {this.state.movies.length} movies in the database</p>
    ) : (
      <p>There are no movies in the database</p>
    );
  }

  handleLikeToggled = movie => {
    movie.ifLiked = !movie.ifLiked;
    let index = this.state.movies.findIndex(m => m._id === movie._id);
    let movies = [...this.state.movies];
    movies.splice(index, 1, movie);
    this.setState({ movies });
  };

  renderTable() {
    return this.state.movies.length ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  ifLiked={movie.ifLiked}
                  onLikeToggled={() => this.handleLikeToggled(movie)}
                />
              </td>
              <td>
                <button
                  className="btn-danger"
                  onClick={() => this.handleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        {this.message()}
        {this.renderTable()}
      </React.Fragment>
    );
  }
}

export default Movies;
