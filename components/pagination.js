import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="w-100 my-5">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              onClick={onPrevious}
              disabled={currentPage === 1}
              className="page-link"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {paginationRange.map((pageNumber, index) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return (
                <li key={`${pageNumber}-${index}-nx`} className="page-item">
                  <button className="page-link">&#8230;</button>
                </li>
              );
            }

            // Render our Page Pills
            return (
              <li
                key={`${pageNumber}-${index}-pg`}
                onClick={() => onPageChange(pageNumber)}
                className={
                  pageNumber === currentPage ? "page-item active" : "page-item"
                }
              >
                <button className="page-link">{pageNumber}</button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              onClick={onNext}
              className="page-link"
              disabled={currentPage === lastPage}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
