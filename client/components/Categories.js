import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = (props) => {
  //const { categories, products } = props

  const categoryList = props.categories.map((category) => {
    const filteredBooks = props.products.filter( product => product.categoryId === category.id)

    return (
      <div key={category.id} id="category-container">
        <li> {category.name} </li>
        <div> {
          filteredBooks.map((book) => {
            return (
              <div key={book.id} id="category-book-container">
              <Link to={`/products/${book.id}`}> {book.name} </Link>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  });
  
  return (
    <div>
      <h2> Categories: </h2>
      {categoryList}
    </div>
  )
}

export default connect(state=>state)(Categories);