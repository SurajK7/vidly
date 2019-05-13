export function paginate(pageNumber, itemsPerPage, items) {
  const itemsOnCurrentPage = [];
  for (let i = 0; i < itemsPerPage; i++) {
    let index = (pageNumber - 1) * itemsPerPage + i;
    if (items[index]) {
      itemsOnCurrentPage.push(items[index]);
    }
  }
  return itemsOnCurrentPage;
}
