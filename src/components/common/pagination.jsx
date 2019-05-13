import React, { Component } from "react";

class Paginantion extends Component {
  calculatePages() {
    return Math.ceil(this.props.totalItems / this.props.itemsPerPage);
  }
  createArray() {
    const array = [];
    for (let i = 1; i <= this.calculatePages(); i++) {
      array.push(i);
    }
    return array;
  }
  render() {
    return this.calculatePages() === 1 ? null : (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {this.createArray().map(pageNumber => (
            <li
              className={
                pageNumber === this.props.currentPage
                  ? "page-item active"
                  : "page-item"
              }
              key={pageNumber}
            >
              <button
                className="page-link"
                onClick={() => this.props.onPageNav(pageNumber)}
                active
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

export default Paginantion;
