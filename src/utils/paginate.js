export function paginate(currentPage, itemsPerPage, items) {
  const itemsOnCurrentPage = [];
  for (let i = 0; i < itemsPerPage; i++) {
    let index = (currentPage - 1) * itemsPerPage + i;
    if (items[index]) {
      itemsOnCurrentPage.push(items[index]);
    }
  }
  return itemsOnCurrentPage;
}
