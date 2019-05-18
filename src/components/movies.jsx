import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    itemsPerPage: 4,
    selectedPage: 1,
    selectedGenre: { name: "All Genres" },
    sortColumn: { field: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
      movies: getMovies()
    });
  }

  handleDelete = movieId => {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movieId)
    });
  };

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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies,
      itemsPerPage,
      selectedPage,
      sortColumn,
      selectedGenre
    } = this.state;

    const moviesOfCurrGenre =
      selectedGenre.name === "All Genres"
        ? movies
        : movies.filter(movie => movie.genre._id === selectedGenre._id);

    const sortedMoviesOfCurrGenre = _.orderBy(
      moviesOfCurrGenre,
      sortColumn.field,
      sortColumn.order
    );

    let moviesOnCurrPage = paginate(
      selectedPage,
      itemsPerPage,
      sortedMoviesOfCurrGenre
    );

    return {
      data: moviesOnCurrPage,
      totalCount: sortedMoviesOfCurrGenre.length
    };
  };

  render() {
    const {
      itemsPerPage,
      selectedPage,
      genres,
      sortColumn,
      selectedGenre
    } = this.state;

    const { totalCount, data } = this.getPagedData();

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
            {data.length
              ? `Showing ${data.length} movies on this page`
              : "There are no movies on this page"}
          </p>
          <MoviesTable
            moviesToRender={data}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLikeToggled={this.handleLikeToggled}
            onSort={this.handleSort}
          />
          <Pagination
            totalItems={totalCount}
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
