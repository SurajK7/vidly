import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = field => {
    const { field: path, order } = this.props.sortColumn;
    let newSortColumn = { field, order: "asc" };
    if (path === field && order === "asc") newSortColumn.order = "desc";
    return newSortColumn;
  };

  renderSortIcon = column => {
    const { field, order } = this.props.sortColumn;
    if (column.path !== field) return null;
    if (order === "asc") return <i className="fa fa-sort-asc" />;
    if (order === "desc") return <i className="fa fa-sort-desc" />;
  };

  render() {
    const { columns, onSort } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.label || column.key}
              className="clickable"
              onClick={() => onSort(this.raiseSort(column.path))}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
