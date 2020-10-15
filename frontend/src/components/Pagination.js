import React from 'react';

const Pagination = ({ dishPerPage, totalDishes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDishes / dishPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
            <span onClick={() => paginate(number)} className='page-item' key={number}>
              {number}
            </span>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;