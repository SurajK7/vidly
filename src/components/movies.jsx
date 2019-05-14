import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    itemsPerPage: 4,
    movies: getMovies(),
    currentPage: 1
  };

  handleDelete(movieId) {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movieId)
    });
  }

  handleLikeToggled = movie => {
    movie.ifLiked = !movie.ifLiked;
    let index = this.state.movies.findIndex(m => m._id === movie._id);
    let movies = [...this.state.movies];
    movies.splice(index, 1, movie);
    this.setState({ movies });
  };

  handlePageNav = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
  };

  message(moviesOnCurrPage) {
    return moviesOnCurrPage.length ? (
      <p>Showing {moviesOnCurrPage.length} movies on this page</p>
    ) : (
      <p>There are no movies on this page</p>
    );
  }

  renderTable(moviesOnCurrPage) {
    return moviesOnCurrPage.length ? (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {moviesOnCurrPage.map(movie => (
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
    const { movies, itemsPerPage, currentPage } = this.state;
    const moviesOnCurrPage = paginate(currentPage, itemsPerPage, movies);
    return (
      <React.Fragment>
        {this.message(moviesOnCurrPage)}
        {this.renderTable(moviesOnCurrPage)}
        <Pagination
          totalItems={movies.length}
          itemsPerPage={itemsPerPage}
          onPageNav={this.handlePageNav}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
