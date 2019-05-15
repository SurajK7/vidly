import React, { Component } from "react";
import PropTypes from "prop-types";

class Paginantion extends Component {
  calculatePages() {
    const { totalItems, itemsPerPage } = this.props;
    return Math.ceil(totalItems / itemsPerPage);
  }
  createArray() {
    const array = [];
    for (let i = 1; i <= this.calculatePages(); i++) {
      array.push(i);
    }
    return array;
  }
  render() {
    const { selectedPage, onPageSelect, totalItems, itemsPerPage } = this.props;
    return totalItems < itemsPerPage ? null : (
      <nav>
        <ul className="pagination">
          {this.createArray().map(pageNumber => (
            <li
              className={
                pageNumber === selectedPage ? "page-item active" : "page-item"
              }
              key={pageNumber}
            >
              <button
                className="page-link"
                onClick={() => onPageSelect(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Paginantion.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func.isRequired
};

export default Paginantion;
