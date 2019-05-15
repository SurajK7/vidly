import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    itemsPerPage: 2,
    selectedPage: 1,
    selectedGenre: { name: "All Genres" }
  };

  componentDidMount() {
    this.setState({
      genres: [{ name: "All Genres" }, ...getGenres()],
      movies: getMovies()
    });
  }

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

  handlePageChange = pageNumber => {
    this.setState({ selectedPage: pageNumber });
  };

  handleGenreChange = genre => {
    this.setState({ selectedGenre: genre, selectedPage: 1 });
  };

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
    const {
      movies,
      itemsPerPage,
      selectedPage,
      genres,
      selectedGenre
    } = this.state;

    const moviesOfCurrGenre =
      selectedGenre.name === "All Genres"
        ? movies
        : movies.filter(movie => movie.genre._id === selectedGenre._id);

    let moviesOnCurrPage = paginate(
      selectedPage,
      itemsPerPage,
      moviesOfCurrGenre
    );

    return (
      <div className="row m-5">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreChange}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>
            {moviesOnCurrPage.length
              ? `Showing ${moviesOnCurrPage.length} movies on this page`
              : "There are no movies on this page"}
          </p>
          {this.renderTable(moviesOnCurrPage)}
          <Pagination
            totalItems={moviesOfCurrGenre.length}
            itemsPerPage={itemsPerPage}
            onPageSelect={this.handlePageChange}
            selectedPage={selectedPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
