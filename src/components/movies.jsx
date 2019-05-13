import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    itemsPerPage: 4,
    movies: getMovies(),
    moviesOnCurrPage: [],
    currentPage: 1
  };

  constructor() {
    super();
    const { movies, itemsPerPage } = this.state;
    this.state.moviesOnCurrPage = paginate(1, itemsPerPage, movies);
  }

  handleDelete(movieId) {
    const { movies } = this.state;
    this.setState({
      movies: movies.filter(movie => movie._id !== movieId)
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
    const { movies, itemsPerPage } = this.state;
    this.setState({
      moviesOnCurrPage: paginate(pageNumber, itemsPerPage, movies),
      currentPage: pageNumber
    });
  };

  message() {
    return this.state.moviesOnCurrPage.length ? (
      <p>Showing {this.state.moviesOnCurrPage.length} movies on this page</p>
    ) : (
      <p>There are no movies on this page</p>
    );
  }

  renderTable() {
    return this.state.moviesOnCurrPage.length ? (
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
          {this.state.moviesOnCurrPage.map(movie => (
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
    return (
      <React.Fragment>
        {this.message()}
        {this.renderTable()}
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
